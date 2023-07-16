
import { Outlet } from "react-router-dom";
import Login from "./Login";


const Protected = () => {
    return localStorage.token ? <Outlet /> : <Login />;
}

export default Protected;