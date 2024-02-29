'use client'
import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { deleteBook } from '@/app/lib/actions'


interface bookId {
    bookId : string
}

const DeleteAlertPortal = ({bookId}:bookId) => {
    const [itemToDeleteId, setItemToDeleteId]= useState("")
  return (
    <div>
        <h1>{bookId}</h1>
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
            <form action={deleteBook} >
                <input name='bookId' value={itemToDeleteId} hidden = {true}  readOnly/>
                <button className='btn btn-error' onClick={() => setItemToDeleteId(bookId)}>Delete</button>
            </form>

            <form method="dialog">
                
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">cancel</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default DeleteAlertPortal