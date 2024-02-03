
import React from 'react'
import { MdDelete } from 'react-icons/md'
import { deleteBook } from '@/app/lib/actions'


const DeleteAlertPortal = ({id}: {id:string}) => {
  return (
    <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>
            <MdDelete size={20} />
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Delete!</h3>
            <p className="py-4">Are you sure you want to delete book from store?</p>
            <div className="modal-action">
            
            {/* <DeleteBookBtn id= {id}/> */}
            <form action={deleteBook}>
                <input name='id' value={id} hidden = {true}/>
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
  )
}

export default DeleteAlertPortal