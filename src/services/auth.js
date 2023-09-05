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
    if(error.response.status && error.response.status === 401)
      return false;
    else
      console.log("ERROR from auth service : ",error);
  }
}