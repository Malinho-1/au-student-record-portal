# Africa University — Student Academic Record & Verification Portal

> **Academic Evaluation Project**  
> **Course / Final Examination:** Final Capstone / Software Engineering Project  
> **Institution:** Africa University  

---

## 📌 Executive Summary & Purpose

A student builds a complete, documented academic record (courses and grades, result slips, certifications, achievements, projects, leadership). Academic staff review and verify the claims. Recommendation letters are one optional use of a verified record, not the main purpose.

1. **Students** maintain a complete, documented academic record (courses, GPA, uploaded results slips, skills, projects, certifications, leadership, and personal statement).
2. **Academic Staff** access a dedicated **Verification Desk** where student records and claims are reviewed, evidence documents are audited, and items can be accredited and endorsed.
3. **Optional Recommendation Letters:** Students can optionally request a recommendation letter based on their verified academic record, and academic staff can draft, customize, and export letters using the built-in assistant.

> **Note:** Demo data: verification is simulated. The system uses a standardized date format (`DD/MM/YYYY`) across all modules.

---

## 🎨 Figma Design Implementation & Views

| Screen | View | Component | Purpose & Implemented Features |
| :--- | :--- | :--- | :--- |
| **01** | `Sign in & Portal Access` | [AuthPage](src/components/AuthPage.tsx) | Role switcher (**Student** / **Academic Staff**), demo credentials auto-fill, dark brand panel with Africa University emblem. |
| **02** | `My Record (Student Portal)` | [StudentOverview](src/components/student/StudentOverview.tsx) | Dark hero card with GPA & academic standing, record completeness indicator, 6 categorized interactive cards, and live detail modals. |
| **03** | `Verification Desk` | [StaffPortal](src/components/staff/StaffPortal.tsx) | Student records queue, courses taught highlight box with grades, and **Claim Verification & Endorsement Audit**. |
| **04** | `Request a Letter (Optional)` | [RequestLetterPage](src/components/student/RequestLetterPage.tsx) | Secondary optional request form with automatic academic record attachment. |
| **Modal** | `Letter Assistant (Optional)` | [LetterGeneratorModal](src/components/staff/LetterGeneratorModal.tsx) | Secondary utility to draft and print formal letters from verified records. |

---

## 🛠️ Technology Stack

- **Frontend:** React 19 + TypeScript (Strict Type Safety)
- **Bundler & Build Tool:** Vite (configured with dev proxy for `/api`)
- **Backend API:** Node.js + Express
- **Database:** SQLite (using `better-sqlite3` and native `node:sqlite`)
- **Styling:** Tailwind CSS v4 + Custom Africa University Design Tokens
- **Icons:** Lucide React
- **Version Control:** Git with Conventional Commits

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18+, v20+, or v22+) installed on your machine.

### 2. Frontend Setup
```bash
# Clone the repository
git clone <your-repository-url>
cd au-student-record-portal

# Install frontend dependencies
npm install

# Start Vite frontend dev server (runs on http://localhost:5173)
npm run dev
```

### 3. Backend Server Setup
The backend runs an Express server connected to SQLite in `/server`.

```bash
# Navigate to the server folder
cd server

# Create your .env file from the example
cp .env.example .env

# Install backend dependencies
npm install

# Initialize and seed the database with placeholder data
npm run seed

# Start the Express server (runs on http://localhost:5000)
npm start
# Or start in watch mode for development
npm run dev
```

> **Vite Proxy:** In development, requests sent from the React frontend to `/api/*` are automatically forwarded by Vite to the Express backend on `http://localhost:5000`.

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Role Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Service health check |
| `GET` | `/api/students/:id` | Public | Fetches complete student profile with courses, certifications, and achievements |
| `POST` | `/api/certifications` | Student | Submits a new certificate with status `'Self-Reported'` |
| `POST` | `/api/achievements` | Student | Submits a new achievement with status `'Self-Reported'` |
| `GET` | `/api/staff/queue` | Academic Staff | Lists all student claims awaiting staff review |
| `PATCH` | `/api/claims/:id/endorse` | **Academic Staff** (`x-user-role: academic-staff`) | Endorses or rejects a claim, updates claim table, and records an audit log |


---

## 👥 Team Collaboration & Continuous Git Commit Workflow

As commit history is evaluated for your final exam grade, each team member should follow this standardized workflow to demonstrate active, steady, and disciplined contributions.

### 1. Branch Strategy
- `main`: Production-ready, stable codebase.
- `develop`: Integration branch for tested features.
- Feature branches: `feature/<feature-name>` (e.g. `feature/student-skills-modal`, `feature/staff-verification`).
- Bugfix branches: `fix/<issue-name>` (e.g. `fix/date-format-ddmmyyyy`).

### 2. Conventional Commit Guidelines
Make frequent, atomic commits with clear messages following the **Conventional Commits** standard:

| Prefix | Usage Example |
| :--- | :--- |
| `feat:` | `feat: implement claim endorsement in academic staff verification desk` |
| `fix:` | `fix: standardize date format to DD/MM/YYYY across all forms` |
| `docs:` | `docs: update README with project purpose and verification workflow` |
| `style:` | `style: align red accent colors with Africa University brand guidelines` |
| `refactor:` | `refactor: rename lecturer role to academic staff across components` |

---

## 📁 Project Structure

```
au-student-record-portal/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── HelpModal.tsx             # Evaluation guide & walkthrough
│   │   │   └── ImageLightboxModal.tsx    # Evidence preview modal
│   │   ├── staff/
│   │   │   ├── StaffPortal.tsx           # Verification Desk for Academic Staff
│   │   │   └── LetterGeneratorModal.tsx  # Secondary recommendation letter tool
│   │   ├── student/
│   │   │   ├── EditProfileModal.tsx      # Modal to edit student credentials
│   │   │   ├── RequestLetterPage.tsx     # Optional letter request form
│   │   │   ├── SectionDetailModal.tsx    # Modal to add/view courses, skills, etc.
│   │   │   ├── StudentOverview.tsx       # Record at a glance overview
│   │   │   └── StudentSidebar.tsx        # Dark sidebar with completeness meter
│   │   ├── AfricaUniversityLogo.tsx      # Africa University official SVG emblem
│   │   ├── AuthPage.tsx                  # Sign in with Student / Academic Staff roles
│   │   └── Navbar.tsx                    # Header with role badge & navigation
│   ├── context/
│   │   └── AppContext.tsx                # Global state & persistent localStorage
│   ├── data/
│   │   ├── initialData.ts                # Seed student, academic staff, and requests
│   │   └── sampleDocuments.ts            # Sample certificates & result slips
│   ├── types/
│   │   └── index.ts                      # Strict TypeScript interfaces
│   ├── App.tsx                           # Main application router/switcher
│   ├── index.css                         # Tailwind CSS base styles
│   └── main.tsx                          # Vite entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

*Africa University · Department of Computer Science & Information Systems*
