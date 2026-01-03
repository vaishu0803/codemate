module.exports = (code, language) => {
  return `
Analyze and optimize the following ${language} code.

Tasks:
1. Identify inefficiencies
2. Suggest better approach
3. Provide optimized code
4. Compare complexities

Code:
${code}
`;
};
