import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function MembraneWaterSchematic({ embedded = false }: { embedded?: boolean }) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`relative w-full aspect-[5/4] min-h-[260px] max-h-[400px] overflow-hidden ${
        embedded
          ? 'rounded-xl bg-gradient-to-br from-sky-50/80 via-white to-brand-50/60 dark:from-slate-800/50 dark:via-slate-900 dark:to-brand-950/30'
          : 'rounded-2xl border border-brand-200/60 dark:border-brand-500/25 bg-gradient-to-br from-sky-50 via-white to-brand-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-brand-950/40 shadow-soft'
      }`}
      role="img"
      aria-label={t('home.schematicAria')}
    >
      <div className="absolute inset-0 opacity-[0.35] dark:opacity-20" aria-hidden>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="home-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                className="stroke-brand-300/40 dark:stroke-brand-500/20"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#home-grid)" />
        </svg>
      </div>

      <svg
        viewBox="0 0 500 400"
        className="relative z-[1] h-full w-full p-4 sm:p-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="feedWater" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#7dd3fc]" stopOpacity="0.55" />
            <stop offset="100%" className="[stop-color:#38bdf8]" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="permWater" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="[stop-color:#22d3ee]" stopOpacity="0.5" />
            <stop offset="100%" className="[stop-color:#06b6d4]" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="memLayer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="[stop-color:#2563eb]" />
            <stop offset="100%" className="[stop-color:#1d4ed8]" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-brand-500 dark:fill-brand-400" />
          </marker>
        </defs>

        {/* 进水区 */}
        <rect x="28" y="72" width="118" height="256" rx="12" fill="url(#feedWater)" className="dark:opacity-80" />
        <text x="87" y="58" textAnchor="middle" className="fill-brand-700 dark:fill-brand-300 text-[13px] font-semibold">
          {t('home.schematicFeed')}
        </text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={`ion-${i}`}
            cx={52 + (i % 3) * 28}
            cy={110 + Math.floor(i / 3) * 55}
            r={5 + (i % 2)}
            className="fill-amber-500/70 dark:fill-amber-400/60"
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={`part-${i}`}
            cx={70 + (i % 2) * 35}
            cy={200 + i * 38}
            r={7}
            className="fill-slate-400/50 dark:fill-slate-500/45"
          />
        ))}

        {/* 进水箭头 */}
        <path
          d="M 155 200 L 195 200"
          className="stroke-brand-500 dark:stroke-brand-400"
          strokeWidth="2.5"
          strokeLinecap="round"
          markerEnd="url(#arrow)"
        />

        {/* 膜层 */}
        <rect x="198" y="64" width="28" height="272" rx="6" fill="url(#memLayer)" filter="url(#softGlow)" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((row) =>
          [0, 1].map((col) => (
            <circle
              key={`pore-${row}-${col}`}
              cx={212 + col * 10}
              cy={92 + row * 30}
              r="4.5"
              className="fill-sky-100 dark:fill-slate-800"
            />
          )),
        )}
        <text x="212" y="358" textAnchor="middle" className="fill-brand-800 dark:fill-brand-200 text-[12px] font-medium">
          {t('home.schematicMembrane')}
        </text>

        {/* 透水 / 产水 */}
        <rect x="248" y="88" width="130" height="224" rx="12" fill="url(#permWater)" className="dark:opacity-70" />
        <text x="313" y="58" textAnchor="middle" className="fill-cyan-700 dark:fill-cyan-300 text-[13px] font-semibold">
          {t('home.schematicPermeate')}
        </text>
        <path
          d="M 268 140 Q 300 130 330 145 T 360 160"
          className="stroke-cyan-400/80 dark:stroke-cyan-300/70"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 268 200 Q 305 195 340 205 T 372 215"
          className="stroke-cyan-500/60 dark:stroke-cyan-400/50"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 268 260 Q 298 270 325 258 T 365 248"
          className="stroke-cyan-400/70"
          strokeWidth="2"
          fill="none"
        />

        {/* 浓水回流 */}
        <path
          d="M 212 340 Q 180 360 140 350"
          className="stroke-amber-600/50 dark:stroke-amber-400/40"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          fill="none"
        />
        <text x="165" y="378" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[11px]">
          {t('home.schematicReject')}
        </text>

        {/* 中空纤维束示意 */}
        <g transform="translate(390, 120)">
          <ellipse cx="48" cy="80" rx="52" ry="88" className="fill-brand-500/10 stroke-brand-400/40 dark:stroke-brand-400/30" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <circle
              key={`fiber-${i}`}
              cx={20 + (i % 5) * 14}
              cy={30 + Math.floor(i / 5) * 28}
              r="5"
              className="fill-white/90 stroke-brand-400/50 dark:fill-slate-700 dark:stroke-brand-400/40"
              strokeWidth="1"
            />
          ))}
          <text x="48" y="188" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 text-[10px]">
            {t('home.schematicFiber')}
          </text>
        </g>

        <path
          d="M 430 48 C 430 38 442 32 442 42 C 442 52 430 58 430 48 Z"
          className="fill-cyan-400/40 dark:fill-cyan-300/30"
        />
      </svg>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-4 z-[2]">
        {(['separation', 'structure', 'performance'] as const).map((tag) => (
          <span
            key={tag}
            className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 border border-brand-200/50 dark:border-brand-500/30 text-brand-700 dark:text-brand-300 font-medium"
          >
            {t(`home.schematicTags.${tag}`)}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
