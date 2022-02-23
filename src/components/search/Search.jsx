import React from 'react'
import "./Search.scss"
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { getUserList } from '../../api/userApi';
const Search = () => {


    const [username,setUsername]=useState("")
    const [users,setUsers]=useState([]);
    const [timer ,setTimer]=useState(null);

    const clearTimer=()=>{
      if(timer){
        clearTimeout(timer)
      }
    }

    const handleChange=e=>{
        e.preventDefault();
        setUsername(e.target.value)
    }

    const getUsers=()=>{
      if(!username || username.trim()===""){
        return
      }
      getUserList(username)
      .then(res=>{
        console.log(res)
        setUsers(res)
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
            <input className='search_bar-input' type="search" name="search" id="search" onChange={handleChange} value={username} />
            <div className='search_bar-result'>
                   {users.map(user=>{
                     <div className="username">

                     </div>
                   })} 

            
            </div>
         <div className="square-arrow"></div>
        </div>
        
    </div>
    </>
  )
}

export default Search