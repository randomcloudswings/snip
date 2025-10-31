import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hero, About, Projects, Contact } from './components/sections'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // GSAP setup can be added here
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  )
}

export default App
