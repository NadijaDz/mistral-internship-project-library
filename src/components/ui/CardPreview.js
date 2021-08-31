import React from 'react'
import  './CardPreview.css'

function CardPreview(props) {
    return (
        <div className='card-style'>
             {props.children}
        </div>
    )
}

export default CardPreview
