import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Check, X, Sparkles, Zap, Crown, ArrowRight, Shield, Clock, Users, Code } from 'lucide-react'

const Pricing = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isYearly, setIsYearly] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState(null)

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      icon: Zap,
      color: '#c6c6c6',
      monthlyPrice: 500,
      yearlyPrice: 400,
      description: 'Perfect for businesses ready to automate their first workflow.',
      features: [
        { text: '1 custom automation workflow', included: true },
        { text: 'n8n or Make.com setup', included: true },
        { text: '1 tool integration', included: true },
        { text: '2 revision rounds / month', included: true },
        { text: 'Email support (48h)', included: true },
        { text: 'AI agents / chatbots', included: false },
        { text: 'Monthly strategy call', included: false },
        { text: 'Dedicated engineer', included: false },
      ],
      popular: false,
      badge: null
    },
    {
      id: 'pro',
      name: 'Professional',
      icon: Sparkles,
      color: '#ffffff',
      monthlyPrice: 900,
      yearlyPrice: 750,
      description: 'For scaling teams needing multiple automations & AI agents.',
      features: [
        { text: 'Up to 3 automation workflows', included: true },
        { text: 'AI chatbot or agent integration', included: true },
        { text: 'Up to 4 tool integrations', included: true },
        { text: '5 revision rounds / month', included: true },
        { text: 'Priority support (24h)', included: true },
        { text: 'Monthly strategy call (30m)', included: true },
        { text: 'Custom API development', included: false },
        { text: 'Dedicated engineer', included: false },
      ],
      popular: true,
      badge: 'Most Popular'
    },
    {
      id: 'scale',
      name: 'Enterprise',
      icon: Crown,
      color: '#a0a0a0',
      monthlyPrice: 1800,
      yearlyPrice: 1500,
      description: 'Full-stack partner with dedicated engineering support.',
      features: [
        { text: 'Unlimited automation workflows', included: true },
        { text: 'Full AI agent & chatbot suite', included: true },
        { text: 'Unlimited integrations', included: true },
        { text: 'Unlimited revisions', included: true },
        { text: 'Dedicated automation engineer', included: true },
        { text: 'Weekly strategy calls (60m)', included: true },
        { text: 'Custom API & data pipelines', included: true },
        { text: '24/7 priority support', included: true },
      ],
      popular: false,
      badge: 'Best Value'
    }
  ]

  const trustBadges = [
    { icon: Shield, label: 'SOC 2 Compliant' },
    { icon: Clock, label: '48h Setup Guarantee' },
    { icon: Users, label: '100+ Active Clients' },
    { icon: Code, label: 'Source Code Included' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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
      id="pricing" 
      ref={ref} 
      className="relative min-h-screen bg-[#131313] text-[#e5e2e1] overflow-hidden font-['Manrope'] selection:bg-white/30 selection:text-white py-24 md:py-32"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-l from-white/[0.02] to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-r from-white/[0.02] to-transparent rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[80px] transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-[20%] top-0 w-px h-full bg-white" />
        <div className="absolute left-[50%] top-0 w-px h-full bg-white" />
        <div className="absolute left-[80%] top-0 w-px h-full bg-white" />
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
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
            <span className="text-[0.6875rem] uppercase tracking-[0.4em] text-[#919191] font-['Space_Grotesk']">
              Simple, Transparent Pricing
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-[2.5rem] md:text-[4rem] leading-[1.05] font-bold tracking-[-0.03em] font-['Space_Grotesk'] mb-6"
          >
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Choose your plan
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-[#919191] text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Start building within 48 hours. No hidden fees, no lock-ins. 
            Scale up or down anytime.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-4"
          >
            <span className={`text-sm font-medium font-['Space_Grotesk'] transition-colors ${!isYearly ? 'text-white' : 'text-[#919191]'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 rounded-full bg-white/10 border border-white/20 p-1 transition-colors hover:border-white/40"
            >
              <motion.div
                className="w-6 h-6 rounded-full bg-white shadow-lg"
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-medium font-['Space_Grotesk'] transition-colors ${isYearly ? 'text-white' : 'text-[#919191]'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="px-3 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] text-xs font-medium font-['Space_Grotesk']">
                Save 20%
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <PricingCard 
                plan={plan} 
                isYearly={isYearly}
                isHovered={hoveredPlan === plan.id}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 md:mt-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon
              return (
                <div 
                  key={index}
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
                >
                  <Icon size={20} className="text-white/60" />
                  <span className="text-sm font-medium font-['Space_Grotesk'] text-white/80">
                    {badge.label}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Custom Solution CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-[#919191] text-sm">
            Need something custom?{' '}
            <a href="#contact" className="text-white hover:text-white/80 underline underline-offset-4 transition-colors font-medium">
              Let's talk about your specific requirements
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

const PricingCard = ({ plan, isYearly, isHovered }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 100 })
  
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

  const Icon = plan.icon
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
  const yearlyTotal = plan.yearlyPrice * 12

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-full rounded-3xl overflow-hidden border transition-all duration-500 ${
        plan.popular 
          ? 'border-white/30 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-2xl shadow-white/5' 
          : 'border-white/10 bg-[#1a1a1a]/60 hover:border-white/20'
      }`}
    >
      {/* Popular Badge */}
      {plan.badge && (
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <div className="px-4 py-1.5 bg-white text-black text-xs font-bold font-['Space_Grotesk'] tracking-wider uppercase rounded-b-xl">
            {plan.badge}
          </div>
        </div>
      )}

      {/* Glow Effect */}
      <div 
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-[100px] opacity-10 transition-opacity duration-500"
        style={{ 
          backgroundColor: plan.color,
          opacity: isHovered ? 0.25 : 0.1
        }}
      />

      {/* Content */}
      <div className="relative p-8 md:p-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
        {/* Icon & Name */}
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10"
            style={{ 
              backgroundColor: `${plan.color}15`,
              boxShadow: `0 0 40px ${plan.color}20`
            }}
          >
            <Icon size={26} style={{ color: plan.color }} />
          </div>
          <div>
            <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white">
              {plan.name}
            </h3>
            <p className="text-[0.7rem] uppercase tracking-wider text-[#919191] font-['Space_Grotesk']">
              {plan.popular ? 'Recommended' : 'Great for starters'}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] text-white tracking-tight">
              ${price}
            </span>
            <span className="text-[#919191] text-sm font-['Space_Grotesk']">/mo</span>
          </div>
          {isYearly && (
            <p className="text-[#10b981] text-sm mt-1 font-medium">
              ${yearlyTotal.toLocaleString()}/year (save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year)
            </p>
          )}
          <p className="text-[#919191] text-sm mt-3 leading-relaxed">
            {plan.description}
          </p>
        </div>

        {/* CTA Button */}
        <a 
          href="#contact"
          className={`w-full py-4 rounded-xl font-bold font-['Space_Grotesk'] text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group/btn mb-8 ${
            plan.popular
              ? 'bg-white text-black hover:shadow-lg hover:shadow-white/20'
              : 'border border-white/20 text-white hover:bg-white hover:text-black'
          }`}
        >
          Get Started
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </a>

        {/* Features */}
        <div className="flex-grow space-y-3">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#919191] font-['Space_Grotesk'] mb-4">
            What's included
          </p>
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                feature.included 
                  ? 'bg-white/10 text-white' 
                  : 'bg-white/5 text-[#474747]'
              }`}>
                {feature.included ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
              </div>
              <span className={`text-sm ${feature.included ? 'text-[#e5e2e1]' : 'text-[#474747]'}`}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        style={{ opacity: plan.popular ? 1 : 0 }}
      />
    </motion.div>
  )
}

export default Pricing
