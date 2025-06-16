require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const http = require("http"); // ✅ Add HTTP Server
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app); // ✅ Use HTTP server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("message", (message) => {
        console.log(`Received: ${message}`);
        ws.send(`Echo: ${message}`);
    });

    ws.on("close", () => console.log("Client disconnected"));
});

app.get("/api/providers", async (req, res) => {
    res.json({ providers: [] }); // Dummy response for now
});

// 🔥 OpenAI API Route
app.post("/api/gemini", async (req, res) => {
  try {
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: req.body.prompt }]
        }
      ]
    };

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      payload,
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply from Gemini.";
    res.json({ suggestion: reply });
  } catch (error) {
    console.error("Gemini API Error:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
    res.status(error.response?.status || 500).json({ error: error.response?.data?.error?.message || "Something went wrong with Gemini API" });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // ✅ WebSocket and Express share the same server