"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const login_1 = require("../controllers/login");
const upload_1 = require("../controllers/upload");
const router = (0, express_1.Router)();
router.use("/add-todo", login_1.needLogin);
router.post("/login", login_1.checkLogin);
router.post("/login", login_1.login);
router.post("/regist", login_1.regist);
router.post("/upload", upload_1.upload);
router.get("/todos", todos_1.getTodos);
router.post("/add-todo", todos_1.addTodo);
// router.put("/edit-todo/:id", updateTodo)
router.delete("/delete-todo/:id", todos_1.deleteTodo);
exports.default = router;
