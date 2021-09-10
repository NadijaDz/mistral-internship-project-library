import React,{useState,useRef,useEffect} from 'react'
import BookDetails from './BookDetails';
import BookDeleteModal from './BookDeleteModal'
import {deleteItem} from '../../services/BooksService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BookItem(props) {
  
  const [showEdit, setShow] = useState(false);

  const handleShowEdit = () => setShow(true);
  const handleClose = () => setShow(false);



  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);


  const [bookOnEdit, setBook] = useState();
  const [bookOnDelete,setBookDelete] = useState();


  const refreshedStateBook = useRef(bookOnEdit);
  useEffect(() => {
    refreshedStateBook.current = bookOnEdit;
  }, [bookOnEdit]);


  
  const refreshedStateBookForDelete = useRef(bookOnDelete);
  useEffect(() => {
    refreshedStateBookForDelete.current = bookOnDelete;
  }, [bookOnDelete]);


  const handleEdit=(book)=>{
    handleShowEdit(true) 
    setBook(book)
  }

  const handleDelete=(book)=>{
     handleShowDelete(true) 
     setBookDelete(book)
   
  }
  
    return (
      <tbody>
        {props.books.map((book) => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.pages}</td>
            <td>{book.price}</td>
            <td>
              <button  onClick={()=>handleEdit({book})}>Edit</button>
              <button  onClick={()=>handleDelete({book})}>Delete</button>
            
            </td>
          </tr>
        ))}

       {showEdit && <BookDetails showEdit={showEdit} handleClose={handleClose} bookOnEdit={bookOnEdit}></BookDetails>  }
       {showDelete && <BookDeleteModal showDelete={showDelete} handleCloseDelete={handleCloseDelete} bookOnDelete={bookOnDelete}></BookDeleteModal>  } 

       
      </tbody>
       
    );
}

export default BookItem
