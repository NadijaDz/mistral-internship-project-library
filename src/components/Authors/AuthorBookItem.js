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
          <td>
          <button type="button" onClick={() => handleViewBook({ book })}>View</button>
          </td>
        </tr>
      ))}  
       {showBookView && <AuthorBookItemView bookForView={bookForView} onCloseBookView={()=>setShowBookView(false)} />} 
    </tbody>
  );
}

export default AuthorBookItem
