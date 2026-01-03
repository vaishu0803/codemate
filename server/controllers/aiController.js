const explainPrompt = require("../prompts/explainPrompt");
const optimizePrompt = require("../prompts/optimizePrompt");
const testcasePrompt = require("../prompts/testcasePrompt");
const { callGemini } = require("../services/aiService");
const cleanText = require("../utils/cleanText");

exports.processCode = async (req, res) => {
  try {
    const { code, language, action } = req.body;

    if (!code || !action) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const normalizedAction = action.toLowerCase();
    let promptPayload = { code, language, inputType: "paste" };
    let prompt;

    if (normalizedAction === "explain") {
      prompt = explainPrompt(promptPayload);
    } else if (normalizedAction === "optimize") {
      prompt = optimizePrompt(promptPayload);
    } else if (normalizedAction === "testcase") {
      prompt = testcasePrompt(promptPayload);
    } else if (normalizedAction === "generate") {
      prompt = explainPrompt(promptPayload); // temporary
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const result = await callGemini(prompt);

    let parsedResult;
    try {
      parsedResult = JSON.parse(result);
      parsedResult = cleanText(parsedResult);
    } catch {
      parsedResult = cleanText(result);
    }

    res.json({
      success: true,
      action: normalizedAction,
      result: parsedResult,
    });
  } catch (error) {
    console.error("❌ AI Controller Error:", error);
    res.status(500).json({ message: "AI processing failed" });
  }
};
