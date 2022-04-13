import {LOGOUT,LOGIN,GOOGLELOGIN,ADDDETAIL} from "./action-types";


export const logout=()=>({
    type:LOGOUT,
    payload:""
})

export const login=(user)=>({
    type:LOGIN,
    payload:user
}) 

export const googleLoigin=(user)=>({
    type:GOOGLELOGIN,
    payload:user
})

export const addDetail=(user)=>({
    type:ADDDETAIL,
    payload:user
})