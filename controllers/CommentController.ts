import { Request, Response } from 'express';
import { Comment } from '../models';

export async function createComment(req: Request, res: Response) {
  const { postId } = req.params;
  const { content, userId } = req.body;
  if (!content || !userId) {
    const error = new Error('Champs manquants pour la création du commentaire.');
    // @ts-ignore
    error.status = 400;
    return res.status(400).json({ message: error.message });
  }
  try {
    const comment = await Comment.create({ content, userId, postId: Number(postId) });
    res.status(201).json(comment);
  } catch (err: any) {
    err.status = 500;
    err.message = 'Erreur lors de la création du commentaire.';
    return res.status(500).json({ message: err.message, details: err.errors || err });
  }
}

export async function deleteComment(req: Request, res: Response) {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      const error = new Error('Commentaire inexistant.');
      // @ts-ignore
      error.status = 404;
      return res.status(404).json({ message: error.message });
    }
    await comment.destroy();
    res.json({ message: 'Commentaire supprimé.' });
  } catch (err: any) {
    err.status = 500;
    err.message = 'Erreur lors de la suppression du commentaire.';
    return res.status(500).json({ message: err.message, details: err.errors || err });
  }
}
