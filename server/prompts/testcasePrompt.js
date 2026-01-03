module.exports = (code, language) => {
  return `
Generate test cases for the following ${language} program.

Include:
1. Normal cases
2. Edge cases
3. Boundary cases
4. Expected output

Code:
${code}
`;
};
