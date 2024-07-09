import "./login.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../../services/apiConnector";
import { endpoints } from "../../services/apis";
import { useNavigate } from "react-router-dom";


const Login = ({setIsLoggedIn}) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    const toastId = toast.loading("Logging In");

    try {
      const response = await apiConnector("POST", endpoints.LOGIN_API, formData);
      console.log(response.data);

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem('token', JSON.stringify(token));
        setIsLoggedIn(true);
        toast.success("Successfully logged in");
        navigate('/');

      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
        navigate('/login')                          // api sends an object {user, success, message}
      }

    } catch (error) {
      console.log("Login Error", error);
      toast.error(`Oops! Server Issue :( \n Lemme fix it in a minute...`)
    }
    finally {
      setFormData({
        username: "",
        password: "",
      })
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={submitHandler}>
        <label>Username</label>
        <input className="loginInput" name="username" onChange={changeHandler} value={formData.username} type="text" placeholder="Enter your username..." />
        <label>Password</label>
        <input className="loginInput" name="password" onChange={changeHandler} value={formData.password} type="password" placeholder="Enter your password..." />
        <button className="loginButton" type="submit" >Login</button>
      </form>
    </div>
  );
}

export default Login;
