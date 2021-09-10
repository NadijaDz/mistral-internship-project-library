import React from 'react'
import { Button, Modal  } from "react-bootstrap";

const ConfirmationModal = ({onClose, onConfirm}) => {

  return (
    <>
      <Modal show={true} onHide={onClose}>
              <Modal.Header closeButton className="modal-custom-header">
                <Modal.Title>Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                 <label>Are you sure  you want to delete?</label>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
                <Button  variant="danger" onClick={onConfirm}>Delete</Button>
              </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmationModal;