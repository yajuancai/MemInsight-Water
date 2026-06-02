import { motion } from 'framer-motion'
import {
  Database, Brain, FileSearch, Activity, Droplets, Globe2,
  Mail, Github, FileText, Upload, Send,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { COLLAB_AREA_KEYS } from '../../data/collaborationPartners'
import { TeamCollabToggle, type TeamCollabMode } from '../ui/TeamCollabToggle'
import { WorldMapNetwork } from '../ui/WorldMapNetwork'

const AREA_ICONS = [Database, Brain, FileSearch, Activity, Droplets, Globe2]

const CONTACT = {
  email: 'collab@membraneinsight-water.org',
  github: 'https://github.com/yajuancai/MemInsight-Water',
  papers: 'https://doi.org/search?q=membrane+database',
  upload: '#data-upload',
}

export function CollaborationSection({
  mode,
  onModeChange,
}: {
  mode: TeamCollabMode
  onModeChange: (m: TeamCollabMode) => void
}) {
  const { t } = useTranslation()

  return (
    <section className="snap-section min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <TeamCollabToggle mode={mode} onChange={onModeChange} className="mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center">
            {t('collab.title')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mt-2 max-w-2xl">
            {t('collab.subtitle')}
          </p>
        </div>

        {/* Part 1: Open collaboration areas */}
        <div className="mb-14">
          <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full" />
            {t('collab.areasTitle')}
          </h3>
          <p className="text-sm text-slate-500 mb-5 ml-3">{t('collab.areasSubtitle')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLLAB_AREA_KEYS.map((key, i) => {
              const Icon = AREA_ICONS[i]
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-panel rounded-xl p-5 hover:border-brand-500/40 transition-colors group"
                >
                  <Icon className="w-7 h-7 text-brand-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {t(`collab.areas.${key}`)}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-2 leading-snug whitespace-nowrap overflow-hidden text-ellipsis">
                    {t(`collab.areasDesc.${key}`)}
                  </p>
                  <span className="inline-block mt-3 text-[10px] uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {t('collab.openForPartners')}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Part 2: Global network */}
        <div className="mb-14">
          <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full" />
            {t('collab.networkTitle')}
          </h3>
          <p className="text-sm text-slate-500 mb-5 ml-3">{t('collab.networkSubtitle')}</p>
          <WorldMapNetwork />
        </div>

        {/* Part 3: Contact & contribution */}
        <div>
          <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <span className="w-1 h-5 bg-brand-500 rounded-full" />
            {t('collab.contactTitle')}
          </h3>
          <p className="text-sm text-slate-500 mb-5 ml-3">{t('collab.contactSubtitle')}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-xl p-6 space-y-4">
              <ContactRow
                icon={Mail}
                label={t('collab.email')}
                href={`mailto:${CONTACT.email}`}
                value={CONTACT.email}
              />
              <ContactRow
                icon={Github}
                label="GitHub"
                href={CONTACT.github}
                value="yajuancai/MemInsight-Water"
              />
              <ContactRow
                icon={FileText}
                label={t('collab.papers')}
                href={CONTACT.papers}
                value={t('collab.papersLink')}
              />
              <ContactRow
                icon={Upload}
                label={t('collab.dataUpload')}
                href={CONTACT.upload}
                value={t('collab.uploadHint')}
              />
            </div>

            <div className="glass-panel rounded-xl p-6 flex flex-col justify-between border-brand-500/20">
              <div>
                <h4 className="font-semibold text-lg mb-2">{t('collab.contributeTitle')}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{t('collab.contributeDesc')}</p>
              </div>
              <div className="mt-6 space-y-3">
                <a
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(t('collab.contributeSubject'))}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {t('collab.contributeBtn')}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    window.alert(t('collab.uploadComingSoon'))
                  }}
                  className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {t('collab.uploadDataBtn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  icon: Icon,
  label,
  href,
  value,
}: {
  icon: typeof Mail
  label: string
  href: string
  value: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="flex items-start gap-3 group"
    >
      <div className="p-2 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 group-hover:bg-brand-500/20 transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
          {value}
        </p>
      </div>
    </a>
  )
}
