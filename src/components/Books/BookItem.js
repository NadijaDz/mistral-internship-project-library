import React,{useState,useRef,useEffect} from 'react'
import BookDetails from './BookDetails';


function BookItem(props) {
  
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = (t) => {setShow(false)
    // if(t==true){
    //   setRefreshKey(oldKey => oldKey +1)
    
    // }
  };
  const [bookOnEdit, setBook] = useState();
  
  const refreshedStateBook = useRef(bookOnEdit);
  useEffect(() => {
    refreshedStateBook.current = bookOnEdit;
  }, [bookOnEdit]);


  const handleEdit=(book)=>{

      handleShow(true)
         
      setBook(book)
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
              <button>Delete</button>
            </td>
          </tr>
        ))}
      <BookDetails show={show} handleClose={handleClose} bookOnEdit={bookOnEdit}></BookDetails>

      </tbody>
      
     
      
    );
}

export default BookItem
