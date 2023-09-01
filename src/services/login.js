import axios from "axios"

const env = import.meta.env;

export const loginService = async(userCredentials) => {
  const request = await axios.get(`${env.VITE_API}/user/userLogin`,{
    headers : {
      username : userCredentials.email,
      password : userCredentials.password
    }
  })
  console.log(request);
  return request;
}