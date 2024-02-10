import "./register.css"
import { sendOtp,register } from "../../services/authAPIs"
import { useState } from "react";
export default function Register() {

const [formData,setFormData] = useState({
  name: "",
  username: "",
  email: "",
  password: "",
  password2: "",
  otp: ""
});
const changeHandler = (e) => {
  setFormData({
      ...formData,
      [e.target.name]: e.target.value
  }
  );
}

const sendOtpHandler = (e)=>{
        e.preventDefault();
        try{
          if(formData.email === "") throw new Error("Email is required");
          sendOtp(formData.email);
          console.log("Sending OTP...");
        }
        catch(error){
          console.log("Failed to send OTP", error);
        }
}
const submitHandler = (e) => {
  e.preventDefault();
  console.log(formData);

  try{
      register(formData);
  }
  catch(error){
      console.log("Error in signup",error);
  }
}

    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={submitHandler}>
        <label>Name</label>
        <input className="registerInput" name="name" onChange={changeHandler} value={formData.name} placeholder="Enter name..." type="text" />
        <label>Username</label>
        <input className="registerInput" name="username" onChange={changeHandler} value={formData.username} type="text" placeholder="Enter your username..." />
        <label>Email</label>
        <input className="registerInput" name="email" onChange={changeHandler} value={formData.email} type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="registerInput" name="password" onChange={changeHandler} value={formData.password} type="password" placeholder="Enter your password..." />
        <label>Confirm Password</label>
        <input className="registerInput" name="password2" onChange={changeHandler} value={formData.password2} type="password" placeholder="Confirm your password..." />
        <div>
          <label>OTP</label>
          <input className="registerInput" name="otp" value={formData.otp} onChange={changeHandler} type="text" placeholder="Enter OTP..." />
          <button className="otpButton" onClick={sendOtpHandler}>Send OTP</button>
        </div>
        <button className="registerButton" type="submit">Register</button>

      </form>

    </div>
    )
}
