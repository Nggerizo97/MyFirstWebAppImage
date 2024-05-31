"use strict";
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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Validate username is unique
    yield user_1.User.findOne({ where: { username: username } }).then(user => {
        if (user) {
            return res.status(400).json({ msg: 'Username already exists' });
        }
    });
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    //Create new user
    try {
        yield user_1.User.create({
            username,
            password: hashedPassword
        });
        res.json({
            msg: `User ${username} created successfully`
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error creating user',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const user = new User({ name, email, password });
    //await user.save();
    const { username, password } = req.body;
    // validate username exists
    const user = yield user_1.User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({ msg: `Username ${username} do not exist in the data base` });
    }
    // validate password is correct
    const validPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ msg: 'Password incorrect' });
    }
    //Create JWT
    const token = jsonwebtoken_1.default.sign({ username: username }, process.env.SECRET_KEY, {
        expiresIn: 86400
    });
    res.json({
        msg: 'Login successful',
        token
    });
});
exports.loginUser = loginUser;
