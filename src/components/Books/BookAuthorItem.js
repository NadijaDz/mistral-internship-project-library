import React,{useState} from 'react'
import BookAuthorItemView from './BookAuthorItemView';

function BookAuthorItem({authorsOnBook}) {
  const [showAuthorView, setShowAuthorView] = useState(false);
  const [authorForView, setAuthorForView] = useState(false);
  const authorsOnBookArray = Object.values(authorsOnBook);

  const handleViewAuthor=(author)=>{
    setShowAuthorView(true);
    setAuthorForView(author);
  }
  
  return (
    <tbody>
        {authorsOnBookArray.map((author) => (
        <tr key={author.id}>
          <td>{author.name}</td>
          <td className="btn-end">
            <button className="btn-view" type="button" onClick={() => handleViewAuthor({ author })}><i className="fa fa-eye icon-eye"></i>View</button>
          </td>
        </tr>
      ))}  
   {showAuthorView && <BookAuthorItemView authorForView={authorForView} onCloseAuthorView={()=>setShowAuthorView(false)} />} 
    </tbody>
  );
}

export default BookAuthorItem
