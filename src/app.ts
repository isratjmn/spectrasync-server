import express, { Application, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
const app: Application = express();
import cookieParser from 'cookie-parser';
import router from './app/routes';

// CORS options
const corsOptions: CorsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 204,
};
//Parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Application Routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('SpectraSync Server ir Running!!!');
});

export default app;
