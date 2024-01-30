import React from 'react'
import ManageBookTableRow from '../../components/utilityComponents/ManageBookTableRow'

const ManagePage = () => {
  return (
    <div className='w-full max-w-7xl mt-6'>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                    </th>
                    <th>Book</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                <ManageBookTableRow bookImgUrl={'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'} bookDescription='Some description about the book in particular' bookName='One in a Million' price={12.30}/>

                <ManageBookTableRow bookImgUrl={'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'} bookDescription='Some description about the book in particular' bookName='One in a Million' price={12.30}/>

                <ManageBookTableRow bookImgUrl={'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'} bookDescription='Some description about the book in particular' bookName='One in a Million' price={12.30}/>
                
                </tbody>    
            </table>
        </div>
    </div>
  )
}

export default ManagePage