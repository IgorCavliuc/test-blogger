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
exports.authorizeUser = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//@ts-ignore
const persons_1 = __importDefault(require("../models/persons"));
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authorizationHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!authorizationHeader) {
            return res.status(401).send('Unauthorized: No token provided');
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send('Unauthorized: Token not found');
        }
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            const userId = decodedToken.userId;
            const user = yield persons_1.default.findByPk(userId);
            if (!user) {
                return res.status(401).send('Unauthorized: User not found');
            }
            //@ts-ignore
            req.user = user;
            next();
        }
        catch (error) {
            console.error('Authentication error:', error);
            return res.status(401).send('Unauthorized: Invalid token');
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});
exports.authenticateUser = authenticateUser;
const authorizeUser = (role) => {
    return (req, res, next) => {
        //@ts-ignore
        if (!req.user || req.user.role !== role) {
            return res.status(403).send('Forbidden');
        }
        next();
    };
};
exports.authorizeUser = authorizeUser;
