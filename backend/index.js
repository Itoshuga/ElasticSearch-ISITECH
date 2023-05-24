const express = require('express');
const bodyParser = require('body-parser');

const { Client } = require("@elastic/elasticsearch");

require("dotenv").config({
  path: "../.env"
});

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuration du client Elasticsearch
const client = new Client({
  node: "http://localhost:9200",
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  }
});

// Définir les routes et les handlers
app.get('/', (req, res) => {
  res.send('HelloWorld');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur est en cours d'écoute sur le port ${port}`);
});