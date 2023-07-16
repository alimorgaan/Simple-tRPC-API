import { t } from '../trpc.js';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();
export const todoRouter = t.router({
    getAll: t.procedure.query(async () => {
        const todos = await prisma.todo.findMany({
            select: {
                id: true,
                title: true
            }
        });
        return todos;
    }),
    addTodo: t.procedure
        .input(z.object({ title: z.string(), done: z.boolean().optional() }))
        .mutation(async (opts) => {
        const { input } = opts;
        const todo = await prisma.todo.create({ data: { title: input.title } });
        return todo;
    }),
});
