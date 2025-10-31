import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { useReducedMotion } from '@/hooks'

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

function NavLink({ link, onClick }: { link: typeof navLinks[0]; onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void }) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!linkRef.current || prefersReducedMotion) return

    const element = linkRef.current

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReducedMotion])

  return (
    <a
      ref={linkRef}
      href={link.href}
      onClick={(e) => onClick(e, link.href)}
      className="px-4 py-2 text-sm font-medium rounded-md hover:bg-accent/50 transition-colors"
    >
      {link.name}
    </a>
  )
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (!logoRef.current || prefersReducedMotion) return

    const element = logoRef.current

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: 'back.out(1.7)',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReducedMotion])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/60 supports-[backdrop-filter]:bg-background/40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a 
            ref={logoRef}
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="text-xl font-bold tracking-tight hover:text-muted-foreground transition-colors"
          >
            Portfolio
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.name} link={link} onClick={handleNavClick} />
            ))}
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] backdrop-blur-xl bg-background/95">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="px-4 py-2 text-base font-medium rounded-md hover:bg-accent/50 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
