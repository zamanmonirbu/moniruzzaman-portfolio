import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import WorkExperienceSection from "@/components/work-experience-section"
import EducationSection from "@/components/education-section"
import SkillsSection from "@/components/skills-section"
import Footer from "@/components/footer"
import MainContent from "@/components/layout/main-content"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <MainContent>
        <HeroSection />
        <AboutSection />
        <WorkExperienceSection />
        <EducationSection />
        <SkillsSection />
      </MainContent>
      <Footer />
    </div>
  )
}
