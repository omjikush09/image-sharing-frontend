import Axios from "axios";
import jwt from "jsonwebtoken"
import API from "../backend";

Axios.interceptors.request.use((config)=>{

  let {payload}=jwt.decode(JSON.parse(localStorage.getItem("jwt")))
  console.log(payload)


  return config
})

export const signUp = ({ fullname, email, password,username }) => {
  console.log(API);
  // console.log(JSON.stringify())
  return Axios.post(`${API}/signup`, {
    fullname,
  
    password,
    email,
    username
  })
    .then((user) => {
      console.log(user.data);
      return user.data;
    })
    .catch((e) => {
      console.log(e);
      try {
        console.log(e.response.data);
      } catch (error) {
        console.log("nothing", error);
      }
      if (e.error) {
        console.log(e.error.message);
        return { error: e.error };
      }
      if (e.response) {
        // return e.response.data
        return { error: "Something went wrong" };
      } else {
        return { error: "Something went wrong" };
      }
    });
};
export const googleLogin = ({ fullname, email, password,id ,profileImage}) => {
  console.log(API);
  // console.log(JSON.stringify())
  return Axios.post(`${API}/googlelogin`, {
    fullname,
   id,
    password,
    email,
    profileImage
  })
    .then((user) => {
      console.log(user.data);
      return user.data;
    })
    .catch((e) => {
      console.log(e);
      try {
        console.log(e.response.data);
      } catch (error) {
        console.log("nothing", error);
      }
      if (e.error) {
        console.log(e.error.message);
        return { error: e.error };
      }
      if (e.response) {
        // return e.response.data
        return Promise.reject({ error: "Something went wrong" });
      } else {
        return Promise.reject({ error: "Something went wrong" });
      }
    });
};

export const signIn = ({ email, password }) => {
  return Axios.post(`${API}/signin`, { email, password })
    .then((user) => {
      return user.data;
    })
    .catch((e) => {
      if (e.response) {
        return e.response.data;
      } else {
        return { error: "Something went wrong" };
      }
    });
};

export const getUser = (username) => {
  return Axios.get(`${API}/user/username/${username}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      if (e.response) {
        return e.response.data;
      } else {
        return { error: "Something went wrong" };
      }
    });
};

export const checkUsername =(username)=>{
  
  return Axios.post(`${API}/checkusername`,{username}).then(res=>{
    return res.data
  }).catch(res=>{
   
    if(res.response.data){
      return Promise.reject(res.response.data)
    }else{
      return Promise.reject({error:"Something went wrong"})
    }
  })
}


export const isauthentcated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt") && localStorage.getItem("_id")) {
    return true;
  } else {
    return false;
  }
};

export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    console.log(data);
    localStorage.setItem("jwt", JSON.stringify(data.token));
    localStorage.setItem("_id", JSON.stringify(data.user._id));
  }
};

export const getUserthroughId = ({ userId }) => {
  return Axios.get(`${API}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      if (e.response) {
        return e.response.data;
      } else {
        return { error: "Something went wrong" };
      }
    });
};

export const getPost = ({ userid }) => {
  return Axios.get(`${API}/getpost/${userid}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      if (e.response) {
        return e.response.data;
      } else {
        return Promise.reject( { error: "Something went wrong" });
      }
    });
};

export const home = () => {};

export const addfollowing = ({ userid, addfollowingId }) => {
 
  return Axios.put(
    `${API}/addfollowing/${userid}`,
    {
      id: addfollowingId,
    },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
      }
    }
  )
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      if (e.response) {
        return e.response.data;
      } else {
        return { error: "Something went wrong" };
      }
    });
};

export const getUserList = (username) => {
  const tempid = JSON.parse(localStorage.getItem("_id"));
  // console.log(tempid)
  // console.log(JSON.parse(localStorage.getItem("jwt")))
  var id = null;
  // console.log(username)
  if (tempid) {
    id = tempid;
  } else {
    return Promise.reject({ error: "Try to Login again" });
  }
  return Axios.post(`${API}/getUsernameList/${id}`, {username},{headers:{
        Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
      }
  }).then(res=>{
      return res.data
  }).catch(res=>{
      return Promise.reject({error:"Something went wrong"})
  })
};


export const redirect=()=>{
  
}

export const updateProfile=(username)=>{
  const id = JSON.parse(localStorage.getItem("_id"));
  return Axios.put(`${API}/addusername/${id}`,{username},{
      headers:{
          Authorization:`Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
      }
  }).then(res=>{return res.data})
  .catch(res=>{
      return Promise.reject({error:"Something went wrong"})
  })
}