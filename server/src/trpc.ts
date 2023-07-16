import { initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { Request } from "express";
import jwt from "jsonwebtoken";

export const createContext = async (opts: CreateNextContextOptions) => {
    try {
        const req: Request = opts.req;
        const token = req.headers.token;
        const decoded = jwt.verify(token as string, 'morgan') as { id: string, username: string };
        return { user: decoded };
    } catch (e) {
        return { user: null };
    }
}


export const t = initTRPC.context<typeof createContext>().create();

