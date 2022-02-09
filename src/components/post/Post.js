import React from "react";

const Post = ({
  profileImg = "https://images.ctfassets.net/hrltx12pl8hq/61DiwECVps74bWazF88Cy9/2cc9411d050b8ca50530cf97b3e51c96/Image_Cover.jpg?fit=fill&w=480&h=270",
  post="https://res.cloudinary.com/omji/image/upload/v1639117337/o6sucms0e02efrpw3c4n.jpg",
  username
}) => {
  return (
    <>
      <div style={{ marginBottom: "5rem", maxWidth: "40rem" }}>
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
          style={{ width: "100%", height: "40rem" }}
          src={post}
          alt=""
        />
      </div>
    </>
  );
};
export default Post;
