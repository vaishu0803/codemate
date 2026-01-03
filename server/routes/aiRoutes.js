const express = require("express");
const router = express.Router();
const { processCode } = require("../controllers/aiController");

// test route
router.get("/test", (req, res) => {
  res.json({ message: "AI route working ✅" });
});

// main route
router.post("/process", processCode);

module.exports = router;
