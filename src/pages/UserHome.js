import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { Container, Row, Col } from "reactstrap";
import Navbar from "../components/navbar/Navbar.js";
import Post from "../components/post/Post";
import { getPost, getUserthroughId } from "../api/userApi";

const UserHome = () => {
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    profileImage: "",
    isLoading: "",
    error: "",
  });

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
          });
        }
        console.log(user);
      }
    );
  };

  const home = () => {
    const userid = JSON.parse(localStorage.getItem("_id"));
    let arr = [];
    const temp = [];
    getPost({ userid }).then((res) => {
      res.map((user) => {
        let a = {};
        // console.log(user)
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
      // console.log(posts)
      // console.log(res)
      // console.log(res[0].user.images);
    });
  };

  useEffect(() => {
    getUser();
    home();
  }, []);

  const {firstname,lastname,profileImage,username}=user;

  // console.log(temp)
  return (
    <>
      <Navbar />
      <br></br>
      <Container fluid>
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
            {/* <Post/> */}
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
              src={profileImage}
              alt=""
              />
              {/* {username} */}
           {/* dfs */}
            {/* <h1>edfs</h1> */}
            <span>{username}</span>
              </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserHome;
