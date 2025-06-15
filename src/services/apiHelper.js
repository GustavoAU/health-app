const apiBaseUrl = "http://localhost:5050/api";
export const askHealthAI = async (query) => {
  const response = await fetch(`${apiBaseUrl}/openai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4",
      prompt: query,
      max_tokens: 150,
    }),
  });
  return await response.json();
};

export const fetchProviders = async (query) => {
  try {
    const response = await fetch(`${apiBaseUrl}/providers?search=${query}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return Array.isArray(data.providers) ? data.providers : [];
  } catch (error) {
    console.error("Error fetching providers:", error.message);
    return [];
  }
};
