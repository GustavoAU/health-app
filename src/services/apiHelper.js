const apiBaseUrl = "http://localhost:5050/api";

export const askHealthAI = async (query) => {
    const response = await fetch(`${apiBaseUrl}/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || `HTTP error! Status: ${response.status}`);
    } 

    const data = await response.json();
    return data;
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

export const fetchSmartSuggestions = async (category) => {
  const prompt = `Give me 3 common health search queries people ask about ${category.toLowerCase()}`;
  
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  const suggestions = data.choices[0].message.content.split("\n").filter(Boolean);
  return suggestions.map(s => s.replace(/^[0-9.]+ /, "").trim());
};