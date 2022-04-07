import React,{useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import { addfollowing, getUser } from "../../api/userApi";
import ProfileImage from "../../components/profileImage/ProfileImage";
import ProfilePost from "../../components/profilepost/ProfilePost";

import "./Profile.scss"
const Profile =()=>{

    const param=useParams();
   
    const [self,setSelf]=useState(false);
    const [isFollowing,setIsfollowing]=useState(false);

    const [values,setValues]=useState({
        id:"",
        username:"",
        firstname:"",
        lastname:"",
        numberOfFollowers:0,
        numberOfFollowing:5,
        followers:[],
        numberOfPost:0,
        images:[],
        error:"",
        success:""
    })

    const {id,username,firstname,lastname,numberOfFollowers,numberOfFollowing,numberOfPost,images}=values;
    document.title=`${firstname} ${lastname}`
    const addfollowingButton=()=>{
        console.log(id);
        const userid=JSON.parse(localStorage.getItem("_id"));
        addfollowing({userid,addfollowingId:id}).then(res=>{
                if(res.error){
                    setValues({...values,error:res.error});
                }else{
                    setIsfollowing(true);
                }
        }
          
        )
    }

    const getUserBeforePageLoad=(username)=>{
        getUser(username).then(res=>{
            if(res.error){
                setValues({...values,error:res.error})
            }else{
                setValues({...values,
                id:res._id,
                username:res.username,
                firstname:res.firstname,
                lastname:res.lastname,
                numberOfFollowers:res.numberOfFollowers,
                numberOfFollowing:res.numberOfFollowing,
                followers:res.following,
                numberOfPost:res.numberOfPost,
                images:res.images,
                error:""
                })
                if(typeof window !=="undefined"){
                   
    
                   
                    if(JSON.parse(localStorage.getItem("_id"))===res._id){
                        console.log("he");
                        setSelf(true);
                    }else {
                        const visiterid=JSON.parse(localStorage.getItem("_id"));
                        // console.log(visiterid);
                        // console.log(res.followers)
                        for (const people of res.followers) {
                            if(visiterid===people){
                                console.log(people)
                                console.log("he")
                                setIsfollowing(true);
                                console.log(isFollowing)
                                
                            }
                        }
                        
                      
                    }
                }
            }
        })
    }
    useEffect(()=>{
        getUserBeforePageLoad(param.username)
    },[param.username])
    
    
    return(
        <>

           <div className="container-profile">
               <div className="profile">
                    <div className="profile-image">
                    <ProfileImage src="https://olympic.ca/wp-content/uploads/2018/02/img_9806-e1518070422879.jpg"/>
                    </div>
                    <div className="profile-content">
                    <div>
                           <span  className="font-size-medium margin-right">{username}</span>
                           {self && <button className="btn btn-primary">Edit Profile</button>}
                          
                          
                              {isFollowing && !self &&  <button className="btn btn-primary">UnFollow</button>} 
                              {!isFollowing && !self && <button onClick={addfollowingButton} className="btn btn-primary">Follow</button>}
                           {/* <button className="btn btn-primary">Follow</button> */}
                        </div>
                        <div>
                        <strong>{numberOfPost}</strong> <span className="margin-right" >Posts</span>
                        <strong>{numberOfFollowers}</strong> <span className="margin-right" >Followers</span>
                        <strong>{numberOfFollowing}</strong> <span className="margin-right" >Following</span>
                        </div>
                        <br />
                        <div>
                            <h5 className="inline-block" >{firstname}</h5> <h5 className="inline-block">{lastname}</h5> 
                        </div>
                    </div>
               </div>
               </div> 
               <div className="text-center " > <strong>Posts</strong> </div>
   
        <Container fluid>
            <Container className="container-sm mt-5 mb-5">
                <Row>
                <Col md={1}>
                    </Col>
                    <Col md={3}>
                        
                    </Col>
                    <Col md={1}>
                    </Col>
                    <Col md={6}>
                       
                    </Col>
                </Row>
                <br />
                
                <Row>
                    <Col md={1}>
                    </Col>
                    <div className="line"></div>
                    <div className="grid-container">
                        {images && images.map((image)=>(

                    <ProfilePost key={image._id} url={image.url}/>
                        ))}
                    
                    </div>
                    <Col md={1}>
                    </Col>
                </Row>
            </Container>
            
        </Container>
        </>
    )
}

export default Profile;
