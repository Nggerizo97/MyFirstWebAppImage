import { Sequelize , DataTypes } from 'sequelize';

require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

export const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'photography'
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

