export type SkillLevel = 'Comfortable' | 'Learning' | 'Exploring'

export interface SkillCategory {
  category: string
  skills: {
    name: string
    level: SkillLevel
    description: string
  }[]
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: 'Core',
    skills: [
      {
        name: 'HTML & CSS',
        level: 'Comfortable',
        description: 'Semantic page structure, modern flexbox and grid layouts, and media queries.',
      },
      {
        name: 'JavaScript',
        level: 'Learning',
        description: 'Modern ES6+ syntax, asynchronous programming, promises, and DOM manipulation.',
      },
      {
        name: 'TypeScript',
        level: 'Learning',
        description: 'Adding types to components, interfaces, and catching errors early in development.',
      },
      {
        name: 'React',
        level: 'Learning',
        description: 'Building components, managing state with hooks, and handling user events.',
      },
      {
        name: 'Next.js',
        level: 'Learning',
        description: 'App Router fundamentals, page routing, and combining client and server components.',
      },
      {
        name: 'Tailwind CSS',
        level: 'Comfortable',
        description: 'Styling interfaces rapidly with utility classes and responsive modifiers.',
      },
    ],
  },
  {
    category: 'Animation',
    skills: [
      {
        name: 'GSAP & ScrollTrigger',
        level: 'Exploring',
        description: 'Creating scroll-driven triggers, sequencing animations, and scrubbed transitions.',
      },
      {
        name: 'Motion',
        level: 'Exploring',
        description: 'Adding smooth spring animations, fade-ins, and hover micro-interactions.',
      },
      {
        name: 'Lenis',
        level: 'Exploring',
        description: 'Integrating smooth momentum scrolling with animation triggers.',
      },
    ],
  },
  {
    category: '3D Graphics',
    skills: [
      {
        name: 'Three.js & React Three Fiber',
        level: 'Exploring',
        description: 'Setting up 3D scenes, cameras, lighting, materials, and procedural geometry.',
      },
      {
        name: 'GLSL shaders',
        level: 'Exploring',
        description: 'Experimenting with basic vertex and fragment shader mathematics.',
      },
    ],
  },
  {
    category: 'Tools & Practices',
    skills: [
      {
        name: 'Git & GitHub',
        level: 'Learning',
        description: 'Tracking code changes, branch workflows, and committing project history.',
      },
      {
        name: 'Responsive & accessible design',
        level: 'Learning',
        description: 'Building layouts that work on all screen sizes with accessible ARIA tags.',
      },
      {
        name: 'VS Code & Vercel',
        level: 'Comfortable',
        description: 'Daily code editing, developer extensions, and continuous deployment workflows.',
      },
    ],
  },
]
