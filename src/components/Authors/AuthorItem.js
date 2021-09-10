import React,{useState,useRef,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
import ConfirmationModal from '../ConfirmationModal'
import {deleteAuthor} from '../../services/AuthorsService'
import AuthorDetails from './AuthorDetails';

function AuthorItem({authors,onChange}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [authorOnEdit, setAuthorOnEdit] = useState();
  const [authorOnDelete,setAuthorOnDelete] = useState();
  const refreshedStateAuthor = useRef(authorOnEdit);
  const refreshedStateAuthorForDelete = useRef(authorOnDelete);
  
  useEffect(() => {
    refreshedStateAuthor.current = authorOnEdit;
  }, [authorOnEdit]);

  useEffect(() => {
    refreshedStateAuthorForDelete.current = authorOnDelete;
  }, [authorOnDelete]);


  const handleEdit=(author)=>{
    setShowEdit(true) 
    setAuthorOnEdit(author)
  }

  const handleDelete=(author)=>{
    setShowDelete(true) 
     setAuthorOnDelete(author)
   
  }
  const onDeleteAuthor=()=>{
    deleteAuthor(authorOnDelete.authors.id).then(() => {
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
  }
  
  const onAuthorItemDelete=()=>{
    onDeleteAuthor();
  }

  const onEditAuthorModalClose = (data) => {
    setShowEdit(false);
    if (data===true) {
      onChange();
    }
  };
  
    return (
      <tbody>
        {authors.map((author) => (
          <tr key={author.id}>
            <td>{author.id}</td>
            <td><img
                     src={author.image}
                      alt=""
                      id="image"
                      className="imgAuthor"
                    /></td>
            <td>{author.name}</td>
            <td>{Moment(author.birthday).format('DD/MM/YYYY')}</td>
            <td>{author.email}</td>
            <td>
              <button  onClick={()=>handleEdit({author})} >Edit</button>
              <button  onClick={()=>handleDelete({author})}>Delete</button>
            
            </td>
          </tr>
        ))}

     {showEdit && <AuthorDetails  onCloseEdit={(data) => onEditAuthorModalClose(data)} authorOnEdit={authorOnEdit} />}
     {showDelete && <ConfirmationModal  onClose={()=>setShowDelete(false)}  onConfirm={onAuthorItemDelete}/>}

       
      </tbody>
       
    );
}

export default AuthorItem
