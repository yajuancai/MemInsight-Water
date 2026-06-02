import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export type TeamCollabMode = 'team' | 'collab'

export function TeamCollabToggle({
  mode,
  onChange,
  className = '',
}: {
  mode: TeamCollabMode
  onChange: (mode: TeamCollabMode) => void
  className?: string
}) {
  const { t } = useTranslation()

  return (
    <div className={`inline-flex p-1 rounded-full glass-panel ${className}`}>
      {(['team', 'collab'] as const).map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors z-10 ${
            mode === key
              ? 'text-white'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          {mode === key && (
            <motion.span
              layoutId="team-collab-pill"
              className="absolute inset-0 rounded-full bg-brand-600 shadow-md"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{t(`nav.${key}`)}</span>
        </button>
      ))}
    </div>
  )
}
