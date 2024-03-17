import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { configVar } from '../config/configVar';
const {tokenUrl,tokenKey} = configVar;

const verificationUrl = `${tokenUrl}/token/verify-token`;

async function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(401).json({ error: "Unauthorized: Token is required" });
    }

    try {
            const response = await axios.post(verificationUrl, null, {
            headers: { 'Authorization': tokenHeader ,'api-key':tokenKey }
        });
        console.log(response.data);
        
        next();
    } catch (error: any) {
        console.error('Error verifying token:', error.response?.data);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
}

export default authenticateToken;
