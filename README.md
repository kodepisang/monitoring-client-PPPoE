Monitoring Jaringan PPPoE

Backend API untuk Pemantauan Pengguna Mikrotik

Proyek ini adalah backend API yang dirancang untuk memantau pengguna PPPoE yang terhubung ke Mikrotik. Dibangun dengan fokus pada efisiensi, keamanan, dan modularitas, API ini menyediakan endpoint yang bersih untuk mendapatkan data secara real-time.

🚀 Fitur Utama
  
  1. Pemantauan Pengguna Online: Dapatkan daftar pengguna PPPoE yang sedang aktif.
  2. Daftar Pengguna Terdaftar: Ambil semua daftar secrets PPPoE yang terdaftar.
  3. Koneksi Efisien: Menggunakan routeros-api dengan kode yang sudah direfaktor untuk koneksi yang efisien.
  4. Struktur Modular: Kode terorganisir dengan rapi dalam beberapa file (routeros-api.ts, pppoe.ts) untuk kemudahan pengembangan.
  5. Dukungan Docker: Dilengkapi Dockerfile untuk kemudahan deployment ke lingkungan produksi.

🛠️ Teknologi yang Digunakan
  
  - **Node.js** 🟢: Lingkungan *runtime* JavaScript.
  - **TypeScript** 🟦: Menambahkan *static typing* untuk kode yang lebih aman dan mudah dikelola.
  - **Express.js** 🌐: *Framework* web untuk membuat API.
  - **routeros-api** 📶: Pustaka untuk berkomunikasi dengan Mikrotik.
  - **Docker**🐳: Untuk *containerization* dan *deployment* yang konsisten.
  
📦 Memulai Proyek (Lokal)

Ikuti langkah-langkah sederhana ini untuk menjalankan proyek di mesin lokal Anda.

Prasyarat

Pastikan Anda memiliki Node.js, npm, dan Git yang terinstal.
    - Node.js: Versi 20 atau lebih baru.
    - npm: Versi 10 atau lebih baru.

Instalasi
  Clone repositori:
  
    git clone https://github.com/kodepisang/monitoring-app.git
    cd monitoring-app

Konfigurasi Variabel Lingkungan:
Buat file .env di direktori utama dan tambahkan kredensial Mikrotik Anda.
Cuplikan kode
    
    MIKROTIK_HOST=YOUR_MIKROTIK_IP
    MIKROTIK_USER=YOUR_MIKROTIK_USERNAME
    MIKROTIK_PASSWORD=YOUR_MIKROTIK_PASSWORD

Instal Dependensi:
Bash
    npm install

Jalankan Server Pengembangan:
Bash

    npm run dev

Server akan berjalan di http://localhost:3000.

🚀 Deployment dengan Docker

Proyek ini dapat dengan mudah di-deploy ke lingkungan produksi menggunakan Docker.
Build Docker Image:

    docker build -t ghcr.io/kodepisang/monitoring-app:latest .

Push ke GitHub Container Registry (GHCR):

    docker push ghcr.io/kodepisang/monitoring-app:latest

Deploy dengan Docker Compose:
Gunakan docker-compose.yml untuk menjalankan kontainer di server Anda.
YAML

# docker-compose.yml
     
    services:
      backend:
        container_name: monitoring-backend
        image: ghcr.io/taqim/monitoring-app:latest
        restart: unless-stopped
        env_file:
          - .env
        ports:
          - "3000:3000"

Jalankan perintah ini di server Anda:
Bash

    docker-compose up -d

🔗 Endpoint API

Semua endpoint akan memberikan respons dalam format JSON.
Method|Endpoint|Deskripsi
---|---|---
GET|/api/pppoe/online|Mendapatkan daftar pengguna PPPoE yang online.
GET|/api/pppoe/secrets|Mendapatkan semua daftar secrets PPPoE
GET|/api/pppoe/offline|Mendapatkan user yang tyerdaftar pada secreats namun offline


📜 License

Proyek ini dilisensikan di bawah MIT License. Lihat file LICENSE untuk detail lebih lanjut.

🧑‍💻 Tentang Proyek Ini

Proyek ini dikembangkan oleh Taqim , lihat kode lainnya di https://github.com/kodepisang
