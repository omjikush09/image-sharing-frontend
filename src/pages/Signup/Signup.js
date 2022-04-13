import React, { useState,useEffect } from "react";
import { checkUsername, signUp } from "../../api/userApi";
import { Link, Navigate ,useNavigate} from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillFacebook } from "react-icons/ai";
import "./Signup.scss";
import { googleLogin } from "../../api/userApi";
//action
import { connect } from "react-redux";
import { googleLoigin } from './../../action/authAction';

import "./../../sass/componets/_form.scss";
import GoogleLogin from "react-google-login";


const SignUp = ({loginWithGoogle,loginUser}) => {
  
  const navigate=useNavigate()

  const [values, setValues] = useState({
    fullname:"",
    email: "",
    password: "",
    gender: "Male",
    error: "",
    success: "",
    redirectTime: -1,
  
  });
  const [usernameValid,setUsernameValid]=useState(false);
  const [username,setUsername]=useState("")
  const [timer,setTimer]=useState(null)
  const {
    fullname,
    email,
    password,
    gender,
    error,
    success,
    redirectTime,
  } = values;

  const handleChange = (event) => {
    console.log("hadle change")
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
          gender: "",
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

 
  const onGoogleSuccess=async (user)=>{

    localStorage.setItem("jwt",JSON.stringify(user.tokenId))
            googleLogin({email:user.profileObj.email,id:user.profileObj.googleId,profileImage:user.profileObj.imageUrl,fullname:user.profileObj.name}).catch(res=>{
                console.log(res)
                loginWithGoogle({error:"Something went wrong"})
            }).then(res=>{
              loginWithGoogle(user)
                localStorage.setItem("_id",JSON.stringify(res._id))
                if(!res.username){
                  navigate("/adddetail")
                }else{
                  navigate("/")
                }
            })


    //  await loginWithGoogle(user)
    //  const jwt=localStorage.getItem("jwt")
    //  if(loginUser.id && jwt && !loginUser.username){
    //    console.log(loginUser.id)
    //    console.log(jwt)
    //    setTimeout(() => {
    //      //
    //      navigate("/adddetail")
    //    }, 1000);
    //  }else{
    //    navigate("/")
    //  }
    // console.log(user)
  }
  const onGoogleFailure=(failure)=>{
      console.log(failure)
  }


  const checkUser=(username)=>{
   
    checkUsername(username).then(res=>{
      setValues({...values,error:""})
      setUsernameValid(true)
    }).catch(res=>{
 
      setValues({...values,error:res.error})
      setUsernameValid(false)
    })
  }

  
  useEffect(()=>{
    
    if(timer){
      clearTimeout(timer)
    }
    const timeout=setTimeout(()=>{
      if(username){
        checkUser(username)
      }
    },1000)
    setTimer(timeout)
  },[ username])
  
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
      return <h3 className="text-white text-center">Oops! {error}</h3>;
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
          <h1 className="text-center">Friend Share</h1>
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
                onChange={(e)=>{setUsername(e.target.value)}}
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
            <button className="form_button" disabled={(!password || !username || !fullname ||!email || !usernameValid)} type="submit">
              Sign Up
            </button>
          </form>

          <div className="signup_line">
            <span className="signup_line-span">OR</span>
          </div>
          {/* <Link to="/" className="link">
            <div className="login-With-Facebook">
              <IconContext.Provider value={{ color: "blue", size: "1.2rem" }}>
                <AiFillFacebook />
              </IconContext.Provider>
              <span >Log in with Facebook</span>
            </div>
          </Link> */}
          <div  className="login-With-google" >

          <GoogleLogin clientId={process.env.REACT_APP_CLIENT_ID} buttonText="Login With Google" onSuccess={onGoogleSuccess} onFailure={onGoogleFailure} cookiePolicy={'single_host_origin'} />
          </div>
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

const mapStateToProps=state=>({
  loginUser:state.auth
})

const mapDispatchToProps=dispatch=>({
  loginWithGoogle:user=>{
    dispatch(googleLoigin(user))
  }
})


export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
