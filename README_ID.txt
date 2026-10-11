DEMO KAMERA SEKOLAH — PETUNJUK

Fitur:
- Kamera depan melalui browser setelah izin kamera diberikan.
- Foto diambil otomatis setelah kamera aktif.
- Foto dikirim lewat email setelah pengguna menekan tombol kirim.
- Memerlukan HTTPS saat dipasang online.

Jalankan lokal:
1. Pasang Node.js versi LTS.
2. Ekstrak ZIP.
3. Di folder proyek, jalankan: npm install
4. Salin .env.example menjadi .env lalu isi email tujuan dan SMTP.
5. Jalankan: npm start
6. Buka http://localhost:3000 (localhost bisa digunakan untuk pengujian kamera).

Untuk link publik:
- Deploy ke host Node.js yang mendukung HTTPS (mis. Render, Railway, atau server sendiri).
- Tambahkan nilai dari .env sebagai environment variables di layanan hosting.
- Jangan unggah file .env atau membagikan SMTP password.
- GitHub Pages saja tidak cukup untuk proyek ini karena pengiriman email memerlukan backend.

Gmail:
- Aktifkan verifikasi 2 langkah dan buat App Password dari pengaturan akun Google.
- Gunakan App Password sebagai SMTP_PASS, bukan password Gmail biasa.

Catatan:
- Izin kamera browser tetap diperlukan; link WhatsApp tidak dapat melewatinya.
- Setelah foto diambil, pengguna perlu menekan tombol kirim agar tahu foto akan dikirim.
- Tidak ada jaminan 100% karena izin, jaringan, kebijakan browser, dan konfigurasi email dapat berbeda.
