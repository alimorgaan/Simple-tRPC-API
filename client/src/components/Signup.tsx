import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { trpc } from "../trpc";
import { useNavigate } from "react-router-dom";
import { TRPCClientError } from "@trpc/client";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const token = await trpc.user.signup.mutate({ username, password });
            if (token) {
                localStorage.setItem('token', token);
            }
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
            <h1>Signup</h1>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleSubmit}>Submit</button>
            <h2>{error}</h2>
            <Link to='/login'>Login</Link>
        </div>
    )
}

export default Signup;