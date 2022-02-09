import React from "react";
import {Navigate} from "react-router-dom";
import { isauthentcated } from "./api/userApi";

const PrivateRoutes=({children})=>{

    
    return isauthentcated() ? (
        children
    ):(
       <Navigate to={"/signin"}/>
    )
}

export default PrivateRoutes;