import React from "react";
import { useEffect, useState,Suspense } from "react";

// import Post from "../../components/post/Post";
import { getPost} from "../../api/userApi";
import { connect } from "react-redux";
import "./UserHome.scss"
import LikePost from '../../components/likePost/LikePost.js';
import Addcomment from "../../components/AddComment/Addcomment.js";
import { Link } from "react-router-dom";
// import ShowComment from "../../components/ShowComment/ShowComment.js";
const ShowComment =React.lazy(()=>import("../../components/ShowComment/ShowComment.js"))
const Post =React.lazy(()=>import( "../../components/post/Post"))



const UserHome = ({loginUser}) => {
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error,setError]=useState("")
  document.title="Friend Chat"

  const home = () => {
    const userid = JSON.parse(localStorage.getItem("_id"));
    let arr = [];
    const temp = [];
    userid && getPost({ userid }).then((res) => { //get post of followings
      console.log(res)
      if(res.error){
        setError(res.error)
      }
      res.length>0 && res.map((user) => {
        
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
           return  arr.push(image);
          });
        }
        
        return ""
      });
      arr.sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1;
      });
  
      setFollowing(temp);
      setPosts(arr);
      console.log(temp);
      console.log(arr)
      

    });
  };

  useEffect(() => {
   
    home();
    
  }, []);
 

  return (
    <>
    
        <div className="container">
      <div className="container_home">

        <div className="container_home-posts">
          {error && <div>{error}</div>}
          {loginUser.error && <div>{loginUser.error}</div>}
        {posts && posts.map((arr, key) => {
              const u = following.find((user) => {
                //    console.log(user)
                return user._id === arr.uploadedBy;
              });
              // if(loginUser.id===arr.uploadedBy){
              //   return                                   //if user followed himself it's a bug
              // }
              // console.log(arr)
              return (
            
                <div className="post">
                  <Suspense key={arr._id} fallback={<div>Loading......</div>}>

                <Post
                  key={arr._id}
                  profileImg={u.profileImage}
                  post={arr.url}
                  username={u.username}
                  />
                  </Suspense >
                <div className="post-content">
                 <LikePost    key={key} likedUsers={arr.likedUsers} postId={arr._id} />
                  
                 <Suspense key={arr._id} fallback={<div>Loading...</div>}>
                 <ShowComment    key={key} commentsId={arr.comments}/>
                 </Suspense>
                 <Addcomment    key={key} postId={arr._id}/>
                  </div>   
                  </div>
              
              );
            })
            }
        </div>
         <div className="container_home-user">
              <div className="profileImage">
                <img style={{width:"100%",borderRadius:"100%" ,height:"100%"}} src={loginUser.profileImage} alt="" />
              </div>
              <div className="profileUsername">
                <Link style={{ textDecoration:"none"}} to={`/${loginUser.username}`}>
                <div className="username" >{loginUser.username}</div>
                </Link>
                <div>{loginUser.fullname}</div>
              </div> 
            

        </div>
      </div>
        </div>


     


    </>
  );
};

const mapStateToProps= state=>({
  loginUser:state.auth
})
const mapDispatchToProps=dispatch=>({
  
})


export default connect(mapStateToProps,mapDispatchToProps)(UserHome);
