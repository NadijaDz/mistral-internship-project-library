import React from 'react'

function AuthorItem({authorsOnBook}) {

  const authorsOnBookArray = Object.values(authorsOnBook);
  
  return (
    <tbody>
        {authorsOnBookArray.map((author) => (
        <tr key={author.id}>
          <td>{author.name}</td>
          <td>
            <button>View</button>
          </td>
        </tr>
      ))}  
    </tbody>
  );
}

export default AuthorItem
