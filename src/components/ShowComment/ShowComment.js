import React,{useState} from 'react'

const ShowComment = ({comments}) => {
    const [showcomment,setShowcomment]=useState(false)

  return (
    <div>{showcomment && <div>comments.</div>}
    {!showcomment &&  <div>View all {comments.length} comments</div>}
    </div>
  )
}

export default ShowComment