import React,{useState} from 'react'
import {BsFillHeartFill, BsHeart} from "react-icons/bs"

import { connect } from 'react-redux';
const LikePost = ({likedUsers,loginUser}) => {

    const [liked,setLiked]=useState(false);
  
    const loginLiked=likedUsers.find((user)=>{
        return user._id===loginUser.id
    })
    if(loginLiked){
        setLiked(true);
    }
    console.log(likedUsers)

  return (
      <> 
       <span onClick={()=>setLiked(!liked)}>
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