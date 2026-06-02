import { FileSpreadsheet, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useWorkspace } from '../../contexts/WorkspaceContext'
import { exportToXlsx } from '../../utils/exportData'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'

export function ExportSection() {
  const { t } = useTranslation()
  const { favorites, removeFavorite } = useWorkspace()

  return (
    <section className="snap-section relative overflow-hidden py-20 px-6">
      <SectionAtmosphere variant="workspace" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('export.title')}</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">{t('export.subtitle')}</p>
        </header>

        <div className="mb-8">
          <ActionBtn
            icon={FileSpreadsheet}
            disabled={favorites.length === 0}
            onClick={() => void exportToXlsx(favorites, 'membraneinsight_favorites.xlsx')}
          >
            {t('export.exportExcel')}
          </ActionBtn>
        </div>

        <Panel title={t('export.favorites')} icon={Star}>
          {favorites.length === 0 ? (
            <p className="text-sm text-slate-500">{t('export.emptyFav')}</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {favorites.map((r) => (
                <li key={r.id} className="flex justify-between font-mono rounded-lg px-2 py-1.5 hover:bg-brand-500/5 dark:hover:bg-brand-500/10">
                  <span>{r.id} — {r.name}</span>
                  <button type="button" onClick={() => removeFavorite(r.id)} className="text-red-500 text-xs hover:text-red-600">
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </section>
  )
}

function Panel({ title, icon: Icon, children }: { title: string; icon: typeof Star; children: React.ReactNode }) {
  return (
    <div className="glass-panel rounded-xl p-5 ring-1 ring-brand-500/10 dark:ring-brand-400/10 shadow-soft bg-white/85 dark:bg-slate-900/80">
      <h3 className="flex items-center gap-2 font-semibold mb-3 text-slate-900 dark:text-white">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/10 to-cyan-500/10">
          <Icon className="w-4 h-4 text-brand-500" />
        </span>
        {title}
      </h3>
      {children}
    </div>
  )
}

function ActionBtn({
  icon: Icon,
  children,
  onClick,
  disabled = false,
}: {
  icon: typeof Star
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-brand-200/80 dark:border-brand-700/50 bg-white/90 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-500/10 hover:border-brand-400/50 shadow-sm disabled:opacity-40 disabled:pointer-events-none transition-colors"
    >
      <Icon className="w-4 h-4 text-brand-500" />
      {children}
    </button>
  )
}
