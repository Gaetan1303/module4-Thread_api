import { loadSequelize } from "./database.mjs";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import authRoutes from "./routes/auth.ts";
import postRoutes from "./routes/post.ts";

/**
 * Point d'entrée de l'application
 * Vous déclarer ici les routes de votre API REST
 */
async function main() {
    try {
        const sequelize = await loadSequelize();
        const app = express();

        // Configuration CORS pour accepter les requêtes depuis le frontend
        app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true
        }));

        // Middleware pour parser le JSON
        app.use(express.json());

        // Routes
        app.use('/auth', authRoutes);
        app.use('/', postRoutes); // Les routes des posts sont directement à la racine (/posts, etc.)

        app.listen(3000, () => {
            console.log("Serveur démarré sur http://localhost:3000");
        });


    } catch (error) {
        console.error("Error de chargement de Sequelize:", error);
    }
}
main();