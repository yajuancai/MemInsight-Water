import { useEffect, type ReactNode } from 'react'
import { ArrowLeft, CheckSquare, Download, RotateCcw, Search, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ModuleKey } from '../../data/moduleStats'
import { MODULE_FILTER_SCHEMAS } from '../../data/moduleFilterSchemas'
import { membraneRecords } from '../../data/mockMembranes'
import { useWorkspace } from '../../contexts/WorkspaceContext'
import { useModuleRecordFilter } from '../../hooks/useModuleRecordFilter'
import type { MembraneRecord } from '../../types/membrane'
import { exportToXlsx } from '../../utils/exportData'
import { RangeDual } from '../ui/RangeDual'

export function ModuleWorkspace({ module, onBack }: { module: ModuleKey; onBack: () => void }) {
  const { t } = useTranslation()
  const schema = MODULE_FILTER_SCHEMAS[module]
  const {
    moduleFilters,
    setModuleFilters,
    resetModuleFilters,
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    favorites,
    toggleFavorites,
    isFavorite,
    setFilteredRecords,
  } = useWorkspace()

  const filtered = useModuleRecordFilter(membraneRecords, module, moduleFilters)
  const filteredIds = filtered.map((r) => r.id)
  const allFilteredSelected = filteredIds.length > 0 && filteredIds.every((id) => selectedIds.has(id))
  const selectedInView = filtered.filter((r) => selectedIds.has(r.id))
  const hasSelection = selectedInView.length > 0
  const allSelectedFavorited =
    hasSelection && selectedInView.every((r) => favorites.some((f) => f.id === r.id))

  useEffect(() => {
    setFilteredRecords(filtered)
  }, [filtered, setFilteredRecords])

  const toggleMulti = (fieldId: string, value: string) => {
    setModuleFilters((f) => {
      const cur = f.multi[fieldId] ?? []
      const next = cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value]
      return { ...f, multi: { ...f.multi, [fieldId]: next } }
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm px-4 py-2.5 shadow-sm">
        <button type="button" onClick={onBack} className="flex items-center gap-1 text-sm text-brand-600 dark:text-brand-400 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          {t('screening.backToModules')}
        </button>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <h3 className="font-semibold text-slate-900 dark:text-white">{t(`overview.modules.${module}`)}</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 items-start">
        <aside className="glass-panel rounded-xl p-4 space-y-4 text-sm lg:sticky lg:top-4 ring-1 ring-brand-500/10 dark:ring-brand-400/10 shadow-soft bg-white/90 dark:bg-slate-900/85">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{t('screening.filters')}</span>
            <button type="button" onClick={() => resetModuleFilters(module)} className="text-xs flex items-center gap-1 text-brand-600 hover:underline">
              <RotateCcw className="w-3 h-3" />
              {t('screening.reset')}
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={moduleFilters.search}
              onChange={(e) => setModuleFilters((f) => ({ ...f, search: e.target.value }))}
              placeholder={t('screening.search')}
              className="w-full pl-8 pr-2 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            />
          </div>
          {schema.fields.map((field) => {
            if (field.type === 'multi') {
              return (
                <FilterGroup key={field.id} label={t(`screening.moduleFields.${module}.${field.id}`, field.id)}>
                  {field.options.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs">
                      <input type="checkbox" checked={(moduleFilters.multi[field.id] ?? []).includes(opt)} onChange={() => toggleMulti(field.id, opt)} />
                      {opt}
                    </label>
                  ))}
                </FilterGroup>
              )
            }
            if (field.type === 'range') {
              const range = moduleFilters.ranges[field.id] ?? { min: field.min, max: field.max }
              return (
                <RangeDual
                  key={field.id}
                  label={t(`screening.moduleFields.${module}.${field.id}`, field.id)}
                  min={field.min}
                  max={field.max}
                  valueMin={range.min}
                  valueMax={range.max}
                  unit={field.unit ?? ''}
                  onChangeMin={(v) =>
                    setModuleFilters((f) => {
                      const cur = f.ranges[field.id] ?? { min: field.min, max: field.max }
                      return { ...f, ranges: { ...f.ranges, [field.id]: { ...cur, min: v } } }
                    })
                  }
                  onChangeMax={(v) =>
                    setModuleFilters((f) => {
                      const cur = f.ranges[field.id] ?? { min: field.min, max: field.max }
                      return { ...f, ranges: { ...f.ranges, [field.id]: { ...cur, max: v } } }
                    })
                  }
                />
              )
            }
            return null
          })}
        </aside>

        <div className="glass-panel rounded-xl overflow-hidden ring-1 ring-brand-500/10 dark:ring-brand-400/10 shadow-soft bg-white/90 dark:bg-slate-900/85">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200/80 dark:border-slate-700/80 bg-gradient-to-r from-brand-500/5 via-transparent to-cyan-500/5 shrink-0">
            <span className="text-sm font-sans">{t('screening.results', { count: filtered.length })}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!hasSelection}
                onClick={() => toggleFavorites(selectedInView)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border transition-colors disabled:opacity-40 disabled:pointer-events-none ${
                  allSelectedFavorited
                    ? 'border-amber-700 bg-amber-600 text-white hover:bg-amber-700 dark:border-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600'
                    : 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-900/50'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${allSelectedFavorited ? 'fill-current' : ''}`} />
                {allSelectedFavorited ? t('screening.removeFromFavorites') : t('screening.addToFavorites')}
                {hasSelection ? ` (${selectedInView.length})` : ''}
              </button>
              <button
                type="button"
                disabled={filtered.length === 0}
                onClick={() => toggleSelectAll(filteredIds)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                {allFilteredSelected ? t('screening.deselectAll') : t('screening.selectAll')}
              </button>
              <button
                type="button"
                onClick={() => void exportToXlsx(filtered, `${module}_membrane_data.xlsx`)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-brand-600 text-white hover:bg-brand-700"
              >
                <Download className="w-3.5 h-3.5" />
                {t('screening.exportXlsx')}
              </button>
            </div>
          </div>
          <div className="overflow-x-auto scrollbar-hidden">
            {filtered.length === 0 ? (
              <p className="p-8 text-center text-slate-500">{t('screening.noResults')}</p>
            ) : (
              <table className="data-table w-full min-w-[700px]">
                <thead>
                  <tr>
                    <th className="w-8" />
                    {schema.columns.map((col) => (
                      <th key={col}>{t(`screening.col.${col}`, col)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      className={
                        selectedIds.has(r.id)
                          ? 'bg-brand-500/10'
                          : isFavorite(r.id)
                            ? 'bg-amber-500/8 dark:bg-amber-500/10'
                            : ''
                      }
                    >
                      <td>
                        <input type="checkbox" checked={selectedIds.has(r.id)} onChange={() => toggleSelect(r.id)} />
                      </td>
                      {schema.columns.map((col) => (
                        <td key={col}>{cellValue(r, col)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function cellValue(r: MembraneRecord, col: string): string | number {
  if (col in r.moduleFields) return r.moduleFields[col]
  const v = r[col as keyof MembraneRecord]
  if (typeof v === 'object') return '—'
  return v as string | number
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">{label}</p>
      <div className="space-y-1">{children}</div>
    </div>
  )
}
