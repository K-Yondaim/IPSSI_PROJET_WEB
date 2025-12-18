# Projet Web Sécurisé & Dockerisé

Ce projet a été mis à jour et sécurisé pour corriger des vulnérabilités et moderniser l'infrastructure.

## 🛠 Ce qui a été fait

1.  **Docker** :
    -   Tout le projet tourne maintenant dans des "conteneurs" (Frontend, Backend, Base de données).
    -   Cela permet de lancer tout le projet avec une seule commande, sans rien installer d'autre sur le PC.

2.  **Base de Données (MySQL)** :
    -   Nous avons remplacé le fichier SQLite local par un vrai serveur **MySQL 8.0**.
    -   C'est plus robuste et plus proche d'un vrai environnement professionnel.

3.  **Sécurité (`.env` & `.gitignore`)** :
    -   **`.env`** : Les mots de passe (comme celui de la base de données) sont stockés dans ce fichier caché.
    -   **`.gitignore`** : Ce fichier empêche d'envoyer le `.env` ou la base de données sur GitHub. C'est la protection anti-fuite de données.

4.  **Architecture du code** :
    -   Le code a été séparé en plusieurs fichiers (Contrôleurs et Services) pour être plus clair et sécurisé (correction des failles d'injection SQL).

## 🚀 Comment lancer le projet

Il suffit d'avoir **Docker Desktop** installé et lancé.

1.  Ouvrez un terminal dans le dossier.
2.  Lancez la commande :
    ```bash
    docker-compose up --build
    ```
3.  Accédez au site :
    -   **Site Web** : [http://localhost:3000](http://localhost:3000)
    -   **Gestion BDD** : [http://localhost:8080](http://localhost:8080)
