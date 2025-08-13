'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, Input } from '../../components/design-system'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiBookOpen, FiCheck } from 'react-icons/fi'

const RegisterPage = () => {
    const router = useRouter()
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [passwordErr, setPasswordErr] = useState<string | null>(null)
    const [emailErr, setEmailErr] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    //validate password strength and validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    // Password strength validation
    const validatePassword = (password: string) => {
        const minLength = password.length >= 8
        const hasUpperCase = /[A-Z]/.test(password)
        const hasLowerCase = /[a-z]/.test(password)
        const hasNumbers = /\d/.test(password)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
        
        return { minLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar }
    }

    const validateForm = () => {
        if(data.email && !emailRegex.test(data.email)){
            setEmailErr("Please enter a valid email address")
        } else {
            setEmailErr(null)
        }
        
        if(data.password) {
            const passwordChecks = validatePassword(data.password)
            if(!passwordChecks.minLength || !passwordChecks.hasUpperCase || !passwordChecks.hasLowerCase || !passwordChecks.hasNumbers) {
                setPasswordErr("Password must be at least 8 characters with uppercase, lowercase, and numbers")
            } else {
                setPasswordErr(null)
            }
        } else {
            setPasswordErr(null)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value})
        // Clear errors when user starts typing
        if (e.target.name === 'email') setEmailErr(null)
        if (e.target.name === 'password') setPasswordErr(null)
        if (e.target.name === 'username') setError("")
        setError("") // Clear general error
    }

    useEffect(() => {
       validateForm() 
    },[data])

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        
        const {username, email, password} = data
        if(!username || !email || !password){
            setError("All fields must be filled")
            setIsLoading(false)
            return 
        }

        try {
            //if user already exists
            const resUserExist = await fetch('api/userExists', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({email})
            })

            const {user} = await resUserExist.json()
            
            if(user){
                setError("An account with this email already exists")
                setIsLoading(false)
                return
            }

            const res = await fetch('api/register', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            })
            
            if(res.ok){
                const form = e.target as HTMLFormElement
                //clear form
                form.reset()
                setData({ username: "", email: "", password: "" })
                
                //redirect
                router.push('/login?message=Registration successful! Please sign in.')
            } else {
                setError("Registration failed. Please try again.")
            }
        } catch (error: any) {
            setError("Something went wrong. Please try again.")
        }
        setIsLoading(false)
    }

    const isFormValid = data.username && data.email && data.password.length >= 8 && emailRegex.test(data.email) && !passwordErr
    const passwordChecks = validatePassword(data.password)

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
                            <h1 className="text-3xl font-bold text-neutral-900">Create Account</h1>
                            <p className="text-neutral-600 mt-2">Join our community of book lovers</p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={registerUser} className="space-y-6">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-neutral-700">
                                Full Name
                            </label>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Enter your full name"
                                value={data.username}
                                onChange={handleChange}
                                leftIcon={<FiUser className="w-4 h-4 text-neutral-400" />}
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                                Email Address
                            </label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={data.email}
                                onChange={handleChange}
                                className={emailErr ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
                                leftIcon={<FiMail className="w-4 h-4 text-neutral-400" />}
                            />
                            {emailErr && (
                                <p className="text-red-600 text-sm flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                    {emailErr}
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
                                    placeholder="Create a strong password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className={`pr-12 ${passwordErr ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
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
                            
                            {/* Password Strength Indicator */}
                            {data.password && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-neutral-200 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    passwordChecks.minLength && passwordChecks.hasUpperCase && passwordChecks.hasLowerCase && passwordChecks.hasNumbers
                                                        ? 'bg-green-500 w-full'
                                                        : passwordChecks.minLength && (passwordChecks.hasUpperCase || passwordChecks.hasLowerCase || passwordChecks.hasNumbers)
                                                        ? 'bg-yellow-500 w-2/3'
                                                        : 'bg-red-500 w-1/3'
                                                }`}
                                            />
                                        </div>
                                        <span className="text-xs text-neutral-500">
                                            {passwordChecks.minLength && passwordChecks.hasUpperCase && passwordChecks.hasLowerCase && passwordChecks.hasNumbers
                                                ? 'Strong'
                                                : passwordChecks.minLength && (passwordChecks.hasUpperCase || passwordChecks.hasLowerCase || passwordChecks.hasNumbers)
                                                ? 'Medium'
                                                : 'Weak'
                                            }
                                        </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-1 text-xs">
                                        <div className={`flex items-center gap-1 ${passwordChecks.minLength ? 'text-green-600' : 'text-neutral-400'}`}>
                                            <FiCheck className="w-3 h-3" />
                                            At least 8 characters
                                        </div>
                                        <div className={`flex items-center gap-1 ${passwordChecks.hasUpperCase ? 'text-green-600' : 'text-neutral-400'}`}>
                                            <FiCheck className="w-3 h-3" />
                                            One uppercase letter
                                        </div>
                                        <div className={`flex items-center gap-1 ${passwordChecks.hasLowerCase ? 'text-green-600' : 'text-neutral-400'}`}>
                                            <FiCheck className="w-3 h-3" />
                                            One lowercase letter
                                        </div>
                                        <div className={`flex items-center gap-1 ${passwordChecks.hasNumbers ? 'text-green-600' : 'text-neutral-400'}`}>
                                            <FiCheck className="w-3 h-3" />
                                            One number
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {passwordErr && (
                                <p className="text-red-600 text-sm flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                    {passwordErr}
                                </p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start gap-3">
                            <input
                                id="terms"
                                type="checkbox"
                                required
                                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 mt-0.5"
                            />
                            <label htmlFor="terms" className="text-sm text-neutral-600">
                                I agree to the{' '}
                                <Link href="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            className="w-full h-12 text-base font-medium"
                            loading={isLoading}
                        >
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-neutral-500">Or sign up with</span>
                        </div>
                    </div>

                    {/* Social Sign Up Buttons */}
                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full h-12"
                            onClick={() => {/* Add Google sign up logic */}}
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

                    {/* Sign In Link */}
                    <div className="text-center">
                        <p className="text-neutral-600">
                            Already have an account?{' '}
                            <Link 
                                href="/login" 
                                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-xs text-neutral-500">
                        By creating an account, you agree to our{' '}
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

export default RegisterPage
