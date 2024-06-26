import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Front from "./pages/front";
import CodeS from "./components/CodeIDE";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";


function App() {
  const user=window.localStorage.getItem('token');
  return (

    <Router>
         <Routes>
         <Route path ="/" element={<Front/>} > </Route>
            <Route path="/start" element={user ? <CodeS/> : <Login/>} ></Route>
            <Route path="/login" element={user ? <Front/> : <Login/>} ></Route>
            <Route path="/register" element={user ? <Front/> : <Register/>} ></Route>

         </Routes>
       </Router>
  );
}

export default App;