import Axios from "axios";
import API from "../backend"
export const signUp=({firstname,lastname,email,password,gender})=>{
    console.log(API)
    // console.log(JSON.stringify())
    return Axios.post(`${API}/signup`,{
        firstname,lastname,gender,password,email
    }).then(user=>{
        console.log(user.data)
        return user.data
    }).catch(e=>{
        console.log(e)
        try{
            console.log(e.response.data)
        }catch(error){
            console.log("nothing",error)
        }
        if(e.error){
            console.log(e.error.message)
            return {error:e.error}
        }
        if(e.response){
            // return e.response.data
            return {error:"Something went wrong"}
        }else{
            return {error:"Something went wrong"}
        }
    })
}

export const signIn=({email,password})=>{
    return Axios.post(`${API}/signin`,{email,password})
    .then(user =>{
        return user.data
    })
    .catch(e=>{
        if(e.response){
            return e.response.data
        }else{
            return {error:"Something went wrong"}
        }
    })
}

export const getUser=(username)=>{
    return Axios.get(`${API}/user/username/${username}`)
    .then(res=>{
        console.log(res.data);
        return res.data
    }).catch(e=>{
        if(e.response){
            return e.response.data
        }else{
            return {error:"Something went wrong"};
        }
    })
}

export const isauthentcated=()=>{
    if(typeof window =="undefined"){
        return false
    }
    if(localStorage.getItem("jwt") && localStorage.getItem("_id")){
        return true;
    }else{
        return false
    }
}



export const authenticate =(data)=>{
    if(typeof window !=="undefined"){
        console.log(data);
        localStorage.setItem("jwt",JSON.stringify(data.token))
        localStorage.setItem("_id",JSON.stringify(data.user._id))
    }
}

export const getUserthroughId=({userId})=>{
   
    return Axios.get(`${API}/user/${userId}`,{headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt"))}`}})
    .then(res =>{
        return res.data;
    })
    .catch(e =>{
        if(e.response){
            return e.response.data
        }else{
            return {error:"Something went wrong"}
        }
    })
}

export const getPost=({userid})=>{
    return Axios.get(`${API}/getpost/${userid}`,{
        headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
        }
    })
    .then(res=>{
        return res.data
    }).catch(e=>{
        if(e.response){
            return e.response.data
        }else{
            return {error:"Something went wrong"};
        }
    })
}

export const home=()=>{
    
    
}

export const addfollowing=({userid,addfollowingId})=>{
    console.log(userid);
    console.log(addfollowingId);
    return(
        Axios.put(`${API}/addfollowing/${userid}`,{
            id:addfollowingId
        },{headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
        }})
        .then(res =>{
            return res.data
        }).catch(e=>{
            if(e.response){
                return e.response.data
            }else{
                return {error:"Something went wrong"};
            }
        })
    )
}


