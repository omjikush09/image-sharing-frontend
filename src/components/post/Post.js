import React from "react";
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
          <span className="title-name">{username}</span>
        </div>
        <img
          style={{ width: "100%" }}
          src={post}
          alt=""
        />
      </div>
    </>
  );
};
export default Post;
