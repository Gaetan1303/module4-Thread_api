import { errorHandler } from './middleware/errorHandler';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
import { sequelize } from './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());



app.use('/api', authRoutes);
app.use('/api', postRoutes);

// Middleware de gestion d'erreur (doit être après les routes)
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('ThreadAPI est en ligne');
});

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erreur de connexion à la base de données', err);
  }
})();
