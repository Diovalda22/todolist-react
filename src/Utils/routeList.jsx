import { createBrowserRouter } from "react-router-dom";
import TodoList from "../components/TodoList";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const routes = createBrowserRouter([
    {
        path:'/todo',
        element:<TodoList/>,    
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
