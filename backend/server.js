require("dotenv").config({ path: "./backend/.env" });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();


// ───────────── Database ─────────────
connectDB();


// ───────────── Middlewares ─────────────
app.use(express.json());

// ✅ Stable CORS — Only allow Vercel frontend
app.use(cors({
  origin: [
    "https://exam-help-seven.vercel.app",
    "https://exam-help-git-main-sazid-ahmeds-projects.vercel.app",
    "https://exam-help-c8ya3pdf4-sazid-ahmeds-projects.vercel.app"
  ],
  credentials: true
}));


// ───────────── API Routes ─────────────
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/pdf", require("./routes/pdf"));


// ───────────── Health Check ─────────────
app.get("/", (req, res) => {
  res.send("Backend API running 🚀");
});


// ───────────── Start Server ─────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
