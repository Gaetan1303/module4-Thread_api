# Inventaire des routes de l'API ThreadAPI

## Threads
- GET /threads : Récupérer la liste des threads
- GET /threads/:id : Récupérer un thread par ID
- POST /threads : Créer un nouveau thread
- PUT /threads/:id : Mettre à jour un thread
- DELETE /threads/:id : Supprimer un thread

## Utilisateurs
- GET /users : Récupérer la liste des utilisateurs
- GET /users/:id : Récupérer un utilisateur par ID
- POST /users : Créer un nouvel utilisateur
- PUT /users/:id : Mettre à jour un utilisateur
- DELETE /users/:id : Supprimer un utilisateur

## Authentification
- POST /login : Connexion utilisateur (JWT)
- POST /register : Inscription utilisateur

## Autres (exemple)
- GET /threads/:id/comments : Récupérer les commentaires d’un thread
- POST /threads/:id/comments : Ajouter un commentaire à un thread
