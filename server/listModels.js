const axios = require("axios");
require("dotenv").config();

async function listModels() {
  try {
    const res = await axios.get(
      "https://generativelanguage.googleapis.com/v1/models",
      {
        params: {
          key: process.env.GEMINI_API_KEY
        }
      }
    );

    res.data.models.forEach(m => {
      console.log(
        m.name,
        "→ supports generateContent:",
        m.supportedGenerationMethods?.includes("generateContent")
      );
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

listModels();
