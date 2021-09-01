import React,{ useState, useEffect,useRef} from 'react'
import { Button, Modal  } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import {getAll} from '../../services/BooksService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addNew} from '../../services/BooksService'
import  './Books.css'
import AddAuthorsTable from './AddAuthorsTable';



const AddBook = ({ show,handleClose}) => {

    const [publishers, setPublishers] = useState([]);

    const[message,setStateMess]=useState()


    const [imageFile, setImgState] = useState()

    const [imagePreview, setImgPreview] = useState({
        path:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    })

    const [authors, setAuthors] = useState([]);

 
    
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
    setAuthors((prevState) => ({
      ...prevState,...newAuthor,
    }));
  
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Formik
          initialValues={{
            title: "",
            description: "",
            pages: "",
            price: "",
            publisher_Id: "",
            authors: [],
            imageFile: "",
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
            // authors: Yup.string().required("Authors is required"),
          })}
          onSubmit={(fields, { resetForm }) => {
       
            addNew("/Publishers", formData).then((res) => {
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
                <Modal.Title>Modal heading</Modal.Title>
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

                {/* <div className="form-group">
                  <label htmlFor="articleType">Publisher</label>

                  <Select
                    name="publisher"
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    options={publishers}
                  />

                  <ErrorMessage
                    name="publisher"
                    component="div"
                    className="invalid-feedback"
                  />
                </div> */}

                <div className="form-group">
                  <label htmlFor="authors">Authors</label>
                  <Field
                    name="authors"
                    type="text"
                    className={
                      "form-control" +
                      (errors.authors && touched.authors ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="authors"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <div className="img-holder">
                    <img
                      src={imagePreview?.path}
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
                  {/* <div className="label">
           <label className="image-upload" htmlFor="input">
					
						Choose your Photo
					</label> 
          </div>  */}
                </div>



                <div className="form-group">
                  <AddAuthorsTable authorsInTable={authors} onSubmit={handleAuthorsOnSubmit}></AddAuthorsTable>
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

export default AddBook;