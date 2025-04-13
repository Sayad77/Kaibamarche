import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function Inscription() {
    const [formData, setFormData] = useState({
      nom: '',
      prenom: '',
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    });
    
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
      
      // Réinitialiser l'erreur pour ce champ
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };
  
    const validateForm = () => {
      const newErrors = {};
      
      // Validation nom
      if (!formData.nom.trim()) {
        newErrors.nom = 'Le nom est requis';
      }
      
      // Validation prénom
      if (!formData.prenom.trim()) {
        newErrors.prenom = 'Le prénom est requis';
      }
      
      // Validation pseudo
      if (!formData.pseudo.trim()) {
        newErrors.pseudo = 'Le pseudo est requis';
      } else if (formData.pseudo.length < 3) {
        newErrors.pseudo = 'Le pseudo doit contenir au moins 3 caractères';
      }
      
      // Validation email
      if (!formData.email.trim()) {
        newErrors.email = 'L\'email est requis';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Format d\'email invalide';
      }
      
      // Validation mot de passe
      if (!formData.password) {
        newErrors.password = 'Le mot de passe est requis';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      }
      
      // Validation confirmation mot de passe
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
      
      // Validation conditions d'utilisation
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
      }
      
      return newErrors;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Valider le formulaire
      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
      
      setIsSubmitting(true);
      
      // Simuler l'enregistrement de l'utilisateur
      setTimeout(() => {
        try {
          // Récupérer les utilisateurs existants
          const existingUsers = JSON.parse(localStorage.getItem('utilisateurs')) || [];
          
          // Vérifier si l'email existe déjà
          const emailExists = existingUsers.some(user => user.email === formData.email);
          if (emailExists) {
            setErrors({ email: 'Cet email est déjà utilisé' });
            setIsSubmitting(false);
            return;
          }
          
          // Vérifier si le pseudo existe déjà
          const pseudoExists = existingUsers.some(user => user.pseudo === formData.pseudo);
          if (pseudoExists) {
            setErrors({ pseudo: 'Ce pseudo est déjà utilisé' });
            setIsSubmitting(false);
            return;
          }
          
          // Créer nouvel utilisateur
          const newUser = {
            id: Date.now().toString(),
            nom: formData.nom,
            prenom: formData.prenom,
            pseudo: formData.pseudo,
            email: formData.email,
            password: formData.password, // Dans une vraie application, il faudrait hasher le mot de passe
            dateCreation: new Date().toISOString()
          };
          
          // Ajouter l'utilisateur
          existingUsers.push(newUser);
          localStorage.setItem('utilisateurs', JSON.stringify(existingUsers));
          
          // Connecter l'utilisateur
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          
          setSuccessMessage('Inscription réussie! Redirection en cours...');
          
          // Rediriger vers la page de profil après 2 secondes
          setTimeout(() => {
            navigate('/profil');
          }, 2000);
        } catch (error) {
          console.error('Erreur lors de l\'inscription:', error);
          setErrors({ general: 'Une erreur est survenue lors de l\'inscription' });
          setIsSubmitting(false);
        }
      }, 1000);
    };
  
  return (
    <div className="inscription-page">
    <h1>Créer un compte</h1>
    
    {successMessage && (
      <div className="success-message">{successMessage}</div>
    )}
    
    {errors.general && (
      <div className="error-message">{errors.general}</div>
    )}
    
    <form onSubmit={handleSubmit} className="inscription-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nom">Nom *</label>
          <input 
            type="text" 
            id="nom" 
            name="nom" 
            value={formData.nom}
            onChange={handleChange}
            className={errors.nom ? 'error' : ''}
          />
          {errors.nom && <span className="error-text">{errors.nom}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="prenom">Prénom *</label>
          <input 
            type="text" 
            id="prenom" 
            name="prenom" 
            value={formData.prenom}
            onChange={handleChange}
            className={errors.prenom ? 'error' : ''}
          />
          {errors.prenom && <span className="error-text">{errors.prenom}</span>}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="pseudo">Pseudo *</label>
        <input 
          type="text" 
          id="pseudo" 
          name="pseudo" 
          value={formData.pseudo}
          onChange={handleChange}
          className={errors.pseudo ? 'error' : ''}
        />
        {errors.pseudo && <span className="error-text">{errors.pseudo}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Mot de passe *</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span className="error-text">{errors.password}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmer le mot de passe *</label>
        <input 
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? 'error' : ''}
        />
        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
      </div>
      
      <div className="form-group checkbox">
        <input 
          type="checkbox" 
          id="acceptTerms" 
          name="acceptTerms" 
          checked={formData.acceptTerms}
          onChange={handleChange}
          className={errors.acceptTerms ? 'error' : ''}
        />
        <label htmlFor="acceptTerms">
          J'accepte les <Link to="/conditions">conditions d'utilisation</Link> *
        </label>
        {errors.acceptTerms && <span className="error-text">{errors.acceptTerms}</span>}
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Création du compte...' : 'S\'inscrire'}
      </button>
    </form>
    
    <div className="form-footer">
      <p>Vous avez déjà un compte? <Link to="/connexion">Se connecter</Link></p>
    </div>
  </div>
);
}

export default Inscription;