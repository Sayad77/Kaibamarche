import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Accueil() {
  const [cartesEnVedette, setCartesEnVedette] = useState([]);
  const [encheresRecentes, setEncheresRecentes] = useState([]);

  useEffect(() => {
    // Simulation de chargement des données depuis localStorage
    const cartes = JSON.parse(localStorage.getItem('cartes')) || [];
    const encheres = JSON.parse(localStorage.getItem('encheres')) || [];
    
    setCartesEnVedette(cartes.slice(0, 4));
    setEncheresRecentes(encheres.slice(0, 3));
  }, []);

  return (
    <div className="accueil-page">
      <section className="hero">
        <h1>Bienvenue sur Yu-Gi-Oh Exchange</h1>
        <p>La plateforme d'échange et d'enchères de cartes Yu-Gi-Oh</p>
        <div className="cta-buttons">
          <Link to="/encheres" className="btn btn-primary">Voir les enchères</Link>
          <Link to="/inscription" className="btn btn-secondary">Créer un compte</Link>
        </div>
      </section>

      <section className="featured-cards">
        <h2>Cartes en vedette</h2>
        <div className="cards-grid">
          {cartesEnVedette.map(carte => (
            <div key={carte.id} className="card-item">
              <img src={carte.image || "/placeholder-card.jpg"} alt={carte.nom} />
              <h3>{carte.nom}</h3>
              <Link to={`/carte/${carte.id}`}>Voir détails</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="recent-auctions">
        <h2>Enchères récentes</h2>
        <div className="auctions-list">
          {encheresRecentes.map(enchere => (
            <div key={enchere.id} className="auction-item">
              <h3>{enchere.titre}</h3>
              <p>Prix actuel: {enchere.prixActuel}€</p>
              <p>Fin: {new Date(enchere.dateFin).toLocaleDateString()}</p>
              <Link to={`/encheres#${enchere.id}`}>Participer</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Accueil;