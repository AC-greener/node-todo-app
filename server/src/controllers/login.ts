import { Response, Request, NextFunction } from "express";
import User from "../models/user";
const bcrypt = require("bcrypt");


// Example of adding additional properties to SessionData using declaration merging

const login = async (req: Request, res: Response): Promise<void> => {
  if(req.session.userId) {
    res.status(200).json({ message: "already login" });
    return;
  }
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).json({ message: 'User not found' });
    return;
  }
  console.log('user :>> ', user);
  // 验证密码
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401).json({ message: 'Invalid password' });
    return;
  }
  req.session.userId = user._id;
  console.log("req.session", req.session);
  console.log("req.session", req.session.id);
  res.status(200).json({ message: "login success" });
};

const regist = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const existUser = await User.findOne({ username });
  if (existUser) {
    res.status(400).json({ message: "user already exist" });
    return;
  }
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, async function (err: string, hash: string) {
    // Store hash in your password DB.
    console.log("hash :>> ", hash);
    // save user info to db
    const user = new User({
      username,
      password: hash,
    });
    const newUser = await user.save();
    console.log("newUser :>> ", newUser);
    res.status(200).json({ message: "register success" });
  });
};

export { login, regist };
