import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/index.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/trpc', createExpressMiddleware({ router: appRouter }));
app.listen(3001, () => {
    console.log('Example app listening on port 3001!');
});
