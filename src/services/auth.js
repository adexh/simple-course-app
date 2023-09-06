import axios from "axios";

const env = import.meta.env;

export const authService = async() => {
  try {
    const request = await axios.get(`${env.VITE_API}/user/auth`,{
      withCredentials:true
    })
    if(request.status === 200){
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if(error && error.response && error.response.status && error.response.status === 401){
      console.debug("401 unauthorized");
      return false;
    }
    else {
      console.log("ERROR from auth service : ",error);
    }
  }
}