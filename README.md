# FindGold - Assistant de prospection aurifère

## Description
FindGold est une application qui utilise l'intelligence artificielle pour aider à la prospection d'or dans les rivières et cours d'eau. Elle analyse des données géologiques, des images et des informations géographiques pour identifier les emplacements à haut potentiel aurifère.

## Fonctionnalités principales
- **Analyse d'images** : Identification des caractéristiques géologiques favorables à la présence d'or dans les photos de terrain
- **Géolocalisation** : Recherche et analyse de rivières et cours d'eau susceptibles de contenir de l'or
- **Analyse géologique** : Évaluation du potentiel aurifère basée sur les données du terrain
- **Cartographie des "gold lines"** : Identification des lignes de concentration potentielles d'or
- **Base de données** : Accès à une liste de rivières connues pour contenir de l'or

## Technologie
L'application utilise l'API OpenAI pour effectuer des analyses avancées de données géologiques et d'images. Ces analyses permettent de repérer les formations rocheuses, sédiments et autres caractéristiques associées aux gisements d'or.

## Public cible
- Prospecteurs amateurs et professionnels
- Géologues et chercheurs
- Passionnés de chasse au trésor et d'orpaillage

## 🌟 Fonctionnalités

- **Recherche géographique**: Trouvez des rivières et cours d'eau par localisation
- **Analyse d'images**: Utilisez l'IA pour analyser des photos de terrain
- **Analyse géologique**: Évaluez le potentiel aurifère basé sur les données du terrain
- **Base de données**: Accédez à une liste de rivières connues pour contenir de l'or

## 🔧 Installation

1. Clonez ce dépôt
   ```
   git clone https://github.com/votre-username/findgold.git
   cd findgold
   ```

2. Installez les dépendances
   ```
   npm install
   ```
   
3. Configurez les variables d'environnement
   ```
   cp .env.example .env
   # Modifiez le fichier .env avec vos clés API
   ```

4. Démarrez l'application
   ```
   npm start
   ```

## ⚙️ Configuration

Ce projet nécessite une clé API OpenAI pour fonctionner. Ajoutez-la dans votre fichier `.env`:

```
OPENAI_API_KEY=votre_clé_api_ici
```

## 🔍 Structure du projet

- `/src/services/openai`: Services d'analyse basés sur l'IA
- `/src/services/geo`: Services de géolocalisation
- `/src/components`: Composants UI réutilisables
- `/src/pages`: Pages de l'application

## 📝 License

MIT
