import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './composant/navbar';
import Accueil from './page/acceuil';
import Admin from './page/adminpage';
import Connexion from './page/connexion';
import Contact from './page/contact';


// import DetailCarte from './page/detailcarte';
// import Enchere from './page/enchere';


import Faq from './page/faq';
import Inscription from './page/inscription';


// import ProfilUtilisateur from './page/profilutilisateur';


import Notification from './page/notification';
import Support from './page/support';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ padding: '20px' }}>
          <h1>toto</h1>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/carte/:id" element={<DetailCarte />} /> */}
            {/* <Route path="/encheres" element={<Enchere />} /> */}
            <Route path="/faq" element={<Faq />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/notifications" element={<Notification />} />
            {/* <Route path="/support" element={<Support />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;