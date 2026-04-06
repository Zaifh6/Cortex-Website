import { useRef, useState, useCallback, useEffect } from 'react'
import { useInView } from 'framer-motion'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import ServiceParticles from '../components/ServicesParticles'
import './services.scss'

const services = [
  {
    id: '01',
    title: 'Workflow Automation',
    description:
      'End-to-end automation of repetitive business processes — from triggers and logic flows to scheduled jobs and real-time notifications.',
    tags: ['Process Mapping', 'Trigger-Based Flows', 'Scheduled Jobs', 'Notification Systems'],
    tools: ['n8n', 'Zapier', 'Make', 'Python'],
    shape: 'gear',
  },
  {
    id: '02',
    title: 'AI Agents & Chatbots',
    description:
      'Intelligent conversational agents and autonomous AI workers that handle support, lead qualification, and internal operations 24/7.',
    tags: ['LLM Integration', 'Custom Chatbots', 'Autonomous Agents', 'RAG Pipelines'],
    tools: ['OpenAI', 'LangChain', 'Pinecone', 'FastAPI'],
    shape: 'robot',
  },
  {
    id: '03',
    title: 'API & Integration',
    description:
      'Seamlessly connect your tools, platforms, and data sources with robust REST/GraphQL APIs and third-party integrations.',
    tags: ['REST & GraphQL', 'Webhook Systems', 'OAuth & Auth', 'Third-Party Connectors'],
    tools: ['Node.js', 'Express', 'Postman', 'Stripe'],
    shape: 'code',
  },
  {
    id: '04',
    title: 'Data Pipelines',
    description:
      'Design and deploy scalable data pipelines — from ingestion to transformation, storage, and real-time analytics dashboards.',
    tags: ['ETL Pipelines', 'Stream Processing', 'Data Warehousing', 'BI Dashboards'],
    tools: ['Airflow', 'dbt', 'BigQuery', 'Metabase'],
    shape: 'chart',
  },
  {
    id: '05',
    title: 'Cloud & DevOps Automation',
    description:
      'Infrastructure as code, CI/CD pipelines, container orchestration, and cloud cost optimization across AWS, GCP, and Azure.',
    tags: ['IaC (Terraform)', 'CI/CD Pipelines', 'Docker & K8s', 'Cloud Cost Ops'],
    tools: ['AWS', 'Terraform', 'Docker', 'GitHub Actions'],
    shape: 'cloud',
  },
  {
    id: '06',
    title: 'Web Development',
    description:
      'Modern, performant web applications built with cutting-edge frameworks — from landing pages to full-scale SaaS platforms.',
    tags: ['React & Next.js', 'Full-Stack Apps', 'CMS & E-Commerce', 'Performance Tuning'],
    tools: ['React', 'Next.js', 'Tailwind', 'Supabase'],
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
    if (!root || root.offsetHeight < 8) return

    const rect = root.getBoundingClientRect()
    const vh = window.innerHeight || 1
    const scrolledInto = Math.max(0, -rect.top)
    const maxInto = Math.max(0, root.offsetHeight - vh)
    const t = Math.min(scrolledInto, maxInto)

    let idx = 0
    if (services.length > 1 && maxInto > 0.5) {
      idx = Math.min(
        services.length - 1,
        Math.max(0, Math.floor((t / maxInto) * (services.length - 1) + 1e-6)),
      )
    }

    if (idx !== prevIdxRef.current) {
      const dir = idx > prevIdxRef.current ? 1 : -1
      prevIdxRef.current = idx
      setAnimDir(dir)
      setActiveIndex(idx)
    }
  }, [])

  useEffect(() => {
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
    const root = scrollPinRef.current
    if (!root || root.offsetHeight < 8) return

    const vh = window.innerHeight || 1
    const maxInto = Math.max(0, root.offsetHeight - vh)
    const t = services.length > 1 ? (next / (services.length - 1)) * maxInto : 0
    const pinDocTop = root.getBoundingClientRect().top + getDocScrollY()
    const targetY = pinDocTop + t

    const lenis = window.__lenis
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(targetY, { immediate: true })
    } else {
      window.scrollTo(0, targetY)
    }
    queueMicrotask(() => syncIndexFromScroll())
  }, [syncIndexFromScroll])

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
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Services
