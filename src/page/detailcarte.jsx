import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function DetailCarte() {
    const { id } = useParams();
    const [carte, setCarte] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [encheresLiees, setEncheresLiees] = useState([]);
  
    useEffect(() => {
      // Simulation de récupération de données depuis localStorage
      const fetchCarte = () => {
        try {
          const cartes = JSON.parse(localStorage.getItem('cartes')) || [];
          const carteFound = cartes.find(c => c.id === parseInt(id) || c.id === id);
          
          if (carteFound) {
            setCarte(carteFound);
            
            // Récupération des enchères liées à cette carte
            const encheres = JSON.parse(localStorage.getItem('encheres')) || [];
            const encheresForCard = encheres.filter(e => e.carteId === carteFound.id);
            setEncheresLiees(encheresForCard);
          } else {
            setError('Carte non trouvée');
          }
        } catch (err) {
          setError('Erreur lors du chargement des données');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCarte();
    }, [id]);
  
    if (loading) {
      return <div className="loading">Chargement...</div>;
    }
  
    if (error) {
      return <div className="error">{error}</div>;
    }
  
    if (!carte) {
      return <div className="not-found">Carte non trouvée</div>;
    }
  
  return (
    <div className="detail-carte-page">
    <div className="carte-detail">
      <div className="carte-image">
        <img src={carte.image || "/placeholder-card.jpg"} alt={carte.nom} />
      </div>
      
      <div className="carte-info">
        <h1>{carte.nom}</h1>
        
        <div className="stats">
          <div className="stat-group">
            <span className="stat-label">Type:</span>
            <span className="stat-value">{carte.type}</span>
          </div>
          
          <div className="stat-group">
            <span className="stat-label">Attribut:</span>
            <span className="stat-value">{carte.attribut}</span>
          </div>
          
          <div className="stat-group">
            <span className="stat-label">Niveau/Rang:</span>
            <span className="stat-value">{carte.niveau}</span>
          </div>
          
          {carte.atk !== undefined && (
            <div className="stat-group">
              <span className="stat-label">ATK:</span>
              <span className="stat-value">{carte.atk}</span>
            </div>
          )}
          
          {carte.def !== undefined && (
            <div className="stat-group">
              <span className="stat-label">DEF:</span>
              <span className="stat-value">{carte.def}</span>
            </div>
          )}
          
          <div className="stat-group">
            <span className="stat-label">Rareté:</span>
            <span className="stat-value">{carte.rarete}</span>
          </div>
        </div>
        
        <div className="description">
          <h3>Description</h3>
          <p>{carte.description}</p>
        </div>
      </div>
    </div>
    
    {encheresLiees.length > 0 && (
      <div className="encheres-liees">
        <h2>Enchères disponibles pour cette carte</h2>
        <div className="encheres-liste">
          {encheresLiees.map(enchere => (
            <div key={enchere.id} className="enchere-item">
              <h3>{enchere.titre}</h3>
              <p>Prix actuel: {enchere.prixActuel}€</p>
              <p>Fin: {new Date(enchere.dateFin).toLocaleDateString()}</p>
              <Link to={`/encheres#${enchere.id}`} className="btn btn-primary">Voir l'enchère</Link>
            </div>
          ))}
        </div>
      </div>
    )}
    
    <div className="carte-actions">
      <Link to="/" className="btn btn-secondary">Retour à l'accueil</Link>
    </div>
  </div>
);
}
export default detailcarte
