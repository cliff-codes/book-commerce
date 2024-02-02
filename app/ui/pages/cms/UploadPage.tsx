import { addBook } from '@/app/lib/actions'
import React from 'react'

const UploadPage = () => {
  return (
    <div className='w-full h-full max-w-7xl flex flex-col place-items-center px-4 bg-gray-50 pt-4'>
        <h1 className='font-medium text-xl'>Upload Book</h1>

        <form action={addBook} className='mt-5 flex flex-col gap-4 justify-center w-96 mb-8'>
            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text font-medium">Book Title</span>
                </div>
                <input name='title' type="text" placeholder="book name" className="input input-bordered w-full max-w-lg focus:outline-orange-400 border-none" />
            </label>

            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text font-medium">Author Name</span>
                </div>
                <input name='author' type="text" placeholder="author" className="input input-bordered w-full max-w-lg focus:outline-orange-400 border-none" />
            </label>

            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text font-medium">Price of Book($)</span>
                </div>
                <input name='price' type="number" placeholder="Price" className="input input-bordered w-full max-w-lg focus:outline-orange-400 border-none" />
            </label>

            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text font-medium">Cover Image Url</span>
                </div>
                <input name='img' type="text" placeholder="image url" className="input input-bordered w-full max-w-lg focus:outline-orange-400 border-none" />
            </label>

            <div>
                <div className="label">
                    <span className="label-text font-medium">Book Category</span>
                </div>

                <select name='category' defaultValue={"N/A"} className="select w-full max-w-lg focus:outline-orange-400 border-none">
                    <option>Sci-Fi</option>
                    <option>Romance</option>
                    <option>History</option>
                    <option>N/A</option>
                </select>
            </div>

            <div>
                <div className="label">
                    <span className="label-text font-medium">Preview / Description of book</span>
                </div>

                <textarea name='description' className="textarea w-full max-w-lg focus:outline-orange-400 border-none" placeholder="Description"></textarea>
            </div>

            <div>
                <button type='submit' className='btn bg-orange-500 hover:bg-orange-600 text-slate-50 w-full max-w-lg'>upload</button>
            </div>
        </form>
    </div>
  )
}

export default UploadPage