export interface NavItem {
  id: string
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Projects' },
  { id: 'building', label: 'Learning' },
  { id: 'experience', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export const PERSONAL_INFO = {
  name: 'Muhammad Aqdas',
  shortName: 'M. Aqdas',
  role: 'Frontend Developer',
  subtitle: 'Frontend Developer (Fresher)',
  eyebrow: 'Open to internships & junior roles',
  siteUrl: 'https://muhammad-aqdas.vercel.app',
  // TODO: Replace this placeholder with the actual portfolio repository URL once published
  repoUrl: 'https://github.com/Aqdas-626',
  resumeUrl: '/resume.pdf',
  focus: 'React, Next.js, TypeScript',
  status: 'Open to internships & junior roles',
  location: 'Pakistan (open to remote)',
  email: 'muhammadaqdas626@gmail.com',
  socials: {
    github: 'https://github.com/Aqdas-626',
    linkedin: 'https://www.linkedin.com/in/muhammadaqdas626/',
  },
  heroText:
    "I'm a fresher frontend developer learning to build fast, responsive interfaces with React, Next.js and TypeScript, and exploring 3D and motion with Three.js and GSAP. This portfolio is my first full project.",
} as const
