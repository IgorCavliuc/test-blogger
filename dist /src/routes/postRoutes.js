"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const postController_1 = __importDefault(require("../controllers/postController"));
const router = (0, express_1.Router)();
router.post('/post', authMiddleware_1.authorizeUser, postController_1.default.createPost);
router.put('/post/:postId', authMiddleware_1.authorizeUser, postController_1.default.updatePost);
router.delete('/post/:postId', authMiddleware_1.authorizeUser, postController_1.default.deletePost);
router.put('/post/:postId/publish', authMiddleware_1.authorizeUser, postController_1.default.publishPost);
router.put('/post/:postId/hide', authMiddleware_1.authorizeUser, postController_1.default.hidePost);
router.get('/allpost', postController_1.default.getAllPosts);
exports.default = router;
