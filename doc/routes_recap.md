# Tableau récapitulatif des routes et middlewares

| Méthode | Endpoint                        | Authentification requise | Middleware(s)                | Description                                 |
|---------|----------------------------------|--------------------------|-------------------------------|---------------------------------------------|
| POST    | /register                       | Non                     | -                             | Inscription utilisateur                     |
| POST    | /login                          | Non                     | -                             | Connexion utilisateur                       |
| POST    | /logout                         | Oui                     | authenticateJWT               | Déconnexion (nécessite d’être connecté)     |
| GET     | /posts                          | Non                     | -                             | Liste tous les posts                        |
| POST    | /posts                          | Oui                     | authenticateJWT               | Créer un post                               |
| DELETE  | /posts/:postId                  | Oui                     | authenticateJWT, authorize... | Supprimer un post (auteur/admin)            |
| GET     | /users/:userId/posts            | Non                     | -                             | Liste les posts d’un utilisateur            |
| POST    | /posts/:postId/comments         | Oui                     | authenticateJWT               | Ajouter un commentaire                      |
| DELETE  | /comments/:commentId            | Oui                     | authenticateJWT, authorize... | Supprimer un commentaire (auteur/admin)     |

- `authenticateJWT` : vérifie que l’utilisateur est connecté (JWT valide)
- `authorizeOwnerOrAdmin` : vérifie que l’utilisateur est l’auteur ou un admin

Copiez-collez ces informations pour tester chaque route dans Thunder Client ou Postman.
