

import "./login.css";

const Login=()=>{
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" >
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your email..." />
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..."  />
        <button className="loginButton" type="submit"  >Login</button>
      </form>
    </div>
  );
}

export default Login;
