import { Request, Response } from 'express';
import { Post, User, Comment } from '../models';

export async function getUserPosts(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    const posts = await Post.findAll({
      where: { userId },
      include: [
        { model: User, as: 'author', attributes: ['id', 'username'] },
        { model: Comment, as: 'comments' }
      ]
    });
    res.json(posts);
  } catch (err: any) {
    err.status = 500;
    err.message = 'Erreur lors de la récupération des posts de l’utilisateur.';
    return res.status(500).json({ message: err.message, details: err.errors || err });
  }
}

export async function createPost(req: Request, res: Response) {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    const error = new Error('Champs manquants pour la création du post.');
    // @ts-ignore
    error.status = 400;
    return res.status(400).json({ message: error.message });
  }
  try {
    const post = await Post.create({ title, content, userId });
    res.status(201).json(post);
  } catch (err: any) {
    err.status = 500;
    err.message = 'Erreur lors de la création du post.';
    return res.status(500).json({ message: err.message, details: err.errors || err });
  }
}

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: 'author', attributes: ['id', 'username'] },
        { model: Comment, as: 'comments' }
      ]
    });
    res.json(posts);
  } catch (err: any) {
    err.status = 500;
    err.message = 'Erreur lors de la récupération des posts.';
    return res.status(500).json({ message: err.message, details: err.errors || err });
  }
}

export async function deletePost(req: Request, res: Response) {
  const { postId } = req.params;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      const error = new Error('Post inexistant.');
      // @ts-ignore
      error.status = 404;
      return res.status(404).json({ message: error.message });
    }
    await post.destroy();
    res.json({ message: 'Post supprimé.' });
  } catch (err: any) {
    err.status = 500;
    err.message = 'Erreur lors de la suppression du post.';
    return res.status(500).json({ message: err.message, details: err.errors || err });
  }
}
