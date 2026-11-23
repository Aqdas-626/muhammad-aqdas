export interface ExperienceMilestone {
  period: string
  title: string
  area: string
  description: string
  highlights: string[]
}

export const EXPERIENCE_DATA: ExperienceMilestone[] = [
  {
    period: '2025 - Present',
    title: 'Independent Frontend & Creative Developer',
    area: 'Self-Directed Engineering & Exploration',
    description: 'Focusing on cutting-edge creative web development, modern Next.js architectures, declarative 3D graphics (React Three Fiber), and complex scroll-linked micro-interactions.',
    highlights: [
      'Engineered procedural 3D web environments with real-time lighting and camera choreography',
      'Architected responsive, accessible component ecosystems using React 19, TypeScript, and Tailwind CSS',
      'Specialized in smooth-scroll mechanics and timeline orchestration with Lenis, GSAP, and Motion',
    ],
  },
  {
    period: '2024 - 2025',
    title: 'Modern Web & JavaScript Deep Dive',
    area: 'Frontend Specialization',
    description: 'Intensive focus on TypeScript fundamentals, component design patterns, state management, and modern CSS layout techniques.',
    highlights: [
      'Built interactive web applications adhering to strict accessibility and semantic standards',
      'Studied WebGL fundamentals, matrix transformations, and 3D coordinate spaces',
      'Developed reusable UI utility libraries focusing on layout stability and performance',
    ],
  },
]
