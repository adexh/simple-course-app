import React from "react";
import { useNavigate } from "react-router-dom";
const env = import.meta.env;

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("");

    const signIn = async () => {
      let options = {
        method : 'POST',
        headers: {
          "username": email,
          "password": pass
        }
      }
      let resp = await fetch(env.VITE_API + '/admin/login',options);
      let resp_status = resp.status;
      resp = await resp.json();
      if(resp_status !== 201){
        console.log(resp);
        alert(resp.message);
      }
      localStorage.setItem('token',resp.token);
      navigate('/courses',{replace:true});
    }

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