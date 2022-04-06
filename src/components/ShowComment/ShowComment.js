import React,{useState,useEffect} from 'react'
import { getComment } from '../../api/ImageApi'
import { connect } from 'react-redux';
import { login } from '../../action/authAction';

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
            {com.comment}
            </div>
    })}
    {!showcomment &&  <div style={{cursor:"pointer"}} onClick={()=>setShowcomment(true)}>View all {commentsId.length} comments</div>}
    </div>
  )
}

const mapStateToProps=state=>({
    loginUser:state.auth
})
const mapDispatchToProps=dispatch=>({})

export default connect(mapStateToProps,mapDispatchToProps) (ShowComment)