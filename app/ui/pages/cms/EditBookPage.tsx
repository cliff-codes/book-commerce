import React from 'react'

const EditBookPage = () => {
  return (
    <div>
        <h1 className='font-semibold text-xl mt-4'>Edit Book</h1>

        <form className='mt-5 flex flex-col gap-4 justify-center w-96 mb-8'>
            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text font-medium">Book Title</span>
                </div>
                <input type="text" placeholder="book name" className="input input-bordered w-full max-w-lg focus:outline-orange-400 border-none" />
            </label>

            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text font-medium">Author Name</span>
                </div>
                <input type="text" placeholder="author name" className="input input-bordered w-full max-w-lg focus:outline-orange-400 border-none" />
            </label>

            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text font-medium">Price of Book($)</span>
                </div>
                <input type="number" placeholder="Price" className="input input-bordered w-full max-w-lg focus:outline-orange-400 border-none" />
            </label>


            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text font-medium">Cover Image Url</span>
                </div>
                <input type="text" placeholder="image url" className="input input-bordered w-full max-w-lg focus:outline-orange-400 border-none" />
            </label>

            <div>
                <div className="label">
                    <span className="label-text font-medium">Book Category</span>
                </div>

                <select className="select w-full max-w-lg focus:outline-orange-400 border-none">
                    <option disabled selected>Book Category</option>
                    <option>Sci-Fi</option>
                    <option>Romance</option>
                    <option>History</option>
                </select>
            </div>

            <div>
                <div className="label">
                    <span className="label-text font-medium">Preview / Description of book</span>
                </div>

                <textarea className="textarea w-full max-w-lg focus:outline-orange-400 border-none" placeholder="Description"></textarea>
            </div>

            <div>
                <button className='btn bg-orange-500 hover:bg-orange-600 text-slate-50 w-full max-w-lg'>upload</button>
            </div>
        </form>
    </div>
  )
}

export default EditBookPage