function cleanText(data) {
  if (typeof data === "string") {
    return data.replace(/\n+/g, " ").trim();
  }

  if (Array.isArray(data)) {
    return data.map(cleanText);
  }

  if (typeof data === "object" && data !== null) {
    const cleaned = {};
    for (const key in data) {
      cleaned[key] = cleanText(data[key]);
    }
    return cleaned;
  }

  return data;
}

module.exports = cleanText;
