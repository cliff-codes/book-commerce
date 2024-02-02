
import React from 'react'
import { updateBook } from '@/app/lib/actions'


const EditBookPage = ({book} : any) => {

    const {_id } = book

  return (
    <div>
        <h1 className='font-semibold text-xl mt-4'>Edit Book</h1>

        <form action={updateBook} className='mt-5 flex flex-col gap-4 justify-center w-96 mb-8'>
            <input hidden = {true} name='id' defaultValue={_id} />
            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text font-medium">Book Title</span>
                </div>
                <input name='title' type="text" defaultValue={book.title} placeholder="book name" className="input input-bordered w-full max-w-lg focus:outline-orange-400 border-none" />
            </label>

            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text font-medium">Author Name</span>
                </div>
                <input name='author' type="text" defaultValue={book.author} placeholder="author name" className="input input-bordered w-full max-w-lg focus:outline-orange-400 border-none" />
            </label>

            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text font-medium">Price of Book($)</span>
                </div>
                <input name='price' type="number" defaultValue={book.price} placeholder="Price" className="input input-bordered w-full max-w-lg focus:outline-orange-400 border-none" />
            </label>


            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text font-medium">Cover Image Url</span>
                </div>
                <input name='img' type="text" defaultValue={book.img} placeholder="image url" className="input input-bordered w-full max-w-lg focus:outline-orange-400 border-none" />
            </label>

            <div>
                <div className="label">
                    <span className="label-text font-medium">Book Category</span>
                </div>

                <select name='category' defaultValue={book.category} className="select w-full max-w-lg focus:outline-orange-400 border-none">
                    <option>Romance</option>
                    <option>Sci-Fi</option>
                    <option>History</option>
                </select>
            </div>

            <div>
                <div className="label">
                    <span className="label-text font-medium">Preview / Description of book</span>
                </div>

                <textarea name='description' className="textarea w-full max-w-lg focus:outline-orange-400 border-none" defaultValue={book.description} placeholder="Description"></textarea>
            </div>

            <div>
                <button className='btn bg-orange-500 hover:bg-orange-600 text-slate-50 w-full max-w-lg'>update</button>
            </div>
        </form>
    </div>
  )
}

export default EditBookPage