# Plateforme Fullstack d'Orchestration IA pour Classification Zero-Shot

Hybrid-Analyzer est une application fullstack conçue pour automatiser l'analyse d'articles de veille grâce à l'orchestration de deux services d'IA complémentaires :
- **Hugging Face (Zero-Shot Classification)** pour identifier la catégorie d'un texte sans entraînement préalable
- **API Gemini** pour produire un résumé contextualisé et analyser la tonalité du contenu

## Fonctionnalités

- **Authentification sécurisée** avec JWT
- **Classification zero-shot** de textes en 20 catégories prédéfinies
- **Résumé automatique** avec analyse de tonalité
- **Historique des analyses** sauvegardé en base de données
- **Interface moderne** avec Next.js et Tailwind CSS
- **API REST** avec FastAPI

##  Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ - React 19      │    │ - Python 3.11   │    │ - Users         │
│ - TypeScript    │    │ - SQLAlchemy    │    │ - History       │
│ - Tailwind CSS  │    │ - JWT Auth      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                   ┌─────────────────┐    ┌─────────────────┐
                   │   AI Services   │    │   AI Services   │
                   │   Hugging Face  │    │   Google Gemini │
                   │   Zero-Shot     │    │   Summarization │
                   └─────────────────┘    └─────────────────┘
```

## Technologies Utilisées

### Backend
- **FastAPI** - Framework web Python moderne et rapide
- **SQLAlchemy** - ORM pour la gestion de base de données
- **PostgreSQL** - Base de données relationnelle
- **JWT** - Authentification sécurisée
- **Hugging Face API** - Classification zero-shot
- **Google Gemini API** - Génération de résumés

### Frontend
- **Next.js 16** - Framework React avec SSR
- **React 19** - Bibliothèque UI
- **TypeScript** - JavaScript typé
- **Tailwind CSS** - Framework CSS utilitaire


## Installation et Configuration

### 1. Cloner le repository

```bash
git clone https://github.com/Lhcenzetta/Plateforme-Fullstack-d-Orchestration-IA-pour-la-Classification-Zero-Shot.git
cd Plateforme-Fullstack-d-Orchestration-IA-pour-la-Classification-Zero-Shot
```

### 2. Configuration des variables d'environnement

Créer un fichier `.env` dans le dossier `backend/` :

```env
# Base de données
DATABASE_URL=postgresql://user:password@localhost:5432/hybrid_analyzer

# Clés API
HF_TOKEN=votre_token_hugging_face
GEMINI_API_KEY=votre_cle_gemini

# Sécurité
SECRET_KEY=votre_cle_secrete_jwt
```

### 3. Installation manuelle (Développement)

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Utilisation

### Interface Web

1. Accéder à `http://localhost:3000`
2. Créer un compte ou se connecter
3. Accéder à la page d'analyse hybride
4. Entrer le texte à analyser
5. Consulter les résultats : catégorie, confiance, résumé et tonalité

### API REST

#### Authentification

**Inscription :**
```bash
POST /autho/signup
Content-Type: application/json

{
  "username": "testuser",
  "fullname": "Test User",
  "email": "test@example.com",
  "passwordhash": "password123"
}
```

**Connexion :**
```bash
POST /autho/singin
Content-Type: application/json

{
  "username": "testuser",
  "passwordhash": "password123"
}
```

**Réponse :**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "user_id": 1
}
```

#### Analyse de texte

```bash
POST /autho/geminia
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "user_id": 1,
  "text": "Votre texte à analyser ici..."
}
```

**Réponse :**
```json
{
  "text": "Votre texte à analyser ici...",
  "confidence": "0.95",
  "categorie": "technology",
  "resume": "Résumé du texte...",
  "tone": "positive",
  "history_id": 123
}
```

## Structure du Projet

```
├── backend/                 # API Backend
│   ├── app/
│   │   ├── api/            # Routes API
│   │   │   ├── auth.py     # Authentification & analyse
│   │   ├── db/             # Configuration base de données
│   │   ├── models/         # Modèles SQLAlchemy
│   │   ├── schemas/        # Schémas Pydantic
│   │   ├── services/       # Services métier
│   │   │   ├── analyzer.py      # Classification HF
│   │   │   ├── gemini_client.py # Client Gemini
│   │   │   └── hybrid_analyse.py # Orchestration
│   │   └── main.py         # Application FastAPI
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                # Application Frontend
│   ├── app/
│   │   ├── hybride_analyse/ # Page d'analyse
│   │   │   └── page.jsx
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Page d'accueil
│   ├── Dockerfile
│   └── package.json
├── infra/                   # Infrastructure
│   ├── docker-compose.yml
│   └── init_db.sql
├── docs/                    # Documentation
└── README.md
```

## Configuration Avancée

### Catégories de Classification

Le système classe automatiquement les textes dans 20 catégories :

- sports, technology, music, movies
- education, health, finance, travel
- food, fashion, politics, science
- gaming, business, environment, art
- literature, automotive, news, lifestyle

### Variables d'Environnement

| Variable | Description | Obligatoire |
|----------|-------------|-------------|
| `DATABASE_URL` | URL de connexion PostgreSQL |
| `HF_TOKEN` | Token Hugging Face |
| `GEMINI_API_KEY` | Clé API Google Gemini |
| `SECRET_KEY` | Clé secrète JWT |