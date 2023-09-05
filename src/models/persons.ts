import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequelize';

interface PersonsAttributes {
    name: string;
    email: string;
    password: string;
    is_admin: boolean;
    created_at: Date;
}

class Persons extends Model<PersonsAttributes> {
    public name!: string;
    public email!: string;
    public password!: string;
    public is_admin!: boolean;
    public created_at!: Date;

    public static associate(models: any): void {
    }
}

Persons.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
        },
    },
    {
        sequelize,
        modelName: 'persons',
        tableName: 'persons',
    }
);

export default Persons;
