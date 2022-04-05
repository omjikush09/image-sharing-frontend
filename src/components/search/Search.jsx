import React from 'react'
import "./Search.scss"
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { getUserList } from '../../api/userApi';
import ReactLoading from "react-loading"
import { Link } from 'react-router-dom';
const Search = () => {


    const [username,setUsername]=useState("")
    const [users,setUsers]=useState([]);
    const [timer ,setTimer]=useState(null);
    const [state,setState]=useState({
      isLoading:false,
      startTyping:true,
      searching:false,
      userNotfound:false
    })

    const {isLoading,startTyping,searching,userNotfound}=state;


    const clearTimer=()=>{
      if(timer){
        clearTimeout(timer)
      }
    }
    const onFocus=e=>{
      setState({...state,searching:true})
    }
    const onBlur=e=>{
      setState({...state,searching:false})
      
    } 
    const handleChange=e=>{
        e.preventDefault();
        setUsername(e.target.value)
        if(!e.target.value || e.target.value.trim()===""){
          setUsers([])
          setState({...state,startTyping:true,isLoading:false,userNotfound:false})
        }else{
          setState({...state,startTyping:false,isLoading:true,userNotfound:false})
        }
       
    }

    const getUsers=()=>{
      if(!username || username.trim()===""){
        
        return
      }
      setState({...state,isLoading:true})
      getUserList(username)
      .then(res=>{
        console.log(res)
        if(res.length===0){
          setState({...state,userNotfound:true,isLoading:false})
          // setState({...state,})
        }else{
          setUsers(res)
          setState({...state,isLoading:false})
        }
      })
      .catch(res=>{
        console.log(res);
      })

    }

    useEffect(()=>{
      clearTimer();
      console.log("what")
      if(username){
        const newTimer=setTimeout(()=>{
            getUsers();
        },700)
        setTimer(newTimer)
      }

    },[username])


  return (
    <>  <div className="search">
            <div className="search_bar">
            <input className='search_bar-input' placeholder='Search' onFocus={onFocus} onBlur={onBlur} type="search" name="search" id="search" onChange={handleChange} value={username} />
            {searching &&
              <>
             
            <div className='search_bar-result'>
                   {users && !userNotfound &&users.map((user)=>{
                     return (
                       <Link key={user._id} to={"/" +user.username} className="search_bar-link">
                     <div  className="search_username">
                       <div className="image-container">
                         <img src={user.profileImage} className="image-container-image" alt="Profile" />
                       </div>
                         
                       <div className="username">
                        {user.username}
                        <div className="name">
                        {user.firstname} <span>  </span>
                        {user.lastname}
                        </div>
                        
                       </div>
                      
                     </div>
                       </Link>
                     )
                   })} 
                   {users.length===0 &&
                      <div className="notuser">{userNotfound && <>No User Found</>}
                  {isLoading && <ReactLoading type="spokes" color="grey"/>}
                   {startTyping && <><div className="type">Start Typing</div></>}</div>
                   }
            </div>
         <div className="square-arrow"></div>
         </>
        }
        </div>
    </div>
    </>
  )
}

export default Search