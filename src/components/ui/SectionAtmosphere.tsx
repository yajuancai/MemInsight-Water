import { motion } from 'framer-motion'

export type SectionAtmosphereVariant = 'screening' | 'workspace'

export function SectionAtmosphere({ variant }: { variant: SectionAtmosphereVariant }) {
  const isWorkspace = variant === 'workspace'

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`absolute inset-0 ${
          isWorkspace
            ? 'bg-gradient-to-br from-slate-100 via-[#f0f6fc] to-[#e8f2fa] dark:from-slate-950 dark:via-slate-900 dark:to-[#0c1524]'
            : 'bg-gradient-to-br from-[#eef6fc] via-[#f4f9fd] to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'
        }`}
      />

      <motion.div
        className={`absolute inset-0 ${isWorkspace ? 'section-grid-bg-workspace' : 'section-grid-bg-screening'}`}
        animate={{ opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className={`absolute -top-28 -right-20 h-[22rem] w-[22rem] rounded-full blur-3xl ${
          isWorkspace
            ? 'bg-gradient-to-bl from-amber-300/20 via-brand-400/10 to-transparent dark:from-amber-500/10 dark:via-brand-500/8'
            : 'bg-gradient-to-bl from-brand-400/20 via-cyan-300/15 to-transparent dark:from-brand-500/15 dark:via-cyan-500/10'
        }`}
      />
      <div
        className={`absolute -bottom-24 -left-16 h-80 w-80 rounded-full blur-3xl ${
          isWorkspace ? 'bg-cyan-400/12 dark:bg-cyan-500/8' : 'bg-brand-300/15 dark:bg-brand-600/10'
        }`}
      />
      <div
        className={`absolute top-1/3 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl ${
          isWorkspace ? 'bg-brand-400/8 dark:bg-brand-500/6' : 'bg-cyan-300/10 dark:bg-cyan-500/8'
        }`}
      />

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500/25 to-transparent dark:via-brand-400/20" />
      <motion.div
        className={`absolute top-[18%] right-[8%] h-32 w-32 rounded-full border ${
          isWorkspace
            ? 'border-amber-400/20 dark:border-amber-500/15'
            : 'border-brand-400/25 dark:border-brand-500/20'
        }`}
        animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`absolute bottom-[22%] left-[6%] h-20 w-20 rounded-full border ${
          isWorkspace
            ? 'border-cyan-400/25 dark:border-cyan-500/20'
            : 'border-cyan-400/30 dark:border-cyan-500/25'
        }`}
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.14] dark:opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`section-dots-${variant}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" className="text-brand-500" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#section-dots-${variant})`} />
      </svg>
    </motion.div>
  )
}
