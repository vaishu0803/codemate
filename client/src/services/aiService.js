import axios from "axios";

const API_BASE = "http://localhost:5000/api/ai";

export const processAI = async ({ action, code, language }) => {
  try {
    const res = await axios.post(`${API_BASE}/process`, {
      action,
      code,       // ✅ must be `code`
      language,
    });

    if (res.data?.success !== true) {
      throw new Error(res.data?.message || "AI processing failed");
    }

    return res.data; // ✅ return full response
  } catch (error) {
    console.error(
      "❌ processAI error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
