import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";


//icons

import {FiPlusSquare} from "react-icons/fi"
import { FiLogOut } from "react-icons/fi";


import "./navbar.scss"
import "./../../sass/componets/_model.scss";

import Model from './../model/Model';
import Search from "../search/Search";
//api
import { getUserthroughId } from "../../api/userApi";

//redux
import { connect } from "react-redux";
import { login } from "../../action/authAction";



const Navbar =({addUserToState})=>{

    const navigate=useNavigate();
    const [istoggleModel,setIstoggleModel]=useState(false);
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        username: "",
        profileImage: "",
        isLoading: "",
        error: "",
        id:""
      });
    
     //get user
     const getUser = () => {
        getUserthroughId({ userId: JSON.parse(localStorage.getItem("_id")) }).then(
          (res) => {
            console.log(res);
            if (res.error) {
              setUser({ ...user, error: res.error });
            } else {
              setUser({
                ...user,
                firstname: res.firstname,
                lastname: res.lastname,
                error: "",
                profileImage: res.profileImage,
                username: res.username,
                id:res._id
              });
            }
            console.log(user);
        
            
          }
        );
      };

      const logout=()=>{
          localStorage.clear()
          navigate("/signin")
      }

















    useEffect(()=>{
        getUser();
       
    },[])
    useEffect(()=>{
        addUserToState(user);
    },[user])
    

  
        



    return (
        <>
           
            <div className="navbar">
                <div className="navbar_container">
                    <nav className="nav">
                        <div className="nav-icon">
                            <Link to="/" className="home">
                            <span>Friend Chat</span>
                            </Link>
                        </div>
                        <div className="nav-search">
                            
                            <Search/>
                        </div>
                        <div className="nav-links">
                            <ul className="list">
                              
                                <li className="list_item">
                                    
                                <IconContext.Provider value={{ className:istoggleModel? "squareClicked":"square",size:"2.0rem" }}>
                                        <div onClick={()=>{
                                            setIstoggleModel(!istoggleModel)}} >
                                   <FiPlusSquare/>
                                            </div>
                                </IconContext.Provider>
                                </li>
                                <li className="list_item">
                                    <Link to={`/${user.username}`}>
                                   <div style={{height:"1.8rem",width:"1.8rem"}}>
                                       <img style={{height:"100%",borderRadius:"100%",width:"100%"}} src={user.profileImage} alt="" />
                                   </div>
                                    </Link>
                                </li>
                                <li className="list_item">
                                    <IconContext.Provider value={{size:"1.5rem"}}>
                                            <div onClick={logout} style={{cursor:"pointer"}}>
                                                <FiLogOut/>
                                            </div>
                                    </IconContext.Provider>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            {istoggleModel && <Model setIstoggleModel={setIstoggleModel} istoggleModel={istoggleModel} /> }
            <Outlet/>
        </>
     
    )
}

const mapStateToProps=state=>({
   
})
const mapDispatchToProps=dispatch=>({
    addUserToState:user=>{
        dispatch(login(user))
    }
})


export default connect(mapStateToProps,mapDispatchToProps)(Navbar);