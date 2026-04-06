import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ProfileCardTestimonialCarousel } from '../components/ui/profile-card-testimonial-carousel'

const Team = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      },
    },
  }

  return (
    <section id="team" ref={ref} className="pt-32 pb-40 px-6 md:px-8 bg-transparent text-[#e5e2e1] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-24 relative"
        >
          {/* Architectural Grid Line */}
          <div className="absolute -left-8 top-0 grid-line-v h-full hidden md:block"></div>
          <div className="space-y-6">
            <motion.span variants={itemVariants} className="block text-[0.6875rem] uppercase tracking-[0.4em] text-[#919191] font-['Space_Grotesk']">
              The Automation Experts
            </motion.span>
            <motion.h2 
              variants={itemVariants} 
              className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-bold text-gradient-stitch tracking-[-0.02em] max-w-4xl font-['Space_Grotesk']"
            >
              Meet the engineering team scaling our vision and execution.
            </motion.h2>
          </div>
        </motion.div>

        {/* Carousel Component */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <ProfileCardTestimonialCarousel />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Team
