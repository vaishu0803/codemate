const explainPrompt = require("../prompts/explainPrompt");
const optimizePrompt = require("../prompts/optimizePrompt");
const testcasePrompt = require("../prompts/testcasePrompt");
const { callGemini } = require("../services/aiService");

exports.processCode = async (req, res) => {
  try {
    const { code, language, action, inputType } = req.body;

    // 🔒 Validate input
    if (!code || !action) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    let prompt;

    // 🎯 Choose prompt
    switch (action) {
      case "explain":
        prompt = explainPrompt({ code, language, inputType });
        break;

      case "optimize":
        prompt = optimizePrompt({ code, language, inputType });
        break;

      case "testcase":
        prompt = testcasePrompt({ code, language, inputType });
        break;

      case "generate":
        // temporary fallback – you can add bruteForcePrompt later
        prompt = explainPrompt({ code, language, inputType });
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid action",
        });
    }

    // 🤖 Call Gemini
    const result = await callGemini(prompt);

    // 🧠 Flexible JSON handling (VERY IMPORTANT)
    let finalResult;
    try {
      finalResult = JSON.parse(
        result.replace(/```json|```/g, "").trim()
      );
    } catch {
      // fallback to plain text
      finalResult = result;
    }

    // ✅ Success response
    return res.json({
      success: true,
      action,
      result: finalResult,
    });

  } catch (error) {
    console.error("❌ AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI processing failed",
    });
  }
};
