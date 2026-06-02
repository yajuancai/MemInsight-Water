import { ArrowRight, Filter } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useWorkspace } from '../../contexts/WorkspaceContext'
import { ModuleWorkspace } from '../screening/ModuleWorkspace'
import { SectionAtmosphere } from '../ui/SectionAtmosphere'

export function ScreeningSection({
  onBackToModules,
}: {
  onBackToModules: () => void
}) {
  const { t } = useTranslation()
  const { activeModule } = useWorkspace()

  return (
    <section className="snap-section relative overflow-hidden py-16 px-4">
      <SectionAtmosphere variant="screening" />
      <div className="relative z-10 max-w-[1600px] mx-auto pt-8 pb-10">
        {activeModule ? (
          <ModuleWorkspace module={activeModule} onBack={onBackToModules} />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center px-4 min-h-[50vh]">
            <div className="relative max-w-md w-full rounded-2xl p-px bg-gradient-to-br from-brand-400/50 via-cyan-400/30 to-brand-600/40 shadow-soft">
              <div className="glass-panel rounded-2xl p-10 bg-white/90 dark:bg-slate-900/90">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-cyan-500/10 text-brand-600 dark:text-brand-400 ring-1 ring-brand-500/20">
                  <Filter className="h-7 w-7" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{t('screening.title')}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">{t('screening.noModuleHint')}</p>
                <button
                  type="button"
                  onClick={onBackToModules}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800 shadow-sm"
                >
                  {t('screening.goToModules')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
