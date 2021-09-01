import React, { useState, useEffect } from "react";
import axios from "axios";
import BookItem from "./BookItem";
import {Table} from 'react-bootstrap'
import  './Books.css'
import CardPreview from '../ui/CardPreview'
import {getAll} from '../../services/BooksService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddBook from "./AddBook";




function Books() {

  const [book, setBooks] = useState([]);

  const [show, setShow] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  const handleShow = () => setShow(true);
  const handleClose = (t) => {setShow(false)
    if(t==true){
      setRefreshKey(oldKey => oldKey +1)
    
    }
  };
  

  useEffect(() => {
    getAll('/Books').then((response) => {
      try {
        setBooks(response.data);
       
      } catch {
        
        toast.error('Sorry, something went wrong!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        
          });
        
      }
    });
  }, [refreshKey]);

  


  return (
    <div>
        <ToastContainer />
      <CardPreview>
        <div className="header-style">
          <h1 className="titleOfTable">Books</h1>
          <button className='btn-search'>Search</button>
        </div>
        

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Pages</th>
              <th>Price</th>
              <th><button onClick={()=>handleShow(true)} >Add</button></th>
            </tr>
          </thead>
          <BookItem books={book}></BookItem>
        </Table>
      </CardPreview>
      <AddBook show={show} handleClose={handleClose}  ></AddBook>
  


    </div>
  );
}

export default Books;
