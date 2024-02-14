import "./login.css";
import { useState } from "react";
import { login } from "../../services/authAPIs";
import {useDispatch} from "react-redux"


const Login=()=>{
  const dispatch = useDispatch();
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  });
  const changeHandler = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    }
    );
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    try{
        login(formData,dispatch);
    }
    catch(error){
        console.log("Error in login",error);
    }
  }
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={submitHandler}>
        <label>Email</label>
        <input className="loginInput" name="email" onChange={changeHandler} value={formData.email} type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="loginInput" name="password" onChange={changeHandler} value={formData.password} type="password" placeholder="Enter your password..."  />
        <button className="loginButton" type="submit"  >Login</button>
      </form>
    </div>
  );
}

export default Login;
