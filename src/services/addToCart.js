import axios from "axios";
const env = import.meta.env;

async function addToCart (id){
  let resp = null;
  try {
    resp = await axios.post(env.VITE_API + '/courses/addToCart',{itemId:id},{
      withCredentials:true
    });
    if(resp.status === 200){
      return resp.data;
    }
  } catch (error) {
    console.log(error);
    if(error.response && error.response.status == 409){
      alert("Product present in Cart !");
    }
    return error;
  }
}

export default addToCart;