const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a JEE counselling assistant.
You help students with:
- JEE Main & Advanced counselling
- JoSAA & JAC rules
- Category, quota, gender eligibility
Be concise, accurate, and student-friendly.
`
        },
        { role: "user", content: message }
      ],
    });

    res.json({
      success: true,
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
