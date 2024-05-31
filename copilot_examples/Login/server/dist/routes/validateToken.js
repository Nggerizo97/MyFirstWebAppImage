"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    console.log(req.headers);
    if (!token) {
        return res.status(401).json({ msg: 'Access denied' });
    }
    try {
        const bearertoken = token.slice(7, token.length);
        const verified = jsonwebtoken_1.default.verify(bearertoken, process.env.SECRET_KEY);
        req.body.username = verified;
        next();
    }
    catch (error) {
        res.status(400).json({ msg: 'Invalid token' });
    }
};
exports.default = validateToken;
