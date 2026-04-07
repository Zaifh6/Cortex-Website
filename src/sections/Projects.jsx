import { useRef, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github, Layers, Zap, Shield, ShoppingCart, Linkedin, GitBranch, Server } from 'lucide-react'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredId, setHoveredId] = useState(null)

  const categories = [
    { id: 'all', label: 'All Projects', icon: Layers },
    { id: 'automation', label: 'Automation', icon: Zap },
    { id: 'ai', label: 'AI & ML', icon: GitBranch },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart },
  ]

  const projects = [
    {
      id: 1,
      title: 'Lead Generation',
      subtitle: 'Lead Capture Automation Pipeline',
      description: 'End-to-end pipeline capturing form submissions, creating CRM entries, writing AI-personalized emails via Groq, and updating lead status — all within seconds.',
      technologies: ['n8n', 'monday.com', 'Groq'],
      metricLabel: 'Form to CRM',
      metric: '<5s',
      linkText: '▶ Video Demo',
      link: '#',
      category: 'automation',
      featured: true,
      icon: Zap,
      color: '#ffffff'
    },
    {
      id: 2,
      title: 'Cloud Security',
      subtitle: 'AWS IAM Dormant User Alert System',
      description: 'Weekly automated audit of all AWS IAM users — flags accounts inactive 90+ days and posts structured Slack alerts, eliminating manual cloud security reviews.',
      technologies: ['n8n', 'AWS IAM', 'Slack'],
      metricLabel: 'Coverage',
      metric: '100% IAM Coverage',
      linkText: 'Internal Deployment',
      link: '#',
      category: 'security',
      featured: false,
      icon: Shield,
      color: '#c6c6c6'
    },
    {
      id: 3,
      title: 'E-Commerce',
      subtitle: 'AI Shopify Product Description Generator',
      description: 'Watches a Shopify store in real time and auto-rewrites every product description into high-converting, SEO-optimized copy powered by GPT-4.',
      technologies: ['Make.com', 'OpenAI', 'Shopify'],
      metricLabel: 'Product Scale',
      metric: '∞',
      linkText: '↗ Case Study',
      link: '#',
      category: 'ecommerce',
      featured: false,
      icon: ShoppingCart,
      color: '#a0a0a0'
    },
    {
      id: 4,
      title: 'Travel',
      subtitle: 'Travel Agency Booking & Follow-Up Automation',
      description: 'Automated inquiry intake, AI-personalised quote emails, and a full follow-up sequence — eliminating manual back-and-forth across the entire client journey.',
      technologies: ['n8n', 'GHL', 'OpenAI'],
      metricLabel: 'Follow-up Rate',
      metric: '100%',
      linkText: 'Live Client',
      link: '#',
      category: 'automation',
      featured: false,
      icon: Linkedin,
      color: '#919191'
    },
    {
      id: 5,
      title: 'DevOps',
      subtitle: 'Dev Team Ops Automation Hub',
      description: 'Unified workflow connecting Slack, ClickUp, and GitHub — auto-creating tasks, syncing PR status, and posting standup digests.',
      technologies: ['n8n', 'Slack', 'ClickUp', 'GitHub'],
      metricLabel: 'Savings',
      metric: '8+ hrs saved per sprint',
      linkText: 'Live Case Study',
      link: '#',
      category: 'automation',
      featured: false,
      icon: GitBranch,
      color: '#474747'
    },
    {
      id: 6,
      title: 'Infrastructure',
      subtitle: 'New Project Bootstrap Blueprint',
      description: 'A 28-node automation that registers a domain, configures DNS/SSL, provisions email, and sets up routing from one trigger.',
      technologies: ['n8n', 'GoDaddy', 'Cloudflare'],
      metricLabel: 'Velocity',
      metric: 'Full stack in <5 mins',
      linkText: 'Live Case Study',
      link: '#',
      category: 'automation',
      featured: false,
      icon: Server,
      color: '#353534'
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  const featuredProject = projects.find(p => p.featured)
  const regularProjects = filteredProjects.filter(p => !p.featured || activeFilter !== 'all')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section 
      id="projects" 
      ref={ref} 
      className="relative min-h-screen bg-[#131313] text-[#e5e2e1] overflow-hidden font-['Manrope'] selection:bg-white/30 selection:text-white py-24 md:py-32"
    >
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-radial from-white/[0.02] to-transparent rounded-full blur-[80px] transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Technical Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-[10%] top-0 w-px h-full bg-white" />
        <div className="absolute left-[30%] top-0 w-px h-full bg-white" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-white" />
        <div className="absolute left-[70%] top-0 w-px h-full bg-white" />
        <div className="absolute left-[90%] top-0 w-px h-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 md:mb-20"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="space-y-6 max-w-2xl">
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-white/50 to-transparent" />
                <span className="text-[0.6875rem] uppercase tracking-[0.4em] text-[#919191] font-['Space_Grotesk']">
                  Selected Work
                </span>
              </motion.div>
              
              <motion.h2 
                variants={itemVariants}
                className="text-[2.5rem] md:text-[4rem] leading-[1.05] font-bold tracking-[-0.03em] font-['Space_Grotesk']"
              >
                <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
                  Automation solutions
                </span>
                <br />
                <span className="bg-gradient-to-b from-white/80 via-white/60 to-white/40 bg-clip-text text-transparent italic">
                  engineered for scale.
                </span>
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-[#919191] text-base md:text-lg leading-relaxed max-w-xl"
              >
                Each project represents a unique challenge solved through intelligent automation, 
                AI integration, and meticulous engineering.
              </motion.p>
            </div>

            {/* Filter Pills */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium font-['Space_Grotesk'] uppercase tracking-wider transition-all duration-300 ${
                      activeFilter === cat.id
                        ? 'bg-white text-black shadow-lg shadow-white/20'
                        : 'bg-white/5 text-[#919191] hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    <Icon size={14} className={activeFilter === cat.id ? 'text-black' : 'text-[#919191] group-hover:text-white'} />
                    {cat.label}
                  </button>
                )
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Bento Grid Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.3 } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          >
            {/* Featured Project - Large Card */}
            {activeFilter === 'all' && featuredProject && (
              <motion.div
                variants={itemVariants}
                className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 group relative"
                onMouseEnter={() => setHoveredId(featuredProject.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <ProjectCardLarge project={featuredProject} isHovered={hoveredId === featuredProject.id} />
              </motion.div>
            )}

            {/* Regular Project Cards */}
            {regularProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                custom={index}
                className={`group relative ${
                  project.featured && activeFilter === 'all' ? 'hidden' : ''
                } ${index === 0 && activeFilter !== 'all' ? 'md:col-span-2 lg:col-span-1' : ''}`}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <ProjectCard project={project} isHovered={hoveredId === project.id} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 md:mt-28"
        >
          <div className="relative p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm overflow-hidden group cursor-pointer hover:border-white/20 transition-all duration-500">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-white">
                  Ready to automate your workflow?
                </h3>
                <p className="text-[#919191] max-w-md">
                  Let's discuss how we can streamline your operations and boost efficiency.
                </p>
              </div>
              
              <a 
                href="#contact" 
                className="group/btn flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-medium font-['Space_Grotesk'] hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
              >
                Start a Project
                <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Large Featured Project Card Component
const ProjectCardLarge = ({ project, isHovered }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Icon = project.icon

  return (
    <motion.a
      href={project.link}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative block h-full min-h-[500px] md:min-h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-[#1a1a1a]/80 backdrop-blur-xl transition-all duration-500 group"
    >
      {/* Gradient Border Animation */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-white/10" />
      </div>

      {/* Ambient Glow */}
      <div 
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ backgroundColor: project.color }}
      />

      {/* Content */}
      <div className="relative h-full p-8 md:p-12 flex flex-col justify-between" style={{ transform: "translateZ(50px)" }}>
        {/* Top Section */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm"
              style={{ boxShadow: `0 0 40px ${project.color}20` }}
            >
              <Icon size={28} style={{ color: project.color }} />
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[0.625rem] uppercase tracking-wider font-['Space_Grotesk'] bg-white/10 text-white border border-white/10">
                Featured
              </span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[0.625rem] uppercase tracking-[0.3em] text-[#919191] font-['Space_Grotesk']">
              {project.subtitle}
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-white leading-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-[#c6c6c6] text-base md:text-lg leading-relaxed max-w-xl">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 rounded-full text-xs font-medium font-['Space_Grotesk'] bg-white/5 text-[#c6c6c6] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Metric */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[0.625rem] uppercase tracking-[0.2em] text-[#919191] font-['Space_Grotesk'] mb-2">
                {project.metricLabel}
              </p>
              <p className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-white tracking-tight">
                {project.metric}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300">
                <Github size={16} />
                <span className="font-['Space_Grotesk']">View Code</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:shadow-lg hover:shadow-white/20 transition-all duration-300">
                <ExternalLink size={16} />
                <span className="font-['Space_Grotesk']">Live Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Lines Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-1/4 left-0 w-full h-px bg-white" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-white" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-white" />
      </div>
    </motion.a>
  )
}

// Regular Project Card Component
const ProjectCard = ({ project, isHovered }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Icon = project.icon

  return (
    <motion.a
      href={project.link}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative block h-full min-h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a]/60 backdrop-blur-sm transition-all duration-500 group hover:border-white/20"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Ambient Glow */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ backgroundColor: project.color }}
      />

      {/* Content */}
      <div className="relative h-full p-6 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
        {/* Top */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5"
              style={{ boxShadow: `0 0 30px ${project.color}15` }}
            >
              <Icon size={22} style={{ color: project.color }} />
            </div>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white group-hover:text-black">
              <ArrowUpRight size={14} />
            </div>
          </div>

          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.25em] text-[#919191] font-['Space_Grotesk'] mb-1">
              {project.subtitle}
            </p>
            <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white leading-tight group-hover:text-white/90 transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-[#c6c6c6] text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech}
                className="px-2.5 py-1 rounded-full text-[0.65rem] font-medium font-['Space_Grotesk'] bg-white/5 text-[#919191] border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-[0.6rem] uppercase tracking-[0.15em] text-[#919191] font-['Space_Grotesk']">
              {project.metric}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border border-white/20" />
      </div>
    </motion.a>
  )
}

export default Projects
