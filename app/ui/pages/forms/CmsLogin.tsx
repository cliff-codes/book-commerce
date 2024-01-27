import React from 'react'
import Link from 'next/link'

const CmsLogin = () => {
  return (
    <div className='w-full max-w-sm'>
        <h1 className='text-xl font-bold text-center'>Login to store cms</h1>

        <form>
            <label className="form-control w-full max-w-sm">
                <div className="label">
                    <span className="label-text font-medium">email</span>
                </div>
                <input type="email" placeholder="enter e-mail" className="input input-bordered w-full max-w-sm focus:outline-none" />
            </label>

            <label className="form-control w-full max-w-sm">
                <div className="label">
                    <span className="label-text font-medium">password</span>
                </div>
                <input type="password" placeholder="enter password" className="input input-bordered w-full max-w-sm focus:outline-none" />
            </label>
            

            <button className='btn w-full mt-6 bg-orange-500 text-slate-50 hover:bg-orange-600'>
                login
            </button>
        </form>
    </div>
  )
}

export default CmsLogin