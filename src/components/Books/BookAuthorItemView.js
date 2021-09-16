import React from "react";
import { Button, Container, Modal } from "react-bootstrap";
import Moment from "moment";

const BookAuthorItemView = ({ authorForView, onCloseAuthorView }) => {
  return (
    <>
      <Modal show={true} onHide={onCloseAuthorView}>
        <Modal.Header closeButton className="modal-custom-header">
          <Modal.Title>About  {authorForView.author.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Container>

          <div className="div-img-view"><img  className="imgAuthorForView" src={authorForView.author.image} /></div>

          <div className="div-description-author">
          <p>{authorForView.author.name}</p>
          <p>{authorForView.author.biography}</p>
          <p>{Moment(authorForView.author.birthday).format('DD/MM/YYYY')}</p>
          <p className="emailOfAuthor">   <i className="fa fa-envelope email-icon"> </i>{authorForView.author.email} </p>
     
          </div>
          </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseAuthorView}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookAuthorItemView;
