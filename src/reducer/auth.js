import { LOGOUT,LOGIN,GOOGLELOGIN } from "../action/action-types";
import { googleLogin } from './../api/userApi';

const initialState={}

 const auth= (state=initialState,action)=>{
    const a=action.payload
    switch(action.type){
        case LOGOUT:
            return {}
        case GOOGLELOGIN:
            localStorage.setItem("jwt",JSON.stringify(a.tokenId))
            googleLogin({email:a.profileObj.email,id:a.profileObj.googleId,profileImage:a.profileObj.imageUrl,fullname:a.profileObj.name}).catch(res=>{
                console.log(res)
                return {}
            }).then(res=>{
                localStorage.setItem("_id",JSON.stringify(res._id))
            })
            return {fullname:a.profileObj.name,
            username: "",
            profileImage: a.profileObj.imageUrl,
            isLoading: "",
            error: "",
            id:a.googleId}
        case LOGIN:
            console.log(a);
            return {...state,...a}
        default :
        return {}
    }
}
export default auth;


