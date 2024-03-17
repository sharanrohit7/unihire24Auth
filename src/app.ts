import express, { Request, Response, json } from 'express';
import helmet from 'helmet';
import  {startServer}  from './config/database';
import { connectToToken } from './config/tokenConfig';
import authenticateToken from './middleware/jwt';
import authRoute from "./routes/auth.route"
const app: express.Application = express();
app.use(express.json())
app.use(helmet())
startServer()
connectToToken()
// Routes

app.use("/auth",authRoute)

app.get("/",authenticateToken,(req,res)=>{
    res.status(200).json({message: "Welcome to the loginService"})
})


export default app;