import { Response, Request } from "express"
import { ITodo } from "../types"
import Todo from "../models/todo"

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find()
        res.status(200).json({ todos })
    } catch (error) {
        throw error
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body
        console.log(body, 11111)
        console.log(req.body, 'req.body')
        const todo: ITodo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status,
        })

        const newTodo: ITodo = await todo.save()
        const allTodos: ITodo[] = await Todo.find()

        res
            .status(201)
            .json({ message: "Todo added", todo: newTodo, todos: allTodos })
    } catch (error) {
        throw error
    }
}
export { getTodos, addTodo }