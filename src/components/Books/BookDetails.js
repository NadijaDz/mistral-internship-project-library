import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateBook } from "../../services/BooksService";
import { getAuthorById } from "../../services/AuthorsService";
import { getAllPublishers } from "../../services/PublishersService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Books.css";
import BookAuthorsTable from "./BookAuthorsTable";

const BookDetails = ({ handleClose, bookForEdit }) => {
  const [publishers, setPublishers] = useState([]);
  const [authorsByBook, setAuthorsByBook] = useState([]);
  const [authorsForSave, setAuthorsForSave] = useState([]);
  const [baseImage, setBaseImage] = useState("");
  const [imagePreview, setImgPreview] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  useEffect(() => {
    getPublishers();
    getAllAuthorsOnBook();
    if (bookForEdit.book.image) {
      setImgPreview(bookForEdit.book.image);
    }
    
  }, []);

  const getPublishers = () => {
    getAllPublishers().then((response) => {
      try {
        setPublishers(response.data);
      } catch {
        toast.error("Sorry, something went wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });
      }
    });
  };

  const getAllAuthorsOnBook = () => {
    getAuthorById(bookForEdit.book.id).then((response) => {
      try {
        setAuthorsByBook(response.data);
      } catch {
        toast.error("Sorry, something went wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });
      }
    });
  };

  const handleAuthorsOnSubmit = (newAuthor) => {
    setAuthorsForSave((prevState) => ({
      ...prevState,newAuthor,
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

    values.image = imagePreview;
    if (authorsForSave.length != 0) {
      const listAuthorsForSave = authorsForSave.newAuthor.map((a) => a.id);
      listAuthorsForSave.forEach((item) => {
        values.authors.push(item);
      });
    }

    updateBook(bookForEdit.book.id, values).then((res) => {
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
    });
  }
 
  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Formik
          initialValues={{
            title: bookForEdit.book.title,
            description: bookForEdit.book?.description,
            pages: bookForEdit.book.pages,
            price: bookForEdit.book.price,
            publisher_Id: bookForEdit.book.publisher_Id,
            authors: authorsByBook,
            image: bookForEdit.book.image,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
            pages: Yup.string().required("Pages is required"),
            price: Yup.string().required("Price is required"),
            publisher_Id: Yup.string()
              .required("Publisher is required")
              .nullable(),
            //  authors: Yup.string().required("Authors is required").nullable(),
          })}
          onSubmit={(values) => {
            onSubmit(values);
          }}
          render={({ errors, status, touched }) => (
            <div className="form-group">
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
                      onChange={(e) => {
                        uploadImage(e);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <BookAuthorsTable
                      name="authors"
                      handleAuthorsOnSubmit={handleAuthorsOnSubmit}
                      authorsByBook={authorsByBook}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </Modal.Footer>
              </Form>
            </div>
          )}
        />
      </Modal>
    </>
  );
};
export default BookDetails;
