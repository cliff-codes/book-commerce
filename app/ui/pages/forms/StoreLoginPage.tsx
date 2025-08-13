'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '../../components/design-system'
import { FiMail, FiLock, FiEye, FiEyeOff, FiBookOpen } from 'react-icons/fi'

const StoreLoginPage = () => {
    const router = useRouter()

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [emailError, setEmailError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null) 
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    //validate password strength and validate email
    const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value})
        // Clear errors when user starts typing
        if (e.target.name === 'email') setEmailError(null)
        if (e.target.name === 'password') setPasswordError(null)
        setError("") // Clear general error
    }

    const validateForm = useCallback(() => {
        if(data.email && !emailRegex.test(data.email)){
            setEmailError("Please enter a valid email address")
        } else { 
            setEmailError(null) 
        }
        
        if(data.password && data.password.length < 8){
            setPasswordError("Password must be at least 8 characters long")
        } else { 
            setPasswordError(null) 
        }   
    }, [data, emailRegex])

    useEffect(() => {
        validateForm()
    },[validateForm])

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        
        const {email, password} = data
        
        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false
            })

            if(res?.error){
                setError(res.error)
                setIsLoading(false)
                return
            }
            router.push('/')
        } catch (error: any) {
            setError(error.message)
            setIsLoading(false)
        }
    }

    const isFormValid = data.email && data.password.length >= 8 && emailRegex.test(data.email)

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4 my-[120px]">
            <div className="w-full max-w-md">
                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8 space-y-8">
                    
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <FiBookOpen className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-900">Welcome Back</h1>
                            <p className="text-neutral-600 mt-2">Sign in to your account to continue</p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={data.email}
                                    onChange={handleChange}
                                    className={`pr-4 ${emailError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    leftIcon={<FiMail className="w-4 h-4 text-neutral-400" />}
                                />
                            </div>
                            {emailError && (
                                <p className="text-red-600 text-sm flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                    {emailError}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className={`pr-12 ${passwordError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    leftIcon={<FiLock className="w-4 h-4 text-neutral-400" />}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                </button>
                            </div>
                            {passwordError && (
                                <p className="text-red-600 text-sm flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                    {passwordError}
                                </p>
                            )}
                        </div>

                        {/* Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-neutral-600">
                                    Remember me
                                </label>
                            </div>
                            <Link 
                                href="/forgot-password" 
                                className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            className="w-full h-12 text-base font-medium"
                            loading={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-neutral-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full h-12"
                            onClick={() => signIn('google', { callbackUrl: '/' })}
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </Button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-neutral-600">
                            Don&apos;t have an account?{' '}
                            <Link 
                                href="/register" 
                                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-xs text-neutral-500">
                        By signing in, you agree to our{' '}
                        <Link href="/terms" className="text-primary-600 hover:text-primary-700">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default StoreLoginPage
