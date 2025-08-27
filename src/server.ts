import express from 'express';
import 'dotenv/config';

import { Request, Response } from 'express';
import {getAllPppoeSecrets, getOfflinePppoeUsers, getOnlinePppoeUsers} from "./routeros/pppoe";


const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send(`Hello from Express with TypeScript!` );
});

app.use(express.json());

app.get('/api/pppoe/online', async (req: Request, res: Response) => {
    try {
        const users = await getOnlinePppoeUsers();
        res.status(200).json({ status: 'success', data: users });
    } catch (err) {
        res.status(500).json({ status: 'error', message: (err as Error).message });
    }
});

app.get('/api/pppoe/secrets', async (req: Request, res: Response) => {
    try {
        const secrets = await getAllPppoeSecrets();
        res.status(200).json({ status: 'success', data: secrets });
    } catch (err) {
        res.status(500).json({ status: 'error', message: (err as Error).message });
    }
});

app.get('/api/pppoe/offline', async (req: Request, res: Response) => {
    try {
        const users = await getOfflinePppoeUsers();
        res.status(200).json({ status: 'success', data: users });
    } catch (err){
        res.status(500).json({ status: 'error', message: (err as Error).message });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});