import { Request, Response } from 'express';
import db from '../db';

class PostController {
    async createPost(req: Request, res: Response): Promise<void> {
        try {
            const { title, content } = req.body;
            //@ts-ignore
            const userId = req?.user?.id;

            const newPost = await db.query(
                'INSERT INTO posts (title, content, is_published, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [title, content, true, userId]
            );

            res.status(201).json({ message: 'Post created', data: newPost.rows[0] });
        } catch (error) {
            console.error("error", error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async updatePost(req: Request, res: Response): Promise<void> {
        const postId = req.params.postId;
        const { title, content } = req.body;

        try {
            const updatedPost = await db.query(
                'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
                [title, content, postId]
            );

            if (updatedPost.rows.length === 0) {
                res.status(404).json({ message: 'Post not found' });
            }

            res.status(200).json({ message: 'Post updated', data: updatedPost.rows[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        const postId = req.params.postId;
        //@ts-ignore
        const userId = req?.user?.id || "";

        try {
            const post = await db.query('SELECT * FROM posts WHERE id = $1', [postId]);

            if (post.rows.length === 0) {
                res.status(404).json({ message: 'Post not found' });
            }

            const postOwnerId = post.rows[0].user_id;
            const isPublic = post.rows[0].is_published;
//@ts-ignore
            if (isPublic && (postOwnerId === userId || req.user.is_admin)) {
                await db.query('DELETE FROM posts WHERE id = $1', [postId]);
                res.status(204).json({ message: 'Post deleted' });
            } else {
                 res.status(403).json({ message: 'Unauthorized' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async publishPost(req: Request, res: Response): Promise<void> {
        const postId = req.params.postId;
        //@ts-ignore
        const userId = req.user.id;

        try {
            const post = await db.query('SELECT * FROM posts WHERE id = $1', [postId]);

            if (post.rows.length === 0) {
                 res.status(404).json({ message: 'Post not found' });
            }

            const postOwnerId = post.rows[0].user_id;
            if (postOwnerId !== +userId) {
                res.status(403).json({ message: 'Unauthorized' });
            }

            const publishedPost = await db.query(
                'UPDATE posts SET is_published = $1 WHERE id = $2 RETURNING *',
                [true, postId]
            );

            res.status(200).json({ message: 'Post published', data: publishedPost.rows[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async hidePost(req: Request, res: Response): Promise<void> {
        const postId = req.params.postId;
        //@ts-ignore
        const userId = req.user.id;

        try {
            const post = await db.query('SELECT * FROM posts WHERE id = $1', [postId]);

            if (post.rows.length === 0) {
                 res.status(404).json({ message: 'Post not found' });
            }

            const postOwnerId = post.rows[0].user_id;

            if (postOwnerId === userId) {
                const hiddenPost = await db.query(
                    'UPDATE posts SET is_published = $1 WHERE id = $2 RETURNING *',
                    [false, postId]
                );

                res.status(200).json({ message: 'Post hidden', data: hiddenPost.rows[0] });
            } else {
                res.status(403).json({ message: 'Unauthorized' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async getAllPosts(req: Request, res: Response): Promise<void> {
        try {
            const allPosts = await db.query('SELECT * FROM posts');
            res.status(200).json({ message: 'All posts', data: allPosts.rows });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

export default new PostController();
