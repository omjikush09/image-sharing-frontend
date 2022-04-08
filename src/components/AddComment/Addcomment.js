import React from 'react'
import { useState } from 'react';
import { addcomment } from './../../api/ImageApi';
import { connect } from 'react-redux';

import "./AddComment.scss"

const Addcomment = ({loginUser,postId}) => {

    const [comment,setComment]=useState("");
   
    const onChange=(e)=>{
        setComment(e.target.value);
    }

    const onSubmit=(e)=>{
    

        e.preventDefault();
        addcomment(comment,loginUser.id,postId,loginUser.username).then(res=>{
            setComment("")
        }).catch(res=>console.log(res))
    }

  return (
      <div className='box'>
          <input className='Comment-box' type="text" onChange={onChange} value={comment} placeholder="Add Comment" />
          <button className='btn-post' onClick={onSubmit} disabled={!comment} >Post</button>
      </div>
  )
}
 

const mapStateToProps=state=>({
    loginUser:state.auth
})

const mapDispatchToProps=dispatch=>({})


export default connect(mapStateToProps,mapDispatchToProps)(Addcomment)