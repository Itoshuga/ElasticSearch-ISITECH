import React, { useState } from "react";
import axios from "axios";

import './VehicleForm.css';

const VehicleForm = () => {
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [annee, setAnnee] = useState("");
  const [prix, setPrix] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    try {
      const response = await axios.post("http://localhost:3000/add", {
        marque,
        modele,
        annee,
        prix
      });
      console.log(response.data); // Afficher la réponse de l'API
      // Réinitialiser les champs du formulaire
      setMarque("");
      setModele("");
      setAnnee("");
      setPrix("");
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        window.location.reload(); // Rafraîchir la page
      }, 1000); // Attendre 2 secondes avant le rafraîchissement
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'envoi des données :", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="global-container">
            <label>Marque:</label>
            <div className="input-container">
              <input type="text" value={marque} onChange={(e) => setMarque(e.target.value)} />
            </div>
          </div>
          
          <div className="global-container">
            <label>Modèle:</label>
            <div className="input-container">
              <input type="text" value={modele} onChange={(e) => setModele(e.target.value)} />
            </div>
          </div>

          <div className="global-container">
            <label>Année:</label>
            <div className="input-container">
              <input type="number" value={annee} onChange={(e) => setAnnee(e.target.value)} />
            </div>
          </div>

          <div className="global-container">
            <label>Prix:</label>
            <div className="input-container">
              <input type="number" value={prix} onChange={(e) => setPrix(e.target.value)} />
            </div>
          </div>
          <div className="global-container">
            <label className="avoid">A</label>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Ajout en cours...' : 'Ajouter'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );  
};

export default VehicleForm;