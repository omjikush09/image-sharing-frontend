import React from 'react'
import { useState } from 'react';
import { addcomment } from './../../api/ImageApi';
import { connect } from 'react-redux';

const Addcomment = ({loginUser,postId,username}) => {

    const [comment,setComment]=useState("");
   
    const onChange=(e)=>{
        setComment(e.target.value);
    }

    const onSubmit=(e)=>{
        console.log("df")
        e.preventDefault();
        addcomment(comment,loginUser.id,postId,username).then(res=>{
            setComment("")
        }).catch(res=>console.log(res))
    }

  return (
      <div>
          <input type="text" onChange={onChange} value={comment} placeholder="Add Comment" />
          <button onClick={onSubmit} disabled={!comment} >Post</button>
      </div>
  )
}
 

const mapStateToProps=state=>({
    loginUser:state.auth
})

const mapDispatchToProps=dispatch=>({})


export default connect(mapStateToProps,mapDispatchToProps)(Addcomment)