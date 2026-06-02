import { motion } from 'framer-motion'
import { Bot, Sparkles, FileSearch, FlaskConical, Cpu } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const TOOL_KEYS = ['predict', 'recommend', 'extract', 'material'] as const
const ICONS = [Cpu, FlaskConical, FileSearch, Sparkles]

export function AISection() {
  const { t } = useTranslation()

  return (
    <section className="snap-section relative flex flex-col justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-brand-950 text-white py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#06b6d4_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        <header className="mb-10 text-center">
          <Bot className="w-12 h-12 mx-auto text-brand-400 mb-4" />
          <h2 className="text-2xl font-bold">{t('ai.title')}</h2>
          <p className="text-slate-400 mt-2">{t('ai.subtitle')}</p>
        </header>

        <div className="grid grid-cols-4 gap-2.5 mb-10 max-w-4xl mx-auto min-w-0">
          {TOOL_KEYS.map((key, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={key}
                whileHover={{ y: -3 }}
                className="min-w-0 rounded-lg border border-white/10 bg-white/5 px-2.5 py-3 backdrop-blur text-center"
              >
                <Icon className="w-6 h-6 text-brand-400 mb-1.5 mx-auto" />
                <h3 className="font-medium text-sm leading-snug">{t(`ai.tools.${key}`)}</h3>
                <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300">
                  {t('ai.comingSoon')}
                </span>
              </motion.div>
            )
          })}
        </div>

        <div className="rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-sm text-slate-400">
          <span className="text-brand-400">$ </span>
          {t('ai.demoPrompt')}
        </div>
      </div>
    </section>
  )
}
