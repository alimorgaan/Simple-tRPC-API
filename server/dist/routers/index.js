import { t } from '../trpc.js';
import { todoRouter } from './todo.js';
export const appRouter = t.router({
    todo: todoRouter
});
