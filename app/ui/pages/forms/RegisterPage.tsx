import React from 'react'
import Link from 'next/link'

const RegisterPage = () => {
  return (
    <div className='w-80'>
        <h1 className='font-bold text-lg text-center'>Register</h1>

        <form>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-medium">email</span>
                </div>
                <input type="email" placeholder="enter e-mail" className="input input-bordered w-full max-w-xs focus:outline-none" />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-medium">password</span>
                </div>
                <input type="password" placeholder="enter password" className="input input-bordered w-full max-w-xs focus:outline-none" />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-medium">re-type password</span>
                </div>
                <input type="password" placeholder="enter password" className="input input-bordered w-full max-w-xs focus:outline-none" />
            </label>
            

            <button className='btn w-full mt-6 bg-orange-500 text-slate-50 hover:bg-orange-600'>
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