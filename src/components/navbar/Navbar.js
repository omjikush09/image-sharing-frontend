import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, NavItem, NavLink, Row,Input,InputGroup,Button ,ButtonDropdown,DropdownToggle,DropdownMenu,DropdownItem} from "reactstrap";
<<<<<<< HEAD
import { AiOutlineHome,AiOutlineSearch} from "react-icons/ai";
import {BsPlusSquare} from "react-icons/bs"
import { isauthentcated } from "../../api/userApi";
import UploadImage from ".././uploadImage/UploadImage";
=======
import { AiOutlineHome,AiOutlineSearch,AiMdHomeFilled} from "react-icons/ai";
import { MdHomeFilled} from "react-icons/md";
import {BsPlusSquare} from "react-icons/bs"
import { isauthentcated } from "../../api/userApi";
import UploadImage from ".././uploadImage/UploadImage";
import "./navbar.css"
>>>>>>> master
const Navbar =()=>{

    const [dropdownopen,setDropdownopen]=useState(false)
    const [uploadimage,setUplaodimage]=useState(false);

    return (
        <Container className="bg-light" fluid>
            <Container className="container-md m-0" >
                <Nav className="d-flex justify-content-around">
                <NavItem>
<<<<<<< HEAD
                    <Link to="/" ><NavLink >Mini Insta</NavLink></Link>
                </NavItem>
                <div>
                <InputGroup >
                <Input placeholder="Search Username" /> 
                    <Button>
                        <AiOutlineSearch size={25}/>
                 </Button>
=======
                    <Link className="link" to="/" ><NavLink className="" >Home</NavLink></Link>
           
                </NavItem>
                <div>
                <InputGroup >
                <Input className="searchBox" placeholder="Search Username" type="search" /> 


                    {/* <Button>
                        <AiOutlineSearch size={25}/>
                 </Button> */}
>>>>>>> master
                </InputGroup>
                </div>
                <div className="h-100 ">
                    {isauthentcated()?(
                        <>
<<<<<<< HEAD
                        <Link to="/"><AiOutlineHome size={38}/></Link>
                        <Button color="white" onClick={()=>setUplaodimage(!uploadimage)}>
                            <BsPlusSquare size={38}/>
=======
                        <Link to="/"><MdHomeFilled size={30}/></Link>
                        <Button color="white" onClick={()=>setUplaodimage(!uploadimage)}>
                            <BsPlusSquare size={25}/>
>>>>>>> master
                        </Button>
                        <UploadImage uploadimage={uploadimage} setUplaodimage={setUplaodimage}/>
                        <ButtonDropdown className="mx-3" isOpen={dropdownopen} toggle={()=>setDropdownopen(!dropdownopen)}>
                                <DropdownToggle caret>
                                 Button
                                        </DropdownToggle>
                                     <DropdownMenu>
                                         <DropdownItem className="text-center">
                                            <Link to='/profile'>Profile</Link> 
                                        </DropdownItem>
                                <DropdownItem disabled>
                                        Action
                                     </DropdownItem>
                                         <DropdownItem>
                                      Another Action
                                </DropdownItem>
                                    <DropdownItem divider />
                                 <DropdownItem>
                                         Another Action
                                         </DropdownItem>
                                </DropdownMenu>
                                            </ButtonDropdown>
                                            </>
                    ):(
<<<<<<< HEAD
                        <Link to="/signin">Signin</Link>
=======
                        <Link className="link" to="/signin">Signin</Link>
>>>>>>> master
                    )}
                    
                </div>
            </Nav>
            </Container>
            </Container>
    )
}

export default Navbar;