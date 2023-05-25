import React, { useState } from "react";
import axios from "axios";

import './VehicleForm.css';

const VehicleForm = ({ onCarAdded }) => {
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [annee, setAnnee] = useState("");
  const [prix, setPrix] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      setIsSubmitting(true);

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
      // Appeler la fonction de rappel pour informer le composant parent de l'ajout réussi
      onCarAdded();

      setTimeout(() => {
        window.location.reload(); // Recharger la page après quelques secondes
      }, 3000); // Temps en millisecondes avant de recharger la page
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'envoi des données :", error);
    } finally {
      setIsSubmitting(false);
    }
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
            <button type="submit">Ajouter</button>
          </div>
        </div>
      </form>
    </div>
  );  
};

export default VehicleForm;
