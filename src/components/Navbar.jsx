import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#projects' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      // offset scroll by navbar height so section is not hidden underneath
      const navEl = document.querySelector('nav')
      const navHeight = navEl ? navEl.offsetHeight : 0
      const rect = element.getBoundingClientRect()
      const targetY = window.scrollY + rect.top - navHeight - 8
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#131313]/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-white"
          >
            CORTEX
          </motion.div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5 nav-menu">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`nav-link ${item.name === 'Contact' ? 'cta' : ''}`}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            open: { opacity: 1, y: 0, pointerEvents: 'auto' },
            closed: { opacity: 0, y: -8, pointerEvents: 'none' },
          }}
          className="md:hidden fixed inset-x-0 top-16 md:top-20 z-40"
        >
          <div className="bg-[#0b1224]/95 backdrop-blur-md p-6 md:p-8 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] overflow-auto">
            <div className="space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="block px-3 py-2 text-gray-200 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 text-lg"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar
