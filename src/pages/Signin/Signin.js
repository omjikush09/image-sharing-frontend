import React, { useState } from "react"
import { authenticate, signIn } from "../../api/userApi";
import {useNavigate} from "react-router-dom"

import { Link } from "react-router-dom";
import { googleLogin } from "../../api/userApi";
import GoogleLogin from "react-google-login";
import { connect } from 'react-redux';
import { googleLoigin } from "../../action/authAction";

const SignIn =({loginWithGoogle})=>{

    const navigate= useNavigate()
    const [values,setValues] =useState({
        email:"",
        password:"",
        success:"",
        error:"",
        redirect:false
    })

    const {email,password,success,error}=values;
    
    const handleChange=(event)=>{
        setValues({...values,[event.target.name]:event.target.value})
    }
    const submit=(e)=>{
        e.preventDefault();
        signIn({email,password}).then(user=>{
            if(user.error){
                setValues({...values,error:user.error,success:""})
            }else{
                setValues({...values,success:"SignIn successfully",firstname:"",
                lastname:"",
                email:"",
                password:"",
                gender:"Male",
                error:'',
                redirectTime:3
                })
                if(user.token){
                    authenticate(user)
                    }
               
                setTimeout(() => {
                    // navigate(`/${user.user.username}`)
                    navigate("/")
                }, 1000);
            }
        })
    }
    const onGoogleSuccess=(user)=>{
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
    }
    const onGoogleFailure=(failure)=>{
       
        console.log(failure)

    }

    const successMessage=()=>{
        if(success){
            return <h5 className="message-success">{success}</h5>
        } 
    }
    const errorMessage=()=>{
        if(error){
            return <h5 className="message-error">{error}</h5>
        } 
    }
    
    return(
        <>
            <div className="signup-page">
                <div className="container_signup" >
                    {successMessage()}
                    {errorMessage()}
                    <h1 className="text-center">Friend Share</h1>
                    <form onSubmit={submit} className="form">
                    <div className="form_input-group">
                    <input className="form_input-text" type="email" placeholder="Email"  required id="email"  name="email" onChange={handleChange} value={email} />
                    <label htmlFor="email" className="form_input-label">Email</label>
                    </div>
                    <div className="form_input-group">
                    <input  className="form_input-text" type="password" placeholder="Password" required id="password" name="password" onChange={handleChange} value={password} />
                    <label htmlFor="password" className="form_input-label">Password</label>
                    </div>
                    <button className="form_button" disabled={ !email || !password }  >Log In</button>
                    </form>

                    <div className="signup_line">
                       
                        <span className="signup_line-span">OR</span>
                      
                    </div>
                  {/* <Link to="/" className="link" >

                    <div className="login-With-Facebook">

                    <IconContext.Provider  value={{ color: 'blue',size:"1.2rem" }}>

                    <AiFillFacebook/>

                </IconContext.Provider>
                <span className="lo">
                    Log in with Facebook
                </span>                  
                  </Link>
                    </div> */}
                    <div  className="login-With-google" >

                <GoogleLogin clientId={process.env.REACT_APP_CLIENT_ID} buttonText="Login With Google" onSuccess={onGoogleSuccess} onFailure={onGoogleFailure} cookiePolicy={'single_host_origin'} />
                </div>
                  
                    <Link to="#" className="link" >
                    <div className="container_forget">
                        Forget password?
                    </div>
                    </Link>
                </div>
                <div className="container-register">
                <div className="container-register_button">

                    Don't have an account? <Link to="/signup" className="container-register_button-link">Sign up</Link> 
                </div>
             </div>
            </div>
         </>
    )
}

const mapStateToProps=state=>({
    loginUser:state.auth
  })
  
  const mapDispatchToProps=dispatch=>({
    loginWithGoogle:user=>{
      dispatch(googleLoigin(user))
    }
  })

export default connect(mapStateToProps,mapDispatchToProps) (SignIn);



