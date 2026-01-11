require("dotenv").config({ path: "./backend/.env" });

const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// ───────── Database ─────────
connectDB();

// ───────── Middlewares ─────────
app.use(express.json());

// 🚫 No CORS needed (same domain frontend+backend)

// ───────── API Routes ─────────
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/pdf", require("./routes/pdf"));

// ───────── Frontend ─────────
const frontendPath = path.join(__dirname, "public");
app.use(express.static(frontendPath));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ───────── Start Server ─────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("✅ Server running on", PORT));
