import express, { Request, Response, json } from 'express';
import helmet from 'helmet';
import  {startServer}  from './config/database';
const app: express.Application = express();
app.use(express.json())
app.use(helmet())
startServer()

// Routes






export default app;