import "./index.css"
import { useState, useEffect } from "react";
import {FireBase} from "../../Config/firebase"
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

function Login() {
  const [email,setuname] = useState("")
  const [psw,setpsw] = useState("")
  const navigate = useNavigate();

  const HandleLogin = () => {
    const authentication = getAuth(FireBase);
    signInWithEmailAndPassword(authentication, email, psw)
        .then((response) => {
          navigate("/")
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
      })
  }
  
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (authToken) {
      navigate('/')
    } 

    if (!authToken) {
      navigate('/login')
    }
  }, [])

  return (
    <div className="login">
      <div className="login-container">
        <label for="uname"><b>Email</b></label>
        <input type="email" onChange={(e)=>setuname(e.target.value)} placeholder="Enter Email" name="email" required />
        <label for="psw"><b>Password</b></label>
        <input type="password" onChange={(e)=>setpsw(e.target.value)} placeholder="Enter Password" name="psw" required />
        <button onClick={()=> HandleLogin()} type="submit">Login</button>
        {/* <label>
          <input type="checkbox" checked="checked" name="remember" /> Remember me
        </label> */}
      </div>
      <div className="container" style={{backgroundColor:"#f1f1f1"}}>
        <button type="button" className="cancelbtn">Cancel</button>
        <span className="psw">Forgot <a href="#">password?</a></span>
      </div>
    </div>
  );
}

export default Login;
