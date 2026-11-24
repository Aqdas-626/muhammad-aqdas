import { PERSONAL_INFO } from './constants'

export interface ProjectImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  techStack: string[]
  githubUrl: string
  liveUrl: string
  browserUrl: string
  year: string
  image: ProjectImage
}

export interface PlannedProject {
  id: string
  title: string
  tagline: string
  description: string
  techStack: string[]
}

export const FEATURED_PROJECT: Project = {
  id: 'arctic-3d-portfolio',
  title: 'This Portfolio: 3D Arctic Space',
  tagline: 'Responsive 3D portfolio built with Next.js, React and Three.js',
  description:
    'My first full project: a responsive portfolio built with Next.js, React and TypeScript, with a 3D Three.js scene and scroll-driven animation. I used it to learn component structure, animation timing and performance tuning.',
  techStack: ['Next.js', 'React', 'TypeScript', 'Three.js', 'GSAP', 'Tailwind CSS'],
  githubUrl: PERSONAL_INFO.repoUrl,
  liveUrl: PERSONAL_INFO.siteUrl,
  browserUrl: 'muhammad-aqdas.vercel.app',
  year: '2026',
  image: {
    src: '/projects/portfolio.svg',
    alt: 'Screenshot preview of Muhammad Aqdas 3D Portfolio interface',
    width: 1600,
    height: 1000,
  },
}

export const PLANNED_PROJECTS: PlannedProject[] = [
  {
    id: 'weather-dashboard',
    title: 'Weather dashboard (React + public API)',
    tagline: 'Planned Project',
    description:
      'A responsive application to search locations and display real-time weather forecasts and conditions using a public REST API.',
    techStack: ['React', 'TypeScript', 'REST API', 'Tailwind CSS'],
  },
  {
    id: 'animated-ui-components',
    title: 'Animated UI component set (React + Motion)',
    tagline: 'Planned Project',
    description:
      'A collection of accessible, animated interface components such as modals, dropdowns, tabs, and drawer menus.',
    techStack: ['React', 'Motion', 'Tailwind CSS', 'Radix UI'],
  },
]
