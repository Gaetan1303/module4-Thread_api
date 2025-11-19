import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const COOKIE_NAME = 'token';

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password, isAdmin } = req.body;
    if (!username || !email || !password) {
      const error = new Error('Champs manquants pour l’inscription.');
      // @ts-ignore
      error.status = 400;
      return res.status(400).json({ message: error.message });
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      const error = new Error('Utilisateur déjà existant.');
      // @ts-ignore
      error.status = 409;
      return res.status(409).json({ message: error.message });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash, isAdmin: !!isAdmin });
    const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.status(201).json({ message: 'Inscription réussie', user: { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin } });
  } catch (err: any) {
    err.status = 500;
    err.message = 'Erreur lors de l’inscription.';
    return res.status(500).json({ message: err.message, details: err.errors || err });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error('Champs manquants pour la connexion.');
      // @ts-ignore
      error.status = 400;
      return res.status(400).json({ message: error.message });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error('Identifiants invalides.');
      // @ts-ignore
      error.status = 401;
      return res.status(401).json({ message: error.message });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      const error = new Error('Identifiants invalides.');
      // @ts-ignore
      error.status = 401;
      return res.status(401).json({ message: error.message });
    }
    const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.json({ message: 'Connexion réussie', user: { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin } });
  } catch (err: any) {
    err.status = 500;
    err.message = 'Erreur lors de la connexion.';
    return res.status(500).json({ message: err.message, details: err.errors || err });
  }
}

export function logout(req: Request, res: Response) {
  res.clearCookie(COOKIE_NAME);
  res.json({ message: 'Déconnexion réussie' });
}
