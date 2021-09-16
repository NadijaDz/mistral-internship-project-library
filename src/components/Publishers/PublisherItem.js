import React, { useState, useEffect } from "react";
import PublisherDetails from "./PublisherDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../ConfirmationModal";
import { deletePublisher } from "../../services/PublishersService";

function PublisherItem({publishers,onChange}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [publisherEdit, setPublisherEdit] = useState();
  const [publisherOnDelete, setPublisherDelete] = useState();

  const handleEdit = (publisher) => {
    setShowEdit(true);
    setPublisherEdit(publisher);
  };

  const handleDelete = (publisher) => {
    setShowDelete(true);
    setPublisherDelete(publisher);
  };

  const onPublisherItemDelete = () => {
    onDeletePublisher();
  };

  const onEditPublisherModalClose = (data) => {
    setShowEdit(false);
    if (data===true) {
      onChange();
    }
  };
  
  const onDeletePublisher = () => {
    deletePublisher(publisherOnDelete.publisher.id).then(() => {
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
    }, []);
  };

  return (
    <tbody>
      {publishers.map((publisher) => (
        <tr key={publisher.id}>
          <td>{publisher.id}</td>
          <td>{publisher.name}</td>
          <td>{publisher.country}</td>
          <td className="btn-end">
            <button className="btn-edit" onClick={() => handleEdit({ publisher })}><i className="fa fa-edit icon-edit-delete"></i></button>
            <button className="btn-delete" onClick={() => handleDelete({ publisher })}><i className="fa fa-trash icon-edit-delete"></i></button>
          </td>
        </tr>
      ))}

      {showEdit && (
        <PublisherDetails
          handleClose={(data) => onEditPublisherModalClose(data)}
          publisherEdit={publisherEdit}
        />
      )}
      {showDelete && (
        <ConfirmationModal
          onClose={() => setShowDelete(false)}
          onConfirm={onPublisherItemDelete}
        />
      )}
    </tbody>
  );
}

export default PublisherItem;
