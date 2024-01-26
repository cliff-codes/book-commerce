import Link from 'next/link'
import React from 'react'

const StoreLoginPage = () => {
  return (
    <div className='min-w-80'>
        <h1 className='font-bold text-xl text-center'>Login</h1>
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
            <div className='text-xs hover:text-orange-400 hover:cursor-pointer'>forgot password?</div>

            <button className='btn w-full mt-6 bg-orange-500 text-slate-50 hover:bg-orange-600'>
                login
            </button>
            
            <div className='text-center text-sm py-1'>Don't have an account?</div>
            <Link href={'/register'}>
                <button className='btn w-full'>register</button>
            </Link>
        </form>
    </div>
  )
}

export default StoreLoginPage