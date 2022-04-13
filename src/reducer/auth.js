import { LOGOUT,LOGIN,GOOGLELOGIN, ADDDETAIL } from "../action/action-types";



const initialState={}

 const auth= (state=initialState,action)=>{
     
    const a=action.payload
    switch(action.type){
        case LOGOUT:
            return {}
        case GOOGLELOGIN:
            
            
            return {fullname:a?.profileObj.name,
            username: "",
            profileImage: a?.profileObj.imageUrl,
            isLoading: "",
            error: a?.error,
            id:a?.googleId}
        case LOGIN:
            console.log(a);
            return {...state,...a}
        case ADDDETAIL:
           
            return {}
        default :
        return {}
    }
}
export default auth;


