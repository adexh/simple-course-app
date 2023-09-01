import axios from "axios";
const env = import.meta.env;

async function getCartItems (){
  let options = {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('token'),
    }
  }
  let resp = null;
  try {
    resp = await axios.get(env.VITE_API + '/',null,options);
    if(resp.status === 200){
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default checkAuth;