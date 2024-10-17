'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
const StoreLoginPage = () => {

    const router = useRouter()

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [emailError, setEmailError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null) 

    const [error, setError] = useState("")

    //validate password strenght and validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value})
        console.log(data)
    }

    useEffect(() => {
        console.log("hook is working")
        const validateForm = () => {
            if(!emailRegex.test(data.email)){
                setEmailError("Invalid email address")
            }else { setEmailError(null) }
            
            if(data.password.length < 8){
                setPasswordError("Password must be at least 8 characters long")
            }else { setPasswordError(null) }   
        }
        validateForm()
    },[data])

    console.log(emailError, passwordError)

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {email, password} = data
        console.log(email, password)
        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false
            })

            console.log(res)

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
                <input type={"email"} name={'email'} placeholder={"enter e-mail"} className="input input-bordered w-full max-w-xs focus:outline-none" 
                    onChange={(e) => handleChange(e)}
                />
            </label>
            {
                emailError && <div className = "w-full text-red-600 flex justify-left place-items-center rounded-md py-1 mt-2">{emailError}</div>
            }

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-medium">password</span>
                </div>
                <input type="password" name={'password'} placeholder="enter password" className="input input-bordered w-full max-w-xs focus:outline-none" 
                    onChange={(e) => handleChange(e)}
                />
            </label>

            {
                passwordError && <div className='w-full text-red-600 flex justify-left place-items-center rounded-md py-1 mt-2'>{passwordError}</div>
            }

            <div className='text-xs hover:text-orange-400 hover:cursor-pointer'>forgot password?</div>

            <button type='submit' disabled = {(data.email && data.password.length >= 9 && emailRegex.test(data.email)) ? false : true } className='btn w-full mt-6 bg-orange-500 text-slate-50 hover:bg-orange-600'>
                login
            </button>
            
            <div className='text-center text-sm py-1'>{`Don't have an account?`}</div>

            <Link href={'/register'}>
                <button
                className='btn w-full'>register</button>
            </Link>
        </form>
    </div>
  )
}

export default StoreLoginPage
