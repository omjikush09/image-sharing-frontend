import React, { useState } from 'react'
import { connect } from 'react-redux';
import "./Detail.scss"
import { useRef } from 'react';
import { addDetail } from '../../action/authAction';
import {updateProfile} from "../../api/userApi"
import { useNavigate } from 'react-router-dom';

const Detail = ({loginUser,addDetail}) => {
  const ref =useRef(null);
    const [values,setValues]=useState({
        username:""
     
    })
    const navigate=useNavigate()
    const {username}=values
    const handleChange=(e)=>{
        if(e.target.name==="profileImage"){
            const image=new FormData();
            image.append("file",e.target.value[0])
            setValues({...values,})
        }else{
            setValues({...values,[e.target.name]:e.target.value})
        }
    }

    const onClick=(e)=>{
        // console.log(ref.current.focus())
        ref.current.focus()
    }

    const onSubmit=(e)=>{
        e.preventDefault();
      
        updateProfile(username).catch(res=>{
            addDetail(res)
        })
        .then(res=>{
           addDetail(res)
           navigate("/")
        })


      
    }


  return (
   <div className="container-detail">
       <div className="container-detail-item">
            <div className="heading">
               {!loginUser.username ?"Enter Username":"Profile Image"}
            </div>
           <form className="form" onSubmit={onSubmit}>
               {!loginUser.username &&<div className="form_input-group form-item"  onClick={onClick} >
                   <input className='form_input-text' ref={ref} type="text" id='username' name='username'placeholder='Username'  value={username} onChange={handleChange} required/>
                   <label className='form_input-label' htmlFor="username">Username</label>
               </div>}
               {loginUser.username &&<div className="form-item">

                    <input className='input-file' type="file" name="profileImage" id="profileImage" onChange={handleChange} />
                   <label className='label btn-blue' htmlFor="profileImage">Select Profile Image</label>
               </div>
                   }
               <div className="">
                   {/* <button className=' form_button' disabled={!username && profileImage}>Submit</button> */}
                   {!loginUser.username &&<button  className=' form_button' disabled={!username }>Submit</button>}
               </div>
           </form>
                   {JSON.stringify(username)}
                   {JSON.stringify(loginUser.username)}
       </div>
   </div>
  )
}

const mapStateToProp=state=>({
    loginUser:state.auth
})
const mapDispatchToProp=dispatch=>({
    addDetail:user=>(addDetail(user))
})


export default connect(mapStateToProp,mapDispatchToProp)(Detail)