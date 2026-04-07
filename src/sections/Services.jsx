import { useRef, useState, useCallback, useEffect } from 'react'
import { useInView } from 'framer-motion'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ServiceParticles from '../components/ServicesParticles'
import './services.scss'

const services = [
  {
    id: '01',
    title: 'Workflow Automation',
    description:
      'For e-commerce teams drowning in order processing, inventory sync, and fulfillment chaos — we build pipelines that connect your store, warehouse, and shipping providers end-to-end. Zero manual handoffs, full visibility.',
    tags: ['Shopify', 'n8n', 'Make'],
    tools: ['Shopify', 'n8n', 'Make'],
    shape: 'gear',
  },
  {
    id: '02',
    title: 'AI Agents & Chatbots',
    description:
      'For SaaS companies bleeding users to slow onboarding and overloaded support — we deploy context-aware agents that handle qualification, troubleshooting, and escalation 24/7. Your team focuses on product, not tickets.',
    tags: ['GPT-4', 'Claude', 'Groq'],
    tools: ['GPT-4', 'Claude', 'Groq'],
    shape: 'robot',
  },
  {
    id: '03',
    title: 'CRM & GHL Systems',
    description:
      'For agencies and lead-gen teams losing deals to slow follow-up and messy pipelines — we architect CRM systems with behavioural triggers, multi-channel sequences, and automated scoring that compress time-to-close.',
    tags: ['GHL', 'HubSpot', 'Monday'],
    tools: ['GHL', 'HubSpot', 'Monday'],
    shape: 'code',
  },
  {
    id: '04',
    title: 'API & Integration',
    description:
      'For healthcare and finance teams that need secure, compliant data exchange between legacy systems and modern tools — we build production-grade connectors with encryption, audit trails, and HIPAA-ready architecture.',
    tags: ['REST', 'GraphQL', 'Webhooks'],
    tools: ['REST', 'GraphQL', 'Webhooks'],
    shape: 'chart',
  },
  {
    id: '05',
    title: 'Data Pipelines',
    description:
      'For real estate and property teams juggling listings, tenant data, and compliance reports across disconnected tools — we automate ingestion, transformation, and reporting so you have decision-ready dashboards, not spreadsheets.',
    tags: ['Airtable', 'Sheets', 'Notion'],
    tools: ['Airtable', 'Sheets', 'Notion'],
    shape: 'cloud',
  },
  {
    id: '06',
    title: 'Cloud & DevOps',
    description:
      'For startups and scale-ups shipping fast but drowning in manual deploys, environment drift, and security gaps — we automate infrastructure provisioning, CI/CD pipelines, and secrets management so your team ships with confidence.',
    tags: ['AWS', 'Cloudflare', 'Resend'],
    tools: ['AWS', 'Cloudflare', 'Resend'],
    shape: 'brackets',
  },
]

const ParticleScene = ({ shape }) => (
  <>
    <ambientLight intensity={0.6} />
    <ServiceParticles shape={shape} />
  </>
)

const getDocScrollY = () => {
  const L = window.__lenis
  return typeof L?.scroll === 'number' ? L.scroll : (window.scrollY || document.documentElement.scrollTop)
}

const Services = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const scrollPinRef = useRef(null)
  const prevIdxRef = useRef(0)

  const [activeIndex, setActiveIndex] = useState(0)
  const [animDir, setAnimDir] = useState(1)

  const isInView = useInView(headingRef, { once: true, margin: '-100px' })

  const syncIndexFromScroll = useCallback(() => {
    const root = scrollPinRef.current
    if (!root) return

    // Map the viewport center through the section to an index.
    const rect = root.getBoundingClientRect()
    const sectionTopAbs = window.scrollY + rect.top
    const sectionHeight = Math.max(1, root.offsetHeight || rect.height || 1)
    const windowMid = window.scrollY + window.innerHeight / 2

    let progress = 0
    if (windowMid <= sectionTopAbs) progress = 0
    else if (windowMid >= sectionTopAbs + sectionHeight) progress = 1
    else progress = (windowMid - sectionTopAbs) / sectionHeight

    const idx = Math.min(services.length - 1, Math.max(0, Math.floor(progress * services.length)))

    if (idx !== prevIdxRef.current) {
      const dir = idx > prevIdxRef.current ? 1 : -1
      prevIdxRef.current = idx
      setAnimDir(dir)
      setActiveIndex(idx)
    }
  }, [])

  useEffect(() => {
    // Only enable scroll-driven sync on large screens (desktop)
    if (typeof window === 'undefined' || window.innerWidth < 900) return

    let raf = 0
    const onScroll = () => {
      syncIndexFromScroll()
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0
          syncIndexFromScroll()
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    const lenis = window.__lenis
    lenis?.on?.('scroll', onScroll)

    onScroll()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      lenis?.off?.('scroll', onScroll)
    }
  }, [syncIndexFromScroll])

  const goTo = useCallback((next) => {
    if (next < 0 || next >= services.length) return
    const prev = typeof prevIdxRef.current === 'number' ? prevIdxRef.current : 0
    const dir = next > prev ? 1 : -1
    setAnimDir(dir)
    prevIdxRef.current = next
    setActiveIndex(next)
  }, [])

  const cardVariants = {
    enter: (dir) => ({ opacity: 0, y: dir > 0 ? 80 : -80 }),
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (dir) => ({
      opacity: 0,
      y: dir > 0 ? -80 : 80,
      transition: { duration: 0.3 },
    }),
  }

  const headingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const cur = services[activeIndex]
  const next = services[activeIndex + 1]

  return (
    <section id="services" ref={sectionRef} className="about-section relative scroll-mt-24">
      <div className="about-section__backdrop" aria-hidden />

      <div className="about-inner relative z-10">

        <motion.div
          ref={headingRef}
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="heading-block"
        >
          <motion.h2
            variants={itemVariants}
            className="fancy-text"
            data-text="WHAT WE DO"
          >
            WHAT WE DO
          </motion.h2>
          <motion.p variants={itemVariants} className="heading-sub">
            We offer comprehensive digital solutions that transform your business
            and drive innovation across every touchpoint.
          </motion.p>
        </motion.div>

        <div
          ref={scrollPinRef}
          className="services-scroll-pin scroll-mt-24"
          style={{ '--services-pin-count': services.length }}
        >
          <div className="services-scroll-sticky">
            <div className="services-layout">

              <div className="canvas-side">
                <Canvas
                  key={cur.shape}
                  camera={{ position: [0, 0, 6.35], fov: 30, near: 0.1, far: 100 }}
                  style={{ width: '100%', height: '100%' }}
                  gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: 'high-performance',
                  }}
                  dpr={[1, 2]}
                  onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0)
                  }}
                >
                  <ParticleScene shape={cur.shape} />
                </Canvas>
              </div>

              <div className="cards-side">
                <div className="card-stack">
                  <AnimatePresence custom={animDir} mode="wait">
                    <motion.div
                      key={cur.id}
                      className="service-card active"
                      custom={animDir}
                      variants={cardVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      role="article"
                      aria-label={`Service ${activeIndex + 1} of ${services.length}: ${cur.title}`}
                    >
                      <div className="card-top">
                        <span className="card-num">{cur.id}</span>
                        <span className="card-arrow">↗</span>
                      </div>
                      <h3 className="card-title">{cur.title}</h3>
                      <p className="card-desc">{cur.description}</p>
                      <div className="card-footer">
                        <div className="footer-col">
                          <span className="footer-label">Services</span>
                          {cur.tags.map(t => (
                            <span key={t} className="footer-item">{t}</span>
                          ))}
                        </div>
                        <div className="footer-col">
                          <span className="footer-label">Tools</span>
                          <div className="tools-row">
                            {cur.tools.map(t => (
                              <span key={t} className="tool-badge">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {next && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={'preview-' + next.id}
                        className="service-card preview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                      >
                        <div className="card-top">
                          <span className="card-num">{next.id}</span>
                          <span className="card-arrow">↗</span>
                        </div>
                        <h3 className="card-title muted">{next.title}</h3>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>

                <div className="progress-dots">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`dot ${i === activeIndex ? 'active' : ''}`}
                      aria-label={`Service ${i + 1} of ${services.length}`}
                      aria-current={i === activeIndex ? 'true' : undefined}
                      onClick={() => goTo(i)}
                    />
                  ))}
                </div>

                <div className="navigation-buttons">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => goTo(activeIndex - 1)}
                    disabled={activeIndex === 0}
                    className="nav-btn prev"
                    aria-label="Previous service"
                    type="button"
                  >
                    <ArrowLeft size={20} />
                  </motion.button>
                  <span className="service-counter">{activeIndex + 1} / {services.length}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => goTo(activeIndex + 1)}
                    disabled={activeIndex === services.length - 1}
                    className="nav-btn next"
                    aria-label="Next service"
                    type="button"
                  >
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Services
