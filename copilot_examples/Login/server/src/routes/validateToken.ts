import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    console.log(token);
    console.log(req.headers);
    if(!token){
        return res.status(401).json({ msg: 'Access denied' });
    }
    try{
        const bearertoken = token.slice(7, token.length);
        const verified = jwt.verify(bearertoken, process.env.SECRET_KEY!);
        req.body.username = verified;
        next();
    }
    catch(error){
        res.status(400).json({ msg: 'Invalid token' });
    }
}

export default validateToken;