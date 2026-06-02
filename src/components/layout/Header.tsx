import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/ThemeContext'
import { Logo } from './Logo'
const ABOUT_INDEX = 6

const NAV_ITEMS: { key: string; index: number }[] = [
  { key: 'home', index: 0 },
  { key: 'database', index: 1 },
  { key: 'screening', index: 2 },
  { key: 'workspace', index: 3 },
  { key: 'ai', index: 5 },
  { key: 'about', index: ABOUT_INDEX },
]

export function Header({
  activeIndex,
  onNavigate,
  transparent = false,
}: {
  activeIndex: number
  onNavigate: (i: number) => void
  transparent?: boolean
}) {
  const { t, i18n } = useTranslation()
  const { theme, toggle } = useTheme()
  const lang = i18n.language === 'zh' ? 'zh' : 'en'

  const isActive = (item: (typeof NAV_ITEMS)[0]) => activeIndex === item.index

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        transparent
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60'
          : 'bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-[4.25rem] flex items-center justify-between gap-4">
        <button type="button" onClick={() => onNavigate(0)} className="shrink-0 text-left">
          <Logo />
        </button>

        <nav className="hidden xl:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.index)}
              className={`relative px-3.5 py-2.5 text-[15px] leading-snug transition-colors ${
                isActive(item)
                  ? 'text-navy-800 dark:text-brand-300 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:text-navy-900 dark:hover:text-slate-200'
              }`}
            >
              {t(`nav.${item.key}`)}
              {isActive(item) && item.key === 'home' && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-500 rounded-full" />
              )}
              {isActive(item) && item.key !== 'home' && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-500/70 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => i18n.changeLanguage(lang === 'zh' ? 'en' : 'zh')}
            className="h-9 min-w-[2.5rem] px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title={t('common.language')}
            aria-label={t('common.language')}
          >
            {lang === 'zh' ? 'EN' : '中'}
          </button>
          <button
            type="button"
            onClick={toggle}
            className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'light' ? t('common.themeDark') : t('common.themeLight')}
            aria-label={theme === 'light' ? t('common.themeDark') : t('common.themeLight')}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}
