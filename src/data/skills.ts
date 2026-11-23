export interface SkillCategory {
  category: string
  skills: {
    name: string
    level: string
    description: string
  }[]
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: 'Core Frontend',
    skills: [
      { name: 'TypeScript', level: 'Advanced', description: 'Type-safe scalable architectures and strictly typed APIs' },
      { name: 'React 19 & Next.js', level: 'Advanced', description: 'App Router, Server Components, and streaming rendering' },
      { name: 'Tailwind CSS', level: 'Advanced', description: 'Utility-first modern styling, responsive layouts, design systems' },
    ],
  },
  {
    category: '3D & Creative Web',
    skills: [
      { name: 'Three.js', level: 'Intermediate / Advanced', description: 'Procedural meshes, scene lighting, shaders, and materials' },
      { name: 'React Three Fiber & Drei', level: 'Intermediate / Advanced', description: 'Declarative 3D scenes, camera choreography, and canvas state' },
      { name: 'WebGL & GLSL', level: 'Foundational', description: 'Custom vertex and fragment shader manipulations' },
    ],
  },
  {
    category: 'Animation & Interaction',
    skills: [
      { name: 'GSAP & ScrollTrigger', level: 'Advanced', description: 'High-precision timeline sequencing and scrub-driven choreography' },
      { name: 'Motion / Framer Motion', level: 'Advanced', description: 'Spring physics, layout animations, and gesture interactions' },
      { name: 'Lenis', level: 'Advanced', description: 'Momentum smooth scrolling and animation sync' },
    ],
  },
  {
    category: 'Performance & Engineering',
    skills: [
      { name: 'Web Performance Optimization', level: 'Advanced', description: 'Lighthouse scoring, asset compression, dynamic importing' },
      { name: 'Responsive & Accessible Design', level: 'Advanced', description: 'Mobile-first fluid layouts, reduced-motion compliance' },
      { name: 'Git & Modern Tooling', level: 'Advanced', description: 'Turbopack, ESLint, modern package management' },
    ],
  },
]
