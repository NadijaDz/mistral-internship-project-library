import React, { useState, useRef, useEffect } from "react";
import BookDetails from "./BookDetails";
import ConfirmationModal from "../ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteBook, getBooksByFilters } from "../../services/BooksService";

function BookItem({books, onChange}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [bookForEdit, setBookForEdit] = useState();
  const [bookForDelete, setBookForDelete] = useState();
  const refreshedStateBook = useRef(bookForEdit);
  const refreshedStateBookForDelete = useRef(bookForDelete);

  useEffect(() => {
    refreshedStateBook.current = bookForEdit;
  }, [bookForEdit]);

  useEffect(() => {
    refreshedStateBookForDelete.current = bookForDelete;
  }, [bookForDelete]);

  const handleEdit = (book) => {
    setShowEdit(true);
    setBookForEdit(book);
  };

  const handleDelete = (book) => {
    setShowDelete(true);
    setBookForDelete(book);
  };

  const onDeleteBook = () => {
    deleteBook(bookForDelete.book.id).then(() => {
      try {
        toast.success("Data is successfully deleted!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });
        setShowDelete(false)
        onChange();
      } catch {
        toast.error("Sorry, something went wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });
      }
    });
  };

  const onBookItemDelete=()=>{
    onDeleteBook();
  }
  const onEditBookModalClose = (data) => {
    setShowEdit(false);
    if (data===true) {
      onChange();
    }
  };

  return (
    <tbody>
      {books.map((book) => (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.pages}</td>
          <td>{book.price}</td>
          <td className="btn-end">
            <button className="btn-edit" onClick={() => handleEdit({ book })}><i className="fa fa-edit icon-edit-delete"></i></button>
            <button className="btn-delete" onClick={() => handleDelete({ book })}><i className="fa fa-trash icon-edit-delete"></i></button>
          </td>
        </tr>
      ))}

      {showEdit && (
        <BookDetails
          handleClose={(data) => onEditBookModalClose(data)}
          bookForEdit={bookForEdit}
        />
      )}

      {showDelete && (
        <ConfirmationModal
          onClose={() => setShowDelete(false)}
          onConfirm={onBookItemDelete}
        />
      )}
    </tbody>
  );
}

export default BookItem;
