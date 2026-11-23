export interface NavItem {
  id: string
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'building', label: 'Building' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const PERSONAL_INFO = {
  name: 'Muhammad Aqdas',
  shortName: 'M. Aqdas',
  role: 'Frontend Developer',
  focus: 'Creative Web, 3D Graphics & Modern Architectures',
  tagline: 'Engineering immersive digital experiences with modern web technologies, fluid interactions, and high-performance 3D graphics.',
  location: 'Available Worldwide / Remote',
  email: 'contact@muhammadaqdas.dev',
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
} as const
