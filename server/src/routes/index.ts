import { Router, Request, Response } from "express"
import { getTodos, addTodo, deleteTodo,updateTodo } from "../controllers/todos"
import { login, regist, checkLogin, needLogin } from "../controllers/login"
import { upload } from "../controllers/upload"
const router: Router = Router()

router.use("/add-todo", needLogin)
router.post("/login", checkLogin)
router.post("/login", login)
router.post("/regist", regist)
router.post("/upload", upload)

router.get("/todos", getTodos)

router.post("/add-todo", addTodo)

router.put("/edit-todo/:id", updateTodo)

router.delete("/delete-todo/:id", deleteTodo)

export default router