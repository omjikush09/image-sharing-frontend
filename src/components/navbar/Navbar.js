import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { Container, Nav, NavItem, NavLink, Row,Input,InputGroup,Button ,ButtonDropdown,DropdownToggle,DropdownMenu,DropdownItem} from "reactstrap";
import { AiOutlineHome,AiOutlineSearch,AiMdHomeFilled} from "react-icons/ai";
import { MdHomeFilled} from "react-icons/md";
import {FaFacebookMessenger} from "react-icons/fa"
import {FiPlusSquare} from "react-icons/fi"
import { isauthentcated } from "../../api/userApi";
import UploadImage from ".././uploadImage/UploadImage";
import "./navbar.scss"
import "./../../sass/componets/_model.scss";
import { XIcon } from '@heroicons/react/solid'
import DragAndDrop from "../drap-and-drop/DragAndDrop";
const Navbar =()=>{

    const [dropdownopen,setDropdownopen]=useState(false)
    const [uploadimage,setUplaodimage]=useState(false);
    const [istogglePost,setIstogglePost]=useState(true);

    // const togglePost=()=>{
    //     setIstogglePost(!istogglePost);
    // }


    const postModel=()=>{
        if(istogglePost){
            return <>
                <div className="model">
                    <XIcon className="crossIcon" onClick={()=>{setIstogglePost(!istogglePost)}}/>
                <div className="model-background">
                        <div className="model_post">
                           <div className="">
                               <span className="model_post-title">
                               Create new post
                               </span>
                           </div>
                           <div className="model_post_content">
                            <DragAndDrop/>
                            
                           </div>
                        </div>
                </div>
                </div>
            </>
        }else{
            return (
                <>
                </>
            )
        }
        
    }



    return (
        <>
           
            <div className="navbar">
                <div className="navbar_container">
                    <nav className="nav">
                        <div className="nav-icon">
                            <span>Friend Chat</span>
                        </div>
                        <div className="nav-search">
                            <input type="search" name="search" id="search" />
                        </div>
                        <div className="nav-links">
                            <ul className="list">
                                <li className="list_item">
                                    
                                <IconContext.Provider value={{ className: "messanger",size:"1.5rem" }}>
                                        <div>
                                    <FaFacebookMessenger/>
                                            </div>
                                             </IconContext.Provider>
                                </li>
                                <li className="list_item">
                                    
                                <IconContext.Provider value={{ className:istogglePost? "squareClicked":"square",size:"1.5rem" }}>
                                        <div onClick={()=>{
                                            console.log("print")
                                            setIstogglePost(!istogglePost)}} >
                                   <FiPlusSquare/>
                                            </div>
                                </IconContext.Provider>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            {postModel()}
        </>
        // <Container className="bg-light" fluid>
        //     <Container className="container-md m-0" >
        //         <Nav className="d-flex justify-content-around">
        //         <NavItem>
        //             <Link className="link" to="/" ><NavLink className="" >Home</NavLink></Link>
           
        //         </NavItem>
        //         <div>
        //         <InputGroup >
        //         <Input className="searchBox" placeholder="Search Username" type="search" /> 


        //             {/* <Button>
        //                 <AiOutlineSearch size={25}/>
        //          </Button> */}
        //         </InputGroup>
        //         </div>
        //         <div className="h-100 ">
        //             {isauthentcated()?(
        //                 <>
        //                 <Link to="/"><MdHomeFilled size={30}/></Link>
        //                 <Button color="white" onClick={()=>setUplaodimage(!uploadimage)}>
        //                     <BsPlusSquare size={25}/>
        //                 </Button>
        //                 <UploadImage uploadimage={uploadimage} setUplaodimage={setUplaodimage}/>
        //                 <ButtonDropdown className="mx-3" isOpen={dropdownopen} toggle={()=>setDropdownopen(!dropdownopen)}>
        //                         <DropdownToggle caret>
        //                          Button
        //                                 </DropdownToggle>
        //                              <DropdownMenu>
        //                                  <DropdownItem className="text-center">
        //                                     <Link to='/profile'>Profile</Link> 
        //                                 </DropdownItem>
        //                         <DropdownItem disabled>
        //                                 Action
        //                              </DropdownItem>
        //                                  <DropdownItem>
        //                               Another Action
        //                         </DropdownItem>
        //                             <DropdownItem divider />
        //                          <DropdownItem>
        //                                  Another Action
        //                                  </DropdownItem>
        //                         </DropdownMenu>
        //                                     </ButtonDropdown>
        //                                     </>
        //             ):(
        //                 <Link className="link" to="/signin">Signin</Link>
        //             )}
                    
        //         </div>
        //     </Nav>
        //     </Container>
        //     </Container>
    )
}

export default Navbar;