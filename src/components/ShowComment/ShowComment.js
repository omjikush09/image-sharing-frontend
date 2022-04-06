import React,{useState,useEffect} from 'react'
import { getComment } from '../../api/ImageApi'
import { connect } from 'react-redux';


import "./ShowComment.scss"
import { Link } from 'react-router-dom';

const ShowComment = ({commentsId,loginUser}) => {
    const [showcomment,setShowcomment]=useState(false)
    const [comments,setComments]=useState([])
   
    const getComments=()=>{
        getComment(commentsId,loginUser.id).then(res=>{
            setComments(res)
        }).catch(res=>console.log(res))
    }
    useEffect(()=>{
        if(showcomment){
            getComments()
        }
    },[loginUser,showcomment])
  return (
    <div>{showcomment && comments.map((com,key)=>{
        return <div key={comments._id}>
            {/* <span className="username"> */}
                <Link className="username" to={`/${com.username}`}>
            {com.username}
                </Link>
            {/* </span> */}
            <span className='comment'>
            {com.comment}
            </span>
            </div>
    })}
    {!showcomment && commentsId.length>0 && <div style={{cursor:"pointer"}} onClick={()=>setShowcomment(true)}>View all {commentsId.length} comments</div>}
    </div>
  )
}

const mapStateToProps=state=>({
    loginUser:state.auth
})

const mapDispatchToProps=dispatch=>({})

export default connect(mapStateToProps,mapDispatchToProps)(ShowComment)