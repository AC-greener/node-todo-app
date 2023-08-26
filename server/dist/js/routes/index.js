"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const login_1 = require("../controllers/login");
const upload_1 = require("../controllers/upload");
const router = (0, express_1.Router)();
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
router.post("/login", login_1.login);
router.post("/regist", login_1.regist);
router.post("/upload", upload_1.upload);
router.get("/todos", todos_1.getTodos);
router.post("/add-todo", todos_1.addTodo);
// router.put("/edit-todo/:id", updateTodo)
router.delete("/delete-todo/:id", todos_1.deleteTodo);
exports.default = router;
