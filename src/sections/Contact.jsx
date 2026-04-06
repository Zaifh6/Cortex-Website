import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  Mail, Send, Check, Linkedin, ArrowRight, Globe, 
  MessageSquare, Clock, Shield, MapPin, ExternalLink 
} from 'lucide-react'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const contactLinks = [
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      value: 'linkedin.com/company/ailogix321', 
      href: 'https://linkedin.com/company/ailogix321',
      color: '#c6c6c6'
    },
    { 
      icon: Mail, 
      label: 'Inquiries', 
      value: 'inquiries@cortex.ae.org', 
      href: 'mailto:inquiries@cortex.ae.org',
      color: '#a0a0a0'
    },
    { 
      icon: Mail, 
      label: 'Careers', 
      value: 'careers@cortex.ae.org', 
      href: 'mailto:careers@cortex.ae.org',
      color: '#919191'
    },
    { 
      icon: Globe, 
      label: 'Location', 
      value: 'Remote · Worldwide', 
      href: '#',
      color: '#474747'
    },
  ]

  const trustBadges = [
    { icon: Shield, label: 'SECP Verified' },
    { icon: Check, label: 'PSEB Registered' },
    { icon: Clock, label: '24h Response' },
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((res) => setTimeout(res, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 4000)
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen bg-[#131313] text-[#e5e2e1] overflow-hidden font-['Manrope'] selection:bg-white/30 selection:text-white py-24 md:py-32 flex items-center"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[100px]" />
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute left-[20%] top-0 w-px h-full bg-white" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-white" />
        <div className="absolute left-[80%] top-0 w-px h-full bg-white" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/30" />
            <MessageSquare size={16} className="text-white/40" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/30" />
          </motion.div>
          
          <motion.span 
            variants={itemVariants}
            className="block text-[0.6875rem] uppercase tracking-[0.4em] text-[#919191] font-['Space_Grotesk'] mb-4"
          >
            Get In Touch
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            className="text-[2.5rem] md:text-[4rem] leading-[1.05] font-bold tracking-[-0.03em] font-['Space_Grotesk']"
          >
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Let's Build
            </span>
            <br />
            <span className="bg-gradient-to-b from-white/80 via-white/60 to-white/40 bg-clip-text text-transparent italic">
              Together
            </span>
          </motion.h2>
        </motion.div>

        {/* Main Contact Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <ContactCard isInView={isInView}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              
              {/* Left Side - Contact Info */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-white mb-4">
                    Start a conversation
                  </h3>
                  <p className="text-[#919191] text-base leading-relaxed max-w-md">
                    Ready to automate your operations, scale your pipelines, or deploy AI in your business? 
                    We'd love to hear about your challenge.
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-3">
                  {trustBadges.map((badge, i) => {
                    const Icon = badge.icon
                    return (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                      >
                        <Icon size={14} className="text-[#10b981]" />
                        <span className="text-white text-sm font-medium font-['Space_Grotesk']">
                          {badge.label}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Contact Links */}
                <div className="space-y-3">
                  {contactLinks.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <motion.a 
                        key={i} 
                        href={item.href} 
                        className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                        whileHover={{ x: 4 }}
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 flex-shrink-0"
                          style={{ 
                            backgroundColor: `${item.color}10`,
                            boxShadow: `0 0 20px ${item.color}08`
                          }}
                        >
                          <Icon size={20} style={{ color: item.color }} />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="text-[0.65rem] uppercase tracking-wider text-[#919191] font-['Space_Grotesk'] mb-0.5">
                            {item.label}
                          </div>
                          <div className="text-white font-medium truncate font-['Space_Grotesk']">
                            {item.value}
                          </div>
                        </div>
                        <ExternalLink size={16} className="text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0" />
                      </motion.a>
                    )
                  })}
                </div>

                {/* Response Time */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <Clock size={18} className="text-[#919191]" />
                  <span className="text-[#919191] text-sm">
                    Average response time: <span className="text-white font-medium">Under 2 hours</span>
                  </span>
                </div>
              </motion.div>

              {/* Right Side - Form */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] text-white mb-2">
                    Send a message
                  </h3>
                  <p className="text-[#919191] text-sm">
                    Fill in the form below. We'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="relative">
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your Name" 
                      required 
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/[0.07] font-['Space_Grotesk']"
                    />
                    <div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-white/40 to-white/60 transition-all duration-300 rounded-b-xl"
                      style={{ width: focusedField === 'name' ? '100%' : '0%' }}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your Email" 
                      required 
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/[0.07] font-['Space_Grotesk']"
                    />
                    <div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-white/40 to-white/60 transition-all duration-300 rounded-b-xl"
                      style={{ width: focusedField === 'email' ? '100%' : '0%' }}
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="relative">
                    <textarea 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us about your project..." 
                      rows={4}
                      required 
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/[0.07] font-['Space_Grotesk'] resize-none"
                    />
                    <div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-white/40 to-white/60 transition-all duration-300 rounded-b-xl"
                      style={{ width: focusedField === 'message' ? '100%' : '0%' }}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white text-black rounded-xl font-bold font-['Space_Grotesk'] text-sm tracking-wider uppercase flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 disabled:opacity-50"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Check size={20} className="text-[#10b981]" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </motion.button>

                  {/* Success Message */}
                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0 }}
                        className="p-4 bg-[#10b981]/10 border border-[#10b981]/30 rounded-xl text-[#10b981] flex items-center gap-3 text-sm font-medium"
                      >
                        <Check size={18} /> 
                        Message sent successfully! We'll be in touch soon.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Form Benefits */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {['Free consultation', 'No commitment', 'Expert advice'].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#10b981]/20 flex items-center justify-center">
                        <Check size={12} className="text-[#10b981]" />
                      </div>
                      <span className="text-[#919191] text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </ContactCard>
        </motion.div>
      </div>
    </section>
  )
}

// 3D Tilt Card Component
const ContactCard = ({ children, isInView }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"])

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

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1a1a1a]/80 to-[#131313]/80 backdrop-blur-xl p-8 md:p-12 lg:p-16"
    >
      {/* Ambient Glow */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/[0.03] blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/[0.03] blur-[100px]" />

      {/* Grid Lines on Card */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-1/3 top-0 w-px h-full bg-white" />
        <div className="absolute left-2/3 top-0 w-px h-full bg-white" />
      </div>

      {/* Top Light Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Content */}
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

export default Contact