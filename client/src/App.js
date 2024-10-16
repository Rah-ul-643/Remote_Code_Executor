import Login from "./pages/Login";
import Register from "./pages/Register";
import Front from "./pages/Front";
import CodeIDE from "./pages/CodeIDE";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);

  return (

    <Router>
         <Routes>
            <Route path ="/" element={<Front setIsLoggedIn={setIsLoggedIn}/>} > </Route>
            <Route path="/editor" element={isLoggedIn ? <CodeIDE/> : <Login setIsLoggedIn={setIsLoggedIn}/>} ></Route>
            <Route path="/login" element={isLoggedIn ? <Front setIsLoggedIn={setIsLoggedIn}/> : <Login setIsLoggedIn={setIsLoggedIn}/>} ></Route>
            <Route path="/register" element={<Register/>} ></Route>
         </Routes>
       </Router>
  );
}

export default App;