import { motion } from 'framer-motion'
import {
  Layers,
  FlaskConical,
  Droplets,
  Cpu,
  Clock,
  Shield,
  BookOpen,
  Database,
  FileStack,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { MODULE_STATS, type ModuleKey } from '../../data/moduleStats'

const MODULE_KEYS: ModuleKey[] = [
  'fabrication',
  'synthesis',
  'separation',
  'stability',
  'fouling',
  'simulation',
]

const ICONS = [Layers, FlaskConical, Droplets, Clock, Shield, Cpu]

export function OverviewSection({ onGoScreening }: { onGoScreening: (module: ModuleKey) => void }) {
  const { t } = useTranslation()

  const statsByKey = Object.fromEntries(MODULE_STATS.map((s) => [s.key, s]))

  return (
    <section className="snap-section bg-gradient-to-b from-[#eef6fc] to-white dark:from-slate-950 dark:to-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-2">
            {t('overview.badge')}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            {t('overview.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-3xl mx-auto">{t('overview.subtitle')}</p>
        </header>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {MODULE_KEYS.map((key, i) => {
            const Icon = ICONS[i]
            const stat = statsByKey[key]
            return (
              <motion.button
                key={key}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => onGoScreening(key)}
                className="glass-panel rounded-xl p-6 text-left hover:border-brand-500/40 hover:shadow-lg transition-all group flex flex-col h-full"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-brand-50 dark:bg-brand-500/15 text-brand-600 dark:text-brand-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {t(`overview.modules.${key}`)}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1 mb-5">
                  {t(`overview.descriptions.${key}`)}
                </p>

                {stat && (
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-200/80 dark:border-slate-700/80">
                    <StatChip
                      icon={Database}
                      value={stat.entries}
                      label={t('overview.statEntries')}
                    />
                    <StatChip
                      icon={BookOpen}
                      value={stat.literature}
                      label={t('overview.statLiterature')}
                    />
                    <StatChip
                      icon={FileStack}
                      value={stat.fields}
                      label={t('overview.statFields')}
                    />
                  </div>
                )}

                <span className="text-xs text-brand-600 dark:text-brand-400 mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t('overview.enter')} →
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function StatChip({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Database
  value: number
  label: string
}) {
  return (
    <div className="text-center">
      <Icon className="w-3.5 h-3.5 mx-auto text-brand-500/70 mb-1" />
      <p className="text-base font-bold text-navy-900 dark:text-white tabular-nums">
        {value.toLocaleString()}
      </p>
      <p className="text-[9px] text-slate-500 leading-tight">{label}</p>
    </div>
  )
}
