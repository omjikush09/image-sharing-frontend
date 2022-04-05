import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";


//icons
import {FaFacebookMessenger} from "react-icons/fa"
import {FiPlusSquare} from "react-icons/fi"
import { FiLogOut } from "react-icons/fi";

import { isauthentcated } from "../../api/userApi";
import UploadImage from ".././uploadImage/UploadImage";
import "./navbar.scss"
import "./../../sass/componets/_model.scss";
import { XIcon } from '@heroicons/react/solid'
import DragAndDrop from "../drap-and-drop/DragAndDrop";
import Model from './../model/Model';
import Search from "../search/Search";

//redux
import { connect } from "react-redux";
// import {}


const Navbar =({user})=>{

    const [dropdownopen,setDropdownopen]=useState(false)
    const [uploadimage,setUplaodimage]=useState(false);
    const [istoggleModel,setIstoggleModel]=useState(false);
    useEffect(()=>{
        console.log(user)
    },[user])
    

    // const togglePost=()=>{
    //     setIstogglePost(!istogglePost);
    // }

        



    return (
        <>
           
            <div className="navbar">
                <div className="navbar_container">
                    <nav className="nav">
                        <div className="nav-icon">
                            <span>Friend Chat</span>
                        </div>
                        <div className="nav-search">
                            
                            <Search/>
                        </div>
                        <div className="nav-links">
                            <ul className="list">
                                {/* <li className="list_item">
                                    
                                <IconContext.Provider value={{ className: "messanger",size:"1.3rem" }}>
                                        <div>
                                    <FaFacebookMessenger/>
                                            </div>
                                             </IconContext.Provider>
                                </li> */}
                                <li className="list_item">
                                    
                                <IconContext.Provider value={{ className:istoggleModel? "squareClicked":"square",size:"1.5rem" }}>
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
                                            <div>
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
        </>
     
    )
}

const mapStateToProps=state=>({
    user:state.auth
})
const mapDispatchToProps=dispatch=>({})


export default connect(mapStateToProps,mapDispatchToProps)(Navbar);