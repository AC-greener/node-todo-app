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
exports.needLogin = exports.checkLogin = exports.regist = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt = require("bcrypt");
// Example of adding additional properties to SessionData using declaration merging
const needLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.userId) {
        next();
    }
    else {
        res.status(401).json({ message: "please login" });
        return;
    }
});
exports.needLogin = needLogin;
const checkLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.userId) {
        res.status(200).json({ message: "already login" });
        return;
    }
    else {
        next();
    }
});
exports.checkLogin = checkLogin;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log('username, password :>> ', username, password);
    const user = yield user_1.default.findOne({ username });
    if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
    }
    console.log('user :>> ', user);
    // 验证密码
    const passwordMatch = yield bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        res.status(401).json({ message: 'Invalid password' });
        return;
    }
    req.session.userId = user._id;
    console.log("req.session", req.session);
    console.log("req.session", req.session.id);
    res.status(200).json({ message: "login success" });
});
exports.login = login;
const regist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const existUser = yield user_1.default.findOne({ username });
    if (existUser) {
        res.status(400).json({ message: "user already exist" });
        return;
    }
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            // Store hash in your password DB.
            console.log("hash :>> ", hash);
            // save user info to db
            const user = new user_1.default({
                username,
                password: hash,
            });
            const newUser = yield user.save();
            console.log("newUser :>> ", newUser);
            res.status(200).json({ message: "register success" });
        });
    });
});
exports.regist = regist;
