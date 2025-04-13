import React, { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
      nom: '',
      email: '',
      sujet: '',
      message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitting(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      // Validation basique
      if (!formData.nom || !formData.email || !formData.message) {
        setErrorMessage('Veuillez remplir tous les champs obligatoires');
        setSubmitting(false);
        return;
      }
      
      // Simulation d'envoi de formulaire
      setTimeout(() => {
        // Ici, vous feriez un appel API à votre backend
        console.log('Données du formulaire envoyées:', formData);
        
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          email: '',
          sujet: '',
          message: ''
        });
        
        setSuccessMessage('Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.');
        setSubmitting(false);
      }, 1000);
    };
  return (
    <div className="contact-page">
    <h1>Contactez-nous</h1>
    
    <div className="contact-info">
      <div className="info-block">
        <h3>Email</h3>
        <p>support@yugioh-exchange.com</p>
      </div>
      <div className="info-block">
        <h3>Téléphone</h3>
        <p>+33 1 23 45 67 89</p>
      </div>
      <div className="info-block">
        <h3>Adresse</h3>
        <p>123 Rue du Duel, 75001 Paris, France</p>
      </div>
    </div>
    
    <div className="contact-form-container">
      <h2>Formulaire de contact</h2>
      
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <form onSubmit={handleSubmit} className="contact-form">
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
          <label htmlFor="email">Email *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="sujet">Sujet</label>
          <input 
            type="text" 
            id="sujet" 
            name="sujet" 
            value={formData.sujet}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea 
            id="message" 
            name="message" 
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
    </div>
  </div>
);
}
export default Contact;
