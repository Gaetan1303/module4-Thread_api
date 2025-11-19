import { Router } from 'express';
import { createPost, getAllPosts, deletePost, getUserPosts } from '../controllers/PostController';
import { createComment, deleteComment } from '../controllers/CommentController';
import { authenticateJWT, authorizeOwnerOrAdmin } from '../middleware/auth';
import { Post, Comment } from '../models';

const router = Router();

// Récupérer les posts d'un utilisateur
router.get('/users/:userId/posts', getUserPosts);

// Posts
router.post('/posts', authenticateJWT, createPost);
router.get('/posts', getAllPosts);
router.delete(
	'/posts/:postId',
	authenticateJWT,
	authorizeOwnerOrAdmin(async req => {
		const post = await Post.findByPk(req.params.postId);
		return post;
	}),
	deletePost
);

// Comments
router.post('/posts/:postId/comments', authenticateJWT, createComment);
router.delete(
	'/comments/:commentId',
	authenticateJWT,
	authorizeOwnerOrAdmin(async req => {
		const comment = await Comment.findByPk(req.params.commentId);
		return comment;
	}),
	deleteComment
);

export default router;
