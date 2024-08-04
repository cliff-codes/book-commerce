'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
const StoreLoginPage = () => {

    const router = useRouter()

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState("")

    //validate password strenght and validate email
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(data.email)){
            setError("Invalid email address")
            return false
        }
        if(data.password.length < 8){
            setError("Password must be at least 8 characters long")
            return false
        }
        return true
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value})
        validateForm()
    }

    const handleReset = () => {
        setData({email: "", password: ""})
        setError("")
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {email, password} = data
        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false
            })

            if(res?.error){
                setError(res.error)
                return
            }
            router.push('/')
        } catch (error: any) {
            setError(error.message)
        }
    }

  return (
    <div className='min-w-80'>
        <h1 className='font-bold text-xl text-center'>Login</h1>
        <form onSubmit={handleSubmit}>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-medium">email</span>
                </div>
                <input type={"email"} placeholder={"enter e-mail"} className="input input-bordered w-full max-w-xs focus:outline-none" 
                    onChange={(e) => handleChange(e)}
                />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-medium">password</span>
                </div>
                <input type="password" placeholder="enter password" className="input input-bordered w-full max-w-xs focus:outline-none" 
                    onChange={(e) => handleChange(e)}
                />
            </label>

            {
                error && <div className='w-full bg-red-300 text-red-600 flex justify-center place-items-center rounded-md py-1 mt-2'>{error}</div>
            }

            <div className='text-xs hover:text-orange-400 hover:cursor-pointer'>forgot password?</div>

            <button className='btn w-full mt-6 bg-orange-500 text-slate-50 hover:bg-orange-600'>
                login
            </button>
            
            <div className='text-center text-sm py-1'>{`Don't have an account?`}</div>

            <Link href={'/register'}>
                <button
                    onClick={handleReset}
                className='btn w-full'>register</button>
            </Link>
        </form>
    </div>
  )
}

export default StoreLoginPage