import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addAuthor } from "../../services/AuthorsService";
import "./Authors.css";
import AuthorBooksTable from "./AuthorBooksTable";

const AddAuthor = ({ onClose }) => {
  const [books, setBooks] = useState([]);
  const [booksForSave, setBooksForSave] = useState([]);
  const [baseImage, setBaseImage] = useState("");
  const [imagePreview, setImgPreview] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  const handleBooksOnSubmit = (newBook) => {
    setBooksForSave((prevState) => ({
      ...prevState,
      newBook,
    }));
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    setImgPreview(base64);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
 
  const onSubmit=(values)=>{
     
    values.image = baseImage;
    if(booksForSave.length!=0){
      const listBooksForSave = booksForSave?.newBook.map(
        (a) => a.id
      );
      listBooksForSave.forEach((item) => {
        values.books.push(item);
      });
    }

    addAuthor("/Authors", values).then((res) => {
      try {
        toast.success("Data is successfully saved!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });
        onClose(true);
      } catch {
        toast.error("Sorry, something went wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });
      }
    }, []);
  }

  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Formik
          initialValues={{
            name: "",
            biography: "",
            birthday: "",
            email: "",
            books: [],
            image: "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name is required"),
            biography: Yup.string().required("Biography is required"),
            birthday: Yup.string().required("Birthday is required"),
            email: Yup.string()
              .email("Email is invalid")
              .required("Email is required"),
          })}
          onSubmit={(values) => {
             onSubmit(values);
          }}
          render={({ errors, touched }) => (
            <Form>
              <Modal.Header closeButton className="modal-custom-header">
                <Modal.Title>Add new author</Modal.Title>
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
                    <img src={imagePreview} alt="" id="image" className="img" />
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="image"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                  />
                </div>

                <div className="form-group">
                  <AuthorBooksTable
                    name="books"
                    handleBooksOnSubmit={handleBooksOnSubmit}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
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

export default AddAuthor;
