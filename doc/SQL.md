# Requêtes SQL nécessaires pour ThreadAPI

## Table threads
- Récupérer tous les threads :
```sql
SELECT * FROM threads;
```
- Récupérer un thread par ID :
```sql
SELECT * FROM threads WHERE id = ?;
```
- Créer un thread :
```sql
INSERT INTO threads (title, content, user_id, created_at) VALUES (?, ?, ?, NOW());
```
- Mettre à jour un thread :
```sql
UPDATE threads SET title = ?, content = ? WHERE id = ?;
```
- Supprimer un thread :
```sql
DELETE FROM threads WHERE id = ?;
```

## Table users
- Récupérer tous les utilisateurs :
```sql
SELECT * FROM users;
```
- Récupérer un utilisateur par ID :
```sql
SELECT * FROM users WHERE id = ?;
```
- Créer un utilisateur :
```sql
INSERT INTO users (username, email, password) VALUES (?, ?, ?);
```
- Mettre à jour un utilisateur :
```sql
UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?;
```
- Supprimer un utilisateur :
```sql
DELETE FROM users WHERE id = ?;
```

## Table comments (exemple)
- Récupérer les commentaires d’un thread :
```sql
SELECT * FROM comments WHERE thread_id = ?;
```
- Ajouter un commentaire à un thread :
```sql
INSERT INTO comments (thread_id, user_id, content, created_at) VALUES (?, ?, ?, NOW());
```
