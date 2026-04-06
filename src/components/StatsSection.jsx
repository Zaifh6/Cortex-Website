import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Eye, FolderKanban, Clock } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    { 
      value: '750k', 
      label: 'Views',
      subtext: 'Organic reach',
      icon: Eye,
      color: '#ffffff',
      gradient: 'from-white via-[#c6c6c6] to-[#919191]'
    },
    { 
      value: '100+', 
      label: 'Projects',
      subtext: 'Delivered',
      icon: FolderKanban,
      color: '#c6c6c6',
      gradient: 'from-[#c6c6c6] via-[#919191] to-[#474747]'
    },
    { 
      value: '5+', 
      label: 'Years',
      subtext: 'Experience',
      icon: Clock,
      color: '#919191',
      gradient: 'from-[#919191] via-[#474747] to-[#353534]'
    },
  ]

  return (
    <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex flex-col md:flex-row gap-3 md:gap-4 pointer-events-auto z-20">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: 1.2 + index * 0.15, 
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <StatCard stat={stat} />
        </motion.div>
      ))}
    </div>
  )
}

const StatCard = ({ stat }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 100 })
  
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
    setIsHovered(false)
  }

  const Icon = stat.icon

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-[140px] md:w-[160px] h-[100px] md:h-[110px] rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a]/60 backdrop-blur-md transition-all duration-300 hover:border-white/20 group cursor-default"
    >
      {/* Ambient Glow */}
      <div 
        className="absolute -top-10 -right-10 w-20 h-20 rounded-full blur-[40px] transition-opacity duration-300"
        style={{ 
          backgroundColor: stat.color,
          opacity: isHovered ? 0.2 : 0.08
        }}
      />

      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5`} />
      </div>

      {/* Content */}
      <div className="relative h-full p-4 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
        {/* Top Row - Icon & Label */}
        <div className="flex items-center justify-between">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/10"
            style={{ 
              backgroundColor: `${stat.color}10`,
              boxShadow: `0 0 15px ${stat.color}10`
            }}
          >
            <Icon size={14} style={{ color: stat.color }} />
          </div>
          <span className="text-[0.6rem] uppercase tracking-wider text-[#919191] font-['Space_Grotesk']">
            {stat.subtext}
          </span>
        </div>

        {/* Bottom Row - Value & Label */}
        <div>
          <div className={`text-2xl md:text-3xl font-bold font-['Space_Grotesk'] bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent tracking-tight`}>
            {stat.value}
          </div>
          <div className="text-[0.7rem] text-[#919191] font-['Space_Grotesk'] uppercase tracking-wider">
            {stat.label}
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div 
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${stat.gradient} transition-all duration-300 rounded-b-2xl`}
        style={{ width: isHovered ? '100%' : '30%' }}
      />

      {/* Corner Glow */}
      <div 
        className="absolute top-0 right-0 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity"
        style={{
          background: `radial-gradient(circle at top right, ${stat.color}20, transparent 70%)`
        }}
      />
    </motion.div>
  )
}

export default StatsSection
