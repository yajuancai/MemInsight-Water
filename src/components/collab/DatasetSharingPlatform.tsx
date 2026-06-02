import { BookOpen, UserPlus, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SHARED_DATASETS } from '../../data/sharedDatasets'

export function DatasetSharingPlatform() {
  const { t } = useTranslation()

  const literatureCount = SHARED_DATASETS.filter((d) => d.sourceType === 'literature').length
  const scholarCount = SHARED_DATASETS.filter((d) => d.sourceType === 'scholar').length
  const totalRecords = SHARED_DATASETS.reduce((sum, d) => sum + d.recordCount, 0)

  return (
    <div className="mb-14">
      <h3 className="text-lg font-semibold mb-2">{t('collab.datasetPlatformTitle')}</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-3xl">{t('collab.datasetPlatformSubtitle')}</p>

      <div className="grid grid-cols-3 gap-3 mb-6 max-w-xl">
        <StatChip label={t('collab.datasetStatTotal')} value={String(SHARED_DATASETS.length)} />
        <StatChip label={t('collab.datasetStatRecords')} value={totalRecords.toLocaleString()} />
        <StatChip
          label={t('collab.datasetStatSources')}
          value={t('collab.datasetStatSourcesValue', { literature: literatureCount, scholar: scholarCount })}
        />
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-hidden">
          <table className="data-table w-full min-w-[720px] text-sm">
            <thead>
              <tr>
                <th>{t('collab.datasetColName')}</th>
                <th>{t('collab.datasetColSource')}</th>
                <th>{t('collab.datasetColContributor')}</th>
                <th>{t('collab.datasetColModules')}</th>
                <th className="text-right">{t('collab.datasetColRecords')}</th>
                <th className="text-right">{t('collab.datasetColYear')}</th>
              </tr>
            </thead>
            <tbody>
              {SHARED_DATASETS.map((ds) => (
                <tr key={ds.id}>
                  <td>
                    <div className="font-medium text-slate-800 dark:text-slate-100 max-w-[14rem]">{ds.title}</div>
                    {ds.doi && (
                      <a
                        href={`https://doi.org/${ds.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 mt-1 text-xs text-brand-600 hover:underline"
                      >
                        DOI
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </td>
                  <td>
                    <SourceBadge type={ds.sourceType} />
                  </td>
                  <td className="text-slate-600 dark:text-slate-300 max-w-[12rem]">{ds.contributor}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {ds.modules.map((m) => (
                        <span
                          key={m}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-700 dark:text-brand-300"
                        >
                          {t(`overview.modules.${m}`, m)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="text-right font-mono tabular-nums">{ds.recordCount.toLocaleString()}</td>
                  <td className="text-right text-slate-500">{ds.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">{t('collab.datasetPlatformNote')}</p>
    </div>
  )
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200/80 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/50 px-3 py-2.5 text-center">
      <p className="text-lg font-bold text-brand-600 dark:text-brand-400 tabular-nums leading-none">{value}</p>
      <p className="text-[10px] text-slate-500 mt-1 leading-tight">{label}</p>
    </div>
  )
}

function SourceBadge({ type }: { type: 'literature' | 'scholar' }) {
  const { t } = useTranslation()
  const isLit = type === 'literature'
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
        isLit
          ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200'
          : 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200'
      }`}
    >
      {isLit ? <BookOpen className="w-3 h-3" /> : <UserPlus className="w-3 h-3" />}
      {t(isLit ? 'collab.datasetSourceLiterature' : 'collab.datasetSourceScholar')}
    </span>
  )
}
