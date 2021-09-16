import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import "./Books.css";
import CardPreview from "../ui/CardPreview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookAuthorsModal from "./BookAuthorsModal";
import BookAuthorItem from "./BookAuthorItem";
import { getAllAuthors } from "../../services/AuthorsService";

function BookAuthorsTable({
  authorsInTable,
  handleAuthorsOnSubmit,
  authorsByBook,
}) {
  const [show, setShow] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [allAuthors, setAllAuthors] = useState([]);
  const [authorsOnBook, setAuthorsOnBook] = useState([]);
  const refreshedStateAuthors = useRef(authorsOnBook);
  const refreshedStateAuthorsOnEdit = useRef(authorsByBook);

  useEffect(() => {
    getAuthors();
    refreshedStateAuthors.current = authorsOnBook;
    refreshedStateAuthorsOnEdit.current = authorsByBook;
    if (authorsByBook != refreshedStateAuthors.current) {
      setAuthorsOnBook(refreshedStateAuthors.current);
    }
  }, [authorsOnBook]);

  useEffect(() => {
    if (authorsByBook) {
      setAuthorsOnBook(authorsByBook);
    }
  }, [authorsByBook]);

  const getAuthors = () => {
    getAllAuthors().then((response) => {
      try {
        setAllAuthors(response.data);
      } catch {
        toast.error("Sorry, something went wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });
      }
    });
  };

  const handleClose = (t) => {
    setShow(false);
    if (t == true) {
      setRefreshKey((oldKey) => oldKey + 1);
      handleAuthorsOnSubmit(Object.values(refreshedStateAuthors.current));
    }
  };

  const handleAutorSelect = (newAuthor) => {
    setAuthorsOnBook((prevState) => ({
      ...prevState,
      ...newAuthor,
    }));
  };

  return (
    <div>
      <ToastContainer />
      <CardPreview>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Authors</th>
              <th className="btn-end">
                <button
                  className="btn-add"
                  type="button"
                  onClick={() => setShow(true)}
                >
                  <i className="fa fa-plus icon-add">Add New</i>
                </button>
              </th>
            </tr>
          </thead>
          <BookAuthorItem authorsOnBook={authorsOnBook} />
        </Table>
      </CardPreview>
      {show && (
        <BookAuthorsModal
          handleClose={handleClose}
          allAuthors={allAuthors}
          authorsForEdit={authorsOnBook}
          onAuthorSelect={handleAutorSelect}
        />
      )}
    </div>
  );
}
export default BookAuthorsTable;
