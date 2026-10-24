# Africa University — Student Record & Recommendation Portal

> **Academic Evaluation Project**  
> **Course / Final Examination:** Final Capstone / Software Engineering Project  
> **Institution:** Africa University  

---

## 📌 Executive Summary & Problem Statement

Students applying for internships, industrial attachments, postgraduate studies, scholarships, or employment frequently face significant delays in securing academic recommendations. Lecturers, on the other hand, often struggle to draft timely, personalized, and accurate recommendation letters due to a lack of readily organized student records (GPA, relevant courses, grades, specific achievements, and contextual notes).

The **Africa University Student Record & Recommendation Portal** bridges this gap:
1. **Students** maintain a clean, verified academic record (courses, GPA, skills, projects, certifications, leadership, and personal statement).
2. **Students submit tailored recommendation requests** with deadline, purpose, and targeted notes, automatically packaging their academic profile.
3. **Lecturers** access an intuitive **Recommendation Desk** that flags relevant coursework taught, highlights student notes, and provides an **Automated Recommendation Letter Assistant** to draft, customize, copy, and print official letters in minutes.

---

## 🎨 Figma Design Implementation (100% Fidelity)

This repository faithfully implements the design generated in Figma across four core views:

| Screen | Figma Screen | Portal View | Key Implemented Features |
| :--- | :--- | :--- | :--- |
| **01** | `Sign in & Portal Access` | [AuthPage](src/components/AuthPage.tsx) | Dual role switcher (Student / Lecturer), demo credentials auto-fill, dark brand storytelling panel with Africa University emblem. |
| **02** | `My Record (Student Portal)` | [StudentOverview](src/components/student/StudentOverview.tsx) | Dark hero card with GPA & academic standing, 78% dynamic record completeness indicator, 6 categorized interactive cards, and live profile modals. |
| **03** | `Request a Letter` | [RequestLetterPage](src/components/student/RequestLetterPage.tsx) | Structured form (Lecturer selection, purpose, deadline, note), automatic student record attachment, and success feedback. |
| **04** | `Recommendation Desk (Lecturer)` | [LecturerPortal](src/components/lecturer/LecturerPortal.tsx) | Requests list with live counters, courses taught highlight box, status update selector, and **Automated Letter Drafting Assistant**. |

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript (Strict Type Safety)
- **Bundler & Build Tool:** Vite
- **Styling:** Tailwind CSS v4 + Custom Africa University Design Tokens
- **Icons:** Lucide React
- **Persistence:** Browser `localStorage` with reactive state synchronization
- **Version Control:** Git with Conventional Commits

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18+ or v20+) installed on your machine.

### 2. Installation
```bash
# Clone the repository
git clone <your-repository-url>
cd au-student-record-portal

# Install dependencies
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Production Build
```bash
npm run build
npm run preview
```

---

## 👥 Team Collaboration & Continuous Git Commit Workflow

As commit history is evaluated for your final exam grade, each team member should follow this standardized workflow to demonstrate active, steady, and disciplined contributions.

### 1. Branch Strategy
- `main`: Production-ready, stable codebase.
- `develop`: Integration branch for tested features.
- Feature branches: `feature/<feature-name>` (e.g. `feature/student-skills-modal`, `feature/letter-pdf-export`).
- Bugfix branches: `fix/<issue-name>` (e.g. `fix/auth-redirect-state`).

### 2. Conventional Commit Guidelines
Make frequent, atomic commits with clear messages following the **Conventional Commits** standard:

| Prefix | Usage Example |
| :--- | :--- |
| `feat:` | `feat: add PDF and print formatting to recommendation letter assistant` |
| `fix:` | `fix: calculate completeness percentage correctly when skills are added` |
| `docs:` | `docs: add team member assignment section to README` |
| `style:` | `style: align red accent colors with Africa University brand guidelines` |
| `refactor:` | `refactor: extract request card into reusable component` |
| `test:` | `test: add validation check for submission deadline date` |

### 3. Daily Contribution Routine for Team Members
```bash
# 1. Pull the latest updates before starting work
git checkout develop
git pull origin develop

# 2. Create your own feature branch
git checkout -b feature/my-assigned-feature

# 3. Work on your code, then stage and commit
git add .
git commit -m "feat: implement dynamic GPA calculator in student profile modal"

# 4. Push your branch to the remote repository
git push origin feature/my-assigned-feature

# 5. Open a Pull Request (PR) on GitHub / GitLab for your team members to review!
```

---

## 📁 Project Structure

```
au-student-record-portal/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── HelpModal.tsx             # Evaluation guide & walkthrough
│   │   ├── lecturer/
│   │   │   ├── LecturerPortal.tsx        # Screen 4: Recommendation Desk
│   │   │   └── LetterGeneratorModal.tsx  # Recommendation Letter Assistant & Print
│   │   ├── student/
│   │   │   ├── EditProfileModal.tsx      # Modal to edit student credentials
│   │   │   ├── RequestLetterPage.tsx     # Screen 3: Letter request form
│   │   │   ├── SectionDetailModal.tsx    # Modal to add/view courses, skills, etc.
│   │   │   ├── StudentOverview.tsx       # Screen 2: Record at a glance
│   │   │   └── StudentSidebar.tsx        # Dark sidebar with completeness meter
│   │   ├── AfricaUniversityLogo.tsx      # Africa University official SVG emblem
│   │   ├── AuthPage.tsx                  # Screen 1: Sign in & portal access
│   │   └── Navbar.tsx                    # Header with role badge & navigation
│   ├── context/
│   │   └── AppContext.tsx                # Global state & persistent localStorage
│   ├── data/
│   │   └── initialData.ts                # Seed student, lecturers, and requests
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

## 📋 Final Exam Evaluation Checklist

- [x] **Figma UI/UX Fidelity:** Exact replica of typography, layout, color palette (#A51C30 Africa University crimson), and card grids.
- [x] **Student Record Organization:** Full support for courses, grades, skills, projects, certifications, and achievements.
- [x] **Recommendation Request Flow:** Automatic attachment of academic credentials to prevent missing context.
- [x] **Lecturer Recommendation Desk:** Course highlight matching, request status management, and AI-assisted letter synthesis.
- [x] **Code Quality & Architecture:** Clean TypeScript modular architecture with zero build errors.
- [x] **Version Control Readiness:** Initialized Git repo with `.gitignore`, clear commit history, and team branching guidelines.

---

*Africa University · Department of Computer Science & Information Systems*
