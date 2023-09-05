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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield db_1.default.query('INSERT INTO Persons (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
                const token = jsonwebtoken_1.default.sign({ userId: newUser.rows[0].id }, process.env.SECRET_KEY);
                res.status(201).json({ user: newUser.rows[0], token });
            }
            catch (error) {
                console.error('Error signing up:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield db_1.default.query('SELECT * FROM Persons WHERE email = $1', [email]);
                if (user.rows.length === 0) {
                    res.status(401).json({ error: 'User not found' });
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, user.rows[0].password);
                if (!passwordMatch) {
                    res.status(401).json({ error: 'Invalid password' });
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.rows[0].id }, process.env.SECRET_KEY);
                res.json({ user: user.rows[0], token });
            }
            catch (error) {
                console.error('Error signing in:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = new AuthController();
