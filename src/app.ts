import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import config from './app/config';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFount from './app/middlewares/notFount';
import router from './app/router';
const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: [
      'https://spectrasync-glasses.netlify.app',
      'http://localhost:5173',
      'http://localhost:5174',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 204,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send(`SpectraSync Server Running on port: ${config.port}..........`);
});

app.use('/api', router);
app.use(globalErrorHandler);

app.use(notFount);
export default app;
