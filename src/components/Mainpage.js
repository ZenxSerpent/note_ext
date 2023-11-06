import React, { useEffect, useState } from 'react'
import Show from './Show'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import img from './logo.gif'
import ytlogo from './ytlogo.png'
export default function Mainpage() {
  const navigate=useNavigate()
  const [data,setData]=useState({})
  const [rem,setrem]=useState()
  useEffect(()=>{
    if (localStorage.length==0){
      localStorage.setItem('Hey','welcome to notes app')
    }
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      var state={...state,[key]:value}
    }
    setData(state)  
  },[rem])
  useEffect(()=>{
    if (localStorage.length==0){
      localStorage.setItem('Hey','welcome to notes app')
    }
  })
  const del=(bool)=>{
    setrem(bool)
  }
  return (
    <div className='main' style={{height:'100vh'}}>
      <span className='header flex spb'>
        <img src={img} height='85px'/>
        <div style={{textAlign:'center',padding:"0px 5px"}}>
        <h6 style={{margin:'3px 3px'}}>Supported apps</h6>
        <img src={ytlogo} height='40px' ></img>
        </div>
        </span>
      
      <div className='prevmenu flex'>
        {
          Object.keys(data).map((item)=><Show title={item} description={data[item]} del={del}/>)
        }
        
      </div>
      <div className='addicon pointer flex-center sticky' onClick={()=>navigate('/edit?title=title')}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  )
}
