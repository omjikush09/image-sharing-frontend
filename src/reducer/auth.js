import { LOGOUT,LOGIN } from "../action/action-types";

const initialState={}

 const auth= (state=initialState,action)=>{
    const a=action.payload
    switch(action.type){
        case LOGOUT:
            return {}
        case LOGIN:
            console.log(a);
            return {...state,...a}
        default :
        return {}
    }
}
export default auth;


