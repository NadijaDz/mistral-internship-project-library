import React,{ useState, useEffect,useRef} from 'react'
import { Button, Modal  } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addPublisher} from '../../services/PublishersService'
import  './Publisher.css'

const AddPublisher = ({onClose}) => {

  const onSubmit=(values)=>{
    addPublisher(values).then((res) => {
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
    });
  }
   
  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Formik
          initialValues={{
            name: "",
            road: "",
            zipCode: "",
            city: "",
            country: "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name is required"),
            road: Yup.string().required("Road is required"),
            zipCode: Yup.string().required("ZIP Code is required"),
            city: Yup.string().required("City is required"),
            country: Yup.string().required("Country is required"),

          })}
          onSubmit={(values) => {
                onSubmit(values);
          }}
          render={({errors,touched }) => (
            <Form>
              <Modal.Header closeButton className="modal-custom-header">
                <Modal.Title>Add new publisher</Modal.Title>
              </Modal.Header>
              <Modal.Body>

              <div className="row">
              <div className="col-sm-6">
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
                  <label htmlFor="road">Road</label>
                  <Field
                    name="road"
                    type="text"
                    className={
                      "form-control" +
                      (errors.road && touched.road
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="road"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code</label>
                  <Field
                    name="zipCode"
                    type="text"
                    className={
                      "form-control" +
                      (errors.zipCode && touched.zipCode
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="zipCode"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
         

              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <Field
                    name="city"
                    type="text"
                    className={
                      "form-control" +
                      (errors.city && touched.city
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <Field
                    name="country"
                    type="text"
                    className={
                      "form-control" +
                      (errors.country && touched.country
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>


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

export default AddPublisher;