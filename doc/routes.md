# Documentation des routes de l’API ThreadAPI

## Authentification

### POST /api/register
- **Description** : Inscription d’un nouvel utilisateur
- **Body** :
  - username (string, requis)
  - email (string, requis)
  - password (string, requis)
  - isAdmin (boolean, optionnel)
- **Réponse** :
  - 201 : Utilisateur créé, JWT en cookie
  - 409 : Utilisateur déjà existant
  - 400 : Champs manquants

### POST /api/login
- **Description** : Connexion d’un utilisateur
- **Body** :
  - email (string, requis)
  - password (string, requis)
- **Réponse** :
  - 200 : Connexion réussie, JWT en cookie
  - 401 : Identifiants invalides

### POST /api/logout
- **Description** : Déconnexion (suppression du cookie JWT)
- **Protection** : Oui (JWT)
- **Réponse** :
  - 200 : Déconnexion réussie

---

## Posts

### POST /api/posts
- **Description** : Création d’un post
- **Body** :
  - title (string, requis)
  - content (string, requis)
  - userId (number, requis)
- **Protection** : Oui (JWT)
- **Réponse** :
  - 201 : Post créé
  - 400 : Champs manquants
  - 401 : Non authentifié

### GET /api/posts
- **Description** : Liste tous les posts avec leurs commentaires
- **Réponse** :
  - 200 : Liste des posts

### DELETE /api/posts/:postId
- **Description** : Supprime un post (auteur ou admin)
- **Protection** : Oui (JWT, auteur ou admin)
- **Réponse** :
  - 200 : Post supprimé
  - 403 : Non autorisé
  - 404 : Post inexistant

### GET /api/users/:userId/posts
- **Description** : Liste les posts d’un utilisateur
- **Réponse** :
  - 200 : Liste des posts

---

## Commentaires

### POST /api/posts/:postId/comments
- **Description** : Ajoute un commentaire à un post
- **Body** :
  - content (string, requis)
  - userId (number, requis)
- **Protection** : Oui (JWT)
- **Réponse** :
  - 201 : Commentaire créé
  - 400 : Champs manquants
  - 401 : Non authentifié

### DELETE /api/comments/:commentId
- **Description** : Supprime un commentaire (auteur ou admin)
- **Protection** : Oui (JWT, auteur ou admin)
- **Réponse** :
  - 200 : Commentaire supprimé
  - 403 : Non autorisé
  - 404 : Commentaire inexistant

---

# Cas d’usage critiques à tester
- Inscription avec email déjà existant
- Connexion avec mauvais mot de passe
- Création de post/commentaire sans être connecté
- Suppression de post/commentaire par un non-auteur non-admin
- Suppression de post/commentaire par un admin
- Suppression de post/commentaire inexistant
- Récupération des posts d’un utilisateur sans posts
- Récupération de tous les posts (aucun post)

---

Pour chaque route, tester les cas d’erreur et de succès pour garantir la robustesse de l’API.
