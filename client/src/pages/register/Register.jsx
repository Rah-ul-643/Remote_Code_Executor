import "./register.css"
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../services/apiConnector";
import { endpoints } from "../../services/apis";



export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    password2: "",

  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    }
    );
  }

 
  const submitHandler = async (e) => {
    e.preventDefault();

    if (formData.password === formData.password2) {
      const toastId = toast.loading('Registering User...');

      try {
        const response = await apiConnector("POST", endpoints.SIGNUP_API, formData);

        console.log(response.data);

        if (response.data.success) {                   // api sends an object {success,message}
          toast.success(response.data.message);
          navigate('/login');

        } else {
          toast.error(response.data.message);
        }



      } catch (error) {
        console.log("signup Error", error);
        toast.error(`Oops! Server Issue :( \n Lemme fix it in a minute...`);

      }
      finally {
        setFormData({
          name: "",
          username: "",
          password: "",
          password2: "",
      
        })
        toast.dismiss(toastId);
      }
    }

    else {
      toast.error("Password does not match");
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={submitHandler}>
        <label>Name</label>
        <input className="registerInput" name="name" onChange={changeHandler} value={formData.name} placeholder="Enter name..." type="text" />
        <label>Username</label>
        <input className="registerInput" name="username" onChange={changeHandler} value={formData.username} type="text" placeholder="Enter your username..." />
        <label>Password</label>
        <input className="registerInput" name="password" onChange={changeHandler} value={formData.password} type="password" placeholder="Enter your password..." />
        <label>Confirm Password</label>
        <input className="registerInput" name="password2" onChange={changeHandler} value={formData.password2} type="password" placeholder="Confirm your password..." />

        <button className="registerButton" type="submit">Register</button>

      </form>

    </div>
  )
}
