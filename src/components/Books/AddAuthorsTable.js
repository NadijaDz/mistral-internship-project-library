import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import BookItem from "./BookItem";
import {Table} from 'react-bootstrap'
import  './Books.css'
import CardPreview from '../ui/CardPreview'
import {getAll} from '../../services/BooksService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAuthorsModal from "./AddAuthorsModal";
import AddAuthorItem from "./AddAuthorItem";





function AddAuthorsTable({authorsInTable,handleAuthorsOnSubmit}) {

 

  const [show, setShow] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedAuthor, setSelectedAuthor] = useState('');

    
  const [allAuthors, setAllAuthors] = useState([]);

  const [authorsOnBook, setAuthorsOnBook] = useState([]);


  const refreshedStateAuthors = useRef(authorsOnBook);
  useEffect(() => {
    refreshedStateAuthors.current = authorsOnBook;
  }, [authorsOnBook]);


  const handleShow = () => setShow(true);
  
  const handleClose = (t) => {setShow(false)
    if(t==true){
      // setRefreshKey(oldKey => oldKey +1)
    handleAuthorsOnSubmit(refreshedStateAuthors.current.newAuthor)

  

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
    ...prevState,newAuthor,
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
          <AddAuthorItem authorsOnBook={authorsOnBook}></AddAuthorItem> 
        </Table>
      </CardPreview>
      <AddAuthorsModal show={show} handleClose={handleClose} allAuthors={allAuthors} onAuthorSelect={handleAutorSelect} ></AddAuthorsModal>

    </div>
  )



}

export default AddAuthorsTable;
