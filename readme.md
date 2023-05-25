## Où se trouve les autres TP ?
- TP 01 - Branche [**`main`**](https://github.com/Itoshuga/ElasticSearch-ISITECH/tree/main)
- TP 02 - Branche [**`dev`**](https://github.com/Itoshuga/ElasticSearch-ISITECH/tree/dev)
- TP 03 - Branche [**`test`**](https://github.com/Itoshuga/ElasticSearch-ISITECH/tree/test)

# TP03

## Les Concepts d'Elasticsearch
![Schéma sur les concepts d'Elasticsearch](schema.png)

### Comment Elasticsearch stocke ses données ?
Elasticsearch stocke les données sous forme de documents JSON dans des **index**. Chaque index regroupe des **documents** similaires. Les index sont divisés en fragments appelés **shards**, qui permettent la distribution des données. Chaque shard peut avoir des **réplicas**, qui sont des copies.

|  Base de données relationnelles  | Base NoSQL orienté document |
| ----------------- | --------------- |
|   Table    | Index  |
|   Lignes / Entrées / Row | Documents  |

Les **nœuds** d'un cluster Elasticsearch travaillent ensemble pour stocker et traiter les données. Lorsqu'un document est indexé, il est analysé, réparti entre les shards et traité par le cluster.

C'est grâce à un système de mise à l'échelle que Elasticsearch peut gérer efficacement une grande quantité de données. Grâce à tous ces concepts de **réplication**, et de **distribution de données** que Elasticsearch peut traiter un grand nombre de donnée rapidement.

### Pourquoi utiliser Scroll API ? Un bon paramètre de recherche pour la pagination ?
