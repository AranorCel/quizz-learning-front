# Description du projet

Le projet s'amorce sur un constat : la nécessité d'intégrer des outils ergonomiques, simples et utiles pour les professeurs et de les mettre à disposition pour leurs élèves et les épicurieux !

QuizzLearning répond à ça en proposant de créer rapidement des leçons et des quizz et de pouvoir suivre l'avancement des élèves.

Si les élèves continuent de venir et s'ils sont demandeurs de nouvelles leçons alors nous serons sur de bons rails ainsi que leur avenir !

## Principes de gestion de projet méthode Agile

Le constat, je l'ai identifié autour de moi car j'ai des amis et membres de ma famille professeurs des écoles, en collège et en lycée. Ils utilisent des outils similaires ne leur apportant pas toujours entière satisfaction (mots de passe perdus par les élèves, contraintes RGPD...).

A partir de ce constat, identification des besoins et priorisation de ceux-ci de manière à développer en priorité les attentes les plus fortes. On montre à intervalle régulier les éléments, ceux apportant donc le plus de valeur. Les feedbacks courts et fréquents, tous les 15 jours, permettent de conserver un rytme constant de développement.

Après des tests internes et avec utilisateurs, je corrige et complète l'application par itération. Remarque : Il ne m'était pas encore possible de mettre en place une stratégie CI/CD qui aurait permis de me faire remonter plus de résultats utilisateurs. A expérimenter prochainement sur un autre projet via des outils du type GitLab.

Je me renseigne également pour l'hébergement du projet (procédure et coûts) afin de le faire grandir et de gagner en compétences car ce point n'a pas pu être travaillé lors de la formation.

## Principes de développement

J'ai fait le choix de scinder le projet en deux et d'utiliser l'outil GitHub :

- Un "frontend" en React. La structure comprend les dossiers public (stockage d'images...), le dossier src (assets dont syles, les components...). J'utilise les hooks dans des composants eux mêmes répartis sur un principe (en consolidation) d'atomisation (atoms --> molecules --> organisms --> views & others pour les pages statiques). Cela doit permettre d'améliorer la lisibilité de l'organisation bien que la segmentation soit encore un peu "personnelle". En effet, l'atome étant le plus petit élément insécable il traduit un bloc extrêment réduit pouvant être facilement réutilisé.

- Un "backend-js" avec NodeJS et le framework Express. Il gère la création des routes, des controllers, des models (schemas de document pour la DB) et la config de type NoSQL avec l'utilisation de l'outil mongoose pour MongoDB. J'ai essayé de respecter les principes d'une API Rest pour ce que j'en ai compris. Je continue de creuser dans cette direction par rapport au SOAP car cela semble être plus utilisé pour ses meilleurs performances et sa sécurité améliorée. Utilisation du .env pour améliorer la sûreté et le stockage de secrets.

- Les deux parties "frontend" et "backend-js" sont pourvues de dossiers .gitignore évitant notamment la copie des node_modules. Elles sont également dotées automatiquement des fichiers package.json dont le détail des dependencies est noté [ci-après](#Dependencies).

- 

## Instructions d'installation et de déploiement

### `npm i`
Une fois les deux dossiers récupérés (via GitHub ou fichier commun unique compressé déposé sur la plateforme), il convient de lancer la commande "npm i" à la racine du dossier "quizz-learning". A partir de ce moment-là, l'ensemble des dependecies vont s'installer rendant l'utilisation de l'application possible.

Remarque : J'ai découvert après l'initialisation de mon projet et après la formation, la possibilité de créer des conteneurs optimisant le déploiement et permettant de créer des environnements de travail compatibles peu importe les OS et les navigateurs. Cet outil présente également d'autres avantages que je ne détaillerai pas car ils n'apportent pas d'éléments pertinents dans le cadre du présent projet.

### `npm start`

Comme vous l'avez compris, deux dossiers distincts --> deux terminaux --> deux "npm start".

### `npm test`

Pour le projet, j'ai réalisé des tests manuels à chaque intégration. Usant parfois même d'un principe inversé de type TDD (le développement piloté par les tests).

En ce qui concerne l'automatisation des tests, je n'ai pas pu l'appliquer sur ce projet faute de moyens et de temps. Objectif ultérieur et en entreprise en utilisant par exemple : Selenium (application web) / Appium (application mobile) et Cucumber (pour les User Story)

### `npm run build`

Pour l'optimisation, le npm run build doit permettre de réduire et d'optimiser le code.

J'ai conservé le lien fourni pour obtenir plus d'informations par la suite [deployment](https://facebook.github.io/create-react-app/docs/deployment).


### Dependencies

Pour le "backend-js" :
- bcrypt : Pour le hashage des mots de passe.
- cors : Pour éviter les défauts de Cross-origin resource sharing.
- dayjs : Pour le traitement, le calcul et simplifier la mise en forme des dates et des heures.
- dotenv : Pour améliorer la sûreté en séparant la déclaration des variables d'environnement du reste du code accessible.
- dotenv-expand : Pour l'utilisation des variables d'environnement présentes dans le fichier .env
- ejs : Obsolète --> Utilisation initiale pour un back office indépendant avec une interface "admin" distincte.
- express : Pour créer rapidement et facilement les routes, léger et communauté importante assurant son maintien et de nombreuses aides.
- express-session : Pour gérer plus simplement les sessions. Ce middleware stocke les informations côté serveur et donc maintient l'état entre les requêtes.
- formidable : --> Utilisation initiale pour faciliter la gestion des formulaires et des téléchargements de fichiers. Module remplacé par multer en cours de développement.
- fs : Pour intéragir avec le système de fichier de l'OS permettant de lire, écrire, supprimer, déplacer, copier sur le disque dur.
- mongoose : Pour intéragir avec la DB MongoDB et permettant de faire un CRUD sur la DB mais également l'élaboration de schémas et la génération de modèles pour les collections. Il protège également les DB d'attaques malveillantes (validation, échappement, limitation et autorisations)
- multer : Pour faciliter la gestion des téléchargements de fichiers. Il intègre également la validation des fichiers téléchargés (taille maximale, extension, fichiers multiples) avec la possibilité de stocker sur le disque dur ou en mémoire.
- nodemon :

Pour le "frontend" :
- axios : Pour simplifier la gestion des requêtes et des réponses mais aussi pour convertir automatiquement les données au format JSON.
- react-dom : Pour créer des applications dynamiques et interactives.
- react-hook-form : Pour améliorer la création des formulaires notamment sur les aspects de validation, de contrôle et d'optimisation des performances.
- react-router-dom : Pour gérer les routes et les redirections afin de faciliter la navigation des utilisateurs.
- yup : Pour valider les données de formulaire avant de les envoyer ce qui sécurise l'application. La création à l'aide de regex et de messages personnalisés est facilitée.


## Version du README

Il s'agit de la V1 du README datée du 31/01/2023.