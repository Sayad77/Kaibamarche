import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Faq() {
    const [activeIndex, setActiveIndex] = useState(null);
    
    const toggleAccordion = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
    
    const faqItems = [
      {
        question: "Comment créer un compte ?",
        answer: "Pour créer un compte, cliquez sur le bouton 'Inscription' en haut de la page. Remplissez le formulaire avec vos informations personnelles et suivez les instructions pour confirmer votre adresse e-mail."
      },
      {
        question: "Comment participer à une enchère ?",
        answer: "Pour participer à une enchère, vous devez d'abord vous connecter à votre compte. Ensuite, naviguez vers la page Enchères, trouvez l'enchère qui vous intéresse, saisissez votre montant et cliquez sur 'Enchérir'."
      },
      {
        question: "Comment fonctionne le système d'enchères ?",
        answer: "Notre plateforme utilise un système d'enchères ascendantes. Chaque nouvelle enchère doit être supérieure à l'enchère actuelle. L'enchère se termine à la date indiquée, et le dernier enchérisseur remporte l'article."
      },
      {
        question: "Comment sont livrées les cartes ?",
        answer: "Une fois l'enchère terminée et le paiement effectué, les cartes sont soigneusement emballées et expédiées à l'adresse fournie lors de l'inscription. Nous utilisons des services de livraison avec suivi pour assurer la sécurité de votre commande."
      },
      {
        question: "Comment puis-je vendre mes propres cartes ?",
        answer: "Actuellement, nous n'offrons pas de service de vente pour les particuliers. Cependant, vous pouvez nous contacter via la page Contact si vous avez une collection importante dont vous souhaitez vous séparer."
      },
      {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Nous acceptons les cartes de crédit/débit (Visa, Mastercard), PayPal, et les virements bancaires pour certaines transactions. Les détails des moyens de paiement acceptés sont affichés lors du processus de paiement."
      },
      {
        question: "Comment modifier mes informations personnelles ?",
        answer: "Vous pouvez modifier vos informations personnelles en vous connectant à votre compte et en accédant à la page 'Profil'. Là, vous pourrez mettre à jour votre adresse, vos coordonnées et vos préférences."
      },
      {
        question: "Que faire si j'ai oublié mon mot de passe ?",
        answer: "Si vous avez oublié votre mot de passe, cliquez sur 'Connexion', puis sur 'Mot de passe oublié'. Vous recevrez un e-mail avec des instructions pour réinitialiser votre mot de passe."
      }
    ];
  return (
    <div className="faq-page">
    <h1>Questions fréquemment posées</h1>
    
    <div className="faq-container">
      {faqItems.map((item, index) => (
        <div 
          key={index} 
          className={`faq-item ${activeIndex === index ? 'active' : ''}`}
        >
          <div 
            className="faq-question"
            onClick={() => toggleAccordion(index)}
          >
            <h3>{item.question}</h3>
            <span className="arrow">{activeIndex === index ? '▼' : '▶'}</span>
          </div>
          
          {activeIndex === index && (
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
    
    <div className="faq-contact">
      <h2>Vous n'avez pas trouvé votre réponse ?</h2>
      <p>N'hésitez pas à nous contacter directement pour toute question supplémentaire.</p>
      <Link to="/contact" className="btn btn-primary">Contactez-nous</Link>
    </div>
  </div>
);
}

export default Faq;
