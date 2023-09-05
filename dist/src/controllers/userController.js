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
class UserController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allPeople = yield db_1.default.query('SELECT * FROM Persons');
                res.status(200).json(allPeople.rows);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id);
            if (isNaN(userId)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            try {
                const user = yield db_1.default.query('SELECT * FROM Persons WHERE id = $1', [userId]);
                if (user.rows.length === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(user.rows[0]);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const { name, email, password, is_admin } = req.body;
            try {
                const updatedUser = yield db_1.default.query('UPDATE Persons SET name = $1, email = $2, password = $3, is_admin = $4 WHERE id = $5 RETURNING *', [name, email, password, is_admin, userId]);
                if (updatedUser.rows.length === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(updatedUser.rows[0]);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const deletedUser = yield db_1.default.query('DELETE FROM Persons WHERE id = $1 RETURNING *', [userId]);
                if (deletedUser.rows.length === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(204).json({ message: 'User deleted successfully' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
}
exports.default = new UserController();
