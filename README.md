# BAIUST Academix — Client

BAIUST Academix is a centralised academic resource sharing platform developed for students of the Department of CSE, BAIUST. This repository contains the frontend client application.

## Live Deployment

https://baiust-academix-client.vercel.app

## Technology Stack

- Framework: React.js with Vite
- Routing: React Router DOM v6
- HTTP Client: Axios
- Styling: CSS custom properties with inline styles
- Icons: Material Symbols Rounded (Google Fonts)
- Typography: Playfair Display, Inter, DM Mono
- Deployment Platform: Vercel

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

## Environment Configuration

Configure the following environment variable in your deployment platform (Vercel) or create a `.env` file for local development:

```
VITE_API_URL=https://baiust-academix-server.onrender.com/api
```

For production deployment on Vercel, this variable is set directly in the Vercel project dashboard under Settings > Environment Variables.

## Installation and Setup

```bash
# Install project dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Application Features

- Structured browsing of all 8 semesters and 60+ BAIUST CSE courses
- Access to course textbooks, lecture notes and instructional video content
- Student resource upload and submission system
- Full-text search across the resource repository
- Administrator panel for resource moderation and student account management
- JWT-based stateless authentication
- Mobile-first responsive interface

## Route Structure

| Route | Description | Access |
|-------|-------------|--------|
| / | Landing page | Public |
| /login | Student sign in | Public |
| /admin/login | Administrator sign in | Public |
| /register | Student registration | Public |
| /levels | Semester overview | Authenticated |
| /semester/:semId | Course listing | Authenticated |
| /course/:courseCode | Course resource listing | Authenticated |
| /upload | Resource submission | Authenticated |
| /search | Repository search | Authenticated |
| /admin | Administration panel | Admin only |

## Notes

- Student registrations require administrator approval before access is granted.
- The 401 response interceptor in api.js is configured to redirect to the login page only when the user is not already on the login or registration route, preventing redirect loops.
- The vercel.json file configures URL rewrites to support client-side routing on Vercel.

---

Developed by Nosratee Jahan Naba
Department of Computer Science and Engineering, 18th Batch
Bangladesh Army International University of Science and Technology