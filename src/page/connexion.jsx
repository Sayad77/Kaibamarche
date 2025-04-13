import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function connexion() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Vérification basique
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    // Simulation d'authentification avec localStorage
    const users = JSON.parse(localStorage.getItem('utilisateurs')) || [];
    const user = users.find(u => u.email === email);
    
    if (user && user.password === password) {
      // Dans une vraie application, utilisez une méthode plus sécurisée pour l'authentification
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/profil');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };


  return (
    <div className="connexion-page">
    <h1>Connexion</h1>
    
    {error && <div className="error-message">{error}</div>}
    
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Mot de passe:</label>
        <input 
          type="password" 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" className="btn btn-primary">Se connecter</button>
    </form>
    
    <div className="form-footer">
      <p>Pas encore de compte? <Link to="/inscription">S'inscrire</Link></p>
      <p><Link to="/support">Mot de passe oublié?</Link></p>
    </div>
  </div>
);
}

export default connexion
