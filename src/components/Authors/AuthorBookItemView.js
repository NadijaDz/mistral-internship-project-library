import React from "react";
import { Button, Container, Modal } from "react-bootstrap";

const AuthorBookItemView = ({ bookForView, onCloseBookView }) => {
  return (
    <>
      <Modal show={true} onHide={onCloseBookView}>
        <Modal.Header closeButton className="modal-custom-header">
          <Modal.Title>About {bookForView.book.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
          <div class="row">
               <div class="com-sm-12 div-img-view">
               <img className="imgBookForView" src={bookForView.book.image} />
              <div className="div-separator">
                <div class="left-side-separator">
                  <p className="p-pages">{bookForView.book.pages} pages</p>
                </div>
                <div class="right-side-separator">
                  <p className="p-price">{bookForView.book.price} KM</p>
                </div>
              </div>
               </div>
               <div class="com-sm-12 div-description-book">
               <p>{bookForView.book.description}</p>
               </div>
           </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseBookView}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AuthorBookItemView;
