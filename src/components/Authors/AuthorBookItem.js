import React, {useState} from 'react';
import AuthorBookItemView from './AuthorBookItemView';


function AuthorBookItem({authorsOnBook}) {
  const [showBookView, setShowBookView] = useState(false);
  const [bookForView, setBookForView] = useState(false);
  const authorsOnBookArray = Object.values(authorsOnBook);

  const handleViewBook=(book)=>{
    setShowBookView(true);
    setBookForView(book);
  }
  
  return (
    <tbody>
        {authorsOnBookArray.map((book) => (
        <tr key={book.id}>
          <td>{book.title}</td>
          <td className="btn-end">
          <button className="btn-view" type="button" onClick={() => handleViewBook({ book })}><i className="fa fa-eye icon-eye"></i>View</button>
          </td>
        </tr>
      ))}  
       {showBookView && <AuthorBookItemView bookForView={bookForView} onCloseBookView={()=>setShowBookView(false)} />} 
    </tbody>
  );
}

export default AuthorBookItem
