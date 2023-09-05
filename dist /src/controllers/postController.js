"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class PostController {
    createPost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content } = req.body;
                //@ts-ignore
                const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
                const newPost = yield db_1.default.query('INSERT INTO posts (title, content, is_published, user_id) VALUES ($1, $2, $3, $4) RETURNING *', [title, content, true, userId]);
                res.status(201).json({ message: 'Post created', data: newPost.rows[0] });
            }
            catch (error) {
                console.error("error", error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.postId;
            const { title, content } = req.body;
            try {
                const updatedPost = yield db_1.default.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *', [title, content, postId]);
                if (updatedPost.rows.length === 0) {
                    res.status(404).json({ message: 'Post not found' });
                }
                res.status(200).json({ message: 'Post updated', data: updatedPost.rows[0] });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    deletePost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.postId;
            //@ts-ignore
            const userId = ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id) || "";
            try {
                const post = yield db_1.default.query('SELECT * FROM posts WHERE id = $1', [postId]);
                if (post.rows.length === 0) {
                    res.status(404).json({ message: 'Post not found' });
                }
                const postOwnerId = post.rows[0].user_id;
                const isPublic = post.rows[0].is_published;
                //@ts-ignore
                if (isPublic && (postOwnerId === userId || req.user.is_admin)) {
                    yield db_1.default.query('DELETE FROM posts WHERE id = $1', [postId]);
                    res.status(204).json({ message: 'Post deleted' });
                }
                else {
                    res.status(403).json({ message: 'Unauthorized' });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    publishPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.postId;
            //@ts-ignore
            const userId = req.user.id;
            try {
                const post = yield db_1.default.query('SELECT * FROM posts WHERE id = $1', [postId]);
                if (post.rows.length === 0) {
                    res.status(404).json({ message: 'Post not found' });
                }
                const postOwnerId = post.rows[0].user_id;
                if (postOwnerId !== +userId) {
                    res.status(403).json({ message: 'Unauthorized' });
                }
                const publishedPost = yield db_1.default.query('UPDATE posts SET is_published = $1 WHERE id = $2 RETURNING *', [true, postId]);
                res.status(200).json({ message: 'Post published', data: publishedPost.rows[0] });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    hidePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.postId;
            //@ts-ignore
            const userId = req.user.id;
            try {
                const post = yield db_1.default.query('SELECT * FROM posts WHERE id = $1', [postId]);
                if (post.rows.length === 0) {
                    res.status(404).json({ message: 'Post not found' });
                }
                const postOwnerId = post.rows[0].user_id;
                if (postOwnerId === userId) {
                    const hiddenPost = yield db_1.default.query('UPDATE posts SET is_published = $1 WHERE id = $2 RETURNING *', [false, postId]);
                    res.status(200).json({ message: 'Post hidden', data: hiddenPost.rows[0] });
                }
                else {
                    res.status(403).json({ message: 'Unauthorized' });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allPosts = yield db_1.default.query('SELECT * FROM posts');
                res.status(200).json({ message: 'All posts', data: allPosts.rows });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
}
exports.default = new PostController();
