const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Post extends Model {}
Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
}, { sequelize, modelName: 'post' });

module.exports = Post;
