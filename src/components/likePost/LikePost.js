import React,{useState} from 'react'
import {BsFillHeartFill, BsHeart} from "react-icons/bs"

import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../api/ImageApi';
import { useEffect } from 'react';
const LikePost = ({likedUsers,loginUser,postId}) => {

    const [liked,setLiked]=useState(false);
  
    const loginLiked=likedUsers.find((user)=>{
        return user===loginUser.id
    })
    console.log(loginLiked)
    useEffect(()=>{
      if(loginLiked){
        setLiked(true);
    }
    },[])
    // if(loginLiked){
    //     setLiked(true);
    // }
    const onClick=()=>{
      if(liked){ //as previous state should be liked to unlike
        unlikePost(loginUser.id,postId).then(res=>
          setLiked(false)
          ).catch(res=>{
            // setLiked(false)
            console.log(res);
          })
      }else{
        likePost(loginUser.id,postId).then(res=>{
          setLiked(true)
        }).catch(res=>{
          console.log(res)
        })
      }
    
    }
    console.log(likedUsers)

  return (
      <> 
       <span onClick={onClick}>
      {liked?<BsFillHeartFill color='red' size={"1.5rem"}/>:  <BsHeart size={"1.5rem"}/>}
        </span>
      {/* <AiOutlineHeart />
    <FaHeart color='red'/> */}
    {/* <BsFillHeartFill color='white' />  */}
      </>
    
   
  )
}
 
const mapStateToProps=state=>({
    loginUser:state.auth
})
const mapDispatchToProps=dispatch=>({})

export default connect(mapStateToProps,mapDispatchToProps) (LikePost)