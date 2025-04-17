import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuration OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: messages,
      max_tokens: 500
    });
    res.json(completion.choices[0].message);
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    res.status(500).json({ error: 'Erreur lors de la communication avec OpenAI' });
  }
});

app.post('/api/analyze-image', async (req, res) => {
  try {
    const { image, prompt } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", url: image }
          ]
        }
      ],
      max_tokens: 500
    });
    res.json(response.choices[0].message);
  } catch (error) {
    console.error('Erreur analyse image:', error);
    res.status(500).json({ error: 'Erreur lors de l\'analyse de l\'image' });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
});
