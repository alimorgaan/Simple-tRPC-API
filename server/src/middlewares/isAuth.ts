import { TRPCError } from '@trpc/server';
import { t } from '../trpc.js'


export const isAuth = t.middleware(async (opts) => {
    const { ctx } = opts;
    if (!ctx.user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to do this'
        })
    } else {
        return opts.next({
            ctx: {
                user: ctx.user as { id: string, username: string }
            }
        });
    }
}); 