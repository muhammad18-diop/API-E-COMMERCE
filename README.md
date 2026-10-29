#  E-Commerce REST API

Une API RESTful robuste et scalable pour la gestion d'une plateforme de commerce en ligne, développée avec **Node.js**, **Express** et **MySQL**.

---

##  Fonctionnalités

###  Authentification & Utilisateurs
* Inscription et connexion utilisateur avec mots de passe hachés (`bcrypt`)
* Sécurisation des routes par **JWT (JSON Web Tokens)**
* Gestion des rôles : Client, Administrateur

###  Produits & Catégories
* CRUD complet pour la gestion des produits (Titre, description, prix, stock, image)
* Organisation par catégories et sous-catégories
* Recherche, filtrage (par prix, catégorie) et pagination

###  Panier & Commandes
* Ajout, modification et suppression d'articles dans le panier
* Validation du panier et création de commandes
* Gestion du statut des commandes (*En attente*, *Payée*, *Expédiée*, *Livrée*, *Annulée*)
* Historique des commandes par utilisateur

---

##  Technologies utilisées

* **Back-end :** Node.js, Express.js
* **Base de données :** PostgreSQL
* **Authentification :** JSON Web Token (JWT), Bcrypt
* **Variables d'environnement :** dotenv
* **Validation des données :** Express-validator / Joi

---

## Structure du projet

```text
ecommerce-api/
├── config/             Configuration de la base de données 
├── controllers/        Logique métier 
├── middlewares/         Middlewares 
├── models/              Modèles SQL ou requêtes de base de données
├── routes/              Routes Express 
├── .env.example         Modèle pour les variables d'environnement
├── server.js            Point d'entrée de l'application
└── package.json
