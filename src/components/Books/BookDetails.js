import React,{ useState, useEffect,useRef} from 'react'
import { Button, Modal  } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import {getAll,update} from '../../services/BooksService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import  './Books.css'
import AddAuthorsTable from './AddAuthorsTable';



const BookDetails = ({ show,handleClose,bookOnEdit}) => {

    const [publishers, setPublishers] = useState([]);

    const[message,setStateMess]=useState()

    const [imageFile, setImgState] = useState()


   
    const [imagePreview, setImgPreview] = useState()

    const [authors, setAuthors] = useState([]);
    const [authorsForSave, setAuthorsForSave] = useState([]);

    const refreshedStateBook = useRef(imagePreview);
    useEffect(() => {
      setImgPreview(bookOnEdit?.book?.image)
      console.log(bookOnEdit?.book?.images)
      refreshedStateBook.current = imagePreview;
    }, [imagePreview]);

  

   const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
             setImgPreview({path: reader.result})
          }
        }
        reader.readAsDataURL(e.target.files[0])
        setImgState(e.target.files[0])

      };
     


    useEffect(() => {

    

        getAll('/Publishers').then((response) => {
        try {
            setPublishers(response.data);
          
        } catch {
          
          toast.error('Sorry, something went wrong!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
          
            });

        }
      });


      
    }, []);


    useEffect(() => {

            setImgPreview({path: bookOnEdit?.book?.image})

      getAll('/Authors').then((response) => {
      try {
          setAuthors(response.data);
        
      } catch {
        
        toast.error('Sorry, something went wrong!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        
          });

      }
    });
  }, []);

  const handleAuthorsOnSubmit=(newAuthor)=>{
  
    setAuthorsForSave((prevState) => ({
      ...prevState,newAuthor,
    }));

  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
  
        <Formik
          initialValues={{
            title:bookOnEdit?.book?.title ,
            description: bookOnEdit?.book?.description,
            pages: bookOnEdit?.book?.pages,
            price: bookOnEdit?.book?.price,
            publisher_Id: bookOnEdit?.book?.publisher_Id,
            authors: authors,
            imageFile: bookOnEdit?.book?.image,
            // title: "",
            // description: "",
            // pages: "",
            // price: "",
            // publisher_Id: "",
            // authors: [],
            // imageFile: "",
          }}

          validationSchema={Yup.object().shape({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
            //   email: Yup.string()
            //     .email("Email is invalid")
            //     .required("Email is required"),
            pages: Yup.string().required("Pages is required"),
            price: Yup.string().required("Price is required"),
            publisher_Id: Yup.string()
              .required("Publisher is required")
               .nullable(),
             authors: Yup.string().required("Authors is required").nullable(),
             
          })}
          onSubmit={(fields, { resetForm }) => {

            console.log("save")
          
            const formData = new FormData();

            const listAuthorsForSave=authorsForSave?.newAuthor.map((a)=>a.id);

            // formData.append("authors",(authorsForSave?.newAuthor.map((a)=>a.id)));
            listAuthorsForSave.forEach((item)=>{formData.append('authors[]',item)})
            formData.append("id", bookOnEdit?.book?.id);
            formData.append("imageFile", imageFile);
            formData.append("title", fields.title);
            formData.append("description", fields.description);
            formData.append("pages", fields.pages);
            formData.append("price", fields.price);
            formData.append("publisher_Id", fields.publisher_Id);

            update("/Books" ,bookOnEdit?.book?.id, formData,).then((res) => {
              try {
                toast.success("Data is successfully saved!", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: true,
                });
                handleClose(true);
              } catch {
                toast.error("Sorry, something went wrong!", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: true,
                });
              }
            }, []);
          }}
          render={({ errors, status, touched }) => (
            <Form>
              <Modal.Header closeButton className="modal-custom-header">
                <Modal.Title>Edit book</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Field
                    name="title"
                    type="text"
                    className={
                      "form-control" +
                      (errors.title && touched.title ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field
                    name="description"
                    type="text"
                    className={
                      "form-control" +
                      (errors.description && touched.description
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pages">Pages</label>
                  <Field
                    name="pages"
                    type="text"
                    className={
                      "form-control" +
                      (errors.pages && touched.pages ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="pages"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <Field
                    name="price"
                    type="text"
                    className={
                      "form-control" +
                      (errors.price && touched.price ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="publisher_Id">Publisher</label>
                  <Field
                    as="select"
                    name="publisher_Id"
                    type="text"
                    className={
                      "form-control" +
                      (errors.publisher_Id && touched.publisher_Id
                        ? " is-invalid"
                        : "")
                    }
                  >
                    <option value={""}>Select Publisher</option>
                    {publishers.map((p) => (
                      <option value={p.id} key={p.id}>
                        {" "}
                        {p.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="publisher"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

    
                <div className="form-group">
                  <div className="img-holder">
                    <img
                       src={imagePreview?.path}
                    //   src='https://adminassets.devops.arabiaweather.com/sites/default/files/field/image/snow-title.jpg'
                      alt=""
                      id="img"
                      className="img"
                    />
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    name="imageFile"
                    id="imageFile"
                    onChange={imageHandler}
                  />
        
                </div>


                <div className="form-group">
                  <AddAuthorsTable name="authors"  handleAuthorsOnSubmit={handleAuthorsOnSubmit}></AddAuthorsTable>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
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

export default BookDetails;