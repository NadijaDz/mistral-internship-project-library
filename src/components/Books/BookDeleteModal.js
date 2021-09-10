import React,{ useState, useEffect,useRef} from 'react'
import { Button, Modal  } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import {deleteItem} from '../../services/BooksService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addNew} from '../../services/BooksService'
import  './Books.css'



const BookDeleteModal = ({ showDelete,handleCloseDelete,bookOnDelete}) => {

  return (
    <>
      <Modal show={showDelete} onHide={handleCloseDelete}>
       
        <Formik
          
          onSubmit={() => {

            console.log("delete book")
            console.log(bookOnDelete)
            
            deleteItem("/Books" ,bookOnDelete?.book?.id, bookOnDelete?.book).then((res) => {
                try {
                  toast.success("Data is successfully deleted!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                  });
                  handleCloseDelete(true);
                } catch {
                  toast.error("Sorry, something went wrong!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                  });
                }
              }, []);
              handleCloseDelete(true);
          }}
          render={({}) => (
            <Form>
              <Modal.Header closeButton className="modal-custom-header">
                <Modal.Title>Delete book</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                 <label>Are you sure  you want to delete book?</label>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                  Close
                </Button>
                <Button type="submit" variant="danger">Delete</Button>
              </Modal.Footer>
            </Form>
          )}
        />
      </Modal>
    </>
  );
};

export default BookDeleteModal;