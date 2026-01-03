const explainPrompt = require("../prompts/explainPrompt");
const optimizePrompt = require("../prompts/optimizePrompt");
const testcasePrompt = require("../prompts/testcasePrompt");

exports.getPrompt = (action, code, language) => {
  switch (action) {
    case "explain":
      return explainPrompt(code, language);

    case "optimize":
      return optimizePrompt(code, language);

    case "testcases":
      return testcasePrompt(code, language);

    default:
      throw new Error("Invalid action type");
  }
};
