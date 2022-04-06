import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { Container, Row, Col } from "reactstrap";
import Navbar from "../../components/navbar/Navbar.js";
import Post from "../../components/post/Post";
import { getPost, getUserthroughId } from "../../api/userApi";

import { connect } from "react-redux";
import {login} from "../../action/authAction"
import {IconContext} from "react-icons"


import "./UserHome.scss"
import { BsFillHeartFill } from 'react-icons/bs';
import {AiOutlineHeart} from "react-icons/ai"
import LikePost from '../../components/LikePost/LikePost';
import Addcomment from "../../components/AddComment/Addcomment.js";
const UserHome = ({loginUser}) => {
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  
  document.title="Friend Chat"

  const home = () => {
    const userid = JSON.parse(localStorage.getItem("_id"));
    let arr = [];
    const temp = [];
    userid && getPost({ userid }).then((res) => { //get post of followings
      res.map((user) => {
        let a = {};
        console.log(user)
        // console.log(user.user.firstname)
        if (user.user._id) {
          a._id = user.user._id;
          a.profileImage = user.user.profileImage;
          a.username = user.user.username;
          // a.lastname=user.user.lastname
          // console.table(a)
          // console.log(following)
          temp.push(a);
        }
        if (user.user.images) {
          user.user.images.map((image) => {
            arr.push(image);
          });
        }
      });
      arr.sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1;
      });
      // console.log(temp)
      setFollowing(temp);
      setPosts(arr);
      console.log(temp);
      console.log(arr)
      // console.log(res)
      // console.log(res[0].user.images);

    });
  };

  useEffect(() => {
   
    home();
    
  }, []);
 

  return (
    <>
    
        <div className="container">
      <div className="container_home">

        <div className="container_home-post">
        {posts && posts.map((arr, key) => {
              const u = following.find((user) => {
                //    console.log(user)
                return user._id === arr.uploadedBy;
              });
              // if(loginUser.id===arr.uploadedBy){
              //   return  //if user followed himself it's a bug
              // }
              // console.log(arr)
              return (
                <>
           
                <Post
                  key={key}
                  profileImg={u.profileImage}
                  post={arr.url}
                  username={u.username}
                  />
                 <LikePost likedUsers={arr.likedUsers} postId={arr._id} />
                <div className="postContent">
                  
                 { arr.comments  && <div>View all {arr.comments.length} comments</div>}
                 <Addcomment postId={arr._id} username={u.username}/>
                  </div>  
                  </>
              );
            })
            }



        </div>
        <div className="container_home-user">


        </div>
      </div>
        </div>


      {/* <Container fluid>
        <Row style={{ padding: "0" }}>
          <Col md={2}></Col>
          <Col md={6}>
            {posts.map((arr, key) => {
              const u = following.find((user) => {
                //    console.log(user)
                return user._id === arr.uploadedBy;
              });
              // console.log(arr)
              return (
                <Post
                  key={key}
                  profileImg={u.profileImage}
                  post={arr.url}
                  username={u.username}
                />
              );
            })}
       
          </Col>
      <Col md={2}>
            <div>

            <img
              className="imageCircle"
              style={{ width: "4rem",
              borderRadius: "100%",
              height: "4rem",
              display:"inline-block",
              marginRight: "1rem",}}
              src={loginUser.profileImage}
              alt=""
              />
            
       
           
           <span>{loginUser.username}</span>
              </div>
          </Col> 
          </Row>
      </Container> */}


    </>
  );
};

const mapStateToProps= state=>({
  loginUser:state.auth
})
const mapDispatchToProps=dispatch=>({})


export default connect(mapStateToProps,mapDispatchToProps)(UserHome);
