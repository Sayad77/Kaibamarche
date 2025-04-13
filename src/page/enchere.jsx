import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Enchere() {
    const [encheres, setEncheres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtreActif, setFiltreActif] = useState('toutes');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [enchereMontant, setEnchereMontant] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    useEffect(() => {
      // Vérifier si l'utilisateur est connecté
      const currentUser = localStorage.getItem('currentUser');
      setIsLoggedIn(!!currentUser);
      
      // Charger les enchères depuis localStorage
      const encheresData = JSON.parse(localStorage.getItem('encheres')) || [];
      setEncheres(encheresData);
      setLoading(false);
      
      // Initialiser les montants d'enchère
      const montants = {};
      encheresData.forEach(enchere => {
        montants[enchere.id] = enchere.prixActuel + 1; // Montant minimum = prix actuel + 1
      });
      setEnchereMontant(montants);
      
      // Vérifier si une enchère spécifique est demandée via le hash
      if (window.location.hash) {
        const enchereId = window.location.hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(`enchere-${enchereId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    }, []);
  
    const handleFiltreChange = (filtre) => {
      setFiltreActif(filtre);
    };
  
    const handleEnchereMontantChange = (id, value) => {
      setEnchereMontant(prev => ({
        ...prev,
        [id]: parseInt(value)
      }));
    };
  
    const placerEnchere = (enchereId) => {
      if (!isLoggedIn) {
        setErrorMessage('Vous devez être connecté pour enchérir');
        setTimeout(() => setErrorMessage(''), 3000);
        return;
      }
      
      const montant = enchereMontant[enchereId];
      const enchereIndex = encheres.findIndex(e => e.id === enchereId);
      
      if (enchereIndex === -1) return;
      
      const enchere = encheres[enchereIndex];
      
      if (montant <= enchere.prixActuel) {
        setErrorMessage('Le montant doit être supérieur au prix actuel');
        setTimeout(() => setErrorMessage(''), 3000);
        return;
      }
      
      // Simuler le placement d'une enchère
      const updatedEncheres = [...encheres];
      updatedEncheres[enchereIndex] = {
        ...enchere,
        prixActuel: montant,
        dernierEncherisseur: JSON.parse(localStorage.getItem('currentUser')).id
      };
      
      setEncheres(updatedEncheres);
      localStorage.setItem('encheres', JSON.stringify(updatedEncheres));
      
      setSuccessMessage(`Enchère placée avec succès: ${montant}€`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Mettre à jour le montant minimum pour la prochaine enchère
      setEnchereMontant(prev => ({
        ...prev,
        [enchereId]: montant + 1
      }));
    };
  
    const getFilteredEncheres = () => {
      if (filtreActif === 'toutes') {
        return encheres;
      } else if (filtreActif === 'actives') {
        return encheres.filter(enchere => new Date(enchere.dateFin) > new Date());
      } else if (filtreActif === 'terminees') {
        return encheres.filter(enchere => new Date(enchere.dateFin) <= new Date());
      }
      return encheres;
    };
  
    if (loading) {
      return <div className="loading">Chargement des enchères...</div>;
    }
  
    const filteredEncheres = getFilteredEncheres();
  
  return (
    <div className="enchere-page">
    <h1>Enchères Yu-Gi-Oh</h1>
    
    {successMessage && <div className="success-message">{successMessage}</div>}
    {errorMessage && <div className="error-message">{errorMessage}</div>}
    
    <div className="enchere-filtres">
      <button 
        className={filtreActif === 'toutes' ? 'active' : ''}
        onClick={() => handleFiltreChange('toutes')}
      >
        Toutes
      </button>
      <button 
        className={filtreActif === 'actives' ? 'active' : ''}
        onClick={() => handleFiltreChange('actives')}
      >
        Actives
      </button>
      <button 
        className={filtreActif === 'terminees' ? 'active' : ''}
        onClick={() => handleFiltreChange('terminees')}
      >
        Terminées
      </button>
    </div>
    
    {filteredEncheres.length === 0 ? (
      <div className="no-encheres">
        Aucune enchère ne correspond à vos critères
      </div>
    ) : (
      <div className="encheres-liste">
        {filteredEncheres.map(enchere => {
          const isActive = new Date(enchere.dateFin) > new Date();
          return (
            <div 
              key={enchere.id} 
              id={`enchere-${enchere.id}`}
              className={`enchere-item ${isActive ? 'active' : 'terminee'}`}
            >
              <div className="enchere-image">
                <img src={enchere.image || "/placeholder-auction.jpg"} alt={enchere.titre} />
              </div>
              
              <div className="enchere-details">
                <h3>{enchere.titre}</h3>
                <p className="enchere-desc">{enchere.description}</p>
                
                <div className="enchere-meta">
                  <div className="prix">
                    <span className="label">Prix actuel:</span>
                    <span className="value">{enchere.prixActuel}€</span>
                  </div>
                  
                  <div className="date-fin">
                    <span className="label">Fin de l'enchère:</span>
                    <span className="value">{new Date(enchere.dateFin).toLocaleString()}</span>
                  </div>
                  </div>
                  </div>
                  </div>
                );
        }

export default Enchere;
