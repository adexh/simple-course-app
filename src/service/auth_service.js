import axios from "axios";
const env = import.meta.env;

async function checkAuth (){
  if(localStorage.getItem('token')===null || localStorage.getItem('token').length === 0){
    console.log("No token set");
    return false;
  }
  let options = {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem('token'),
    }
  }
  let resp = null;
  try {
    resp = await axios.post(env.VITE_API + '/admin/tokenVerify',null,options);
    if(resp.status === 200){
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default checkAuth;