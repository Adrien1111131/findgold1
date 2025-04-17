# 🌟 FindGold - Assistant de Prospection Aurifère

FindGold est une application web qui aide les chercheurs d'or à identifier les zones prometteuses pour l'orpaillage en France. Elle combine l'intelligence artificielle, les données géologiques et l'expertise en prospection pour offrir des recommandations personnalisées.

## ✨ Fonctionnalités

- **🔍 Recherche de spots** : Trouvez les cours d'eau aurifères près de chez vous
- **📊 Analyse environnementale** : Évaluez le potentiel aurifère d'un site
- **🤖 Goldman IA** : Assistant virtuel spécialisé en orpaillage
- **📚 Tutoriels** : Guides et conseils pour la prospection
- **🗺️ Cartes géologiques** : Visualisation des données BRGM
- **📸 Analyse d'images** : Identification des zones prometteuses sur vos photos

## 🚀 Technologies Utilisées

- React 18 avec TypeScript
- Vite pour le bundling
- OpenAI API pour l'analyse et les recommandations
- Mapbox pour la cartographie
- Leaflet pour l'affichage des cartes
- React Router pour la navigation

## 📦 Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/findgold.git
cd findgold
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet avec les variables suivantes :
```env
VITE_OPENAI_API_KEY=votre_clé_api_openai
VITE_MAPBOX_TOKEN=votre_token_mapbox
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

## 🛠️ Scripts Disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile le projet pour la production
- `npm run preview` : Prévisualise la version de production

## 🌐 Structure du Projet

```
src/
├── assets/         # Images et ressources statiques
├── components/     # Composants React réutilisables
├── features/       # Fonctionnalités spécifiques
├── pages/         # Pages de l'application
├── services/      # Services (API, analyses)
└── shared/        # Code partagé
```

## 🔒 Variables d'Environnement

Le projet nécessite les variables d'environnement suivantes :

- `VITE_OPENAI_API_KEY` : Clé API OpenAI pour l'analyse et les recommandations
- `VITE_MAPBOX_TOKEN` : Token Mapbox pour l'affichage des cartes

Copiez le fichier `.env.example` en `.env` et remplissez les valeurs appropriées.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- BRGM pour les données géologiques
- OpenAI pour l'API GPT-4
- La communauté des chercheurs d'or français pour leur expertise
