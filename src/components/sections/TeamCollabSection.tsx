import { useEffect, useRef, type RefObject } from 'react'
import { motion } from 'framer-motion'
import {
  Database, Brain, FileSearch, Activity, Droplets, Globe2,
  Mail, Github, FileText, Upload, Send,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { databaseStats } from '../../data/mockMembranes'
import { COLLAB_AREA_KEYS } from '../../data/collaborationPartners'
import { WorldMapNetwork } from '../ui/WorldMapNetwork'
import { TeamOrgChart } from '../team/TeamOrgChart'
import { DatasetSharingPlatform } from '../collab/DatasetSharingPlatform'

const CONTACT_EMAIL = 'cyj19859073718@163.com'
const AREA_ICONS = [Database, Brain, FileSearch, Activity, Droplets, Globe2]

const growthData = [
  { year: '2020', entries: 1200 },
  { year: '2021', entries: 2100 },
  { year: '2022', entries: 3400 },
  { year: '2023', entries: 4800 },
  { year: '2024', entries: 5200 },
  { year: '2025', entries: databaseStats.performanceEntries },
]

export type TeamCollabTab = 'team' | 'collab'

const ABOUT_TEAM_ANCHOR = 'about-team'
const ABOUT_COLLAB_ANCHOR = 'about-collab'

export function TeamCollabSection({
  tab,
  onTabSelect,
  onTabSync,
  scrollRootRef,
  suppressTabSyncRef,
}: {
  tab: TeamCollabTab
  onTabSelect: (tab: TeamCollabTab) => void
  onTabSync: (tab: TeamCollabTab) => void
  scrollRootRef: RefObject<HTMLElement | null>
  suppressTabSyncRef: RefObject<boolean>
}) {
  const { t } = useTranslation()
  const caps = ['curation', 'extraction', 'ai', 'kg', 'framework'] as const
  const keywordsRaw = t('team.keywords', { returnObjects: true })
  const keywordList = Array.isArray(keywordsRaw) ? (keywordsRaw as string[]) : []
  const collabAnchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = scrollRootRef.current
    const collabEl = collabAnchorRef.current
    if (!root || !collabEl) return

    let ticking = false
    const syncFromScroll = () => {
      ticking = false
      if (suppressTabSyncRef.current) return
      const rootRect = root.getBoundingClientRect()
      const collabRect = collabEl.getBoundingClientRect()
      const switchLine = rootRect.top + 96
      onTabSync(collabRect.top <= switchLine ? 'collab' : 'team')
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(syncFromScroll)
      }
    }

    root.addEventListener('scroll', onScroll, { passive: true })
    syncFromScroll()
    return () => root.removeEventListener('scroll', onScroll)
  }, [scrollRootRef, suppressTabSyncRef, onTabSync])

  return (
    <section id="team-collab-section" className="snap-section bg-white dark:bg-slate-950 py-16 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <header className="sticky top-0 z-20 -mx-2 px-2 py-3 mb-8 flex flex-col items-center bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800/70">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{t('nav.about')}</h2>
          <div
            className="mt-5 flex rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden text-sm shadow-sm"
            role="tablist"
            aria-label={t('nav.about')}
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'team'}
              aria-controls={ABOUT_TEAM_ANCHOR}
              onClick={() => onTabSelect('team')}
              className={`min-w-[7rem] px-6 py-2.5 font-medium transition-colors ${
                tab === 'team'
                  ? 'bg-brand-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {t('nav.team')}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'collab'}
              aria-controls={ABOUT_COLLAB_ANCHOR}
              onClick={() => onTabSelect('collab')}
              className={`min-w-[7rem] px-6 py-2.5 font-medium transition-colors border-l border-slate-200 dark:border-slate-700 ${
                tab === 'collab'
                  ? 'bg-brand-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {t('nav.collab')}
            </button>
          </div>
        </header>

        <div id={ABOUT_TEAM_ANCHOR} role="tabpanel" className="scroll-mt-28">
          <TeamPanel caps={caps} keywordList={keywordList} />
        </div>

        <div
          ref={collabAnchorRef}
          id={ABOUT_COLLAB_ANCHOR}
          role="tabpanel"
          className="scroll-mt-28 pt-12 mt-12 border-t border-slate-200/80 dark:border-slate-800"
        >
          <CollabPanel />
        </div>
      </div>
    </section>
  )
}

function TeamPanel({
  caps,
  keywordList,
}: {
  caps: readonly ['curation', 'extraction', 'ai', 'kg', 'framework']
  keywordList: string[]
}) {
  const { t } = useTranslation()

  return (
    <>
      <div className="mb-12 flex justify-center overflow-x-auto scrollbar-hidden px-2">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="whitespace-nowrap text-base sm:text-lg md:text-xl leading-none tracking-tight text-center text-slate-700 dark:text-slate-300 italic"
        >
          {t('team.mission')}
        </motion.p>
      </div>
      <div className="mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-500/10 via-transparent to-brand-500/10 py-8 px-4">
        <p className="text-center text-xs uppercase tracking-widest text-slate-500 mb-4">{t('team.directions')}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {keywordList.map((kw) => (
            <span key={kw} className="px-4 py-2 rounded-full text-sm border border-brand-500/30 text-brand-700 dark:text-brand-300 bg-brand-500/5">
              {kw}
            </span>
          ))}
        </div>
      </div>
      <div className="mb-12 text-center">
        <h3 className="text-lg font-semibold mb-4">{t('team.capabilities')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {caps.map((c) => (
            <div className="glass-panel rounded-lg p-3 text-xs text-center" key={c}>
              {t(`team.caps.${c}`)}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-12 text-center">
        <h3 className="text-lg font-semibold mb-4">{t('team.members')}</h3>
        <TeamOrgChart />
      </div>
      <h3 className="text-lg font-semibold mb-4 text-center">{t('team.impact')}</h3>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {[
          { label: t('home.stats.literature'), v: databaseStats.literatureCount },
          { label: t('home.stats.materials'), v: databaseStats.materialCount },
          { label: t('home.stats.systems'), v: databaseStats.testSystems },
          { label: t('home.stats.entries'), v: databaseStats.performanceEntries },
        ].map((item) => (
          <div key={item.label} className="glass-panel rounded-lg p-4 text-center">
            <p className="text-2xl font-mono font-bold text-brand-600">{item.v.toLocaleString()}</p>
            <p className="text-xs text-slate-500">{item.label}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-500 mb-2 text-center">{t('team.growth')}</p>
      <div className="glass-panel rounded-xl p-4 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={growthData}>
            <defs>
              <linearGradient id="growthAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.06} />
              </linearGradient>
            </defs>
            <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} tickLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #bfdbfe',
                backgroundColor: 'rgba(255,255,255,0.96)',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#1e3a5f', fontWeight: 600 }}
              itemStyle={{ color: '#2563eb' }}
            />
            <Area
              type="monotone"
              dataKey="entries"
              stroke="#2563eb"
              strokeWidth={2}
              fill="url(#growthAreaFill)"
              dot={{ r: 3, fill: '#2563eb', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

function CollabPanel() {
  const { t, i18n } = useTranslation()
  const subtitleSep = i18n.language.startsWith('zh') ? '，' : ' '

  return (
    <>
      <div className="mb-12 flex justify-center overflow-x-auto scrollbar-hidden px-2">
        <p className="whitespace-nowrap text-lg sm:text-xl md:text-2xl leading-none tracking-tight text-slate-700 dark:text-slate-200">
          <span className="font-semibold">{t('collab.subtitleLead')}</span>
          <span className="text-slate-500 dark:text-slate-400">{subtitleSep}</span>
          <span className="font-bold bg-gradient-to-r from-brand-600 via-cyan-600 to-brand-700 dark:from-brand-300 dark:via-cyan-300 dark:to-brand-400 bg-clip-text text-transparent">
            {t('collab.subtitleAccent')}
          </span>
        </p>
      </div>
      <div className="mb-14 text-center">
        <h3 className="text-lg font-semibold mb-5">{t('collab.areasTitle')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLLAB_AREA_KEYS.map((key, i) => {
            const Icon = AREA_ICONS[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel rounded-xl p-5"
              >
                <Icon className="w-7 h-7 text-brand-500 mb-3" />
                <h4 className="font-semibold">{t(`collab.areas.${key}`)}</h4>
                <p className="text-xs text-slate-500 mt-2">{t(`collab.areasDesc.${key}`)}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
      <DatasetSharingPlatform />
      <div className="mb-14 -mx-6 md:mx-0 text-center">
        <h3 className="text-xl md:text-2xl font-semibold mb-2 px-6 md:px-0">{t('collab.networkTitle')}</h3>
        <p className="text-sm text-slate-500 mb-4 px-6 md:px-0">{t('collab.networkSubtitle')}</p>
        <WorldMapNetwork />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-5">{t('collab.contactTitle')}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-xl p-6 space-y-4">
            <ContactRow icon={Mail} label={t('collab.email')} href={`mailto:${CONTACT_EMAIL}`} value={CONTACT_EMAIL} />
            <ContactRow icon={Github} label="GitHub" href="https://github.com/membraneinsight-water" value="membraneinsight-water" />
            <ContactRow icon={FileText} label={t('collab.papers')} href="https://doi.org" value={t('collab.papersLink')} />
            <ContactRow icon={Upload} label={t('collab.dataUpload')} href="#upload" value={t('collab.uploadHint')} />
          </div>
          <div className="glass-panel rounded-xl p-6">
            <h4 className="font-semibold text-lg mb-2">{t('collab.contributeTitle')}</h4>
            <p className="text-sm text-slate-500 mb-6">{t('collab.contributeDesc')}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t('collab.contributeSubject'))}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm"
            >
              <Send className="w-4 h-4" />
              {t('collab.contributeBtn')}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

function ContactRow({ icon: Icon, label, href, value }: { icon: typeof Mail; label: string; href: string; value: string }) {
  return (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-start gap-3 group">
      <div className="p-2 rounded-lg bg-brand-500/10 text-brand-600">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium group-hover:text-brand-600">{value}</p>
      </div>
    </a>
  )
}
