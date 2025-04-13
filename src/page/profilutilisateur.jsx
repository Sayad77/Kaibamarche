import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ProfilUtilisateur() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    pseudo: '',
    email: '',
    adresse: '',
    codePostal: '',
    ville: '',
    pays: ''
  });
  const [motDePasse, setMotDePasse] = useState({
    ancien: '',
    nouveau: '',
    confirmation: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('informations');
  const [encheres, setEncheres] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/connexion');
      return;
    }
    
    const userData = JSON.parse(currentUser);
    setUser(userData);
    
    // Initialiser le formulaire avec les données de l'utilisateur
    setFormData({
      nom: userData.nom || '',
      prenom: userData.prenom || '',
      pseudo: userData.pseudo || '',
      email: userData.email || '',
      adresse: userData.adresse || '',
      codePostal: userData.codePostal || '',
      ville: userData.ville || '',
      pays: userData.pays || ''
    });
    
    // Charger les enchères de l'utilisateur
    const allEncheres = JSON.parse(localStorage.getItem('encheres')) || [];
    const userEncheres = allEncheres.filter(enchere => 
      enchere.dernierEncherisseur === userData.id
    );
    setEncheres(userEncheres);
    
    setLoading(false);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setMotDePasse(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Validation basique
    if (!formData.nom || !formData.prenom || !formData.email || !formData.pseudo) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    try {
      // Mettre à jour les données de l'utilisateur
      const updatedUser = {
        ...user,
        ...formData
      };
      
      // Mettre à jour dans localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Mettre à jour dans la liste des utilisateurs
      const users = JSON.parse(localStorage.getItem('utilisateurs')) || [];
      const updatedUsers = users.map(u => 
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem('utilisateurs', JSON.stringify(updatedUsers));
      
      setUser(updatedUser);
      setIsEditing(false);
      setSuccessMessage('Profil mis à jour avec succès');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      setErrorMessage('Une erreur est survenue lors de la mise à jour du profil');
    }
  };

  const handleChangePassword = () => {
    // Validation
    if (!motDePasse.ancien || !motDePasse.nouveau || !motDePasse.confirmation) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    }
    
    if (motDePasse.ancien !== user.password) {
      setErrorMessage('Le mot de passe actuel est incorrect');
      return;
    }
    
    if (motDePasse.nouveau !== motDePasse.confirmation) {
      setErrorMessage('Les nouveaux mots de passe ne correspondent pas');
      return;
    }
    
    if (motDePasse.nouveau.length < 6) {
      setErrorMessage('Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    try {
      // Mettre à jour le mot de passe
      const updatedUser = {
        ...user,
        password: motDePasse.nouveau
      };
      
      // Mettre à jour dans localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Mettre à jour dans la liste des utilisateurs
      const users = JSON.parse(localStorage.getItem('utilisateurs')) || [];
      const updatedUsers = users.map(u => 
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem('utilisateurs', JSON.stringify(updatedUsers));
      
      setUser(updatedUser);
      setMotDePasse({
        ancien: '',
        nouveau: '',
        confirmation: ''
      });
      
      setSuccessMessage('Mot de passe changé avec succès');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);
      setErrorMessage('Une erreur est survenue lors du changement de mot de passe');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (!user) {
    return <div className="not-logged-in">Veuillez vous connecter pour accéder à votre profil</div>;
  }

  return (
    <div className="profil-page">
      <h1>Mon profil</h1>
      
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <div className="profil-tabs">
        <button 
          className={activeTab === 'informations' ? 'active' : ''}
          onClick={() => setActiveTab('informations')}
        >
          Informations personnelles
        </button>
        <button 
          className={activeTab === 'securite' ? 'active' : ''}
          onClick={() => setActiveTab('securite')}
        >
          Sécurité
        </button>
        <button 
          className={activeTab === 'encheres' ? 'active' : ''}
          onClick={() => setActiveTab('encheres')}
        >
          Mes enchères
        </button>
      </div>
      
      {activeTab === 'informations' && (
        <div className="profil-content">
          <div className="profile-header">
            <h2>Informations personnelles</h2>
            {!isEditing && (
              <button 
                className="btn btn-secondary"
                onClick={() => setIsEditing(true)}
              >
                Modifier
              </button>
            )}
          </div>
          
          {isEditing ? (
            <div className="profile-edit-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nom">Nom *</label>
                  <input 
                    type="text" 
                    id="nom" 
                    name="nom" 
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="prenom">Prénom *</label>
                  <input 
                    type="text" 
                    id="prenom" 
                    name="prenom" 
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group"></div>