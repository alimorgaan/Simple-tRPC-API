import { useNavigate } from "react-router-dom";
import { trpc } from "../trpc";
import { useState, useEffect } from "react";


const Home = () => {
    const [todos, setTodos] = useState<Todo[]>();
    const [newTitle, setnewTitle] = useState('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    const handleAddTodo = async () => {
        try {
            await trpc.todo.addTodo.mutate({ title: newTitle });
            getTodos();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    }


    const getTodos = async () => {
        try {
            const todos = await trpc.todo.getTodos.query();
            setTodos(todos);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }

    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
        <div>
            Home
            {
                todos?.map((todo) => {
                    return (
                        <div key={todo.id}>
                            <p>{todo.title}</p>
                            <p>{todo.done ? "done" : "not done"}</p>
                        </div>
                    )
                }
                )
            }
            <input type='text' value={newTitle} onChange={(e) => setnewTitle(e.target.value)} />
            <button onClick={handleAddTodo}>Add Todo</button>
            <br />
            <button onClick={handleLogout}>logout</button>
            <h2>{error}</h2>
        </div>
    )

}

type Todo = {
    id: number;
    title: string;
    done: boolean;
    userId: number;
}


export default Home;