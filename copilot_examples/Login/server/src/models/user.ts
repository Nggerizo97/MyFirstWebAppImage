import { Sequelize , DataTypes } from 'sequelize';

require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

export const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
});