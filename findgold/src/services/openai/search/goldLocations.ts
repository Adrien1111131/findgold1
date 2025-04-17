import { openaiClient } from '../client';

export interface Hotspot {
  location: string;  // Description du lieu précis
  description: string;  // Pourquoi c'est intéressant
  source: string;  // BRGM ou retour d'expérience
}

export interface GoldLocation {
  name: string;
  type: string;
  coordinates: [number, number];
  description: string;
  geology: string;
  history: string;
  rating: number; // 1-5
  sources: string[];
  hotspots: Hotspot[];
  isMainSpot: boolean; // true pour les 3 meilleurs spots, false pour les spots secondaires
  goldOrigin?: {
    description: string;
    brgmData: string;
    entryPoints: string[];
    affluents: string[];
  };
  referencedSpots?: {
    description: string;
    locations: string[];
    sources: string[];
  };
}

export interface GoldSearchResult {
  mainSpots: GoldLocation[];
  secondarySpots: GoldLocation[];
}

export async function searchGoldLocations(city: string, radius: number = 50): Promise<GoldSearchResult> {
  try {
    const response = await openaiClient.chat([
      {
        role: "user",
        content: `Identifie les meilleurs spots pour l'orpaillage autour de ${city} dans un rayon de ${radius} km.`
      }
    ]);

    const content = response.content;
    if (!content) {
      throw new Error("Pas de réponse de l'IA");
    }

    try {
      const parsedData = JSON.parse(content);
      
      // Vérifier la structure des données
      if (!parsedData.mainSpots || !Array.isArray(parsedData.mainSpots)) {
        throw new Error("Format de réponse invalide : 'mainSpots' manquant ou incorrect");
      }
      
      if (!parsedData.secondarySpots || !Array.isArray(parsedData.secondarySpots)) {
        throw new Error("Format de réponse invalide : 'secondarySpots' manquant ou incorrect");
      }
      
      // Valider chaque spot
      const validateSpot = (spot: any, index: number, isMain: boolean) => {
        if (!spot.name) {
          spot.name = isMain ? `Spot principal ${index + 1}` : `Spot secondaire ${index + 1}`;
        }
        
        if (!spot.coordinates || !Array.isArray(spot.coordinates)) {
          spot.coordinates = [0, 0]; // Coordonnées par défaut
        }
        
        // S'assurer que tous les champs requis sont présents
        spot.type = spot.type || "cours d'eau";
        spot.description = spot.description || "Aucune description disponible";
        spot.geology = spot.geology || "Aucune information géologique disponible";
        spot.history = spot.history || "Aucun historique disponible";
        spot.rating = spot.rating || 3;
        spot.sources = spot.sources || [];
        spot.hotspots = spot.hotspots || [];
        spot.isMainSpot = isMain;
      };
      
      parsedData.mainSpots.forEach((spot: any, index: number) => validateSpot(spot, index, true));
      parsedData.secondarySpots.forEach((spot: any, index: number) => validateSpot(spot, index, false));
      
      return {
        mainSpots: parsedData.mainSpots,
        secondarySpots: parsedData.secondarySpots
      };
    } catch (parseError) {
      console.error("Erreur lors du parsing JSON:", parseError);
      
      // Fallback: créer un résultat par défaut
      const defaultResult: GoldSearchResult = {
        mainSpots: [{
          name: city,
          type: "rivière",
          coordinates: [0, 0],
          description: "Nous n'avons pas pu obtenir d'informations précises pour cette localisation. Essayez avec une ville plus connue ou une région aurifère comme 'Limousin', 'Cévennes', ou 'Ariège'.",
          geology: "Information non disponible",
          history: "Information non disponible",
          rating: 3,
          sources: [],
          hotspots: [{
            location: "Non disponible",
            description: "Aucune information sur les points d'intérêt spécifiques",
            source: "N/A"
          }],
          isMainSpot: true
        }],
        secondarySpots: []
      };
      
      return defaultResult;
    }
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    
    // Fallback: créer un résultat par défaut en cas d'erreur
    const defaultResult: GoldSearchResult = {
      mainSpots: [{
        name: city,
        type: "rivière",
        coordinates: [0, 0],
        description: "Une erreur s'est produite lors de la recherche. Veuillez réessayer ultérieurement ou essayer avec une autre localisation.",
        geology: "Information non disponible",
        history: "Information non disponible",
        rating: 3,
        sources: [],
        hotspots: [{
          location: "Non disponible",
          description: "Aucune information sur les points d'intérêt spécifiques",
          source: "N/A"
        }],
        isMainSpot: true
      }],
      secondarySpots: []
    };
    
    return defaultResult;
  }
}
