import { Router, Request, Response } from "express"
import { getTodos, addTodo, deleteTodo } from "../controllers/todos"
import { login, regist, checkLogin, needLogin } from "../controllers/login"
import { upload } from "../controllers/upload"
const router: Router = Router()

// Access the session as req.session
// router.get('/index', function(req: Request, res: Response, next) {
//   if (req.session.views) {
//     req.session.views++
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<p>views: ' + req.session.views + '</p>')
//     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     console.log('req.session :>> ', req.session.id);
//     res.end()
//   } else {
//     console.log('req.session :>> ', req.session);
//     req.session.views = 1
//     res.end('welcome to the session demo. refresh!')
//   }
// })
router.use("/add-todo", needLogin)
router.post("/login", checkLogin)
router.post("/login", login)
router.post("/regist", regist)
router.post("/upload", upload)

router.get("/todos", getTodos)

router.post("/add-todo", addTodo)

// router.put("/edit-todo/:id", updateTodo)

router.delete("/delete-todo/:id", deleteTodo)

export default router