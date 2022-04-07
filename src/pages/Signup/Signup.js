import React, { useState } from "react";
import { signUp } from "../../api/userApi";
import { Link, Navigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillFacebook } from "react-icons/ai";
import "./Signup.scss";

import "./../../sass/componets/_form.scss";


const SignUp = () => {
  const [values, setValues] = useState({
    fullname:"",
    email: "",
    password: "",
    gender: "Male",
    error: "",
    success: "",
    redirectTime: -1,
    username:""
  });
  const {
    fullname,
    email,
    password,
    username,
    gender,
    error,
    success,
    redirectTime,
  } = values;

  const handleChange = (event) => {
    
    setValues({ ...values, [event.target.name]: event.target.value });

  };

  const submit = (e) => {
    e.preventDefault();
    signUp({ fullname, email, password, gender,username }).then((user) => {
      console.log(user);
      if (user.error) {
        setValues({ ...values, error: user.error, success: "" });
      } else {
        setValues({
          ...values,
          success: "SignUp successfully",
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          gender: "Male",
          error: "",
          redirectTime: 3,
        });
        setTimeout(() => {
          setValues({ ...values, redirectTime: 0 });
          console.log(redirectTime);
        }, 3000);
      }
    });
  };

  const NavigateToSign = () => {
    if (redirectTime === 0) {
      return <Navigate to="/signin" />;
    }
    return "";
  };
  const successMessage = () => {
    if (success) {
      return <h1 className="text-white text-center">{success}</h1>;
    }
  };
  const redirectMessage = () => {
    if (redirectTime !== -1) {
      return (
        <h1 className="text-white text-center">
          Redirect in {redirectTime} sec{" "}
        </h1>
      );
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h1 className="text-white text-center">Oops! {error}</h1>;
    }
  };
  return (
    <>
      <div className="signup-page">
        <div className="container_signup">
        {NavigateToSign()}
        {successMessage()}
        {errorMessage()}
        {redirectMessage()}
          <h1 className="text-center">Instagram</h1>
          <form  onSubmit={submit} className="form">
            <div className="form_input-group">
              <input
                className="form_input-text"
                type="email"
                placeholder="Email"
                required
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <label htmlFor="email" className="form_input-label">
                Email
              </label>
            </div>
            <div className="form_input-group">
              <input
                className="form_input-text"
                type="text"
                placeholder="Full Name"
                required
                id="fullName"
                name="fullname"
                value={fullname}
                onChange={handleChange}
              />
              <label htmlFor="fullName" className="form_input-label">
                Full Name
              </label>
            </div>
            <div className="form_input-group">
              <input
                className="form_input-text"
                type="text"
                placeholder="Username"
                required
                id="username"
                name="username"
                onChange={handleChange}
              />
              <label htmlFor="username" className="form_input-label">
                Username
              </label>
            </div>
            <div className="form_input-group">
              <input
                className="form_input-text"
                type="password"
                placeholder="Password"
                required
                id="password"
                value={password}
                onChange={handleChange}
                name="password"
            
              />
              <label htmlFor="password" className="form_input-label">
                Password
              </label>
            </div>
            <button className="form_button" disabled={(!password || !username || !fullname ||!email)} type="submit">
              Sign Up
            </button>
          </form>

          <div className="signup_line">
            <span className="signup_line-span">OR</span>
          </div>
          <Link to="/" className="link">
            <div className="login-With-Facebook">
              <IconContext.Provider value={{ color: "blue", size: "1.2rem" }}>
                <AiFillFacebook />
              </IconContext.Provider>
              <span >Log in with Facebook</span>
            </div>
          </Link>
          <Link to="#" className="container_forget">
            <div >Forget password?</div>
          </Link>
        </div>
        <div className="container-register">
          <div className="container-register_button">
            Have an account?{" "}
            <Link to="/signin" className="container-register_button-link">
              Log in
            </Link>
          </div>
        </div>
      </div>      
    </>
  );
};

export default SignUp;
