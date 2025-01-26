# Mon Annonce API

## Description
Mon Annonce API est une application backend développée avec Node.js et Express, utilisant Sequelize pour la gestion de la base de données MariaDB. Cette API permet de gérer des annonces, des utilisateurs, des catégories et des signalements.

## Prérequis
- Docker
- Docker Compose

## Installation

### Avec Docker

#### Cloner le projet
```bash
git clone <URL> project_api && cd project_api
```

#### Construire le container Node
```bash
docker compose build
```

#### Installer les dépendances
```bash
docker compose run monannonce-node npm i
```

### Démarrer le projet avec Docker
```bash
docker compose up
```

### Arrêter le projet avec Docker
```bash
docker compose down
```


## Structure du projet
```
lebonCommerce/
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── ReadMe.md
├── monannonce/
│   ├── app.js
│   ├── config/
│   │   └── config.json
│   ├── entities/
│   │   ├── annonce.js
│   │   ├── categorie.js
│   │   ├── signalement.js
│   │   └── utilisateur.js
│   ├── middleware/
│   │   ├── annonce.js
│   │   ├── authorization.js
│   │   ├── categorie.js
│   │   ├── signalement.js
│   │   └── utilisateur.js
│   ├── migrations/
│   │   ├── 20241121090628-init.js
│   │   └── 20250122141745-add-filepath-to-annonce.js
│   ├── models/
│   │   ├── annonce.js
│   │   ├── categorie.js
│   │   ├── index.js
│   │   ├── signalement.js
│   │   └── utilisateur.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── annonce.js
│   │   ├── authenticate.js
│   │   ├── categorie.js
│   │   ├── file.js
│   │   ├── help.js
│   │   ├── index.js
│   │   ├── signalement.js
│   │   └── utilisateur.js
│   ├── seeders/
│   │   ├── 20211121110033-utilisateur.js
│   │   ├── 20221121111503-categorie.js
│   │   ├── 20231121130527-annonce.js
│   │   └── 20241121160010-signalement.js
│   ├── services/
│   │   ├── admin.js
│   │   ├── annonces.js
│   │   ├── authenticate.js
│   │   ├── categories.js
│   │   ├── fileService.js
│   │   ├── mailer.js
│   │   ├── signalements.js
│   │   └── utilisateurs.js
│   └── .env
└── db-data/
    └── (fichiers de données de la base de données)
```

## Configuration de l'environnement
Créez un fichier `.env` à la racine du dossier `monannonce/` et ajoutez les variables d'environnement suivantes :
```
DB_USER=root
DB_PASSWORD=root
DB_HOST=db
DATABASE=monannonce
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAILER_USERNAME=your-email@example.com
MAILER_PASSWORD=your-email-password
FRONTEND_URL=http://localhost:3000
```

## Modèles de données
### Utilisateur
```js
{
  nom: DataTypes.STRING,
  prenom: DataTypes.STRING,
  email: DataTypes.STRING,
  motDePasse: DataTypes.STRING,
  isAdmin: DataTypes.BOOLEAN
}
```

### Annonce
```js
{
  titre: DataTypes.STRING,
  description: DataTypes.TEXT,
  prix: DataTypes.FLOAT,
  datePublication: DataTypes.DATE,
  statut: DataTypes.STRING,
  filePath: DataTypes.STRING
}
```

### Categorie
```js
{
  nom: DataTypes.STRING
}
```

### Signalement
```js
{
  dateSignalement: DataTypes.DATE,
  message: DataTypes.TEXT,
  typeSignalement: DataTypes.ENUM('RECLAMATION', 'SPAM', 'AUTRE'),
  email: DataTypes.STRING
}
```

## Routes de l'API
Lien de l'API postman: https://documenter.getpostman.com/view/31664468/2sAYQfE9PN#13a1ff94-97b1-48b1-bfc6-f6e92f703524
### Authentification
- `POST /public/register` : Inscription d'un utilisateur
- `POST /public/login` : Connexion d'un utilisateur
- `POST /public/request-password-reset` : Demande de réinitialisation de mot de passe
- `POST /public/reset-password` : Réinitialisation de mot de passe

### Utilisateurs
- `GET /utilisateur` : Récupérer tous les utilisateurs
- `GET /utilisateur/:id` : Récupérer un utilisateur par ID
- `PATCH /utilisateur/:id` : Mettre à jour un utilisateur
- `GET /utilisateur/:id/annonces` : Récupérer les annonces d'un utilisateur

### Annonces
- `GET /annonce` : Récupérer toutes les annonces
- `GET /annonce/chercher` : Rechercher des annonces
- `POST /annonce` : Créer une annonce
- `GET /annonce/:id` : Récupérer une annonce par ID
- `PATCH /annonce/:id` : Mettre à jour une annonce
- `DELETE /annonce/:id` : Supprimer une annonce
- `GET /annonce/:id/signalements` : Récupérer les signalements d'une annonce

### Catégories
- `GET /categorie` : Récupérer toutes les catégories

### Signalements
- `GET /signalement` : Récupérer tous les signalements
- `POST /signalement` : Créer un signalement
- `GET /signalement/:id_user` : Récupérer les signalements d'un utilisateur

### Administration
- `PATCH /admin/signalement/:id/statut` : Mettre à jour le statut d'un signalement
- `DELETE /admin/signalement/:id` : Supprimer un signalement
- `DELETE /admin/user/:id` : Supprimer un utilisateur

### Fichiers
- `POST /file/upload` : Télécharger un fichier
- `GET /file/serve/:filename` : Servir un fichier

## Seeders
Pour peupler la base de données avec des données de test, utilisez les seeders :
```bash
docker compose run monannonce-node npx sequelize-cli db:seed:all
```

## Migrations
Pour exécuter les migrations de la base de données, utilisez :
```bash
docker compose run monannonce-node npx sequelize-cli db:migrate
```


## Contribution
Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements que vous souhaitez apporter.
