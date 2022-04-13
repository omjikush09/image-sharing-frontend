import React from "react";
import { BrowserRouter ,Routes,Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Profile from "./pages/Profile/Profile.js";
import SignUp from "./pages/Signup/Signup";
import SignIn from "./pages/Signin/Signin.js";
import UserHome from "./pages/Home/UserHome.js";
//redux
import { Provider } from "react-redux";
import store from "./redux-store/store";
import Navbar from "./components/navbar/Navbar";
import Detail from "./pages/Detail/Detail";

const Router=()=>{
    return (
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/signup" element={<SignUp/>} />
                {/* <Route path="/:username" element={} /> */}
                {/* <Route path="/" element={<Profile/>} /> */}
                <Route path="/adddetail" element={<PrivateRoutes><Detail/></PrivateRoutes>}/>
                <Route path="/" element={<PrivateRoutes><Navbar/></PrivateRoutes>}>
                <Route path=':username' element={<PrivateRoutes><Profile/></PrivateRoutes>}/>
                <Route path='' element={<PrivateRoutes><UserHome/></PrivateRoutes>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        </Provider>
    )
}

export default Router;


 