import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { databaseStats } from '../../data/mockMembranes'
import { TeamCollabToggle, type TeamCollabMode } from '../ui/TeamCollabToggle'

const growthData = [
  { year: '2020', entries: 1200 },
  { year: '2021', entries: 2100 },
  { year: '2022', entries: 3400 },
  { year: '2023', entries: 4800 },
  { year: '2024', entries: 5200 },
  { year: '2025', entries: databaseStats.performanceEntries },
]

const members = [
  { role: 'PI', name: 'Prof. Membrane Lab', focus: 'NF/RO structure–performance', tags: ['IP', 'Characterization'] },
  { role: 'PhD', name: 'Researcher A', focus: 'Data curation & ML', tags: ['Database', 'AI prediction'] },
  { role: 'PhD', name: 'Researcher B', focus: 'Separation testing', tags: ['Performance', 'Fouling'] },
  { role: 'Collaborator', name: 'Partner Institute', focus: 'Knowledge graph', tags: ['KG', 'Literature mining'] },
]

export function TeamSection({
  mode,
  onModeChange,
}: {
  mode: TeamCollabMode
  onModeChange: (m: TeamCollabMode) => void
}) {
  const { t } = useTranslation()
  const caps = ['curation', 'extraction', 'ai', 'kg', 'framework'] as const
  const keywordsRaw = t('team.keywords', { returnObjects: true })
  const keywordList = Array.isArray(keywordsRaw) ? (keywordsRaw as string[]) : []

  return (
    <section className="snap-section bg-white dark:bg-slate-950 py-20 px-6 overflow-y-auto min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <TeamCollabToggle mode={mode} onChange={onModeChange} className="mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('team.pageTitle')}</h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-12 italic"
        >
          {t('team.mission')}
        </motion.p>

        <div className="mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-500/10 via-transparent to-brand-500/10 py-8 px-4">
          <p className="text-center text-xs uppercase tracking-widest text-slate-500 mb-4">{t('team.directions')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {keywordList.map((kw) => (
              <span
                key={kw}
                className="px-4 py-2 rounded-full text-sm border border-brand-500/30 text-brand-700 dark:text-brand-300 bg-brand-500/5"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4">{t('team.capabilities')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12">
          {caps.map((c) => (
            <div key={c} className="glass-panel rounded-lg p-3 text-xs text-center">
              {t(`team.caps.${c}`)}
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-4">{t('team.members')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {members.map((m) => (
            <div key={m.name} className="glass-panel rounded-xl p-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 mb-3 flex items-center justify-center text-white font-bold text-lg">
                {m.name[0]}
              </div>
              <span className="text-xs text-brand-600 font-mono">{m.role}</span>
              <h4 className="font-semibold mt-1">{m.name}</h4>
              <p className="text-xs text-slate-500 mt-2">{m.focus}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {m.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-4">{t('team.impact')}</h3>
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

        <p className="text-sm text-slate-500 mb-2">{t('team.growth')}</p>
        <div className="glass-panel rounded-xl p-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="growthAreaFillTeam" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#growthAreaFillTeam)"
                dot={{ r: 3, fill: '#2563eb', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
