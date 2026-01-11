require("dotenv").config({ path: "./backend/.env" });

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// ───── Database ─────
connectDB();

// ───── Middlewares ─────
app.use(express.json());

// 🟢 FINAL SAFE CORS (Render + Local + Vercel sab ke liye)
app.use(cors({
  origin: [
    "http://localhost:5000",
    "http://localhost:3000",
    "https://examhelp-backend.onrender.com",
    "https://exam-help-seven.vercel.app",
    "https://exam-help-git-main-sazid-ahmeds-projects.vercel.app",
    "https://exam-help-k1nllaj5z-sazid-ahmeds-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ───── API Routes ─────
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/pdf", require("./routes/pdf"));

// ───── Serve Frontend ─────
const frontendPath = path.join(__dirname, "public");
app.use(express.static(frontendPath));

// Express v5 safe fallback
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ───── Start Server ─────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("✅ Server running on", PORT);
});
