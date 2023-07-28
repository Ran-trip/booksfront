import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import CreationAccount from "./pages/creationAccount/CreationAccount";
import Livres from "./pages/livres/Livres";
import Login from "./pages/login/Login";
import User from "./pages/user/User";
import Nofound from "./pages/noFound/NoFound";
import Admin from "./pages/admin/Admin";
import Disconnected from "./pages/disconnected/Disconnected";
import Navbar from "./components/navbar/Navbar";

import './index.css';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
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
