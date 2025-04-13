import React, { useState, useEffect } from 'react';

function Admin() {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [cartes, setCartes] = useState([]);
    const [encheres, setEncheres] = useState([]);
    const [activeTab, setActiveTab] = useState('utilisateurs');
  
    useEffect(() => {
      // Simulation de chargement des données depuis localStorage
      const users = JSON.parse(localStorage.getItem('utilisateurs')) || [];
      const cards = JSON.parse(localStorage.getItem('cartes')) || [];
      const auctions = JSON.parse(localStorage.getItem('encheres')) || [];
      
      setUtilisateurs(users);
      setCartes(cards);
      setEncheres(auctions);
    }, []);
  
    const deleteUser = (id) => {
      const updatedUsers = utilisateurs.filter(user => user.id !== id);
      setUtilisateurs(updatedUsers);
      localStorage.setItem('utilisateurs', JSON.stringify(updatedUsers));
    };
  
    const deleteCarte = (id) => {
      const updatedCards = cartes.filter(carte => carte.id !== id);
      setCartes(updatedCards);
      localStorage.setItem('cartes', JSON.stringify(updatedCards));
    };
  
    const deleteEnchere = (id) => {
      const updatedAuctions = encheres.filter(enchere => enchere.id !== id);
      setEncheres(updatedAuctions);
      localStorage.setItem('encheres', JSON.stringify(updatedAuctions));
    };
  
  return (
    <div className="admin-page">
    <h1>Panneau d'administration</h1>
    
    <div className="admin-tabs">
      <button 
        className={activeTab === 'utilisateurs' ? 'active' : ''}
        onClick={() => setActiveTab('utilisateurs')}
      >
        Utilisateurs
      </button>
      <button 
        className={activeTab === 'cartes' ? 'active' : ''}
        onClick={() => setActiveTab('cartes')}
      >
        Cartes
      </button>
      <button 
        className={activeTab === 'encheres' ? 'active' : ''}
        onClick={() => setActiveTab('encheres')}
      >
        Enchères
      </button>
    </div>

    {activeTab === 'utilisateurs' && (
      <div className="admin-content">
        <h2>Gestion des utilisateurs</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Pseudo</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.pseudo}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {activeTab === 'cartes' && (
      <div className="admin-content">
        <h2>Gestion des cartes</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Type</th>
              <th>Rareté</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartes.map(carte => (
              <tr key={carte.id}>
                <td>{carte.id}</td>
                <td>{carte.nom}</td>
                <td>{carte.type}</td>
                <td>{carte.rarete}</td>
                <td>
                  <button onClick={() => deleteCarte(carte.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {activeTab === 'encheres' && (
      <div className="admin-content">
        <h2>Gestion des enchères</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titre</th>
              <th>Prix actuel</th>
              <th>Date de fin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {encheres.map(enchere => (
              <tr key={enchere.id}>
                <td>{enchere.id}</td>
                <td>{enchere.titre}</td>
                <td>{enchere.prixActuel}€</td>
                <td>{new Date(enchere.dateFin).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => deleteEnchere(enchere.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
}

export default Admin;
