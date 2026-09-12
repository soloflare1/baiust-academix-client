<div align="center">

# BAIUST Academix

### Academic Resource Hub for the Department of CSE, BAIUST

**Client Application**

[![React](https://img.shields.io/badge/React-18-149ECA?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=flat-square&logo=axios&logoColor=white)](https://axios-http.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)

[Live Site](https://baiust-academix-client.vercel.app) · [Report Issue](#) · [Request Feature](#)

</div>

---

## Overview

**BAIUST Academix** consolidates the academic resources of the Department of Computer Science and Engineering, BAIUST — previously scattered across messaging groups, personal drives, and informal peer sharing — into a single **structured, searchable, administrator-verified platform** accessible to every enrolled CSE student.

The platform spans the complete **8-semester BAIUST CSE curriculum**, offering organized access to course textbooks, lecture notes, and instructional video content across **60+ registered courses**, from Level 1.1 through Level 4.2.

> This repository contains the **frontend client application**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React.js (Vite) |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| Styling | CSS Custom Properties + Inline Styles |
| Iconography | Material Symbols Rounded |
| Typography | Playfair Display · Inter · DM Mono |
| Deployment | Vercel |

---

## Core Features

- **Structured Browsing** — All 8 semesters and 60+ CSE courses organized by level and term
- **Resource Access** — Textbooks, lecture notes, and instructional videos in one place
- **Student Uploads** — Contribute resources via a submission workflow
- **Full-Text Search** — Instantly search the entire repository
- **Admin Panel** — Resource moderation and student account management
- **JWT Authentication** — Stateless, secure session handling
- **Mobile-First Design** — Fully responsive across devices

---

## Project Structure

```
src/
├── components/
│   ├── Logo.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── GhibliScene.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── LevelTerm.jsx
│   ├── Courses.jsx
│   ├── CourseDetail.jsx
│   ├── Upload.jsx
│   ├── Search.jsx
│   └── AdminPanel.jsx
├── hooks/
│   └── useAuth.js
├── utils/
│   └── api.js
├── data/
│   └── courses.js
├── styles/
│   └── global.css
└── App.jsx
```

---

## Route Map

| Route | Description | Access |
|---|---|---|
| `/` | Landing page | Public |
| `/login` | Student sign-in | Public |
| `/admin/login` | Administrator sign-in | Public |
| `/register` | Student registration | Public |
| `/levels` | Semester overview | Authenticated |
| `/semester/:semId` | Course listing | Authenticated |
| `/course/:courseCode` | Course resource listing | Authenticated |
| `/upload` | Resource submission | Authenticated |
| `/search` | Repository search | Authenticated |
| `/admin` | Administration panel | Admin only |

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd baiust-academix-client

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file in the project root for local development:

```env
VITE_API_URL=https://baiust-academix-server.onrender.com/api
```

For production, set this in the **Vercel Dashboard** under `Settings → Environment Variables`.

---

## Implementation Notes

- Student registrations require **administrator approval** before access is granted.
- The `401` response interceptor in `api.js` redirects to the login page **only** when the user isn't already on the login or registration route — preventing redirect loops.
- `vercel.json` configures URL rewrites to support client-side routing on Vercel.

---

<div align="center">
Developed with care by **Nosratee Jahan Naba**
Department of CSE · 18th Batch BAIUST
</div>

