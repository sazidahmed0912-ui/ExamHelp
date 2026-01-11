const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/:orderId", (req, res) => {
  const filePath = path.resolve(__dirname, "../pdfs/HSLC_ENGLISH_EBOOK.pdf");
  console.log("📄 Serving PDF:", filePath);

  res.sendFile(filePath, err => {
    if (err) {
      console.error("❌ PDF Send Error:", err);
      res.status(404).send("PDF not found");
    }
  });
});

module.exports = router;
