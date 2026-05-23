# Full Stack Developer Portfolio

A modern, responsive portfolio website built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Features Static Site Generation (SSG) for optimal performance.

## Features

- **Component-Based Architecture**: Modular, reusable components
- **Static Site Generation (SSG)**: Pre-rendered HTML for fast loading
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Minimal, elegant animations using Framer Motion
- **Type Safety**: Full TypeScript support
- **Form Validation**: Zod schema validation for contact form
- **Interactive Experience Map**: Visual representation of work history with hover effects
- **Project Carousel**: Swipeable project showcase with drag support

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## Getting Started

### Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Configure Contact Email

Create a local env file from `.env.example` and set your SMTP credentials:

```bash
cp .env.example .env.local
```

Required variables:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

For Gmail, use `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_SECURE=false`, and an App Password instead of your normal account password.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Customization Guide

### 1. Update Personal Information

Edit `src/data/portfolio.ts`:

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Full Stack Developer",
  email: "your.email@example.com",
  linkedIn: "https://linkedin.com/in/yourprofile",
  summary: `Your professional summary...`,
};
```

### 2. Add Your Work Experience

Update the `experiences` array in `src/data/portfolio.ts`:

```typescript
export const experiences: Experience[] = [
  {
    id: 1,
    company: "Company Name",
    position: "Your Position",
    period: "Jan 2020 - Dec 2021",
    location: {
      city: "Delhi",
      coordinates: { lat: 28.6139, lng: 77.209 },
    },
    techStack: ["React", "Node.js", "MongoDB", "AWS"],
  },
];
```

To position cities on the map, update `locationPositions` in `src/components/about/ExperienceMap.tsx`.

### 3. Add Your Projects

Update the `projects` array in `src/data/portfolio.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 1,
    name: "Project Name",
    description: "Brief description",
    techStack: ["React", "Node.js"],
    githubUrl: "https://github.com/username/repo",
    liveUrl: "https://your-project.com",
  },
];
```

### 4. Update Your Skills

Modify the `skills` array in `src/data/portfolio.ts`:

```typescript
export const skills: Skill[] = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS"],
  },
];
```

## Project Structure

portfolio-dhanan/
├── src/
│ ├── components/
│ │ ├── about/ # About page components
│ │ ├── contact/ # Contact form & card
│ │ ├── layout/ # Header & Layout
│ │ └── projects/ # Project card
│ ├── data/
│ │ └── portfolio.ts # Your data (customize this!)
│ ├── pages/ # Page components
│ ├── types/ # TypeScript types
│ └── App.tsx
└── ...

## Key Features Explained

### Interactive Experience Map

- SVG-based map with location pins
- Hover to see company details
- Animated connecting arrows
- Chronological timeline

### Project Carousel

- Swipe/drag support
- Arrow navigation
- Smooth animations
- Mobile-friendly

### Contact Form

- Zod validation
- Submit on Enter or click
- Error handling
- Loading states

## Deployment

### Netlify/Vercel

1. Build command: `npm run build`
2. Deploy as a Next.js app with server support

### Important

The contact form now sends email through `app/api/contact`, so this project must be deployed on a platform that supports Next.js server routes. Static export and plain GitHub Pages will not support the email feature.

## Mobile Responsiveness

Fully responsive with Tailwind breakpoints:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

**Make it yours!** Customize the data in `src/data/portfolio.ts` to create your unique portfolio.
