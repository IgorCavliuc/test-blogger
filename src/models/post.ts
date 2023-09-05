import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
}

Post.init(
    {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
    },
    {
        sequelize,
        modelName: 'post',
    }
);

export default Post;
