# PrepWise - AI Interview Platform | Complete Project Analysis

---

## 1. PROJECT OVERVIEW

### What It Does
PrepWise is an **AI-powered mock interview platform** that enables users to practice job interviews with adaptive AI interviewers. The system generates role-specific questions, evaluates answers in real-time using AI, and provides detailed performance analytics.

### Main Problem It Solves
- Traditional interview prep is expensive (mock interview coaches)
- Lack of personalized, scalable interview training
- No real-time feedback on communication, confidence, and technical accuracy
- Limited access to domain-specific interview practice

### Key Features
1. **AI-Powered Question Generation** - Creates 5 contextual questions based on role, experience, and resume
2. **Voice-Based Interviews** - Text-to-speech AI interviewer with realistic voice options
3. **Real-Time Answer Evaluation** - Scores answers on confidence, communication, and correctness
4. **Resume Upload & Analysis** - Extracts role, experience, projects, and skills from PDF resume
5. **Interview Mode Selection** - HR (behavioral) vs Technical interview modes
6. **Time-Limited Questions** - Realistic pressure with per-question time limits (60-120 seconds)
7. **Performance Reports** - Detailed analytics with PDF export (question-wise scores, trend analysis)
8. **Interview History** - Track all past interviews with full analytics
9. **Credit-Based System** - Each interview costs 50 credits; users can purchase more via Razorpay
10. **Progressive Difficulty** - Questions escalate from easy → medium → hard
11. **Adaptive Grading** - AI evaluates using contextual understanding, not keyword matching

---

## 2. TECH STACK & ARCHITECTURE

### Frontend Stack
| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite** | Build tool (fast HMR) |
| **React Router v7** | Page routing |
| **Redux Toolkit** | State management (user data, credits) |
| **Tailwind CSS** | Styling |
| **Firebase** | Google OAuth authentication |
| **Axios** | HTTP client for API calls |
| **Web Speech API** | Browser speech recognition & synthesis |
| **jsPDF + jsPDF-AutoTable** | PDF report generation |
| **Recharts** | Performance analytics charts |
| **Motion (Framer Motion)** | Animations |
| **React Icons** | Icon library |

### Backend Stack
| Technology | Purpose |
|------------|---------|
| **Node.js + Express 5** | Server runtime & framework |
| **MongoDB + Mongoose** | NoSQL database with ODM |
| **JWT (jsonwebtoken)** | Token-based authentication |
| **Razorpay SDK** | Payment processing |
| **OpenRouter API** | LLM access (GPT-4 Mini) |
| **Multer** | File upload handling (resume PDFs) |
| **pdf.js** | PDF text extraction |
| **CORS** | Cross-origin request handling |
| **Cookie Parser** | HTTP cookie management |

### Database (MongoDB)
**Collections:**
```
User
├── _id (ObjectId)
├── name (String)
├── email (String, unique)
├── credits (Number, default: 500)
├── createdAt, updatedAt (Timestamps)

Interview
├── _id (ObjectId)
├── userId (ref: User)
├── role (String)
├── experience (String)
├── mode (String: "HR" or "Technical")
├── resumeText (String)
├── questions (Array of Question objects)
│   ├── question (String)
│   ├── difficulty (String)
│   ├── timeLimit (Number in seconds)
│   ├── answer (String - user's response)
│   ├── feedback (String - AI feedback)
│   ├── score (0-10)
│   ├── confidence (0-10)
│   ├── communication (0-10)
│   └── correctness (0-10)
├── finalScore (Number, average of all scores)
├── status (String: "Not completed" or "completed")
├── createdAt, updatedAt (Timestamps)

Payment
├── _id (ObjectId)
├── userId (ref: User)
├── planId (String: "free", "basic", "pro")
├── amount (Number in INR)
├── credits (Number being purchased)
├── razorpayOrderId (String)
├── razorpayPaymentId (String)
├── status (String: "created", "paid", "failed")
├── createdAt, updatedAt (Timestamps)
```

### Architecture Diagram
```
FRONTEND                          BACKEND                        EXTERNAL SERVICES
┌─────────────────────┐          ┌──────────────────────┐       ┌──────────────────┐
│  React App          │          │  Express Server      │       │  Firebase OAuth  │
│  ├─ Auth (Google)   │◄────────►│  ├─ Auth Routes      │◄─────►└──────────────────┘
│  ├─ Interview Setup │          │  ├─ Interview Routes │
│  ├─ Interview Exec  │◄────────►│  ├─ Payment Routes   │       ┌──────────────────┐
│  ├─ Report Gen      │          │  ├─ User Routes      │       │  Razorpay API    │
│  └─ Payment          │          │  └─ Services        │◄─────►└──────────────────┘
│  State: Redux       │          │     ├─ OpenRouter    │
│                     │          │     └─ Razorpay      │       ┌──────────────────┐
│  API Calls: Axios   │          │                      │       │  OpenRouter LLM  │
└─────────────────────┘          └──◄─────────────────────┼─────►│  (GPT-4 Mini)   │
                                     │ JWT Token         │       └──────────────────┘
                                     │ (Cookie-based)    │
                                     │                   │       ┌──────────────────┐
                                     │ Middleware:       │       │  MongoDB        │
                                     │ ├─ verifyJWT      │◄─────►└──────────────────┘
                                     │ ├─ CORS           │
                                     │ └─ Multer Upload  │
                                     └──────────────────┘
```

---

## 3. CORE FUNCTIONALITIES

### 3.1 Interview Flow (Step-by-Step)

**STEP 1: Setup Phase**
```
User Input:
├─ Select Role (e.g., "Full Stack Developer")
├─ Select Experience (e.g., "3 years")
├─ Upload Resume (PDF) [OPTIONAL]
│  └─ AI extracts: role, experience, projects, skills
└─ Select Mode (HR or Technical)
   
**Cost:** 50 credits per interview
**Validation:** User must have ≥50 credits
```

**STEP 2: Question Generation**
```
Prompt Sent to OpenRouter (GPT-4 Mini):
{
  "System Prompt": "Generate exactly 5 interview questions under 25 words each"
  "User Prompt": "Role: [role], Experience: [exp], Projects: [list], Skills: [list]"
}

Questions Generated with Difficulty Progression:
├─ Q1-Q2: Easy (60s time limit)
├─ Q3-Q4: Medium (90s time limit)
└─ Q5: Hard (120s time limit)
```

**STEP 3: Voice Interview Execution**
```
Per Question:
1. AI speaks the question (Web Speech API)
2. Browser listens for user's answer (Speech Recognition API)
3. User can mute/unmute mic
4. Timer countdown (strict time enforcement)
5. User submits answer (text)

Video Overlay:
├─ Animated AI avatar (male/female options)
├─ Plays during question & while listening
└─ Synced with speech synthesis
```

**STEP 4: Answer Evaluation**
```
For Each Answer:
1. Check if answer submitted within time limit
2. If timeout: Score = 0, Feedback = "Time exceeded"
3. If empty: Score = 0, Feedback = "No answer submitted"
4. If valid: Send to OpenRouter for evaluation

AI Evaluation Prompt:
{
  "System": Score on Confidence (0-10), Communication (0-10), Correctness (0-10)"
  "Question & Answer": Human feedback (10-15 words)
}

Results Stored:
├─ confidence score
├─ communication score
├─ correctness score
├─ final_score (average of 3)
└─ human-like feedback

Database: Save to interview.questions[index]
```

**STEP 5: Interview Completion**
```
Calculate Aggregates:
├─ finalScore = avg(all question scores)
├─ avgConfidence = avg(all confidence scores)
├─ avgCommunication = avg(all communication scores)
└─ avgCorrectness = avg(all correctness scores)

Update Interview Status: "completed"
Display Performance Report with:
├─ Circular progress bar (final score)
├─ 4 skill metrics
├─ Question-wise score breakdown
├─ Trend chart
└─ PDF download option
```

### 3.2 Resume Analysis Workflow
```
1. User uploads PDF resume (Multer middleware)
2. Backend extracts text using pdf.js library
3. Clean text (remove formatting, extra spaces)
4. Send to OpenRouter with extraction prompt
5. AI returns structured JSON:
   {
     "role": "...",
     "experience": "...",
     "projects": ["project1", "project2"],
     "skills": ["skill1", "skill2"]
   }
6. Pre-fill interview setup form with extracted data
7. User can modify before generating questions
8. Delete uploaded file from server
```

### 3.3 Credit System
```
Plans:
├─ Free: 100 credits (default for new users)
├─ Starter: 150 credits (₹100)
└─ Pro: 650 credits (₹500)

Cost per Interview: 50 credits
Cost per Question Generation: Depends on mode

Flow:
1. Check user credits before interview
2. If credits < 50: Block interview
3. Deduct 50 credits from user after question generation
4. Display remaining credits in UI
```

### 3.4 Payment & Razorpay Integration
```
Flow:
1. User selects plan on /pricing
2. Frontend loads Razorpay script dynamically
3. Create order on backend:
   POST /api/payment/order
   ├─ planId, amount, credits
   └─ Response: { id, amount, currency } (Razorpay order)
4. Open Razorpay checkout modal
5. User completes payment
6. Razorpay callback handler:
   POST /api/payment/verify
   ├─ razorpay_order_id
   ├─ razorpay_payment_id
   ├─ razorpay_signature
   └─ Backend verifies HMAC signature with KEY_SECRET
7. If valid:
   ├─ Update payment status to "paid"
   ├─ Add credits to user account
   ├─ Return updated user object
8. Frontend shows success message
```

### 3.5 Data Flow Diagram
```
User Authentication:
┌─────────────────────┐
│  Google OAuth Login │
└──────────┬──────────┘
           │
    Firebase SDK Sign In
           │
Send token to backend
           │
POST /api/auth/google
{name, email}
           │
           ▼
Check if user exists in MongoDB
│
├─ YES: Return existing user
└─ NO: Create new user (default 500 credits)
                    │
                    ▼
Generate JWT Token (7 days expiry)
                    │
                    ▼
Set HTTP-only cookie
                    │
                    ▼
Redux: setUserData(userData)
```

### 3.6 Interview Data Flow
```
SetUp Component
├─ Resume Upload → /api/interview/resume → Extract text & AI parse
├─ Fill role, experience, mode
└─ "Start Interview" button
        │
        ▼
Generate Questions
├─ POST /api/interview/generate-questions
├─ AI creates 5 questions
├─ Deduct 50 credits
└─ Return: { interviewId, questions[], creditsLeft }
        │
        ▼
Interview Component
├─ For each question:
│  ├─ Speak question (TTS)
│  ├─ Listen to answer (Speech Recognition)
│  ├─ POST /api/interview/submit-answer
│  ├─ AI evaluates → get feedback
│  └─ Move to next question
└─ User clicks "Finish"
        │
        ▼
Finish Interview
├─ POST /api/interview/finish
├─ Calculate final scores & averages
├─ Update interview.status = "completed"
└─ Return aggregated report
        │
        ▼
Report Component
├─ Display circular progress (score)
├─ Show 4 metrics (confidence, comm, correctness, final)
├─ Draw question-wise score chart
└─ "Download PDF" → jsPDF generation
```

---

## 4. AUTHENTICATION & SECURITY

### Authentication Flow
```
1. User clicks "Login with Google"
2. Firebase SDK handles OAuth flow
3. Frontend receives ID token
4. Send to backend: POST /api/auth/google { name, email }
5. Backend verifies email format
6. Lookup user in MongoDB by email
7. If not exists: Create new user (500 default credits)
8. Generate JWT via jsonwebtoken package:
   {
     userId: ObjectId,
     expiresIn: "7d"
   }
9. Set as HTTP-only cookie:
   {
     httpOnly: true,
     secure: true,
     sameSite: "none",
     maxAge: 7 * 24 * 60 * 60 * 1000 (7 days)
   }
10. Response: User object with all fields
11. Redux stores userData globally
```

### Protected Routes
```
Middleware: verifyJWT
├─ Check for token in req.cookies.token
├─ If missing: Return 400 "User is not authenticated"
├─ Verify JWT signature against JWT_SECRET
├─ If invalid: Return 400 "User is not authenticated"
├─ Extract userId and attach to req.userId
└─ Call next()

Protected Endpoints:
├─ POST /api/interview/resume (upload & analyze)
├─ POST /api/interview/generate-questions
├─ POST /api/interview/submit-answer
├─ POST /api/interview/finish
├─ GET /api/interview/get-interview
├─ GET /api/interview/report/:id
├─ GET /api/user/current-user
├─ POST /api/payment/order
└─ POST /api/payment/verify

Frontend Protection:
├─ useEffect checks /api/user/current-user on app load
├─ If fails → userData = null
├─ Protected pages check userData before rendering
├─ Show AccountModel for unauthenticated users
```

### Sensitive Data Handling
```
- JWT stored in HTTP-only cookie (not accessible via JS)
- Razorpay KEY_SECRET never exposed to frontend
- Payment verification done server-side (HMAC signature verification)
- OpenRouter API key in .env (server-side only)
- MongoDB connection string in .env (server-side only)
- Firebase config includes public key (public credentials)
```

### Validation
```
Resume Analysis:
└─ Check file exists in req.file
└─ Extract text and validate non-empty content
└─ Clean malformed JSON from AI response

Question Generation:
├─ Validate role, experience, mode fields (required)
├─ Check user exists and has ≥50 credits
├─ Validate AI returned 5 questions

Answer Submission:
├─ Check interviewId exists
├─ Check questionIndex in bounds
├─ Validate timeTaken ≤ timeLimit
├─ Empty answers allowed but scored 0
```

---

## 5. AI/ADVANCED FEATURES

### 5.1 OpenRouter LLM Integration
```
Service: openRouter.service.js

Function: askAI(messages)
├─ Input: Array of message objects { role, content }
├─ Endpoint: https://openrouter.ai/api/v1/chat/completions
├─ Model: openai/gpt-4o-mini (fast + cheap)
├─ Headers:
│  ├─ Authorization: Bearer {OPENROUTER_API_KEY}
│  └─ Content-Type: application/json
├─ Error Handling:
│  ├─ Catch empty messages array
│  ├─ Log OpenRouter errors
│  └─ Throw standardized error message
└─ Return: AI response content string
```

### 5.2 Question Generation Prompts

**System Prompt:**
```
"You are a professional human interviewer conducting interviews.
Speak naturally and conversationally.

Generate EXACTLY 5 questions.

Rules:
- Each 15-25 words, single sentence
- NO numbering, NO explanations
- One per line only
- Simple, practical, realistic language

Progression:
Q1-Q2: Easy | Q3-Q4: Medium | Q5: Hard
"
```

**User Prompt:**
```
"Role: [extracted_or_entered_role]
Experience: [years]
Mode: [HR/Technical]
Projects: [comma-separated list or None]
Skills: [comma-separated list or None]
Resume: [full extracted text or None]"
```

**Response Processing:**
```
1. Split by newlines
2. Trim whitespace
3. Filter empty strings
4. Take first 5 only
5. Store with indexed difficulty: [easy, easy, medium, medium, hard]
```

### 5.3 Answer Evaluation Prompts

**System Prompt:**
```
"You are a professional interviewer evaluating answers.
Score realistically (0-10) for:
1. Confidence - clarity, assurance
2. Communication - language clarity
3. Correctness - accuracy, relevance

Score Harshly:
- Weak = low score
- Strong & detailed = high score

Return JSON ONLY:
{
  'confidence': number,
  'communication': number,
  'correctness': number,
  'finalScore': average (rounded),
  'feedback': '10-15 word human feedback (no scoring explanation)'
}"
```

**User Prompt:**
```
"Question: {question text}
Answer: {user's answer text}"
```

**Response Processing:**
```
1. Remove markdown code blocks (```json)
2. Parse JSON
3. Store 4 scores individually
4. Calculate final as average in real-time
```

### 5.4 Resume Analysis Prompts

**System Prompt:**
```
"Extract structured data from resume.

Return STRICTLY JSON:
{
  'role': 'job title',
  'experience': 'years of experience',
  'projects': ['project1', 'project2'],
  'skills': ['skill1', 'skill2']
}"
```

**Input:**
```
Cleaned resume text from PDF (20K+ chars possible)
```

**Response Processing:**
```
1. Remove markdown code blocks
2. Parse JSON
3. Pre-fill SetUp form with values
```

### 5.5 Why GPT-4 Mini?
```
Trade-offs:
├─ GPT-4 (Too expensive for scalability)
├─ GPT-3.5 (Lower quality evaluations)
└─ GPT-4o Mini ✓ (Sweet spot)
   ├─ Fast inference
   ├─ Good reasoning for interview context
   ├─ Low cost (~50% cheaper than GPT-4)
   └─ Suitable for structured output (JSON)
```

---

## 6. CHALLENGES & DESIGN DECISIONS

### Challenge 1: AI Quality Consistency
**Problem:** GPT-4 can be overly generous or unfair in scoring
**Solution:**
- Specific system prompts with "harsh scoring" instruction
- Calculate final score as average of 3 metrics (not asking AI to calculate)
- Human feedback pattern matching prevents unrealistic feedback

### Challenge 2: Time Limit Enforcement
**Problem:** Browser Speech API unpredictable, users can speak beyond limit
**Solution:**
- Server enforces: if timeTaken > timeLimit → score = 0 (strict)
- Frontend timer shows real-time countdown
- Grace period: Allow submission up to timeLimit

### Challenge 3: Resume Parsing Accuracy
**Problem:** Resumes have wildly different formats
**Solution:**
- Use PDF.js to extract raw text (handles most PDFs)
- Clean text aggressively (remove special chars, extra spaces)
- Let AI handle fuzzy extraction (works better than regex)
- Users can manually edit extracted data before interview

### Challenge 4: Speech Recognition Accuracy
**Problem:** Web Speech API has 60-70% accuracy, accents affect recognition
**Solution:**
- Allow manual text input as fallback (not forced speech)
- Server-side doesn't validate accuracy (accept any text)
- Evaluation only on meaning, not on how text was produced

### Challenge 5: Credit Deduction Timing
**Problem:** User could start interview, then leave, waste 50 credits
**Solution:**
- Deduct credits AFTER question generation succeeds (not before)
- If question generation fails → credits not deducted
- Encourages completion over abandonment

### Challenge 6: Security - JWT Expiry
**Problem:** 7-day JWT is long; compromised token is dangerous
**Solution:**
- HTTP-only cookies prevent XSS access
- `sameSite: "none"` for cross-origin (needed for CORS)
- Frontend re-fetches user on app mount (validates token)

### Challenge 7: Razorpay Integration Non-Atomic
**Problem:** User pays but credits not added if server crashes
**Solution:**
- Backend stores payment records separately
- Verify endpoint checks: if already "paid" → do nothing
- Retry-safe: idempotent operation (won't double-credit)

### Challenge 8: Resume File Upload Security
**Problem:** Large PDFs could crash server, malicious uploads
**Solution:**
- Multer upload middleware limits file size (implicitly)
- PDF.js safely parses without executing code
- File deleted immediately after processing (fs.unlinkSync)

### Design Decision 1: Stateless Backend
**Choice:** No session storage; JWT tokens only
**Reasoning:**
- Easier horizontal scaling (multiple servers)
- Reduced memory footprint
- Stateless = easier deployment (no sticky sessions needed)

### Design Decision 2: Credit-Based Over Subscription
**Choice:** Pay-per-interview instead of unlimited monthly plan
**Reasoning:**
- Lower user friction (try before buying)
- Revenue aligned with usage
- Prevents abuse (cost disincentive)
- Flexibility for users

### Design Decision 3: Google OAuth Only
**Choice:** No email/password auth
**Reasoning:**
- Reduces security concerns (no password hashing)
- Faster signup (1-click)
- Firebase handles complexity
- Higher conversion (familiar flow)

### Design Decision 4: Server-Side Evaluation
**Choice:** All AI calls on backend, not frontend
**Reasoning:**
- API keys never exposed
- Rate limiting centralized
- Cost control (can add quotas)
- Consistent evaluation logic

---

## 7. PERFORMANCE & OPTIMIZATION

### Backend Optimizations
```
1. Database Indexing:
   └─ Email index on User collection (fast login lookup)
   └─ userId index on Interview collection (fast history queries)

2. API Efficiency:
   ├─ Lazy load interview history (pagination not implemented)
   ├─ Return only necessary fields in responses
   └─ Cache user data in Redux (avoid repeated /current-user calls)

3. OpenRouter API:
   ├─ Timeout handling (already in place)
   ├─ Error recovery (throws error, frontend shows message)
   └─ Model choice (GPT-4 Mini for speed)

4. File Handling:
   ├─ Delete uploads after processing (cleanup)
   ├─ Stream PDF parsing (don't load entire file in memory)
   └─ Text cleaning (trim excess whitespace early)

5. JWT Token Management:
   ├─ 7-day expiry (not too short/long)
   ├─ HTTP-only cookies (prevent XSS theft)
   └─ Refresh not implemented (acceptable for 7 days)
```

### Frontend Optimizations
```
1. Code Splitting:
   ├─ Vite lazy-loads routes
   └─ React components imported on demand

2. State Management:
   ├─ Redux only stores user data (minimal state)
   ├─ Component local state for interview flow
   └─ Avoid prop drilling (Redux + Context)

3. Animations:
   ├─ Motion library (optimized framer motion)
   ├─ useInView instead of scroll listeners
   └─ Hardware acceleration (transform > position changes)

4. API Calls:
   ├─ Axios with credentials (cookie forwarding)
   ├─ useEffect with [] dependencies (single execution)
   └─ No refetch loops

5. Speech API:
   ├─ Lazy load voices on first interview (window.speechSynthesis.onvoiceschanged)
   └─ Cancel playback before speaking new text (no overlap)

6. PDF Generation:
   ├─ jsPDF renders on-demand (not on every re-render)
   ├─ Async operation (doesn't block UI)
   └─ Downloaded to user's device (not stored server-side)
```

### Not Implemented (Could Be Future Optimizations)
```
- Pagination on interview history
- Caching of resume analyses
- WebSocket for real-time notifications
- Service Workers for offline support
- Image compression for avatars
- Lazy load video avatars (large files)
```

---

## 8. HOW TO RUN THE PROJECT

### Prerequisites
```
Node.js >= 16
npm or yarn
MongoDB (local or Atlas URI)
Firebase project credentials
OpenRouter API key
Razorpay account + API keys
```

### Environment Variables

**Backend (.env file in /backend)**:
```
PORT=8000
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/prepwise
JWT_SECRET=your_super_secret_jwt_key_here
OPENROUTER_API_KEY=sk-or-...
RAZORPAY_KEY_ID=rzp_...
RAZORPAY_KEY_SECRET=secret_key_here
```

**Frontend (.env.local file in /frontend)**:
```
VITE_FIREBASE_APIKEY=AIzaSyDxxxxxxx
VITE_RAZORPAY_KEY_ID=rzp_...
```

### Installation & Setup

**1. Clone the repository**
```bash
git clone <repo-url>
cd "prepwise - AI Interview Platform"
```

**2. Backend Setup**
```bash
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# Server runs on: http://localhost:8000
# Verify: Check console for "Database connected!" and "Server running on port 8000"
```

**3. Frontend Setup**
```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Vite runs on: http://localhost:5173
# The app will auto-open in browser
```

**4. Verify Connection**
```
Frontend should load ✓
Click "Start Interview" → Should redirect to Google Login
After login → Should show interview setup form
Check browser DevTools → Network tab should show API calls to localhost:8000
```

### Build for Production

**Backend:**
```bash
cd backend
npm run build  # If build script exists (usually no build step for Express)
npm start      # Run production server
```

**Frontend:**
```bash
cd frontend
npm run build  # Creates /dist folder

# Open dist/index.html in browser (static)
# Or deploy to Vercel, Netlify, etc.
```

### Testing Checklist
```
1. Authentication:
   ├─ Login with Google ✓
   └─ Logout clears token ✓

2. Interview Flow:
   ├─ Upload resume & extract data ✓
   ├─ Generate questions (deducts 50 credits) ✓
   ├─ Submit answers (all 5 questions) ✓
   ├─ Finish & see report ✓
   └─ Download PDF ✓

3. Payments:
   ├─ Razorpay checkout (test mode) ✓
   ├─ Credit deduction on verification ✓
   └─ Purchase different plans ✓

4. Edge Cases:
   ├─ No credits → Block interview ✓
   ├─ Time limit exceeded → Score 0 ✓
   ├─ No answer submitted → Score 0 ✓
   └─ Browser logout → Redirect to login ✓
```

### Deployment

**Backend (e.g., Railway, Render, Heroku):**
```
1. Push code to Git repository
2. Connect to deployment platform
3. Set environment variables (MONGODB_URL, JWT_SECRET, API keys)
4. Deploy → Get cloud URL (e.g., prepwise-backend.railway.app)
5. Update frontend ServerURL constant
```

**Frontend (e.g., Vercel, Netlify):**
```
1. Push code to Git
2. Connect Vercel/Netlify
3. Set environment variables (.env.local)
4. Deploy → Auto gets HTTPS URL
5. Update backend CORS origin with new URL
```

### Monitoring & Debugging

**Backend Logs:**
```
NODE_ENV=development npm run dev
# Watch for:
# - Database connected!
# - Server running on port 8000
# - OpenRouter API errors
# - PDF parsing errors
```

**Frontend Console (DevTools):**
```
Check Network tab:
├─ API responses (200, 400, 500 status)
└─ Cookie storage (token in Application > Cookies)

Check Console:
├─ Redux state (Redux DevTools extension)
├─ User data on login
└─ Speech API errors
```

---

## 9. PROJECT STRUCTURE SUMMARY

```
prepwise - AI Interview Platform/
│
├─ backend/
│  ├─ server.js                     # Express app entry point
│  ├─ package.json
│  ├─ config/
│  │  ├─ connectDB.js              # MongoDB connection
│  │  └─ token.js                  # JWT generation
│  ├─ models/
│  │  ├─ user.model.js             # User schema
│  │  ├─ interview.model.js        # Interview schema
│  │  └─ payment.model.js          # Payment schema
│  ├─ controllers/
│  │  ├─ auth.controller.js        # Login/logout logic
│  │  ├─ interview.controller.js   # Interview + resume + AI calls
│  │  ├─ payment.controller.js     # Razorpay integration
│  │  └─ user.controller.js        # User data retrieval
│  ├─ routes/
│  │  ├─ auth.route.js
│  │  ├─ interview.route.js
│  │  ├─ payment.route.js
│  │  └─ user.route.js
│  ├─ middlewares/
│  │  ├─ auth.middleware.js        # JWT verification
│  │  └─ multer.middleware.js      # File upload config
│  └─ services/
│     ├─ openRouter.service.js     # LLM API calls
│     └─ razorpay.service.js       # Payment SDK init
│
├─ frontend/
│  ├─ src/
│  │  ├─ main.jsx                  # React + Redux + Router setup
│  │  ├─ App.jsx                   # Route definitions
│  │  ├─ pages/
│  │  │  ├─ Home.jsx               # Hero + features
│  │  │  ├─ Auth.jsx               # Google login UI
│  │  │  ├─ InterviewPage.jsx      # Interview flow wrapper (3 steps)
│  │  │  ├─ InterviewHistory.jsx   # Past interviews list
│  │  │  ├─ Pricing.jsx            # Purchase credits (Razorpay)
│  │  │  └─ InterviewReport.jsx    # Detailed report view
│  │  ├─ components/
│  │  │  ├─ SetUp.jsx              # Step 1: Role + resume upload
│  │  │  ├─ Interview.jsx          # Step 2: Live Q&A
│  │  │  ├─ Report.jsx             # Step 3: Analytics + PDF
│  │  │  ├─ AuthModel.jsx          # Login modal
│  │  │  ├─ NavBar.jsx             # Header + user profile
│  │  │  ├─ Footer.jsx
│  │  │  └─ Timer.jsx              # Countdown component
│  │  ├─ redux/
│  │  │  ├─ store.js               # Redux store config
│  │  │  └─ userSlice.js           # User reducer
│  │  ├─ utils/
│  │  │  └─ firebase.js            # Firebase OAuth init
│  │  └─ assets/                   # Images, videos
│  ├─ vite.config.js
│  ├─ package.json
│  └─ index.html
│
└─ README.md
```

---

## 10. KEY TAKEAWAYS (For Interview Explanation)

### What Makes This Project Interesting?

1. **Full Stack Implementation**
   - React 19 with Redux state management
   - MongoDB schema design with nested arrays
   - Express API with middleware pipeline

2. **Complex Business Logic**
   - Multi-step interview workflow
   - Real-time AI evaluation scoring system
   - Credit-based monetization model

3. **Third-Party Integrations**
   - Firebase OAuth (identity)
   - OpenRouter LLM (AI intelligence)
   - Razorpay (payments)
   - PDF.js (document parsing)

4. **Unique Technical Challenges**
   - Browser Web Speech API (speech recognition + synthesis)
   - Time-based evaluation with server-side enforcement
   - PDF text extraction and AI-based schema extraction
   - Secure payment workflow with signature verification

5. **Performance Considerations**
   - JWT stateless authentication for scalability
   - Lazy loading and animations
   - Efficient API design (minimal data transfer)
   - Cost optimization (GPT-4 Mini over GPT-4)

6. **Security Best Practices**
   - HTTP-only cookies for JWT tokens
   - Server-side payment verification (HMAC)
   - Environment variables for secrets
   - CORS configuration

### Questions You Might Get Asked:

**Q: How does the AI evaluation prevent cheating?**
A: Timestamp validation on backend; timeLimit enforced server-side; no client-side bypass possible

**Q: Why use OpenRouter instead of direct OpenAI API?**
A: Cost savings (~50% cheaper with Mini), flexibility to swap models, easier rate limiting

**Q: How do you handle resume parsing errors?**
A: Try-catch blocks; allow manual input as fallback; AI handles fuzzy extraction better than regex

**Q: What happens if Razorpay webhook fails?**
A: Not currently implemented; could add cron job to retry failed payments

**Q: How would you scale this?**
A: Database indexing, API caching layer, microservices (separate interview evaluator), CDN for videos.

