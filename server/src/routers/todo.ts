import { t } from '../trpc.js';
import prisma from '../db.js';
import { z } from 'zod';
import { isAuth } from '../middlewares/isAuth.js';
import { TRPCError } from '@trpc/server';


const protectedProcedure = t.procedure.use(isAuth);


export const todoRouter = t.router({

    addTodo: protectedProcedure.input(z.object({ title: z.string() })).mutation(async ({ input, ctx }) => {
        const newTodo = await prisma.todo.create({
            data: {
                title: input.title,
                user: {
                    connect: {
                        id: parseInt(ctx.user.id)
                    }
                }
            }
        })
        return newTodo;
    }),

    getTodos: protectedProcedure.query(async ({ ctx }) => {
        return await prisma.todo.findMany({
            where: {
                userId: parseInt(ctx.user.id)
            }
        })
    }),






});

