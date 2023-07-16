import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../server/src/app.js';


export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3001/trpc',
            async headers() {
                return {
                    token: localStorage.getItem('token') || '',
                }
            }
        }),
    ],
});