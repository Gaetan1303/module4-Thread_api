import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export interface AuthRequest extends Request {
  user?: { id: number; username: string; isAdmin?: boolean };
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string; isAdmin?: boolean };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
}

export function authorizeOwnerOrAdmin(getResource: (req: AuthRequest) => Promise<{ userId: number } | null>) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const resource = await getResource(req);
      if (!resource) return res.status(404).json({ message: 'Ressource non trouvée' });
      if (req.user?.id === resource.userId || req.user?.isAdmin) {
        return next();
      }
      return res.status(403).json({ message: 'Non autorisé' });
    } catch (err) {
      return res.status(500).json({ message: 'Erreur serveur', error: err });
    }
  };
}
