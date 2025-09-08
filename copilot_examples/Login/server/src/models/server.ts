import express from 'express';
import routesProduct from '../routes/product';
import routesUsers from '../routes/user';
import routesOrder from '../routes/order';
import routesPayment from '../routes/payment';
import { Request, Response, NextFunction } from 'express';
import  cors  from 'cors';
import { Product } from './products';
import { User } from './user';
import { Order } from './order';


class Server {
    public app: express.Application;
    public port: number | string | undefined;
    constructor() {
        this.app = express();
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
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Hello World');
        });
        this.app.use('/api/user', routesUsers);
        this.app.use('/api/product', routesProduct);
        this.app.use('/api/order', routesOrder);
        this.app.use('/api/payment', routesPayment);
        
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        //Cors
        this.app.use(cors())
        // Custom middleware to set headers
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }    


    db(){
        User.sync({ force: false });
        Product.sync({ force: false });
        Order.sync({ force: false });
        
        // Set up associations
        this.setupAssociations();
        
        // Seed sample data
        setTimeout(async () => {
            const { seedProducts } = await import('../utils/seedData');
            await seedProducts();
        }, 2000);
    }

    setupAssociations() {
        // User has many Orders
        User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
        Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
        
        // Product has many Orders  
        Product.hasMany(Order, { foreignKey: 'productId', as: 'orders' });
        Order.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
    }
      
}

export default Server;