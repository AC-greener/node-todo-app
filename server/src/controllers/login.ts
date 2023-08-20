import { Response, Request } from "express"
import User from "../models/user"
const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body
  // save user info to db
  const user = new User({
    username,
    password
  })
  req.session.user = {
    username,
    password
  }
  console.log("req.session", req.session)
  console.log("req.session", req.session.id)
  const newUser = await user.save()
  console.log('newUser :>> ', newUser)
  res.status(200).json({ message: "login success" })
}

export {
  login
}