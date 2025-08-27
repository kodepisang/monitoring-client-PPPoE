import express from 'express';
import 'dotenv/config';

import { Request, Response } from 'express';
import {runMikrotikCommand} from "./connection/conn-mikrotik";
const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express with TypeScript!');
});

app.get('/status', (req: Request, res: Response) => {
    runMikrotikCommand();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


