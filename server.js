require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "8mb" }));

app.post("/send-photo", async (req, res) => {
  try {
    const { imageData, consent } = req.body || {};
    if (consent !== true) return res.status(400).json({ error: "Persetujuan pengguna diperlukan." });
    if (typeof imageData !== "string" || !/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(imageData)) {
      return res.status(400).json({ error: "Data foto tidak valid." });
    }
    if (!process.env.RECIPIENT_EMAIL || !process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({ error: "Email belum dikonfigurasi. Lengkapi variabel SMTP dan RECIPIENT_EMAIL." });
    }
    const imageBuffer = Buffer.from(imageData.split(",")[1], "base64");
    if (imageBuffer.length > 5 * 1024 * 1024) return res.status(413).json({ error: "Foto terlalu besar (maksimum 5 MB)." });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || "true") === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({
      from: `"Demo Kamera Sekolah" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: "Foto dari demo kamera sekolah",
      text: "Foto dikirim dari demonstrasi kamera setelah pengguna diberi tahu dan menyetujui pengambilan serta pengiriman foto.",
      attachments: [{ filename: `foto-demo-${Date.now()}.jpg`, content: imageBuffer, contentType: "image/jpeg" }]
    });
    res.json({ ok: true, message: "Foto berhasil dikirim ke email tujuan." });
  } catch (err) {
    console.error("Gagal mengirim foto:", err.message);
    res.status(500).json({ error: "Pengiriman gagal. Periksa konfigurasi email/server lalu coba lagi." });
  }
});
app.get("/health", (_req, res) => res.json({ ok: true }));
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
