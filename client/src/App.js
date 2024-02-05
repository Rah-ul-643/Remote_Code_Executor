
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Feed from "./pages/feed2";
import Front from "./pages/front";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const user=false
  return (
    <Router>
         <Routes>
         <Route path ="/" element={<Front/>} > </Route>
            <Route path="/start" element={user ? <Front/> : <Feed/>} ></Route>
            <Route path="/login" element={user ? <Front/> : <Login/>} ></Route>
            <Route path="/register" element={user ? <Front/> : <Register/>} ></Route>

         </Routes>
       </Router>
  );
}

export default App;
