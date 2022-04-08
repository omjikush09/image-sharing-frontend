import axios from "axios"

import API from "../backend"

export const Upload=(file)=>{
    
    
    return axios.post(`https://api.cloudinary.com/v1_1/omji/image/upload`,file)
    .then(response=>{
        console.log(response)
        console.log("here")
        if(response.data.secure_url){
            var url=response.data.secure_url
            console.log(url)
            return SendImageUrlToDb(url).then(res=>{
                console.log(res)
                console.log("here 2")
                return res;
            })
        }else{
            console.log("here 3")
            return response.data
        }
    }).catch(e=>{
        console.log(e)
        if(e.respone){
            console.log("error 1")
            return e.respone
        }
        else{
            console.log("error 2")
            return Promise.reject({error:"Something went wrong"})
        }
    })
}


export const SendImageUrlToDb=(url)=>{
    const tempid=JSON.parse(localStorage.getItem("_id"))
    let id="";
    if(tempid){
         id=tempid;
    }else {
        return Promise.reject({error:"User is not found it's frontend"})
    }
    return  axios.post(`${API}/image/imageupload/${id}`,{url},{
                
        headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
        }
    }).then(res=>{
        console.log(res)
        return res.data
    }).catch(e=>{
        console.log(e)
        if(e.response){
            return e.respone.data
        }
        return Promise.reject(e)
    })
}



//Like api 
export const likePost=(userId,postId)=>{
    return axios.post(`${API}/likepost/${userId}`,{postId},{
        headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
        }
    }).then(res=>{
        return Promise.resolve(res.data)
    }).catch(err=>{
        return Promise.reject(err)
    })
}
export const unlikePost=(userId,postId)=>{
    return axios.post(`${API}/unlikepost/${userId}`,{postId},{
    headers:{
        Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
    }}
    ).then(res=>{
        return Promise.resolve(res.data)
    }).catch(err=>{
        return Promise.reject(err)
    })
}


//Add Comment

export const addcomment=(comment,userId,postId,username)=>{
    return axios.post(`${API}/addcomment/${userId}`,{comment,userId,postId,username},{
        headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
        }
    }).then(res=>{
        return Promise.resolve(res.data)
    }).catch(res=>{
        return Promise.reject(res)
    })
}

//getCommment

export const getComment=(comments,userId)=>{
    console.log(userId)
    return axios.post(`${API}/getcomments/${userId}`,{comments},{
        headers:{
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
        }
    }).then(res=>{
        return Promise.resolve(res.data)
    }).catch(res=>{
        return Promise.reject(res)
    })
}