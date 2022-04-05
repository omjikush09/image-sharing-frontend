import {LOGOUT,LOGIN} from "./action-types";


export const logout=()=>({
    type:LOGOUT,
    payload:""
})

export const login=(user)=>({
    type:LOGIN,
    payload:user
}) 