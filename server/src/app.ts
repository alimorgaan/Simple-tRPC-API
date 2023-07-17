import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/index.js';
import { createContext } from './trpc.js';



const app: express.Application = express();


app.use(cors());
app.use(express.json());


app.use('/trpc', createExpressMiddleware({
    router: appRouter, createContext
}));

app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
}
);


export type AppRouter = typeof appRouter;

