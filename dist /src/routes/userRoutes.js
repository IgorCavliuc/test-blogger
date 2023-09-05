"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.get('/user', userController_1.default.getAllUsers);
router.get('/user/:id', userController_1.default.getUserById);
router.put('/user/:id', userController_1.default.updateUser);
router.delete('/user/:id', userController_1.default.deleteUser);
exports.default = router;
