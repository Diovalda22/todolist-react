import { createBrowserRouter } from "react-router-dom";
import TodoList from "../components/TodoList";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import TaskList from "../pages/taskList";

const routes = createBrowserRouter([
    // {
    //     path:'/tasks',
    //     element:<TodoList/>,    
    // },
    {
        path: '/tasks/:id',  // Route untuk detail task
        element: <TodoList />,
    },
    {
        path:'/',
        element:<TaskList/>,    
    },
    {
        path:'/login',
        element:<LoginPage/>,    
    },
    {
        path:'/register',
        element:<RegisterPage/>,    
    }
])

export default routes;
