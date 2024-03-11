'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const RegisterPage = () => {
    const router = useRouter()
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })
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
        } catch (error) {
            setError("Error during registration")
            console.log(error)
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
                    onChange={(e) => {setData({...data, username: e.target.value})}}
                />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-medium">email</span>
                </div>
                <input name='email' type="email" placeholder="enter email" className="input input-bordered w-full max-w-xs focus:outline-none"  
                    onChange={(e) => {setData({...data, email: e.target.value})}}
                />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-medium">password</span>
                </div>
                <input name='password' type="password" placeholder="enter password" className="input input-bordered w-full max-w-xs focus:outline-none" 
                    onChange={(e) => {setData({...data, password: e.target.value})}}
                />
            </label>
            
            {
                error && <div className='w-full bg-red-300 h-8 flex place-items-center justify-center rounded-md mt-1 text-red-600'>{error}</div>
            }

            <button type='submit' className='btn w-full mt-6 bg-orange-500 text-slate-50 hover:bg-orange-600'>
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