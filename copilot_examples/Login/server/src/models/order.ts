import { Sequelize , DataTypes } from 'sequelize';

require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

export const Order = sequelize.define('order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products', 
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'failed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    paymentId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentMethod: {
        type: DataTypes.ENUM('paypal', 'stripe', 'test'),
        allowNull: true
    }
});