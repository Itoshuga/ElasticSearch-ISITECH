## Où se trouve les autres TP ?
- TP 01 - Branche [**`main`**](https://github.com/Itoshuga/ElasticSearch-ISITECH/tree/main)
- TP 02 - Branche [**`dev`**](https://github.com/Itoshuga/ElasticSearch-ISITECH/tree/dev)
- TP 03 - Branche [**`test`**](https://github.com/Itoshuga/ElasticSearch-ISITECH/tree/test)

# TP03

## Les Concepts d'Elasticsearch
![Schéma sur les concepts d'Elasticsearch](schema.png)

### Comment Elasticsearch stocke ses données ?
Elasticsearch stocke ses données dans des **index**, il s'agit d'une collection de documents qui sont similaire et partagent une structure commune. Chaque **document** représente une unité d'information sous un format JSON, les documents permettent entre autre de stockée des données.  

Si on compare ces structures à celle d'une base de données relationnelles :

|  Base de données relationnelles  |  Base NoSQL |
| ----------------- | --------------- |
|   Index    | Table  |
|   Documents |  Lignes / Entrées / Row  |