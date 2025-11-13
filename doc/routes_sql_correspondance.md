# Correspondance routes <-> requêtes SQL

## Threads
- GET /threads → `SELECT * FROM threads;`
- GET /threads/:id → `SELECT * FROM threads WHERE id = ?;`
- POST /threads → `INSERT INTO threads (title, content, user_id, created_at) VALUES (?, ?, ?, NOW());`
- PUT /threads/:id → `UPDATE threads SET title = ?, content = ? WHERE id = ?;`
- DELETE /threads/:id → `DELETE FROM threads WHERE id = ?;`

## Utilisateurs
- GET /users → `SELECT * FROM users;`
- GET /users/:id → `SELECT * FROM users WHERE id = ?;`
- POST /users → `INSERT INTO users (username, email, password) VALUES (?, ?, ?);`
- PUT /users/:id → `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?;`
- DELETE /users/:id → `DELETE FROM users WHERE id = ?;`

## Authentification
- POST /login → `SELECT * FROM users WHERE email = ?;` (vérification du mot de passe ensuite)
- POST /register → `INSERT INTO users (username, email, password) VALUES (?, ?, ?);`

## Commentaires 
- GET /threads/:id/comments → `SELECT * FROM comments WHERE thread_id = ?;`
- POST /threads/:id/comments → `INSERT INTO comments (thread_id, user_id, content, created_at) VALUES (?, ?, ?, NOW());`
