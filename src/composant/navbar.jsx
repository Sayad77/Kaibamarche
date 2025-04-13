import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Yu-Gi-Oh Exchange</Link>
    <div>
      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/encheres">Enchères</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {/* <li><Link to="/support">Support</Link></li> */}
      </ul>
      </div>

      <div className="nav-auth">
        <Link to="/connexion">Connexion</Link>
        <Link to="/inscription">Inscription</Link>
        <Link to="/profil">Mon Profil</Link>
        <Link to="/notifications">Notifications</Link>
        </div>
        </div></nav>
      );
}

export default Navbar;
