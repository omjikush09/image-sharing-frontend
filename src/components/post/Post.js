import React from "react";

const Post = ({
  profileImg ,
  post,
  username
}) => {
  return (
    <>
      <div style={{  maxWidth: "40rem" }}>
        <div style={{ padding: "0.5rem 0" }}>
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
          <span>{username}</span>
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
