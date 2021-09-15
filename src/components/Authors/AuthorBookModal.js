import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Authors.css";
import Multiselect from "multiselect-react-dropdown";

const AuthorBookModal = ({onCloseAuhorsBookModal, allBooks, onBookSelect, booksOnAuthorForEdit}) => {

  const [selectedValue, setSelectedValue] = useState([]);
  const onSelect = (selectedList, selectedItem) => {
    setSelectedValue(selectedList);
  };

  const refreshedStateBook = useRef([booksOnAuthorForEdit]);
  useEffect(() => {
    refreshedStateBook.current = booksOnAuthorForEdit;
    setSelectedValue(refreshedStateBook.current);
  }, [booksOnAuthorForEdit]);

  return (
    <>
      <Modal show={true} onHide={onCloseAuhorsBookModal}>
        <Formik
          initialValues={{
            books: [],
          }}
          validationSchema={Yup.object().shape({
            // authors: Yup.string().required("Authors is required").nullable(),
            //  authors:Yup.array()
            //    .min(1,"min 1").of(Yup.object().shape({
            //    selectedValues:Yup.string().required()
            //  }))
          })}
          onSubmit={() => {
            onBookSelect(selectedValue);
            onCloseAuhorsBookModal(true);
          }}
          render={({ errors, status, touched }) => (
            <Form>
              <Modal.Header closeButton className="modal-custom-header">
                <Modal.Title>Select books for author</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Multiselect
                  name="books"
                  options={allBooks} // Options to display in the dropdown
                  selectedValues={selectedValue} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  // Function will trigger on remove event
                  displayValue="title" // Property name to display in the dropdown options
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onCloseAuhorsBookModal}>
                  Close
                </Button>
                <Button type="submit">Save </Button>
              </Modal.Footer>
            </Form>
          )}
        />
      </Modal>
    </>
  );
};

export default AuthorBookModal;
