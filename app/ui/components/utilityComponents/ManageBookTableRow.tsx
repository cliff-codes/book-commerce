import React from 'react'
import { MdEdit } from 'react-icons/md'

interface BookData{
    bookImgUrl : string,
    bookName: string,
    bookDescription: string,
    price: number,
}

const ManageBookTableRow = ({bookImgUrl, bookName, bookDescription, price} : BookData) => {
  return (      
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={bookImgUrl} alt="Avatar Tailwind CSS Component"/>
                </div>
              </div>
              <div>
                <div className="font-bold">{bookName}</div>
              </div>
            </div>
          </td>
          <td>
            {bookDescription}
          </td>
          <td>{price}</td>
          <th>
            <button className="btn btn-ghost btn-xs">
                <MdEdit size={24} />
            </button>
          </th>
        </tr>
  )
}

export default ManageBookTableRow