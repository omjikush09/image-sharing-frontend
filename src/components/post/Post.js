import React from "react";
import { Link } from "react-router-dom";
import "./Post.scss"
const Post = ({
  profileImg ,
  post,
  username
}) => {
  return (
    <>
      <div style={{  maxWidth: "40rem" }}>
        <div className="title" >
          <Link  to={`/${username}`}>
          <img
            style={{
              width: "2rem",
              borderRadius: "100%",
              height: "2rem",
              marginRight: "1rem",
            }}
            src={profileImg}
            alt="profie"
            />
            </Link>
            <Link className="title-link" to={`/${username}`}>
          <span className="title-name">{username}</span>
            </Link>
        </div>
        <img
          style={{ width: "100%" ,borderTop:".2px solid grey" }}
          src={post}
          alt=""
        />
      </div>
    </>
  );
};
export default Post;
