import { openaiClient } from '../client';
import { RockAnalysisResult } from '../types';

export const analyzeRocks = async (imageUrl: string): Promise<RockAnalysisResult> => {
  try {
    const response = await openaiClient.analyzeImage(
      imageUrl,
      "Analysez les roches présentes sur cette image et évaluez leur potentiel aurifère."
    );

    // Convertir la réponse en format attendu
    return {
      rockTypes: response.rockTypes || [],
      overallPotential: response.overallPotential || 0,
      recommendations: response.recommendations || []
    };
  } catch (error) {
    console.error('Erreur lors de l\'analyse des roches:', error);
    // En cas d'erreur, retourner un résultat par défaut
    return {
      rockTypes: [{
        name: "Indéterminé",
        description: "Impossible d'analyser les roches sur l'image",
        goldPotential: 0,
        location: [0, 0]
      }],
      overallPotential: 0,
      recommendations: [
        "Prenez une nouvelle photo avec un meilleur éclairage",
        "Assurez-vous que les roches sont bien visibles",
        "Incluez un objet pour l'échelle"
      ]
    };
  }
};
