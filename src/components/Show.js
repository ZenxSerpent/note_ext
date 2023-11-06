import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencil, faTrash, faX} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
export default function Show(props) {
  const navigate=useNavigate()
  const [tgl,setTgl]=useState(true)
  return (
    <div className='prevbox '>
            <h4 className='flex-center'>{props.title}</h4>
            <p>{props.description}</p>
            <h3 className='panel flex-center absolute '>
                <FontAwesomeIcon icon={faPencil} className='pointer' onClick={()=>navigate(`/edit?title=${props.title}`)}/>
                <FontAwesomeIcon icon={faTrash} className='pointer' onClick={()=>{localStorage.removeItem(props.title);setTgl(!tgl);props.del(tgl)}}/>
            </h3>
        </div>
  )
}
