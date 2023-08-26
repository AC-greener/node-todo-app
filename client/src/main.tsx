import './index.css'
import Todo from './App'
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Link,
} from "react-router-dom";
import Login from './components/Login';
const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <h1 style={{textAlign: "center"}}>Hello Please Login</h1>
                <Login/>
                <div style={{textAlign: "center", margin: "20px", }}>
                    <Link style={{color: "white"}}  to="todo">Go ToDoList</Link>
                </div>
            </div>
        ),
    },
    {
        path: "todo",
        element: <Todo/>,
    },
]);

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
