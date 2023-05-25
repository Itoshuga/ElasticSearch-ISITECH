import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TableComponent.css';

import { TiTimes } from 'react-icons/ti';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingItemId, setDeletingItemId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/search?query=${searchTerm}`);
      setData(response.data.hits.hits);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingItemId(id); // Mettre à jour l'ID du produit en cours de suppression
      await axios.delete(`http://localhost:3000/delete/${id}`);
      fetchData();
      setTimeout(() => {
        setDeletingItemId(null); // Réinitialiser l'ID du produit après la suppression
        window.location.reload(); // Rafraîchir la page
      }, 1000); // Attendre 1 seconde avant le rafraîchissement
    } catch (error) {
      console.error('Erreur lors de la suppression du document :', error);
      setDeletingItemId(null); // Réinitialiser l'ID du produit en cas d'erreur
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <>
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Rechercher..."
          />
          <button type="submit">Rechercher</button>
        </form>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="column">Marque</th>
              <th className="column">Modèle</th>
              <th className="column">Année</th>
              <th className="column">Prix</th>
              <th className="column">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="column">{item._source.marque}</td>
                <td className="column">{item._source.modele}</td>
                <td className="column">{item._source.annee}</td>
                <td className="column">{item._source.prix}€</td>
                <td className="column">
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingItemId === item._id} // Désactiver le bouton si l'ID du produit correspond à l'ID en cours de suppression
                  >
                    {deletingItemId === item._id ? 'En Cours' : <TiTimes />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableComponent;
