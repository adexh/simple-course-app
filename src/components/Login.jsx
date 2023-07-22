import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../contexts/auth_context";
import checkAuth from "../service/auth_service";
const env = import.meta.env;
import axios from 'axios';

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const navigate = useNavigate();
    const { setAuthenticated } = useSessionContext();
    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("");

    const signIn = async () => {
      let options = {
        headers: {
          "username": email,
          "password": pass
        }
      }
      let resp=null;
      try {
        resp = await axios.post(env.VITE_API + '/admin/login',options);
        console.log("login :",resp);
        if( resp.status !== 201){
          console.log(resp);
          alert(resp.message);
        } else {
          setAuthenticated(true);
          localStorage.setItem('token',resp.data.token);
          navigate('/logged/courses',{replace:true});
        }
      } catch (error) {
        console.error(error);
        alert("Some Error ",error.message);
      }
    }
    useEffect(()=>{
      checkAuth().then(isAuth=>{
        console.log("Checking auth in Login useEffect",isAuth);
        setAuthenticated(isAuth);
        if(isAuth){
          return navigate('/logged/courses',{replace:true});
        } else {
          console.log("Problem here");
          //localStorage.removeItem('token');
        }
      });

    },[])

    return <div>
        <h1>Login to admin dashboard</h1>
        <br/>
        Email - <input type={"text"} onChange={e => setEmail(e.target.value)} />
        <br />
        Pass - <input type={"password"} onChange={e => setPass(e.target.value)} />
        <br/>
        <button onClick={signIn}>Login</button>
        <br/>
        New here? <a href="/register">Register</a>
    </div>
}

export default Login;