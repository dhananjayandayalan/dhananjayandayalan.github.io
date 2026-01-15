import type { Experience, Project, Skill, ProjectCategory } from '../types';

export const personalInfo = {
  name: 'Dhananjayan D',
  title: 'Full Stack Developer',
  email: 'dhananjayan.dayalan@gmail.com',
  linkedIn: 'https://linkedin.com/in/dhananjayandayalan',
  summary: `Passionate Full Stack Developer with expertise in building scalable web applications.
  Experienced in modern JavaScript frameworks. Dedicated to writing clean, maintainable code and delivering exceptional user experiences.`
};

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Avizva Solutions',
    position: 'Development Engineer - Frontend Technologies',
    period: 'Sep 2021 - August 2025',
    location: {
      city: 'Delhi',
      coordinates: {
        lat: 30.6139,
        lng: 68.2090
      }
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'AWS', 'Typescript', 'Redux', 'Express', 'Jest', 'Micro-frontend']
  },
  {
    id: 2,
    company: 'Tata Consultancy Services',
    position: 'Systems Engineer - C1 Grade',
    period: 'Sept 2025 - Present',
    location: {
      city: 'Chennai',
      coordinates: {
        lat: 15.0827,
        lng: 70.2707
      }
    },
    techStack: ['React', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'Node.js', 'Serverless']
  }
];

export const projectCategories: ProjectCategory[] = [
  {
    id: 'hobby',
    name: 'Hobby Projects',
    projects: [
      {
        id: 1,
        name: 'Syncify',
        description: 'A cross-platform application that synchronizes playlists across multiple music streaming services (Spotify, Apple Music, Amazon Music, YouTube Music).',
        techStack: ['React', 'React Native', 'Tailwind', 'Node.js', 'PostgreSQL', 'Docker', 'Turborepo', 'Spotify API', 'Apple Music API'],
        githubUrl: 'https://github.com/dhananjayandayalan/syncify',
      },
      {
        id: 2,
        name: 'Cheerify',
        description: 'A web application that generates truly unique, AI-powered personalized cheer-up notes for Twitter users by analyzing their Twitter personality and creating custom PDF messages.',
        techStack: ['Vue', 'Node.js', 'Gemini API', 'Twitter API', 'PDF Generation'],
        githubUrl: 'https://github.com/dhananjayandayalan/cheerify'
      },
      {
        id: 3,
        name: 'Personal Portfolio',
        description: 'My personal portfolio website showcasing my projects, skills, and experience.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
        githubUrl: 'https://github.com/dhananjayandayalan/cheerify',
        liveUrl: 'https://dhananjayan-d.vercel.app'
      },
      {
        id: 4,
        name: 'Real Time Collaboration Project Management System',
        description: 'My personal portfolio website showcasing my projects, skills, and experience.',
        techStack: ['React', 'Node.js', 'Express.js', 'Typescript', 'Redux Toolkit', 'Web Socket', 'Docker', 'PostgreSQL', 'Redis', 'Micro-Services', 'CSS'],
        githubUrl: 'https://github.com/dhananjayandayalan/real-time-collaboration-project-management-system'
      }
    ]
  },
  {
    id: 'frontend-mentor',
    name: 'Frontend Mentor Challenges',
    projects: []
  }
];

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Remix', 'Vue.js', 'Tailwind CSS', 'SCSS', 'Shadcn', 'Redux', 'React Native']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Nest.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    category: 'DevOps',
    items: ['Docker', 'AWS', 'GitHub Actions']
  },
  {
    category: 'Tools',
    items: ['Git', 'Figma', 'Jest', 'Vitest', 'Turborepo', 'Webpack', 'Vite', 'Twilio']
  }
];
