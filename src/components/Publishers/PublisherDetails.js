import React,{ useState, useEffect,useRef} from 'react'
import { Button, Modal  } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {updatePublisher} from '../../services/PublishersService'
import  './Publisher.css'

const PublisherDetails = ({handleClose,publisherEdit}) => {

  const onSubmit=(values)=>{
    updatePublisher(publisherEdit.publisher.id, values).then((res) => {
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
            name: publisherEdit.publisher.name,
            road: publisherEdit.publisher.road,
            zipCode: publisherEdit.publisher.zipCode,
            city: publisherEdit.publisher.city,
            country: publisherEdit.publisher.country,
            address_Id:publisherEdit.publisher.address_Id,
            isDeleted:publisherEdit.publisher.isDeleted
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
          render={({field, errors, status, touched }) => (
            <Form>
              <Modal.Header closeButton className="modal-custom-header">
                <Modal.Title>Edit publisher</Modal.Title>
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

export default PublisherDetails;