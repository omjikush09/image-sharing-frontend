import React, { useState } from "react"
import { authenticate, signIn } from "../../api/userApi";
import {useNavigate} from "react-router-dom"
import { AiFillFacebook } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";


const SignIn =()=>{

    const navigate= useNavigate()
    const [values,setValues] =useState({
        email:"omjikush09@gmail.com",
        password:"123456789",
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
                    navigate(`/${user.user.username}`)
                }, 1000);
            }
        })
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
                    <h1 className="text-center">Instagram</h1>
                    <form onSubmit={submit} className="form">
                    <div className="form_input-group">
                    <input className="form_input-text" type="email" placeholder="Email"  required id="email"  name="email" onChange={handleChange} value={email} />
                    <label htmlFor="email" className="form_input-label">Email</label>
                    </div>
                    <div className="form_input-group">
                    <input  className="form_input-text" type="password" placeholder="Password" required id="password" name="password" onChange={handleChange} value={password} />
                    <label htmlFor="password" className="form_input-label">Password</label>
                    </div>
                    <button className="form_button" >Log In</button>
                    </form>

                    <div className="signup_line">
                       
                        <span className="signup_line-span">OR</span>
                      
                    </div>
                  <Link to="/" className="link" >

                    <div className="login-With-Facebook">

                    <IconContext.Provider  value={{ color: 'blue',size:"1.2rem" }}>

                    <AiFillFacebook/>

                </IconContext.Provider>
                <span className="lo">
                    Log in with Facebook
                </span>                  
                    </div>
                  </Link>
                  
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


export default SignIn;



