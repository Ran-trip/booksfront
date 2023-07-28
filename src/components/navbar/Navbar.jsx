import React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <Link to="/" className="logo" > Books </Link>
      <div className="menu" onClick={() => setMenuOpen(menuOpen => !menuOpen)} >
        <span></span>
        <span></span>
        <span></span>
      </div>        
        <ul className={menuOpen ? "open" : ""}>
            <li> <NavLink to="/" className='title'>Accueil</NavLink> </li>
            <li> <NavLink to="/livres">Livres</NavLink> </li>
            <li> <NavLink to="/contact"> Contact</NavLink> </li>
            <li> <NavLink to="/creationaccount">Créer un compte</NavLink> </li>
            <li> <NavLink to="/login">Login</NavLink> </li>
        </ul>
    </nav>
  )
};

export default Navbar;