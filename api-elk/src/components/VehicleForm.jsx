import React, { useState } from "react";
import axios from "axios";

const VehicleForm = () => {
    const [marque, setMarque] = useState("");
    const [modele, setModele] = useState("");
    const [annee, setAnnee] = useState("");
    const [prix, setPrix] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
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
      } catch (error) {
        console.error("Une erreur s'est produite lors de l'envoi des données :", error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Marque:</label>
          <input type="text" value={marque} onChange={(e) => setMarque(e.target.value)} />
        </div>
        <div>
          <label>Modèle:</label>
          <input type="text" value={modele} onChange={(e) => setModele(e.target.value)} />
        </div>
        <div>
          <label>Année:</label>
          <input type="number" value={annee} onChange={(e) => setAnnee(e.target.value)} />
        </div>
        <div>
          <label>Prix:</label>
          <input type="number" value={prix} onChange={(e) => setPrix(e.target.value)} />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    );
};

export default VehicleForm;