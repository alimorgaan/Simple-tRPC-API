import { t } from '../trpc.js'
import { todoRouter } from './todo.js';
import { userRouter } from './user.js';
export const appRouter = t.router({
    todo: todoRouter,
    user: userRouter
}); 