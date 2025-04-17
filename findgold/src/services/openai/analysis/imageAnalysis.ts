import { openaiClient } from '../client';

// Fonction utilitaire pour valider et formater une image base64
const validateAndFormatBase64Image = (base64: string): string => {
  // Vérifier si l'image est déjà au format base64 avec en-tête
  if (base64.startsWith('data:image/')) {
    return base64;
  }

  // Vérifier si c'est une chaîne base64 valide
  try {
    atob(base64);
  } catch (e) {
    throw new Error('Format base64 invalide');
  }

  // Ajouter l'en-tête pour JPEG par défaut
  return `data:image/jpeg;base64,${base64}`;
};

export const analyzeImage = async (imageBase64: string): Promise<string> => {
  try {
    const formattedImage = validateAndFormatBase64Image(imageBase64);
    const response = await openaiClient.analyzeImage(
      formattedImage,
      "Analysez cette image pour identifier les caractéristiques géologiques et géomorphologiques favorables à la présence d'or. Concentrez-vous sur les formations naturelles et les indices visibles."
    );
    
    return response.description || "Aucune analyse disponible";
  } catch (error) {
    console.error('Erreur lors de l\'analyse de l\'image:', error);
    
    // En cas d'erreur, retourner une réponse générique utile
    return `Pour analyser un site d'orpaillage, recherchez les indices suivants :

1. Géologie favorable :
   - Affleurements rocheux avec veines de quartz
   - Zones de contact entre différentes formations
   - Signes d'altération hydrothermale

2. Morphologie du cours d'eau :
   - Méandres prononcés où l'or s'accumule
   - Zones de ralentissement naturel
   - Points de confluence avec des affluents

3. Indices physiques :
   - Bancs de gravier et sable noir
   - Marmites de géant dans le lit rocheux
   - Dépôts alluviaux anciens

4. Conseils pratiques :
   - Privilégiez les zones en aval des anciennes mines
   - Examinez les berges intérieures des méandres
   - Recherchez les points bas naturels du lit

N'hésitez pas à partager une nouvelle photo pour une analyse plus précise.`;
  }
};
