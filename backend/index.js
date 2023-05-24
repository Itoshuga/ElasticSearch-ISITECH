const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const colors = require('ansi-colors');

const { Client } = require("@elastic/elasticsearch");

require("dotenv").config({
  path: "../.env"
});

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuration du client Elasticsearch
const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD
  },
  tls: {
    ca: fs.readFileSync('../http_ca.crt'),
    rejectUnauthorized: false
  }
});

// Définir les routes et les handlers
app.get('/', (req, res) => {
  res.send('HelloWorld');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(colors.green.bold(`> Important : Le serveur est en cours d'écoute sur le port ${port}`));
});


//#region Fonctions
async function createCarIndex() {
  const indexName = "voitures";

  // On vérifie si notre index existe
  if (await client.indices.exists({index: indexName}).body) {
    await client.indices.create({ 
      index: indexName,
      mappings: {
        properties: {
          marque: { type: 'text' },
          modele: { type: 'text' },
          annee: { type: 'integer' },
          prix: { type: 'integer' },
        }
      }
    });
    console.log(colors.green.bold(`> Succès : Création de l'index "${indexName}" avec succès.`));
  } else {
    console.log(colors.yellow.bold(`> Information : L'index "${indexName}" existe déjà dans Elasticsearch.`))
  }
};
//#endregion

createCarIndex();

// Routes de l'API
