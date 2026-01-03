import axios from "axios";

const API_BASE = "http://localhost:5000/api/ai";

export const processAI = async ({ action, code, language }) => {
  const res = await axios.post(`${API_BASE}/process`, {
    action,
    code,      // ✅ SAME AS THUNDER
    language,
  });

  if (!res.data.success) {
    throw new Error("AI failed");
  }

  return res.data.result;
};
