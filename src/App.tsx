import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navigation } from './components/Navigation'
import { Hero, About, Skills, Projects, Contact } from './components/sections'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // GSAP setup can be added here
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  )
}

export default App
