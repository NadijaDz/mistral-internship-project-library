import React from 'react'
import _ from 'lodash'

function PublisherItem(props) {
    return (
       
             <tbody>    
          {props.publishers.map((publisher) => (

            <tr key={publisher.id}>

              <td>{publisher.id}</td>
              <td>{publisher.name}</td>
              <td>{publisher.country}</td>



              <td><button>Edit</button> <button>Delete</button></td>
             
              </tr>
  ))}     
          </tbody>
     
    )
}

export default PublisherItem
