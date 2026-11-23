import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/sections/HeroSection'

// Lazy-load below-the-fold sections with next/dynamic to minimize initial JS bundle
const AboutSection = dynamic(
  () => import('@/components/sections/AboutSection').then((mod) => mod.AboutSection)
)
const SkillsSection = dynamic(
  () => import('@/components/sections/SkillsSection').then((mod) => mod.SkillsSection)
)
const WorkSection = dynamic(
  () => import('@/components/sections/WorkSection').then((mod) => mod.WorkSection)
)
const BuildingSection = dynamic(
  () => import('@/components/sections/BuildingSection').then((mod) => mod.BuildingSection)
)
const ExperienceSection = dynamic(
  () => import('@/components/sections/ExperienceSection').then((mod) => mod.ExperienceSection)
)
const ContactSection = dynamic(
  () => import('@/components/sections/ContactSection').then((mod) => mod.ContactSection)
)
const FooterSection = dynamic(
  () => import('@/components/sections/FooterSection').then((mod) => mod.FooterSection)
)

export default function Home() {
  return (
    <div className="relative w-full flex flex-col">
      {/* 01 // HERO (Eagerly loaded for instant LCP) */}
      <HeroSection />

      {/* 02 // ABOUT */}
      <AboutSection />

      {/* 03 // SKILLS */}
      <SkillsSection />

      {/* 04 // FEATURED WORK */}
      <WorkSection />

      {/* 05 // CURRENTLY BUILDING */}
      <BuildingSection />

      {/* 06 // EXPERIENCE */}
      <ExperienceSection />

      {/* 07 // CONTACT */}
      <ContactSection />

      {/* 08 // FOOTER */}
      <FooterSection />
    </div>
  )
}
