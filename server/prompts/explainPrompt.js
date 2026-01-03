module.exports = ({ code, language, inputType }) => {
  return `
You are an expert software engineer and algorithm reviewer.

Your task is to explain the EXACT ${language} code provided.

Return ONLY valid JSON in the exact structure below.
Do NOT include markdown, comments, newlines, or extra text.

JSON STRUCTURE:
{
  "overview": "",
  "keySteps": [],
  "timeComplexity": "",
  "spaceComplexity": "",
  "edgeCases": []
}

STRICT RULES (MANDATORY):
1. Analyze ONLY the provided code. Do NOT generalize.
2. Overview:
   - Maximum 2 sentences.
   - Clearly state what the program/function does.
3. Key Steps:
   - Explain logical execution flow only.
   - Do NOT mention compiler, JVM, runtime environment, or language internals.
4. Time Complexity:
   - Use O(n), O(n log n), etc ONLY if loop/recursion depends on input size.
   - If loops are fixed or bounded, return O(1).
5. Space Complexity:
   - Count ONLY auxiliary space.
   - Ignore input storage.
   - If HashMap, HashSet, List, array, or recursion stack grows with input, use O(n).
6. Do NOT assume constant space unless it is explicitly bounded.
7. Edge Cases:
   - Include ONLY if logically applicable.
   - If none exist, return an empty array [].
8. No markdown.
9. No newline characters.
10. Output must be valid JSON only.

INPUT TYPE:
${inputType}

CODE:
${code}
`;
};
