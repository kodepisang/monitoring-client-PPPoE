import {runMikrotikCommand} from "./routeros-api";


export const getOnlinePppoeUsers = async (): Promise<any[]> => {
    try {
        console.log('jalankan getOnlinePppoeUsers');
        const result = await runMikrotikCommand('/ppp active');
        return result;
    } catch (err) {
        throw new Error('Gagal mengambil daftar pengguna online PPPoE.');
    }
};

export const getAllPppoeSecrets = async (): Promise<any[]> => {
    try {
        const result = await runMikrotikCommand('/ppp secret');
        return result;
    } catch (err) {
        throw new Error('Gagal mengambil daftar secrets PPPoE.');
    }
};

export const getOfflinePppoeUsers = async (): Promise<any[]> => {
    try {
        const secrets = await getAllPppoeSecrets();
        const onlineUsers = await getOnlinePppoeUsers();
        const onlineUsernames = new Set(onlineUsers.map(user => user.name));

        const offlineUsers = secrets.filter(secret => !onlineUsernames.has(secret.name));
        return offlineUsers;
    } catch (err) {
        throw new Error('Gagal mengambil daftar pengguna offline PPPoE.');
    }
};