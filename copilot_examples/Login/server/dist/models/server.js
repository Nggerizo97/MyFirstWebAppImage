"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const order_1 = __importDefault(require("../routes/order"));
const payment_1 = __importDefault(require("../routes/payment"));
const cors_1 = __importDefault(require("cors"));
const products_1 = require("./products");
const user_2 = require("./user");
const order_2 = require("./order");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 3001;
        this.middlewares();
        this.routes();
        this.db();
    }
    listen() {
        this.app.listen(this.port, () => {
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World');
        });
        this.app.use('/api/user', user_1.default);
        this.app.use('/api/product', product_1.default);
        this.app.use('/api/order', order_1.default);
        this.app.use('/api/payment', payment_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.static('public'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        //Cors
        this.app.use((0, cors_1.default)());
        // Custom middleware to set headers
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }
    db() {
        user_2.User.sync({ force: false });
        products_1.Product.sync({ force: false });
        order_2.Order.sync({ force: false });
        // Set up associations
        this.setupAssociations();
        // Seed sample data
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            const { seedProducts } = yield Promise.resolve().then(() => __importStar(require('../utils/seedData')));
            yield seedProducts();
        }), 2000);
    }
    setupAssociations() {
        // User has many Orders
        user_2.User.hasMany(order_2.Order, { foreignKey: 'userId', as: 'orders' });
        order_2.Order.belongsTo(user_2.User, { foreignKey: 'userId', as: 'user' });
        // Product has many Orders  
        products_1.Product.hasMany(order_2.Order, { foreignKey: 'productId', as: 'orders' });
        order_2.Order.belongsTo(products_1.Product, { foreignKey: 'productId', as: 'product' });
    }
}
exports.default = Server;
