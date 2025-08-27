// routeros-api.ts
import { RouterOSClient } from 'routeros-api';
import 'dotenv/config';

// Konfigurasi koneksi dasar
const clientConfig = {
    host: process.env.MIKROTIK_HOST || '192.168.88.1',
    user: process.env.MIKROTIK_USER || 'admin',
    password: process.env.MIKROTIK_PASSWORD || 'password',
    port: 8728,
};

// Fungsi generik untuk menjalankan perintah di Mikrotik dengan tipe
export const runMikrotikCommand = async (path: string, query: object = {}): Promise<any[]> => {
    let client : RouterOSClient | any;
    try {
        client = new RouterOSClient(clientConfig);
        const api = await client.connect();

        const menu = api.menu(path);
        let result: any[];

        if (Object.keys(query).length > 0) {
            result = await menu.where(query).get();
        } else {
            result = await menu.get();
        }

        client.close();
        return result;
    } catch (err) {
        if (client) {
            client.close();
        }
        console.error('Terjadi kesalahan saat menjalankan perintah Mikrotik:', (err as Error).message);
        throw err;
    }
};