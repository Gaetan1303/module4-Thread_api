import { Router } from 'express';
import { register, login, logout } from '../controllers/AuthController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateJWT, logout);

export default router;
