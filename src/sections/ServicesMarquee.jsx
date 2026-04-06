import { Fragment } from 'react'

const services = [
  'Agents',
  'Web Development',
  'CRM & GHL Systems',
  'API & Integration',
  'Data Pipelines',
  'Cloud & DevOps',
  'Workflow Automation',
]

const Segment = ({ copyKey }) => (
  <div
    className="flex shrink-0 items-center gap-8 md:gap-10 lg:gap-12"
    aria-hidden={copyKey !== 0 ? true : undefined}
  >
    {services.map((label, i) => (
      <Fragment key={`${copyKey}-${i}-${label}`}>
        <span className="whitespace-nowrap text-base font-medium tracking-tight text-white/55 transition-colors duration-300 ease-out hover:text-white md:text-lg">
          {label}
        </span>
        <span className="select-none text-[0.65rem] leading-none text-white/28 md:text-sm" aria-hidden>
          •
        </span>
      </Fragment>
    ))}
  </div>
)

const ServicesMarquee = () => {
  return (
    <section
      aria-label="Services"
      className="relative bg-transparent py-0 overflow-hidden"
    >
      <div className="mx-auto w-full relative">
        <div className="group/pill relative overflow-hidden py-2 px-0">
          
          {/* Curve / Horizon Line - Compact Deep Neon White */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-32 w-[160%] -translate-x-1/2 -translate-y-[70%] rounded-[100%] border-t-[3px] border-white/90 opacity-100 [transform:translateX(-50%)_translateY(-50%)_perspective(500px)_rotateX(60deg)] shadow-[0_20px_50px_-10px_rgba(255,255,255,0.5)]"
          />
          
          {/* Secondary Soft Glow Curve */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-40 w-[165%] -translate-x-1/2 -translate-y-[72%] rounded-[100%] border-t-[1px] border-white/20 blur-[3px] [transform:translateX(-50%)_translateY(-50%)_perspective(500px)_rotateX(60deg)]"
          />

          {/* White neon ambient glow - CONCENTRATED CENTRALLY under horizon */}
          <div className="absolute left-1/2 top-[65%] -translate-x-1/2 w-[50%] h-32 bg-gradient-to-b from-white/30 via-white/[0.08] to-transparent blur-[45px] z-0 rounded-[100%]" />

          {/* Minimal left/right fades for better edge-to-edge coverage */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[10] w-32 bg-gradient-to-r from-[#131313] via-[#131313]/80 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[10] w-32 bg-gradient-to-l from-[#131313] via-[#131313]/80 to-transparent"
            aria-hidden
          />

          <div className="relative z-[5] overflow-hidden pt-6 pb-8 [perspective:1000px]">
            {/* Tilted Marquee Container */}
            <div 
              className="flex w-max items-center animate-services-pill-marquee group-hover/pill:[animation-play-state:paused]"
              style={{
                transform: 'rotateX(15deg) translateY(12px)',
                transformStyle: 'preserve-3d'
              }}
            >
              <Segment copyKey={0} />
              <Segment copyKey={1} />
              <Segment copyKey={2} />
              <Segment copyKey={3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesMarquee
