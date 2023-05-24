import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TableComponent.css';

import { TiTimes } from 'react-icons/ti';


const TableComponent = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <>
      <h1>Tableau des Données</h1>
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
                <td className="column">{item._source.prix}</td>
                <td className="column">
                  <button className="delete-button" onClick={() => handleDelete(item._id)}><TiTimes /></button>
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
