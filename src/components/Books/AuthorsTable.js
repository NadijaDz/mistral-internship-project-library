import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import BookItem from "./BookItem";
import {Table} from 'react-bootstrap'
import  './Books.css'
import CardPreview from '../ui/CardPreview'
import {getAll} from '../../services/BooksService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthorsModal from "./AuthorsModal";
import AuthorItem from "./AuthorItem";





function AuthorsTable({authorsInTable,handleAuthorsOnSubmit,authors}) {


  const [show, setShow] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedAuthor, setSelectedAuthor] = useState('');

    
  const [allAuthors, setAllAuthors] = useState([]);

  const [authorsOnBook, setAuthorsOnBook] = useState([]);


  const refreshedStateAuthors = useRef(authorsOnBook);
  const refreshedStateAuthorsOnEdit = useRef(authors);

  useEffect(() => {
   if(authors){
     setAuthorsOnBook(authors)
   }
    refreshedStateAuthors.current = authorsOnBook;
    refreshedStateAuthorsOnEdit.current = authors;

  }, [authorsOnBook,authors]);


  const handleShow = () => setShow(true);
  
  const handleClose = (t) => {setShow(false)
    if(t==true){
      // setRefreshKey(oldKey => oldKey +1)
    // handleAuthorsOnSubmit(refreshedStateAuthors.current.newAuthor)
    handleAuthorsOnSubmit(Object.values(refreshedStateAuthors.current))
    }
  };



  useEffect(() => {


    getAll('/Authors').then((response) => {
    try {
        setAllAuthors(response.data);
      
    } catch {
      
      toast.error('Sorry, something went wrong!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      
        });

    }
  });
  
}, []);



const handleAutorSelect=(newAuthor)=>{

  setAuthorsOnBook((prevState) => ({
    ...prevState, ...newAuthor,
  }));

}


  return (
    <div>
    <ToastContainer />
      <CardPreview>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Authors</th>
              <th><button onClick={()=>handleShow(true)} >Add</button></th>
            </tr>
          </thead>
          <AuthorItem authorsOnBook={authorsOnBook}></AuthorItem> 
        </Table>
      </CardPreview>
      <AuthorsModal show={show} handleClose={handleClose} allAuthors={allAuthors} authors={authorsOnBook} onAuthorSelect={handleAutorSelect} ></AuthorsModal>

    </div>
  )



}

export default AuthorsTable;
