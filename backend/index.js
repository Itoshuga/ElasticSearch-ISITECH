const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const colors = require('ansi-colors');
const cors = require('cors');

const { Client } = require("@elastic/elasticsearch");

require("dotenv").config({
  path: "../.env"
});

const app = express();
const port = 3000;

app.use(cors());
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
  console.log(colors.green.bold(`> Important : Le serveur est en cours d'écoute sur le port ${port}.`));
});


//#region Fonctions
async function createCarIndex() {
  const indexName = "voitures";

  // On vérifie si notre index existe
  if (await client.indices.exists({index: indexName}).body) {
    await client.indices.create({ 
      index: indexName,
      size: 10_000,
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
app.get("/search", async (req, res) => {
  const { query } = req.query;
  let queryMatch;

  if (!query) {
    queryMatch = { match_all: {} };
  } else {
    queryMatch = { fuzzy: { marque: query }};
  }

  const result = await client.search({
    index: "voitures",
    size: 10_000,
      query: queryMatch,
  });

  res.json(result);
});

app.delete("/delete", async (req, res) => {
  const { id } = req.query.id;

  try {
    const result = await client.delete({
      index: "voitures",
      id: id,
    });

    res.json(result);
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression du document :", error);
    res.status(500).json({ error: "Erreur lors de la suppression du document" });
  }
});