require("dotenv").config({ path: "./backend/.env" });

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ───────────── Middlewares ─────────────
app.use(express.json());

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_PREVIEW_URL,
  "https://exam-help-seven.vercel.app",
  "https://exam-help-k1nllaj5z-sazid-ahmeds-projects.vercel.app",
  "https://exam-help-git-main-sazid-ahmeds-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ───────────── API Routes ─────────────
// Commented out for preview - would need database connection
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/orders", require("./routes/order"));
// app.use("/api/pdf", require("./routes/pdf"));

// ───────────── Serve Frontend ─────────────
const frontendPath = path.join(__dirname, "public");

app.use(express.static(frontendPath));

// Express 5 SAFE fallback — no wildcards, no regex
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ───────────── Start Server ─────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("✅ Preview server running on port", PORT);
  console.log(`🌐 Preview link: http://localhost:${PORT}`);
});
