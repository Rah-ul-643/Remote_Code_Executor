
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Feed from "./pages/feed2";
import Front from "./pages/front";
import Test from "./components/test";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css";

function App() {
  const user=false
  return (
    <Router>
         <Routes>
         <Route path ="/" element={<Front/>} > </Route>
            <Route path="/start" element={user ? <Test/> : <Test/>} ></Route>
            <Route path="/login" element={user ? <Front/> : <Login/>} ></Route>
            <Route path="/register" element={user ? <Front/> : <Register/>} ></Route>

         </Routes>
       </Router>
  );
}

export default App;
