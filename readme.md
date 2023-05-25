## Où se trouve les autres TP ?
- TP 01 - Branche [**`main`**](https://github.com/Itoshuga/ElasticSearch-ISITECH/tree/main)
- TP 02 - Branche [**`dev`**](https://github.com/Itoshuga/ElasticSearch-ISITECH/tree/dev)
- TP 03 - Branche [**`test`**](https://github.com/Itoshuga/ElasticSearch-ISITECH/tree/test)

# TP02

## Prérequis 
Avant de commencer à utiliser ce projet, assurez-vous d'avoir les éléments suivants installés :
- **Node.js** : [https://nodejs.org](https://nodejs.org).
- **Elasticsearch** :  [https://www.elastic.co/downloads/elasticsearch](https://www.elastic.co/downloads/elasticsearch).
- **Kibana** :  [https://www.elastic.co/downloads/kibana](https://www.elastic.co/downloads/kibana).
- **PNPM** : Ce projet utilise PNPM comme gestionnaire de packages.

## Installation
Une fois es prérequis installé, vous pouvez suivre ces étapes pour installer et exécuter le projet :

### Projets
1. **Clonez le GitHub**
```bash
git clone https://github.com/Itoshuga/ElasticSearch-ISITECH.git
```

2. **Accédez au répertoire du projet**
```bash
cd  ElasticSearch-ISITECH
```

3. **Allez sur la branche `dev`**
```bash
git switch dev
```

4. **Installez les dépendances dans les dossiers `backend` et `api-elk`**
```bash
pnpm install
```

5. **Lancer le serveur depuis le dossier *backend***
```bash
node index.js
```

6. **Lancer l'application web depuis le dossier *api-elk***
```bash
pnpm run dev
```

Il vous sera aussi nécessaire de créer un fichier `.env` à la racine du projet en suivant le modèle ci-dessous :

```js
ELASTIC_USERNAME="elastic"
ELASTIC_PASSWORD="MOT_DE_PASSE"
```

### Elasticsearch
Afin de faire fonctionner le projet, il est nécessaire d'avoir Elasticsearch sur sa machine. Il est possible de l'installer en passant par ce [lien](https://www.elastic.co/downloads/elasticsearch).

Une fois l'archive installé sur votre machine, décompressez la puis ouvrez le dossier avec powershell.

Une fois sur powershell, utilisez la commande `bin/elasticsearch` pour lancer le programme puis attendez que tout s'initialise correctement.

Par la suite il vous sera sans doute nécessaire de reinitialisé le mot de passe de l'utilisateur **elastic** pour pouvoir vous connecter à la plateforme, vous pourrez le faire en lançant une autre instance de powershell dans le dossier avec la commande :

```bash
bin/elasticsearch-reset-password -u elastic
```

Conservez le mot de passe qui vous a été donné pour pouvoir le mettre dans le fichier `.env` qui a été évoqué un peu plus haut et vous connecter à Elasticsearch.

### Kibana
Téléchargez Kibana en vous rendant sur ce [lien](https://www.elastic.co/downloads/kibana).

Une fois l'archive installé sur votre machine, décompressez la puis ouvrez le dossier avec powershell.

Une fois sur powershell, utilisez la commande `bin/kibana` pour lancer le programme puis attendez que tout s'initialise correctement. Du texte devrait alors apparaitre avec tout en bas un lien qui va vous redirigez vers une page vous demandant un **enrollment token**.  
Pour obtenir ce token, il faudra vous rendre à nouveau sur le powershell de elasticsearch et taper la commande suivante :

```bash
bin/elasticsearch-create-enrollment-token --scope kibana
```

Un token sera alors généré, il vous restera plus qu'à le copier et a le coller sur l'interface web de Kibana.

Connectez-vous ensuite avec les identifiants **elastic** que vous avez généré recemment.  
Une fois connecté à Kibana, ignorez les messages d'arrivées puis cliquez sur le menu burger en haut à gauche, descendez au niveau de `Management` puis cliquez sur **`Dev Tools`**

Une fois dans le Dev Tools, vous pourrez copiez / collez les commandes ci-dessous pour créer un mapping, indexer un ou plusieurs documents...

#### Création d'un mapping explicite
```json
PUT /voitures
{
    "mappings": {
        "properties": {
            "marque": {
                "type": "text"
            },
            "modele": {
                "type": "text"
            },
            "annee": {
                "type": "integer"
            },
            "prix": {
                "type": "integer"
            }
        }
    }
}
```

#### Indexation d'un document

```json
POST /voitures/_doc
{
    "marque": "Toyota",
    "modele": "Supra",
    "annee": 2023,
    "prix": 50000
}
```

#### Indexation de documents en lot (bulk)

```json
POST /voitures/_bulk
{ "index" : { "_index" : "voitures", "_id" : "1" } }
{ "marque": "Toyota", "modele": "Corolla", "annee": 2022, "prix": 25000 }
{ "index" : { "_index" : "voitures", "_id" : "2" } }
{ "marque": "Toyota", "modele": "Supra", "annee": 2023, "prix": 50000 }
```

#### Recherche dans les documents

```json
GET /voitures/_search
```
