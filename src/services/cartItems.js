import axios from "axios";
const env = import.meta.env;

async function getCartItems (){
  let resp = null;
  try {
    resp = await axios.get(env.VITE_API + '/courses/displayCart',{
      withCredentials:true
    });
    if(resp.status === 200){
      return resp.data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default getCartItems;