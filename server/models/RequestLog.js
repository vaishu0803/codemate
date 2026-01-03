const mongoose = require("mongoose");

const requestLogSchema = new mongoose.Schema(
  {
    code: String,
    language: String,
    action: String,
    prompt: String,
    response: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("RequestLog", requestLogSchema);
