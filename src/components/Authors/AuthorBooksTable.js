import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import "./Authors.css";
import CardPreview from "../ui/CardPreview";
import { getAllBooks } from "../../services/BooksService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthorBookModal from "./AuthorBookModal";
import AuthorBookItem from "./AuthorBookItem";

function AuthorBooksTable({ handleBooksOnSubmit, booksOfAuthor }) {
  const [show, setShow] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [authorsOnBook, setAuthorsOnBook] = useState([]);
  const refreshedStateBooks = useRef(authorsOnBook);
  const refreshedStateBooksOnEdit = useRef(booksOfAuthor);

  useEffect(() => {
    getBooks();
    refreshedStateBooks.current = authorsOnBook;
    refreshedStateBooksOnEdit.current = booksOfAuthor;
    if (booksOfAuthor != refreshedStateBooks.current) {
      setAuthorsOnBook(refreshedStateBooks.current);
    }
  }, [authorsOnBook]);

  useEffect(() => {
    if (booksOfAuthor) {
      setAuthorsOnBook(booksOfAuthor);
    }
  }, [booksOfAuthor]);

  const getBooks = () => {
    getAllBooks().then((response) => {
      try {
        setAllBooks(response.data);
      } catch {
        toast.error("Sorry, something went wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });
      }
    });
  };

  const handleCloseAuthorsBookModal = (t) => {
    setShow(false);
    if (t == true) {
      setRefreshKey((oldKey) => oldKey + 1);
      handleBooksOnSubmit(Object.values(refreshedStateBooks.current));
    }
  };

  const handleBookSelect = (newBook) => {
    setAuthorsOnBook((prevState) => ({
      ...prevState,
      ...newBook,
    }));
  };

  return (
    <div>
      <ToastContainer />
      <CardPreview>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Books</th>
              <th>
                <button type="button" onClick={() => setShow(true)}>Add</button>
              </th>
            </tr>
          </thead>
          <AuthorBookItem authorsOnBook={authorsOnBook} />
        </Table>
      </CardPreview>
      {show && (
        <AuthorBookModal
          onCloseAuhorsBookModal={handleCloseAuthorsBookModal}
          allBooks={allBooks}
          booksOnAuthorForEdit={authorsOnBook}
          onBookSelect={handleBookSelect}
        />
      )}
    </div>
  );
}

export default AuthorBooksTable;
