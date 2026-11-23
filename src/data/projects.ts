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
  highlights?: string[]
  techStack: string[]
  type: 'Case Study' | 'Creative Experiment' | 'Open Source'
  githubUrl?: string
  liveUrl?: string
  browserUrl?: string
  year: string
  isPlaceholder?: boolean
  image: ProjectImage
}

/**
 * ============================================================================
 * HOW TO ADD / REPLACE SCREENSHOTS:
 * ============================================================================
 * 1. Place your real project screenshot inside the /public/projects/ directory:
 *    e.g. /public/projects/portfolio-v2.webp
 * 2. Recommended specifications:
 *    - Aspect ratio: 16:10 (e.g. 1600 x 1000 px)
 *    - Format: WebP or optimized PNG
 *    - File size: < 300 KB for optimal Core Web Vitals and instant LCP
 * 3. Update the `image.src` property for the corresponding project below.
 * ============================================================================
 */
export const PROJECTS_DATA: Project[] = [
  {
    id: 'arctic-3d-portfolio',
    title: 'This Portfolio — Arctic 3D Space',
    tagline: 'Procedural 3D canvas with master scrubbed GSAP camera choreography',
    description:
      'An interactive 3D portfolio featuring procedural Three.js faceted crystal geometry, unified GSAP ticker driving Lenis momentum scroll, and scrubbed camera paths synchronized across keyframed sections with zero layout shift.',
    techStack: ['Next.js 16', 'React 19', 'R3F', 'Three.js', 'GSAP', 'Lenis'],
    type: 'Case Study',
    year: '2026',
    githubUrl: 'https://github.com',
    liveUrl: '#hero',
    browserUrl: 'localhost:3000',
    isPlaceholder: false,
    image: {
      src: '/projects/portfolio.svg',
      alt: 'Muhammad Aqdas 3D Portfolio interface preview',
      width: 1600,
      height: 1000,
    },
  },
  {
    id: 'frost-motion-ui',
    title: 'Frost Motion UI Laboratory',
    tagline: 'Micro-interaction laboratory with spring physics & kinetic type',
    description:
      'A component library and interaction testing sandbox exploring configurable spring dynamics, reactive typography, and frosted glass light refractions tailored for high-contrast arctic user interfaces.',
    techStack: ['React 19', 'TypeScript', 'Motion', 'Tailwind CSS', 'Radix UI'],
    type: 'Creative Experiment',
    year: '2026',
    githubUrl: 'https://github.com',
    browserUrl: 'frost-motion.internal',
    isPlaceholder: true,
    image: {
      src: '/projects/frost-ui-lab.svg',
      alt: 'Frost Motion UI Laboratory interface preview',
      width: 1600,
      height: 1000,
    },
  },
  {
    id: 'shader-terrain-explorer',
    title: 'Procedural Terrain & GLSL Sandbox',
    tagline: 'Noise-driven elevation matrices with real-time lighting',
    description:
      'An experimental WebGL sandbox generating endless procedural terrain through custom simplex noise vertex displacement, volumetric atmospheric fog scattering, and real-time wireframe elevation contours.',
    techStack: ['Three.js', 'GLSL', 'WebGL', 'TypeScript', 'Vite'],
    type: 'Open Source',
    year: '2026',
    githubUrl: 'https://github.com',
    browserUrl: 'terrain.glsl-lab.xyz',
    isPlaceholder: true,
    image: {
      src: '/projects/glsl-sandbox.svg',
      alt: 'Procedural Terrain & GLSL Sandbox interface preview',
      width: 1600,
      height: 1000,
    },
  },
]
