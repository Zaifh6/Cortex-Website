import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Services from './sections/Services'
import ServicesMarquee from './sections/ServicesMarquee'
import Projects from './sections/Projects'
import Pricing from './sections/Pricing'
import Team from './sections/Team'
import Contact from './sections/Contact'
import AutomationStack from './sections/AutomationStack'
import Footer from './components/Footer'
import useLenis from './hooks/useLenis'

function App() {
  useLenis()

  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Hero />
        <Services />
        <ServicesMarquee />
        <Projects />
        <Pricing />
        <AutomationStack />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
