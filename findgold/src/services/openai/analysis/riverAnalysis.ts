import { openaiClient } from '../client';
import { RiverAnalysisResult } from '../types';

export const analyzeRiverForGold = async (imageUrl: string, riverName: string): Promise<RiverAnalysisResult> => {
  try {
    const response = await openaiClient.analyzeImage(
      imageUrl,
      `Analysez cette section de la rivière ${riverName} en détail pour identifier les formations géologiques et caractéristiques fluviales favorables à l'accumulation d'or.`
    );

    return {
      description: response.description || "",
      points: response.points || []
    };
  } catch (error) {
    console.error('Erreur lors de l\'analyse de la rivière:', error);
    throw error;
  }
};

export const analyzeGeologicalData = async (location: string): Promise<string> => {
  try {
    const response = await openaiClient.chat([
      {
        role: "user",
        content: `Analysez le contexte géologique de ${location} pour évaluer le potentiel aurifère.`
      }
    ]);

    return response.content || "Aucune analyse disponible";
  } catch (error) {
    console.error('Erreur lors de l\'analyse géologique:', error);
    throw error;
  }
};

export const combineAnalysis = async (
  imageAnalysis: string,
  geologicalAnalysis: string
): Promise<string> => {
  try {
    const response = await openaiClient.chat([
      {
        role: "user",
        content: `Combinez ces analyses pour une évaluation complète :
          Image: ${imageAnalysis}
          Géologie: ${geologicalAnalysis}`
      }
    ]);

    return response.content || "Aucune synthèse disponible";
  } catch (error) {
    console.error('Erreur lors de la combinaison des analyses:', error);
    throw error;
  }
};
