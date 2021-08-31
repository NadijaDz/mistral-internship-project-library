import React from 'react'

function AddAuthorItem(authorsOnBook) {

  return (
    <tbody>
        {authorsOnBook?.authorsOnBook?.newAuthor?.map((author) => (
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

export default AddAuthorItem
