import { useNavigate } from "react-router-dom";
import { trpc } from "../trpc";
import { useState, useEffect } from "react";


const Home = () => {
    const [todos, setTodos] = useState<Todo[]>();
    const [newTitle, setnewTitle] = useState('');

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    const handleAddTodo = async () => {
        await trpc.todo.addTodo.mutate({ title: newTitle });
        getTodos();
    }


    const getTodos = async () => {
        const todos = await trpc.todo.getTodos.query();
        setTodos(todos);
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