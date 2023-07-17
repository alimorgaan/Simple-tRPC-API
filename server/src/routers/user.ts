import { z } from 'zod';
import { t } from '../trpc.js'
import { prisma } from '../db.js';
import jwt from 'jsonwebtoken';
import { hash, genSalt, compare } from 'bcrypt';
import { TRPCError } from '@trpc/server';


export const userRouter = t.router({
    login: t.procedure
        .input(z.object({ username: z.string(), password: z.string() }))
        .query(async ({ input, ctx }) => {
            const user = await prisma.user.findUnique({
                where: {
                    username: input.username
                }
            })
            if (!user) throw new TRPCError({
                message: "user not found",
                code: "BAD_REQUEST"
            });
            const isMatch = await compare(input.password, user.password);
            if (!isMatch) throw new TRPCError({
                message: "wrong password",
                code: "BAD_REQUEST"
            });
            const payload = {
                id: user.id,
                username: user.username
            }
            const token = jwt.sign(payload, "morgan");
            return token;
        }),

    signup: t.procedure
        .input(z.object({ username: z.string(), password: z.string() }))
        .mutation(async ({ input, ctx }) => {

            const salt = await genSalt();
            const hashedPassword = await hash(input.password, salt);

            const newUser = await prisma.user.create({
                data: {
                    username: input.username,
                    password: hashedPassword
                }
            })

            if (!newUser) throw new TRPCError({
                message: "something went wrong",
                code: "INTERNAL_SERVER_ERROR"
            });

            const payload = {
                id: newUser.id,
                username: newUser.username
            }
            const token = jwt.sign(payload, "morgan");
            return token;
        })
}); 