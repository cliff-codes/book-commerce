'use client'
import Link from 'next/link'
import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
// import DeleteAlertPortal from './DeleteAlertPortal'
import { deleteBook } from '../../../lib/actions';

interface BookData{
    bookImgUrl : string,
    bookName: string,
    bookDescription: string,
    price: number,
    bookId: string
}

const ManageBookTableRow = ({bookImgUrl, bookName, bookDescription, price,bookId} : BookData) => {

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
            {bookDescription.length <= 80 ? bookId : `${bookDescription.substring(0,80)}.....`}
          </td>
          <td>{price}</td>
          <th className='flex place-items-center'>
            <Link href={`/cms/dashboard/manage/${bookId}`}>
              <button className="btn btn-ghost btn-xs custom-xs:btn-md">
                  <MdEdit size={20}/>
              </button>
            </Link>

            <div>
              <div>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button className="btn" onClick={()=>{
                    const modal =  document.getElementById('my_modal_5')

                    if(modal instanceof HTMLDialogElement){
                      modal.showModal()
                    }
                  }}>
                      <MdDelete size={20} />
                  </button>
                  <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box">
                      <h3 className="font-bold text-lg">Delete!</h3>
                      <p className="py-4">Are you sure you want to delete book from store?</p>
                      <div className="modal-action">
                      
                      {/* <DeleteBookBtn id= {id}/> */}
                      <form action={() => deleteBook(bookId)} >
                          <button className='btn btn-error'>Delete</button>
                      </form>

                      <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">cancel</button>
                      </form>
                      </div>
                  </div>
                  </dialog>
              </div>
            </div>
          </th>
        </tr>
  )
}

export default ManageBookTableRow