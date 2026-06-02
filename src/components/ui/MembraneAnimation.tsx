import { motion } from 'framer-motion'

/** Animated membrane pores / molecular diffusion background */
export function MembraneAnimation() {
  const particles = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-40" aria-hidden>
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <circle
            key={i}
            cx={`${15 + (i % 4) * 22}%`}
            cy={`${25 + Math.floor(i / 4) * 25}%`}
            r={30 + (i % 3) * 15}
            fill="url(#glow)"
            className="animate-pulse-slow"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
        <motion.path
          d="M 0 50 Q 25 30 50 50 T 100 50"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="0.5"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          vectorEffect="non-scaling-stroke"
          style={{ transform: 'scale(10, 1)' }}
        />
      </svg>

      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-brand-400/60"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
          }}
          animate={{
            y: [0, -40 - (i % 5) * 10, 0],
            x: [0, (i % 2 === 0 ? 20 : -20), 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full border border-brand-500/20"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ rotate: { duration: 40, repeat: Infinity, ease: 'linear' }, scale: { duration: 6, repeat: Infinity } }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 rounded-full border border-dashed border-brand-400/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
