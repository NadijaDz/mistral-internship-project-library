import React,{ useState, useEffect,useRef} from 'react'
import { Button, Modal  } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getBookById, getAllBooks} from "../../services/BooksService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {updateAuthor} from '../../services/AuthorsService'
import  './Authors.css'
import AuthorBooksTable from './AuthorBooksTable';
import Moment from 'moment';

const AuthorDetails = ({onCloseEdit,authorOnEdit}) => {
    const [booksOfAuthor, setBooksOfAuthor] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [booksForSave, setBooksForSave] = useState([]);
    const [baseImage, setBaseImage] = useState("")
    const [imagePreview, setImgPreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')
    const refreshedStateBook = useRef(booksForSave);

    useEffect(() => {
      getBooks();
      getAllBooksOfAuthor();
      if(authorOnEdit.author.image){
        setImgPreview(authorOnEdit.author.image)
      }
    }, []);
    useEffect(() => {
      refreshedStateBook.current = Object.values(booksForSave);
      setBooksForSave(booksOfAuthor);
    }, [booksForSave, booksOfAuthor]);

    const getBooks=()=>{
      getAllBooks().then(
        (response) => {
          try {
            setAllBooks(response.data);
          } catch {
            toast.error("Sorry, something went wrong!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
            });
          }
        }
      );
    }

    const getAllBooksOfAuthor = () => {
      getBookById(authorOnEdit.author.id).then((response) => {
        try {
          setBooksOfAuthor(response.data);
        } catch {
          toast.error("Sorry, something went wrong!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
          });
        }
      });
    };
  
    const handleBooksOnSubmit = (newBook) => {
      setBooksForSave((prevState) => ({
        ...prevState,
        ...newBook,
      }));
    };

const uploadImage=async(e)=>{
  const file=e.target.files[0];
  const base64= await convertBase64(file);
  setBaseImage(base64);
  setImgPreview(base64);
}

const convertBase64=(file)=>{
   return new Promise((resolve,reject)=>{
     const fileReader=new FileReader();
     fileReader.readAsDataURL(file);
     fileReader.onload=()=>{
       resolve(fileReader.result)
     }
     fileReader.onerror=(error)=>{
       reject(error);
     }
   })
}

const onSubmit=(values)=>{
  values.image=imagePreview;

  if(booksForSave.length!=0){
   const listBooksForSave = booksForSave.map(
     (a) => a.id
   );
   listBooksForSave.forEach((item) => {
     values.books.push(item);
   });
 }

  updateAuthor(authorOnEdit.author.id,values).then((res) => {
     try {
       toast.success("Data is successfully saved!", {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: true,
       });
       onCloseEdit(true);
     } catch {
       toast.error("Sorry, something went wrong!", {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: true,
       });
     }
   });
}

  return (
    <>
      <Modal show={true} onHide={onCloseEdit}>
        <Formik
          initialValues={{
            name: authorOnEdit.author.name,
            biography: authorOnEdit.author.biography,
            birthday: Moment(authorOnEdit.author.birthday,'YYYY-MM-DD').format('YYYY-MM-DD'),
            email:  authorOnEdit.author.email,
            books: booksOfAuthor,
            image:  authorOnEdit.author.image,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name is required"),
            biography: Yup.string().required("Biography is required"),
            birthday: Yup.string().required("Birthday is required"),
            email: Yup.string().email("Email is invalid").required("Email is required"),
          })}
          onSubmit={(values) => {
              onSubmit(values);
          }}
          render={({ errors, status, touched }) => (
            <Form>
              <Modal.Header closeButton className="modal-custom-header">
                <Modal.Title>Edit author</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field
                    name="name"
                    type="text"
                    className={
                      "form-control" +
                      (errors.name && touched.name ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="biography">Biography</label>
                  <Field
                    as="textarea"
                    name="biography"
                    type="text"
                    className={
                      "form-control" +
                      (errors.biography && touched.biography
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="biography"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthday">DOB</label>
                  <Field
                    name="birthday"
                    type="date"
                    data-date-format="YYYY/MM/DD"
                    className={
                      "form-control" +
                      (errors.birthday && touched.birthday ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="birthday"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <div className="img-holder">
                    <img
                     src={imagePreview}
                      alt=""
                      id="image"
                      className="img"
                    />
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="image"
                    onChange={(e)=>{uploadImage(e)}}
                  />
                </div>
                
             <div className="form-group">
              <AuthorBooksTable name="books" handleBooksOnSubmit={handleBooksOnSubmit} booksOfAuthor={booksOfAuthor}/>
           </div> 

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onCloseEdit}>
                  Close
                </Button>
                <Button type="submit">Save Changes</Button>
              </Modal.Footer>
            </Form>
          )}
        />
           
      </Modal>
    </>
  );
};

export default AuthorDetails;