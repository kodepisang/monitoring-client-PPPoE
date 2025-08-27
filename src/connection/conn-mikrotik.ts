import { RouterOSClient } from 'routeros-api';

// Buat fungsi untuk terhubung dan menjalankan perintah
export const runMikrotikCommand = async () => {
    // Ganti dengan konfigurasi koneksi Anda
    const host = process.env.MIKROTIK_HOST || '192.168.88.1';
    const user = process.env.MIKROTIK_USER || 'admin';
    const password = process.env.MIKROTIK_PASSWORD || 'password';

    const api = new RouterOSClient({
        host,
        user,
        password,
        port: 8728,
    });

    api.connect()
        .then((client) => {
            // After connecting, the promise will return a client class so you can start using it

            // You can either use spaces like the winbox terminal or
            // use the way the api does like "/system/identity", either way is fine
            client
                .menu('/system identity')
                .getOnly()
                .then((result) => {
                    console.log(result); // Mikrotik
                    api.close();
                })
                .catch((err) => {
                    console.log('terjadi err : ', err  ); // Some error trying to get the identity
                });
        })
        .catch((err) => {
            // Connection error
        });
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
