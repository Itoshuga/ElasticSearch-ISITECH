# TP01
## Comment Installer ElasticSearch ?
Premièrement il est nécessaire de télécharger notre image avec Docker en utilisant la commande suivante :

```
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.7.1
```

Une fois notre image installé, on va venir créer un conteneur autour de celle-ci :

```
docker run -p 9200:9200 -e "discovery.type=single-node" -e "xpack.security.enabled=false" --name elastic docker.elastic.co/elasticsearch/elasticsearch:8.7.1
```

En utilisant **__-e__** ont définit les variables d'environnement de notre conteneur Docker :
- **`-e "discovery.type=single-node" `** permet à ElasticSearch de se lancer sur un seul noeud, ce qui lui permet de se lancer plus rapidement.
- **`-e "xpack.security.enabled=false"`** permet un accès non sécurisé au cluster Elasticsearch exécuté dans le conteneur Docker. 

Tandis qu'avec **__-p__** on spécifie le mappage du port :
- **`-p 9200:9200`** signifie qu'on utilise le port 9200, ElasticSearch est donc accessible depuis https://127.0.0.1:9200

Effectuez ensuite `bin/elasticsearch` pour générer les crédentials.  
Il est possible de les régénerer en utilisant `bin/elasticsearch-setup-passwords.bat auto`

## Comment Installer Kibana ?
Si l'on souhaite installer Kibana, il faudra procéder de la même manière que pour ElasticSearch, dans un premier temps on va donc venir télécharger notre image de Kibana :

```
docker pull docker.elastic.co/kibana/kibana:8.7.1
```

On utilise ensuite notre image de Kibana dans un conteneur Docker en utilisant la commande suivante : 

```
docker run -p 5601:5601 --name kibana --net elastic docker.elastic.co/kibana/kibana:8.7.1
```
- **`--net elastic`** permet de spécifier le réseau Docker auquel notre conteneur va se connecter.

## Création d'un mapping explicite
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

## Indexation d'un document
```json
POST /voitures/_doc
{
    "marque": "Toyota",
    "modele": "Supra",
    "annee": 2023,
    "prix": 50000
}
```

## Indexation de documents en lot (bulk)
```json
POST /voitures/_bulk
{ "index" : { "_index" : "voitures", "_id" : "1" } }
{ "marque": "Toyota", "modele": "Corolla", "annee": 2022, "prix": 25000 }
{ "index" : { "_index" : "voitures", "_id" : "2" } }
{ "marque": "Toyota", "modele": "Supra", "annee": 2023, "prix": 50000 }
```

## Rechercher dans les documents
```
GET /voitures/_search
```

Cette ligne nous retourne la liste de toutes les voitures, cependant si l'on souhaite rechercher toutes les voitures de la marque "Toyota", il faudra procéder ainsi :

```json
GET /voitures/_search
{
  "query": {
    "match": {
      "marque": "Toyota"
    }
  }
}
```

## Questions

### Comment Elasticsearch procède-t-il au mapping ? 
Le mapping dans ElasticSearch peut être définit de plusieurs manière :
- **Mapping Explicite** : Cela implique de définir les types de champs et leurs caractéristiques, tels que les types de données (texte, nombre, date...)

    ```json
    PUT /index
    {
        "mappings": {
            "properties": {
                "title": {
                    "type": "text"
                },
                "age": {
                    "type": "integer"
                }
            }
        }
    }
    ```
    On voit donc ici que le type de notre champs a été spécifié de tel sorte que **title** est un `text` et **age** un `integer`
- **Mapping Implicite** : Si le mapping n'est pas explicitement spécifié, Elasticsearch utilisera un système nommé "dynamic mapping" pour déduire automatiquement le mapping des champs en fonction des données qui lui sont fournies.

    ```json
    POST /index/_doc
    {
        "title": "Lorem ipsum dolor sit amet",
        "age": 20
    }
    ```
    Dans le cas présent, aucun champ n'a son type de définit, c'est donc ElasticSearch qui va s'occuper de typer automatiquement grace à son mapping dit **dynamique**.

### Peut-on modifier le mapping sans recréer l’index ?  
Il n'est pas réellement possible de modifier le mapping sans avoir a recréer l'index. De manière générale, une fois l'index créé, le mapping ne peut pas être modifier par les champs existant.

### Définir : Tokenisation et Normalisation
- **La Tokénisation** est un processus de découpage d'une chaîne de texte en unité. Elle est utilisé pour divisé le contenu d'un champ "texte" en mot individuel
- **La Normalisation** est également un processus, mais de transformation. Il permet de normaliser une chaîne de texte, en y retirant les accents ou les majusculer par exemple.

### Lors de la démonstration nous avons évoqué la notion d’API, desquelles avons-nous parlé ? 
?