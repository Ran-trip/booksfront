import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import CreationAccount from "./pages/CreationAccount";
import Livres from "./pages/Livres";
import Login from "./pages/Login";
import User from "./pages/User";
import Nofound from "./pages/NoFound";
import Admin from "./pages/Admin";
import Disconnected from "./pages/Disconnected";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element= {<Home/>}/>
          <Route path="/contact" element= {<Contact/>}/>
          <Route path="/creationaccount" element= {<CreationAccount/>}/>
          <Route path="/livres" element= {<Livres/>}/>
          <Route path="/login" element= {<Login/>}/>
          <Route path="/user" element= {<User/>}/>
          <Route path="/nofound" element= {<Nofound/>}/>
          <Route path="/admin" element= {<Admin/>}/>
          <Route path="/disconnected" element= {<Disconnected/>}/>             
        </Routes>
      </Router>
    </div>
  );
}

export default App;
