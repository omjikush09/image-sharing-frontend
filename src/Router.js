import React from "react";
import { BrowserRouter ,Routes,Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Profile from "./pages/Profile.js";
import SignUp from "./pages/Signup/Signup";
import SignIn from "./pages/Signin/Signin.js";
import UserHome from "./pages/UserHome.js";

const Router=()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/signup" element={<SignUp/>} />
                {/* <Route path="/:username" element={} /> */}
                {/* <Route path="/" element={<Profile/>} /> */}
              

                <Route path='/:username' element={<PrivateRoutes><Profile/></PrivateRoutes>}/>
                <Route path='/' element={<PrivateRoutes><UserHome/></PrivateRoutes>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;


