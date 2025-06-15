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
app.post("/api/openai", async (req, res) => {
    try {
        const response = await axios.post("https://api.openai.com/v1/completions", req.body, {
            headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
        });

        res.json(response.data); // ✅ Always return JSON
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: error.message }); // ✅ Prevent frontend crashes
    }
});

const PORT = process.env.PORT || 5050;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // ✅ WebSocket and Express share the same server