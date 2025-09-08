"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
require('dotenv').config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});
exports.Product = sequelize.define('product', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'photography'
    },
    available: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});
