import express from 'express';
import routesProduct from '../routes/product';
import routesUsers from '../routes/user';
import { Request, Response, NextFunction } from 'express';
import  cors  from 'cors';
import { Product } from './products';
import { User } from './user';


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
        Product.sync({ force: false });
        User.sync({ force: false });
    }
      
}

export default Server;