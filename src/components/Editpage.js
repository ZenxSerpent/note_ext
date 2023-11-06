import { faBroom, faCopy, faDownload, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubtitles } from 'youtube-captions-scraper';
import getVideoId from 'get-video-id';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Editpage() {
  const navigate=useNavigate()
  const [title,setTitle]=useState(window.location.href.split("?")[1].split("=")[1])
  const [desc,setDesc]=useState(localStorage.getItem(window.location.href.split("?")[1].split("=")[1]))
  const [url,setUrl]=useState()
  const postData=()=>{
    localStorage.removeItem(window.location.href.split('?')[1].split('=')[1])
    localStorage.setItem(title,desc)
    navigate('/')
  }
  const toastErr=(msg,type)=>{
    toast[type](msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style:{
        zIndex:'1',
        right:'-25px',
        width:"300px"
      }
      })
  }
  const capture=(url)=>{
    let data=''
    try {
      getSubtitles({
        videoID: getVideoId(url).id, 
        lang: 'en'
      }).then(caps => {
        for (let i = 0; i < caps.length; i++) {
          data=data+`${caps[i].start.padStart(5,' ')} : ${caps[i].text}\n\n`
        }
        setDesc(desc+data)
      }).catch(()=>toastErr("Invalid url","error"))
    } catch (error) {
      toastErr("Invalid url","error")
    }

  }

  const download=()=>{
    let dt=new Date;
    const blob= new Blob([title+'\n\n'+desc,{type:'text'}])
    const blobURL=window.URL.createObjectURL(blob)
    const elem=document.createElement("a")
    elem.href=blobURL
    elem.download=`${title}_${dt.getTime()}.txt`
    elem.click()
    window.URL.revokeObjectURL(blobURL)
    toastErr("Downloading...","info")
  }
  
  return (
    <div className='main'>
        <div className='editmenu flex-center'>
            <div className='btns copybtn flex-center pointer blackborder btnheights btnstyle' onClick={()=>{navigator.clipboard.writeText(title+'\n\n'+desc);toastErr("Copied to clipboard","success")}}><FontAwesomeIcon icon={faCopy} /></div>
            <div className='btns downloadbtn flex-center pointer blackborder btnheights btnstyle' onClick={download}><FontAwesomeIcon icon={faDownload} /></div>
            <div className='btns downloadbtn flex-center pointer blackborder btnheights btnstyle' onClick={()=>setDesc("")}><FontAwesomeIcon icon={faBroom} /></div>

              <input type='text' placeholder='paste url' className='btns capture' id='cap' onChange={(e)=>setUrl(e.target.value)} value={url}></input>
              <FontAwesomeIcon icon={faMagnifyingGlass} className='mag pointer' onClick={()=>capture(url)}/>
        </div>
        <textarea className='title denseglass' placeholder='title' maxLength={100} value={title} onChange={(e)=>setTitle(e.target.value)}></textarea>
        <textarea className='content denseglass' placeholder='content' value={desc} onChange={(e)=>setDesc(e.target.value)} ></textarea>
        <div className='save capture pointer flex-center sticky' onClick={postData}>save changes</div>
        <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </div>
  )
}
