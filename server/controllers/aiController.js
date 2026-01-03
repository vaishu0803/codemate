const explainPrompt = require("../prompts/explainPrompt");
const optimizePrompt = require("../prompts/optimizePrompt");
const testcasePrompt = require("../prompts/testcasePrompt");
const { callGemini } = require("../services/aiService");
const cleanText = require("../utils/cleanText");

exports.processCode = async (req, res) => {
  try {
    const { code, language, action } = req.body;

    let prompt;

    if (action === "explain") {
      prompt = explainPrompt(code, language);
    } else if (action === "optimize") {
      prompt = optimizePrompt(code, language);
    } else if (action === "testcases") {
      prompt = testcasePrompt(code, language);
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
      action,
      result: parsedResult
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI processing failed" });
  }
};
