import { RouterOSClient } from 'routeros-api';

// Buat fungsi untuk terhubung dan menjalankan perintah
export const runMikrotikCommand = async (command: string, params: object = {}) => {
    // Ganti dengan konfigurasi koneksi Anda
    const host = process.env.MIKROTIK_HOST || '192.168.88.1';
    const user = process.env.MIKROTIK_USER || 'admin';
    const password = process.env.MIKROTIK_PASSWORD || 'password';

    const api = new RouterOSClient({
        host,
        user,
        password,
        // Gunakan port yang sesuai, default 8728 untuk API atau 8729 untuk API SSL
        port: 8728,
    });

    try {
        // Menghubungkan ke MikroTik
        await api.connect();
        console.log('Successfully connected to MikroTik.');

        // Menjalankan perintah dan mengembalikan hasilnya
        const result = await api.write(command, params);

        // Menutup koneksi
        await api.close();
        console.log('Connection closed.');

        return result;
    } catch (error) {
        console.error('An error occurred during API operation:', error);
        // Jika terjadi error, re-throw agar bisa ditangani di REST API
        throw error;
    }
};

// Contoh penggunaan: Mendapatkan daftar IP
// Perintah ini akan dieksekusi saat diimpor atau dipanggil dari file lain
/*
runMikrotikCommand('/ip/address/print')
  .then(data => {
    console.log('IP Addresses:', JSON.stringify(data, null, 2));
  })
  .catch(err => {
    console.error('Failed to get IP addresses:', err);
  });
*/
