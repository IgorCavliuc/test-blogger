"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = __importDefault(require("../controllers/authController"));
router.post('/signup', authController_1.default.signUp);
router.post('/signin', authController_1.default.signIn);
exports.default = router;
