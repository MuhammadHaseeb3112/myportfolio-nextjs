# 🚀 Muhammad Haseeb | Full Stack Developer Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Django REST API](https://img.shields.io/badge/Django_REST_Framework-red?style=for-the-badge&logo=django)
![Python](https://img.shields.io/badge/Python-3.13-blue?style=for-the-badge&logo=python)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)
![PythonAnywhere](https://img.shields.io/badge/PythonAnywhere-Backend-green?style=for-the-badge)

<br>

# 🌐 Modern Full Stack Developer Portfolio

### Built with Next.js, TypeScript, Tailwind CSS & Django REST Framework

A modern, responsive and API-driven developer portfolio showcasing professional experience, technical skills, projects, testimonials and contact information. The frontend is powered by **Next.js 14** while all dynamic content is served through a **Django REST Framework API**, creating a scalable and production-ready full stack architecture.

<br>

<img src="https://img.shields.io/badge/Status-Live-success?style=flat-square"/>
<img src="https://img.shields.io/badge/Maintained-Yes-success?style=flat-square"/>
<img src="https://img.shields.io/badge/Open%20Source-Yes-blue?style=flat-square"/>
<img src="https://img.shields.io/badge/Responsive-100%25-success?style=flat-square"/>

</div>

---

# 🌍 Live Demo

### 🚀 Frontend

> *(Deploy on Vercel and update this URL)*

```
https://your-portfolio.vercel.app
```

### 🔥 Backend API

```
https://muhammadhaseebportfolio.pythonanywhere.com/api/
```

---

# 📖 Project Overview

This portfolio website was developed to showcase my professional profile, technical expertise, featured projects, testimonials, and contact information through a clean and modern user experience.

Unlike traditional static portfolios, this project follows a **Headless Architecture**, where the frontend and backend are completely separated.

- ⚡ Frontend developed using **Next.js 14**
- 🐍 Backend powered by **Django REST Framework**
- 🔐 Google OAuth Authentication
- 📱 Fully Responsive Design
- 🌙 Modern UI with Smooth Animations
- 📡 REST API Driven Architecture
- 🚀 Production Ready Deployment

The frontend consumes data dynamically from the Django REST API, making the application highly scalable and easy to maintain.

---

# ✨ Key Features

## 🎨 Frontend

- Modern UI/UX Design
- Fully Responsive Layout
- Smooth Animations
- Framer Motion Effects
- Dynamic Portfolio Sections
- Interactive Project Showcase
- Testimonials Carousel
- Contact Form
- Resume Download
- Mobile Navigation
- SEO Friendly
- Fast Page Loading

---

## ⚡ Backend Integration

- Django REST Framework API
- Dynamic Content Loading
- Profile Information
- Skills Management
- Projects API
- Testimonials API
- Social Links API
- Contact API
- Media File Serving
- Image Optimization

---

## 🔐 Authentication

- Google OAuth Login
- Secure Authentication Flow
- Protected Dashboard
- Session Management
- User Authentication
- Login Persistence

---

## 📊 Dashboard

Authenticated users can:

- Login using Google
- Manage Portfolio Data
- Update Profile
- Manage Skills
- Manage Projects
- Manage Testimonials
- Update Contact Information
- Upload Images
- Manage Social Links

---

# 🏗 Project Architecture

```
                    Next.js Frontend
                           │
                           │ REST API
                           ▼
              Django REST Framework API
                           │
            ┌──────────────┴──────────────┐
            │                             │
         SQLite Database             Media Files
            │                             │
            └──────────────┬──────────────┘
                           │
                    PythonAnywhere
```

---

# 🚀 Tech Stack

## Frontend

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios
- React Icons

## Backend

- Django
- Django REST Framework
- Python
- Google OAuth
- Django ORM

## Database

- SQLite

## Deployment

- Vercel
- PythonAnywhere

## Version Control

- Git
- GitHub

---

# ⭐ Highlights

✔ Full Stack Architecture

✔ REST API Integration

✔ Google Authentication

✔ Production Ready

✔ Mobile Responsive

✔ Modern UI/UX

✔ API Driven Content

✔ Dashboard Management

✔ Clean Code Structure

✔ Reusable Components

✔ Optimized Performance

✔ Professional Portfolio

---

# 📂 Project Structure

```
myportfolio-nextjs/
│
├── public/                     # Static assets
│
├── src/
│   ├── app/
│   │   ├── dashboard/          # Admin Dashboard
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   │
│   ├── components/             # Reusable UI Components
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   ├── useProfile.ts
│   │   ├── useProjects.ts
│   │   ├── useTestimonials.ts
│   │   └── useContact.ts
│   │
│   ├── lib/
│   │   └── api.ts              # Axios Configuration
│   │
│   ├── services/
│   │   └── portfolio.ts        # API Service Layer
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   │
│   ├── types/
│   │
│   └── utils/
│
├── .env.example
├── package.json
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── README.md
```

---

# 🔌 Backend API

This project consumes data from a Django REST Framework backend.

### Backend Repository

```
https://github.com/MuhammadHaseeb3112/myportfolio-django-api
```

### Live API

```
https://muhammadhaseebportfolio.pythonanywhere.com/api/
```

---

# 🌐 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/profile/` | Profile Information |
| `/api/social-links/` | Social Media Links |
| `/api/skills/` | Technical Skills |
| `/api/hobbies/` | Hobbies |
| `/api/projects/` | Featured Projects |
| `/api/testimonials/` | Testimonials |
| `/api/contact/` | Contact Information |

---

# ⚙ Environment Variables

Create a file named:

```
.env.local
```

Add the following:

```env
NEXT_PUBLIC_API_URL=https://muhammadhaseebportfolio.pythonanywhere.com/api
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/MuhammadHaseeb3112/myportfolio-nextjs.git
```

Move into the project

```bash
cd myportfolio-nextjs
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open your browser

```
http://localhost:3000
```

---

# 📦 Production Build

Create a production build

```bash
npm run build
```

Run the production server

```bash
npm start
```

---

# 🖥 Development Workflow

```
Frontend (Next.js)
        │
        │ Axios Requests
        ▼
REST API
        │
        ▼
Django REST Framework
        │
        ▼
SQLite Database
```

---

# 📡 API Integration

All API requests are handled through a centralized Axios instance.

Example:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

This makes switching between development and production environments simple and maintainable.

---

# 🛠 Main Technologies

### Frontend

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios
- React Icons

### Backend

- Django REST Framework
- Python
- SQLite
- Google OAuth

---

# 📱 Responsive Design

The application is fully optimized for:

- 💻 Desktop
- 💼 Laptop
- 📱 Mobile
- 📲 Tablet

Built using Tailwind CSS utility classes to ensure a consistent experience across all screen sizes.

---

# ⚡ Performance Optimizations

- Server-side Rendering (SSR)
- Static Asset Optimization
- Image Optimization
- Lazy Loading
- Component Reusability
- Efficient API Calls
- Optimized Bundle Size
- Modern App Router Architecture

---

# 🔒 Security Features

- Google OAuth Authentication
- Environment Variables
- Protected Dashboard
- Secure API Communication
- CORS Configuration
- Authentication Persistence
- Secure REST API Integration

---
