import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../trpc";
import { TRPCClientError } from "@trpc/client";
import { AppRouter } from "../../../server/src/app";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const token = await trpc.user.login.query({ username, password });
            if (token) localStorage.setItem('token', token);
            navigate('/');
        }
        catch (e) {
            if (e instanceof TRPCClientError) {
                setError(e.message);
            }
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleSubmit}>Submit</button>
            <h2>{error}</h2>
            <Link to='/signup'>Signup</Link>
        </div>
    )

}

export default Login;