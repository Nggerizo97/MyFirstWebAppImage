"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const cors_1 = __importDefault(require("cors"));
const products_1 = require("./products");
const user_2 = require("./user");
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
        products_1.Product.sync({ force: false });
        user_2.User.sync({ force: false });
    }
}
exports.default = Server;
