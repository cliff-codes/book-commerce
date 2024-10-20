'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const RegisterPage = () => {
    const router = useRouter()
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [passwordErr, setPasswordErr] = useState<string | null>(null)
    const [emailErr, setEmailErr] = useState<string | null>(null)

    //validate passoword strength and validate email
    //add more complexity to password validation
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const validateForm = () => {
        if(!emailRegex.test(data.email)){
            setEmailErr("Invalid email address")
        }else{
            setEmailErr("")
        }
        if(data.password.length < 8){
            setPasswordErr("Password must be at least 8 characters long")
        }else{
            setPasswordErr(null)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    useEffect(() => {
       validateForm() 
    },[data])

    

    const [error, setError] = useState("")

    const registerUser = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const {username, email, password} = data
        if(!username || !email || !password){
            setError("All fields must be filled")
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
                setError("Email already exist")
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
                const form = e.target
                //clear form
                form.reset()

                //redirect
                router.push('/')
            }else{
                setError("user registration failed")
            }
        } catch (error: any) {
            setError(error.message)
        }
    }

  return (
    <div className='w-80'>
        <h1 className='font-bold text-lg text-center'>Register</h1>

        <form onSubmit={registerUser}>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-medium">full name</span>
                </div>
                <input name='username' type="text" placeholder="enter name" className="input input-bordered w-full max-w-xs focus:outline-none" 
                    onChange={(e) => handleChange(e)}
                />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-medium">email</span>
                </div>
                <input name='email' type="email" placeholder="enter email" className="input input-bordered w-full max-w-xs focus:outline-none"  
                    onChange={(e) => handleChange(e)}
                />
            </label>
            {
                emailErr && <div className = "w-full h-8 flex place-items-center justify-left rounded-md text-red-600">{emailErr}</div>
            }

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-medium">password</span>
                </div>
                <input name='password' type="password" placeholder="enter password" className="input input-bordered w-full max-w-xs focus:outline-none" 
                    onChange={(e) => handleChange(e)}
                />
            </label>
            
            {
                passwordErr && <div className='w-full h-8 flex place-items-center justify-left rounded-md mt-1 text-red-600'>{passwordErr}</div>
            }

            <button type='submit' disabled = {(data.email && data.password.length >= 8 && data.username && emailRegex.test(data.email)) ? false : true } className='btn w-full mt-6 bg-orange-500 text-slate-50 hover:bg-orange-600'>
                register
            </button>
           
            
            <div className='text-center text-sm py-1'>Already have an account?</div>
            <Link href={'/login'}>
                <button className='btn w-full'>login</button>
            </Link>
        </form>
    </div>
  )
}

export default RegisterPage
