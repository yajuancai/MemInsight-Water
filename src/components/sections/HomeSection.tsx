import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronDown,
  Layers,
  Hexagon,
  BarChart3,
  BookOpen,
  Microscope,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { MembraneWaterSchematic } from '../home/MembraneWaterSchematic'
import { databaseStats } from '../../data/mockMembranes'
import { publicAsset } from '../../utils/publicAsset'

const HERO_IMAGE = publicAsset('home-hero-membrane.png')

const STAT_CONFIG = [
  { key: 'materials' as const, icon: Layers },
  { key: 'polymers' as const, icon: Hexagon },
  { key: 'entries' as const, icon: BarChart3 },
  { key: 'literature' as const, icon: BookOpen },
  { key: 'systems' as const, icon: Microscope },
]

const STAT_VALUES: Record<(typeof STAT_CONFIG)[number]['key'], number> = {
  materials: databaseStats.materialCount,
  polymers: databaseStats.polymerTypes,
  entries: databaseStats.performanceEntries,
  literature: databaseStats.literatureCount,
  systems: databaseStats.testSystems,
}

export function HomeSection({ onScrollDown }: { onScrollDown: () => void }) {
  const { t } = useTranslation()
  const [heroImageFailed, setHeroImageFailed] = useState(false)

  return (
    <section className="snap-section relative flex flex-col overflow-hidden bg-gradient-to-b from-slate-50 via-[#f4f9fd] to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl dark:bg-brand-500/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-32 -left-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col min-h-0">
        <motion.div
          className="flex-1 max-w-[1280px] w-full mx-auto px-6 lg:px-10 pt-10 lg:pt-12 pb-4 flex items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="grid w-full grid-cols-1 lg:grid-cols-[0.88fr_1.22fr] items-center gap-8 lg:gap-10">
            <motion.div
              className="flex flex-col justify-center py-2 lg:py-4"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300 mb-3">
                {t('home.eyebrow')}
              </p>
              <h1 className="text-3xl md:text-[2.35rem] font-bold text-navy-900 dark:text-white leading-tight tracking-tight">
                {t('home.title')}
              </h1>
              <p className="mt-2.5 text-sm md:text-[15px] text-slate-600 dark:text-slate-200 leading-relaxed">
                {t('home.subtitle')}
              </p>
              <p className="mt-5 text-sm md:text-[15px] text-slate-700 dark:text-slate-200/95 leading-[1.75] text-justify">
                {t('home.about')}
              </p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center min-h-[300px] sm:min-h-[380px] lg:min-h-[480px]"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              {heroImageFailed ? (
                <div className="w-full max-h-[560px] sm:max-h-[600px] lg:max-h-[660px]">
                  <MembraneWaterSchematic embedded />
                </div>
              ) : (
                <img
                  src={HERO_IMAGE}
                  alt={t('home.heroImageAlt')}
                  className="w-full h-auto max-h-[560px] sm:max-h-[600px] lg:max-h-[660px] object-contain object-center select-none rounded-2xl"
                  draggable={false}
                  fetchPriority="high"
                  onError={() => setHeroImageFailed(true)}
                />
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 mb-12 shrink-0"
        >
          <div className="rounded-xl border border-slate-200/70 dark:border-slate-600/50 bg-white/92 dark:bg-slate-900/92 shadow-soft px-4 py-4 md:px-6 md:py-5">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0">
              {STAT_CONFIG.map(({ key, icon: Icon }, i) => (
                <div
                  key={key}
                  className={`flex flex-col items-center text-center md:px-3 ${
                    i < STAT_CONFIG.length - 1 ? 'md:border-r md:border-slate-200/60 dark:md:border-slate-600/45' : ''
                  }`}
                >
                  <div className="mb-2 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-lg border border-slate-200/70 bg-white dark:border-slate-600/55 dark:bg-slate-800/80">
                    <Icon className="h-4 w-4 md:h-[18px] md:w-[18px] text-slate-600 dark:text-slate-300" strokeWidth={1.4} aria-hidden />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-navy-900 dark:text-white tabular-nums leading-none">
                    {STAT_VALUES[key].toLocaleString()}
                  </p>
                  <p className="mt-1.5 text-[11px] md:text-xs text-slate-600 dark:text-slate-300 leading-snug">
                    {t(`home.stats.${key}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={onScrollDown}
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-0.5 text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300 text-xs transition-colors"
      >
        <span>{t('home.scroll')}</span>
        <ChevronDown className="w-4 h-4" />
      </motion.button>
    </section>
  )
}
