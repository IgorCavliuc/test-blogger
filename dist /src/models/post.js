"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class Post extends sequelize_1.Model {
}
Post.init({
    title: sequelize_1.DataTypes.STRING,
    content: sequelize_1.DataTypes.TEXT,
}, {
    sequelize: sequelize_2.default,
    modelName: 'post',
});
exports.default = Post;
