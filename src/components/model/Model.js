import React,{useState} from 'react'
import { XIcon } from '@heroicons/react/solid'
import DragAndDrop from '../drap-and-drop/DragAndDrop';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IconContext } from 'react-icons';
const Model = ({setIstoggleModel,istoggleModel}) => {

    document.title="Create a new post"
    const [content,setContent]=useState(false)
    const [error,setError]=useState("")
    const [sharePost,setSharePost]=useState(false)
    const onDragOver=(e)=>{
        // e.preventDefalut();

    }
    const onDrop=(e)=>{
        // e.preventDefalut();

    }
   
    const closeModel=()=>{
        // if(content){

        // }else{
        // }
        setIstoggleModel(!istoggleModel)
    }
    const onClickBack=(e)=>{
        console.log(e);
        // e.preventDefalut()
        setSharePost(false)
        setContent(false)
        setError(false)
    }

  return (
    
    
        <>
              <div   className="model">
                  <XIcon className="crossIcon" onClick={closeModel}/>
              <div className="model-background" onDragOver={onDragOver} onDragCapture={onDragOver} onDrop={onDrop}>
                      <div className="model_post">
                         <div className="model_post-item" >
                                <span  className="model_post-arrow" onClick={onClickBack}>
                             { content &&<IconContext.Provider value={{color:"black" ,className:"arrow-icons",size:"1.5rem"}}>
                                <AiOutlineArrowLeft />
                             </IconContext.Provider>}
                             </span>
                             <span className="model_post-title">
                             Create new post
                             </span>
                             <span onClick={()=>setSharePost(true)} className="model_post-next">{content && "Share"}</span>
                         </div>
                         <div className="model_post_content">
                         { <DragAndDrop setContent={setContent} content={content} error={error} setError={setError} sharePost={sharePost} />}
                          
                         </div>
                      </div>
              </div>
              </div>
          </>
      
      
  
  )
}

export default Model