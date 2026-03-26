# PrepWise – AI Interview Platform

An AI-powered mock interview platform that simulates real interview experiences with adaptive AI interviewers, real-time feedback, and performance analytics.

---

## Overview

PrepWise helps users practice interviews smarter by generating role-specific questions, evaluating answers using AI, and providing detailed performance insights.

### Problem It Solves
- Expensive mock interview coaching  
- No real-time feedback on answers  
- Lack of personalized interview prep  
- Limited access to domain-specific practice  

---

## Features

- AI Question Generation (based on role, experience, resume)
- Voice-Based Interviews (Speech recognition + TTS)
- Real-Time Answer Evaluation
- Resume Upload & AI Analysis
- Adaptive Difficulty (Easy to Hard)
- Performance Reports with Analytics
- PDF Report Generation
- Interview History Tracking
- Credit-Based System (Razorpay Integration)

---

## Tech Stack

### Frontend
- React 19 + Vite
- Redux Toolkit
- Tailwind CSS
- Firebase (Google OAuth)
- Web Speech API
- Recharts, jsPDF, Framer Motion

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- OpenRouter API (GPT-4 Mini)
- Razorpay Integration
- Multer + PDF.js

---

## How It Works

### 1. Setup Interview
- Select role and experience  
- Upload resume (optional)  
- Choose interview mode (HR / Technical)

### 2. AI Generates Questions
- 5 questions with increasing difficulty  
- Based on role, skills, and resume  

### 3. Interview Execution
- AI asks questions (voice-enabled)  
- User answers via speech or text  
- Time-limited responses  

### 4. AI Evaluation
- Scores on:
  - Confidence  
  - Communication  
  - Correctness  
- Generates human-like feedback  

### 5. Performance Report
- Final score  
- Skill breakdown  
- Trend analysis  
- PDF export  

---

## Project Structure

```
prepwise/
│
├── backend/
├── frontend/
└── README.md
```

---

## Authentication and Security

- Google OAuth via Firebase  
- JWT-based authentication (HTTP-only cookies)  
- Secure payment verification (Razorpay HMAC)  
- Environment variables for sensitive data  

---

## Credit System

| Plan     | Credits | Price |
|----------|--------|-------|
| Free     | 100    | ₹0    |
| Starter  | 150    | ₹100  |
| Pro      | 650    | ₹500  |

- 50 credits per interview

---

## Installation and Setup

### 1. Clone Repository
```bash
git clone <repo-url>
cd prepwise
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (.env)
```
PORT=8000
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_secret
OPENROUTER_API_KEY=your_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

### Frontend (.env.local)
```
VITE_FIREBASE_APIKEY=your_key
VITE_RAZORPAY_KEY_ID=your_key
```

---

## Testing Checklist

- Google Login  
- Resume Upload and Parsing  
- Question Generation  
- Answer Evaluation  
- Report Generation  
- Payment Integration  

---

## Deployment

### Backend
- Deploy on Render / Railway / Heroku  

### Frontend
- Deploy on Vercel / Netlify  

---

## Key Highlights

- Full-stack production-ready application  
- Real-time AI evaluation system  
- Speech-based interaction  
- Secure payment integration  
- Scalable stateless architecture  

---

## Author

Sumit Gupta  
B.Tech CSE, VIT Vellore  

---

## Contribution

Feel free to contribute and improve this project.
