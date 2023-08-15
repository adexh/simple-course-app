import React from "react";
const env = import.meta.env;
/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("");

    const signUp = async ()=>{
      let options = {
        method : 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          "username": email,
          "password": pass
        })
      }
      fetch(env.VITE_API + '/admin/signup',options).then(resp => resp.json()).then(data=>{
        if(data.status !== 'success'){
          alert(data.message);
        } else { 
          console.log(data.token);
          localStorage.setItem('token',data.token);
        }
      })
    }

    return <div>
        <h1>Register to the website</h1>
        <br/>
        <label htmlFor="admin-user">Username </label>
        <input id="admin-user" type={"text"} onChange={e => setEmail(e.target.value)} />
        <br />
        <label htmlFor="admin-pass">Password </label>
        <input id="admin-pass" type={"password"} onChange={e => setPass(e.target.value)}/>
        <br />
        <button onClick={signUp}>Sign up</button>
        <label htmlFor=""></label>
        <br/>
        Already a user? <a href="/login">Login</a>
    </div>
}

export default Register;