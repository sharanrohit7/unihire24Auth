import express, { Request, Response } from "express";
import { signIn, signUp } from "../controller/auth.controller";
const router = express.Router()

router.post('/signup', async (req: Request, res: Response) => {
    const { email, password, roleId } = req.body;
    const result = await signUp(email, password, roleId);
    if (result.error) {
        return res.status(400).json({ error: result.error });
    }
    return res.status(201).json({ token: result });
});

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await signIn(email, password);
    if (result.error) {
        return res.status(400).json({ error: result.error });
    }
    return res.status(201).json({ token: result });
});

export default router