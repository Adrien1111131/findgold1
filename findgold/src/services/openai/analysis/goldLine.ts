import { openaiClient } from '../client';
import { GoldLineAnalysisResult } from '../types';

export const analyzeGoldLine = async (imageBase64: string): Promise<GoldLineAnalysisResult> => {
  try {
    const response = await openaiClient.analyzeImage(
      imageBase64,
      "Analysez cette image de rivière et identifiez la gold line potentielle"
    );

    return {
      description: response.description || "Ligne d'or tracée selon le flux naturel de la rivière",
      modifiedImage: response.modifiedImage || "",
      confidence: response.confidence || 0.9
    };
  } catch (error) {
    console.error('Erreur lors de l\'analyse de la gold line:', error);
    throw error;
  }
};
