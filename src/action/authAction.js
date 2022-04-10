import {LOGOUT,LOGIN,GOOGLELOGIN} from "./action-types";


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