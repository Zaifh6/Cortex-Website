import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  Workflow, Brain, Database, ShoppingCart, Cloud, Shield, 
  BadgeCheck, Award, Zap, GitBranch, Layers, Server 
} from 'lucide-react'

// Organized by category for better UX
const stackCategories = [
  {
    id: 'orchestration',
    name: 'Orchestration',
    icon: Workflow,
    color: '#ffffff',
    tools: [
      { name: 'n8n', url: 'https://cdn.simpleicons.org/n8n/c6c6c6' },
      { name: 'Make', url: 'https://cdn.simpleicons.org/make/c6c6c6' },
      { name: 'Zapier', url: 'https://cdn.simpleicons.org/zapier/c6c6c6' },
    ]
  },
  {
    id: 'ai',
    name: 'AI & LLMs',
    icon: Brain,
    color: '#c6c6c6',
    tools: [
      { name: 'OpenAI', url: 'https://cdn.simpleicons.org/openai/c6c6c6' },
      { name: 'Anthropic', url: 'https://cdn.simpleicons.org/anthropic/c6c6c6' },
      { name: 'Groq', url: 'https://cdn.simpleicons.org/groq/c6c6c6' },
      { name: 'Pinecone', url: 'https://cdn.simpleicons.org/pinecone/c6c6c6' },
    ]
  },
  {
    id: 'crm',
    name: 'CRM & Operations',
    icon: Database,
    color: '#a0a0a0',
    tools: [
      { name: 'Monday', url: 'https://cdn.simpleicons.org/mondaydotcom/c6c6c6' },
      { name: 'ClickUp', url: 'https://cdn.simpleicons.org/clickup/c6c6c6' },
      { name: 'Airtable', url: 'https://cdn.simpleicons.org/airtable/c6c6c6' },
      { name: 'Notion', url: 'https://cdn.simpleicons.org/notion/c6c6c6' },
    ]
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: Zap,
    color: '#919191',
    tools: [
      { name: 'Slack', url: 'https://cdn.simpleicons.org/slack/c6c6c6' },
      { name: 'Telegram', url: 'https://cdn.simpleicons.org/telegram/c6c6c6' },
      { name: 'Gmail', url: 'https://cdn.simpleicons.org/gmail/c6c6c6' },
      { name: 'Discord', url: 'https://cdn.simpleicons.org/discord/c6c6c6' },
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    icon: ShoppingCart,
    color: '#474747',
    tools: [
      { name: 'Shopify', url: 'https://cdn.simpleicons.org/shopify/c6c6c6' },
      { name: 'Stripe', url: 'https://cdn.simpleicons.org/stripe/c6c6c6' },
      { name: 'WooCommerce', url: 'https://cdn.simpleicons.org/woocommerce/c6c6c6' },
    ]
  },
  {
    id: 'infrastructure',
    name: 'Cloud & Infra',
    icon: Cloud,
    color: '#353534',
    tools: [
      { name: 'AWS', url: 'https://cdn.simpleicons.org/amazonaws/c6c6c6' },
      { name: 'Cloudflare', url: 'https://cdn.simpleicons.org/cloudflare/c6c6c6' },
      { name: 'Vercel', url: 'https://cdn.simpleicons.org/vercel/c6c6c6' },
      { name: 'Docker', url: 'https://cdn.simpleicons.org/docker/c6c6c6' },
    ]
  },
]

const certifications = [
  {
    id: 'secp',
    title: 'SECP Registered',
    subtitle: 'Securities & Exchange Commission Pakistan',
    icon: BadgeCheck,
    color: '#c6c6c6',
    description: 'Fully registered corporate entity operating under Pakistan securities regulations.'
  },
  {
    id: 'pseb',
    title: 'PSEB Verified',
    subtitle: 'Pakistan Software Export Board',
    icon: Award,
    color: '#ffffff',
    description: 'Certified software export company with verified service delivery standards.'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const toolVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
}

const AutomationStack = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredCategory, setHoveredCategory] = useState(null)

  return (
    <section 
      id="stack"
      ref={ref} 
      className="relative min-h-screen bg-[#131313] text-[#e5e2e1] overflow-hidden font-['Manrope'] selection:bg-white/30 selection:text-white py-24 md:py-32"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[100px]" />
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute left-[25%] top-0 w-px h-full bg-white" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-white" />
        <div className="absolute left-[75%] top-0 w-px h-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/30" />
            <Layers size={16} className="text-white/40" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/30" />
          </motion.div>
          
          <motion.span 
            variants={itemVariants}
            className="block text-[0.6875rem] uppercase tracking-[0.4em] text-[#919191] font-['Space_Grotesk'] mb-4"
          >
            Integration Protocol
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            className="text-[2.5rem] md:text-[4rem] leading-[1.05] font-bold tracking-[-0.03em] font-['Space_Grotesk'] mb-6"
          >
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Automation Stack
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-[#919191] text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Enterprise-grade integrations with the tools you already use. 
            Seamlessly connect your entire workflow ecosystem.
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
        >
          {stackCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <CategoryCard 
                category={category} 
                isHovered={hoveredCategory === category.id}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {certifications.map((cert) => (
            <CertificationCard key={cert.id} cert={cert} />
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { value: '50+', label: 'Integrations' },
            { value: '99.9%', label: 'Uptime SLA' },
            { value: '<50ms', label: 'Avg Latency' },
            { value: 'SOC 2', label: 'Compliant' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-white mb-1">
                {stat.value}
              </div>
              <div className="text-[0.7rem] uppercase tracking-[0.2em] text-[#919191] font-['Space_Grotesk']">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const CategoryCard = ({ category, isHovered }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"])

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

  const CategoryIcon = category.icon

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a]/40 backdrop-blur-sm transition-all duration-500 hover:border-white/20 group"
    >
      {/* Glow Effect */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] transition-opacity duration-500"
        style={{ 
          backgroundColor: category.color,
          opacity: isHovered ? 0.15 : 0.05
        }}
      />

      {/* Content */}
      <div className="relative p-6" style={{ transform: "translateZ(20px)" }}>
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-5">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
            style={{ 
              backgroundColor: `${category.color}15`,
              boxShadow: `0 0 30px ${category.color}20`
            }}
          >
            <CategoryIcon size={20} style={{ color: category.color }} />
          </div>
          <div>
            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-white">
              {category.name}
            </h3>
            <p className="text-[0.65rem] uppercase tracking-wider text-[#919191] font-['Space_Grotesk']">
              {category.tools.length} integrations
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-4 gap-3">
          {category.tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              variants={toolVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
              className="group/tool relative"
            >
              <div className="aspect-square rounded-xl border border-white/10 bg-white/5 flex items-center justify-center p-2 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105">
                <img 
                  src={tool.url} 
                  alt={tool.name} 
                  className="w-full h-full object-contain opacity-60 group-hover/tool:opacity-100 transition-opacity" 
                />
              </div>
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[0.65rem] font-medium font-['Space_Grotesk'] rounded opacity-0 group-hover/tool:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {tool.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  )
}

const CertificationCard = ({ cert }) => {
  const CertIcon = cert.icon

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm p-6 md:p-8 group cursor-pointer"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

      <div className="relative flex items-start gap-5">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 flex-shrink-0"
          style={{ 
            backgroundColor: `${cert.color}10`,
            boxShadow: `0 0 40px ${cert.color}10`
          }}
        >
          <CertIcon size={26} style={{ color: cert.color }} />
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-lg font-bold font-['Space_Grotesk'] text-white">
              {cert.title}
            </h4>
            <Shield size={16} className="text-[#10b981]" />
          </div>
          <p className="text-[0.7rem] uppercase tracking-wider text-[#919191] font-['Space_Grotesk'] mb-2">
            {cert.subtitle}
          </p>
          <p className="text-sm text-[#c6c6c6] leading-relaxed">
            {cert.description}
          </p>
        </div>

        <div className="hidden md:flex flex-col items-end gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cert.color }} />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Bottom Gradient */}
      <div 
        className="absolute bottom-0 left-0 h-1 rounded-b-2xl transition-all duration-300 group-hover:w-full"
        style={{ 
          backgroundColor: cert.color,
          width: '30%'
        }}
      />
    </motion.div>
  )
}

export default AutomationStack
