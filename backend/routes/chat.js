const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    // Call Gemini Model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: `You are a JEE counselling assistant. 
        You help students with JEE Main & Advanced counselling, JoSAA & JAC rules. 
        Be concise, accurate, and student-friendly.
        IMPORTANT: Do NOT use any Markdown formatting. Do not use asterisks (**) for bolding or bullet points. Provide plain text only.`,
      }
    });

    res.json({
      success: true,
      reply: response.text
    });

  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ success: false, message: "AI is currently sleeping." });
  }
});

module.exports = router;