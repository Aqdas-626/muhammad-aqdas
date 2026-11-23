import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { WorkSection } from '@/components/sections/WorkSection'
import { BuildingSection } from '@/components/sections/BuildingSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <div className="relative w-full flex flex-col">
      {/* 01 // HERO */}
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
