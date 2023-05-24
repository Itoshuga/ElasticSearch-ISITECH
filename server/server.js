const axios = require('axios');
const express = require('express');
const app = express();
const port = 3001;

const username = 'elastic';
const password = 'Ccy6kQdQj5xwhf5bUI7B';
const auth = Buffer.from(`${username}:${password}`).toString('base64');
const headers = {
  Authorization: `Basic ${auth}`,
};

app.get('/api/documents', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:9200/voitures/_search', { headers });
    const data = response.data;

    console.log('Données récupérées :', data);

    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des documents :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des documents' });
  }
});

app.listen(port, () => {
  console.log(`Le serveur Express est en écoute sur le port ${port}`);
});
