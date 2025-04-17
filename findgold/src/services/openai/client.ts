const API_URL = 'https://findgold-api.onrender.com/api';

export const openaiClient = {
  async chat(messages: any[]) {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la communication avec l\'API');
    }

    return response.json();
  },

  async analyzeImage(image: string, prompt: string) {
    const response = await fetch(`${API_URL}/analyze-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image, prompt }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'analyse de l\'image');
    }

    return response.json();
  }
};
