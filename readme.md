## API Twitter-like — Node.js, Express, TypeScript, Sequelize

### Présentation
Ce projet est une API REST de réseau social inspirée de Twitter. Elle permet la gestion d’utilisateurs, de posts et de commentaires, avec une authentification sécurisée et une gestion fine des droits (auteur/admin).

#### Objectifs
- Permettre l’inscription, la connexion et la déconnexion des utilisateurs
- Publier, lister et supprimer des posts
- Ajouter et supprimer des commentaires
- Sécuriser les routes sensibles par JWT et gestion des rôles

### Stack technique
- Node.js & Express pour le serveur HTTP
- TypeScript pour la robustesse et la clarté du code
- Sequelize (ORM) & MySQL pour la base de données
- JWT pour l’authentification
- Bcrypt pour le hashage des mots de passe
- CORS, dotenv, cookie-parser pour la sécurité et la configuration

### Choix d’architecture et d’implémentation
- **TypeScript** : pour la sécurité de typage et la maintenabilité
- **Séparation claire** des responsabilités (routes, contrôleurs, modèles, middlewares)
- **Gestion centralisée des erreurs** via un middleware dédié
- **Authentification JWT** stockée en cookie HTTPOnly pour plus de sécurité
- **Gestion des droits** :
	- Seul l’auteur ou un admin peut supprimer un post/commentaire
	- Les routes sensibles sont protégées par des middlewares (`authenticateJWT`, `authorizeOwnerOrAdmin`)
- **Documentation** : un tableau récapitulatif des routes est fourni dans `/doc/routes_recap.md`

### Installation & utilisation
1. Cloner le dépôt
2. Installer les dépendances : `npm install`
3. Configurer la base de données MySQL et les variables d’environnement (`.env`)
4. Lancer les migrations ou initialiser la base (voir `/test/init_db.sql`)
5. Démarrer le serveur : `npm run dev` ou `npm start`

### Structure des dossiers
- `models/` : modèles Sequelize (User, Post, Comment)
- `controllers/` : logique métier (auth, posts, commentaires)
- `routes/` : définitions des routes Express
- `middleware/` : middlewares d’authentification, d’autorisation, gestion des erreurs
- `doc/` : documentation, cahier des charges, récapitulatif des routes
- `test/` : scripts de test et d’initialisation

### Sécurité
- Toutes les routes sensibles sont protégées par JWT et vérification des droits
- Les mots de passe sont hashés avec Bcrypt
- Les erreurs sont gérées de façon centralisée pour éviter les fuites d’informations

### Tests
Des scripts de test sont fournis, mais leur exécution n’est pas obligatoire pour la validation du projet.

### Auteur
Projet réalisé dans le cadre d’un module de formation Node.js/TypeScript.

### Licence 

Cette API est sous licence de El Miminette ! 
