import axios from "axios";
const env = import.meta.env;

async function removeFromCart (id){
  let resp = null;
  try {
    resp = await axios.post(env.VITE_API + '/courses/deleteFromcart',{itemId:id},{
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

export default removeFromCart;