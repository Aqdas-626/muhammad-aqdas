export interface LearningTopic {
  id: string
  title: string
  category: string
  sentence: string
  tags: string[]
}

export const CURRENTLY_LEARNING_TOPICS: LearningTopic[] = [
  {
    id: 'threejs-r3f',
    title: 'Three.js & React Three Fiber',
    category: '3D Graphics',
    sentence:
      'Practising how to set up procedural geometries, lighting, camera controls, and smooth canvas integration in React.',
    tags: ['Three.js', 'R3F', 'Canvas'],
  },
  {
    id: 'nextjs-app-router',
    title: 'Next.js App Router',
    category: 'Web Framework',
    sentence:
      'Practising component architecture, separating client and server components, and optimizing production builds.',
    tags: ['Next.js', 'React', 'TypeScript'],
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    category: 'Language',
    sentence:
      'Practising static typing with interfaces, generic props, and strict types to catch bugs early in development.',
    tags: ['TypeScript', 'Static Typing'],
  },
  {
    id: 'gsap-animations',
    title: 'GSAP animations',
    category: 'Animation',
    sentence:
      'Practising timeline sequencing, scroll triggers, and coordinating animation lifecycles with the DOM.',
    tags: ['GSAP', 'ScrollTrigger', 'Motion'],
  },
]
