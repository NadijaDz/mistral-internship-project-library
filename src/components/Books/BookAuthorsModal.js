import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Books.css";
import Multiselect from "multiselect-react-dropdown";

const BookAuthorsModal = ({
  handleClose,
  allAuthors,
  onAuthorSelect,
  authorsForEdit,
}) => {
  const [selectedValue, setSelectedValue] = useState([]);
  const onSelect = (selectedList, selectedItem) => {
    setSelectedValue(selectedList);
  };

  const refreshedStateBook = useRef([authorsForEdit]);
  useEffect(() => {
    refreshedStateBook.current = authorsForEdit;
    setSelectedValue(refreshedStateBook.current);
  }, [authorsForEdit]);

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Formik
          initialValues={{
            authors: [],
          }}
          onSubmit={({ resetForm }) => {
            onAuthorSelect(selectedValue);
            handleClose(true);
          }}
          render={({ errors, status, touched }) => (
            <Form id="form-for-save-authors">
              <Modal.Header closeButton className="modal-custom-header">
                <Modal.Title>Select authors for book</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Multiselect
                  name="authors"
                  options={allAuthors} // Options to display in the dropdown
                  selectedValues={selectedValue} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  displayValue="name" // Property name to display in the dropdown options
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button form="form-for-save-authors" type="submit">
                  Save{" "}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        />
      </Modal>
    </>
  );
};

export default BookAuthorsModal;
