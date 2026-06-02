import { useTranslation } from 'react-i18next'
import type { TeamPerson } from '../../data/teamMembers'
import { CORE_TEAM, PROJECT_TEAM } from '../../data/teamMembers'

function MemberCard({
  person,
  variant,
}: {
  person: TeamPerson
  variant: 'core' | 'member'
}) {
  const { t } = useTranslation()
  const isCore = variant === 'core'

  return (
    <div
      className={`glass-panel rounded-xl text-center flex flex-col items-center ${
        isCore
          ? 'p-5 sm:p-6 border-2 border-brand-500/25 dark:border-brand-400/30 shadow-soft'
          : 'p-4 sm:p-5 min-w-0 flex-1 sm:flex-none sm:w-[11rem] md:w-[12rem]'
      }`}
    >
      {person.photo ? (
        <img
          src={person.photo}
          alt={person.name}
          className={`object-cover object-top shrink-0 border-2 border-white dark:border-slate-700 shadow-sm bg-white rounded-full ${
            isCore
              ? 'w-28 h-28 sm:w-32 sm:h-32 mb-3.5'
              : 'w-22 h-22 sm:w-24 sm:h-24 mb-3'
          }`}
        />
      ) : (
        <div
          className={`bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold shrink-0 rounded-full ${
            isCore ? 'w-28 h-28 sm:w-32 sm:h-32 text-xl mb-3.5' : 'w-22 h-22 sm:w-24 sm:h-24 text-base mb-3'
          }`}
        >
          {person.name[0]}
        </div>
      )}
      <span
        className={`font-medium text-brand-600 dark:text-brand-400 ${
          isCore ? 'text-sm sm:text-base' : 'text-sm sm:text-base'
        }`}
      >
        {t(`team.roles.${person.roleKey}`)}
      </span>
      <h4
        className={`font-semibold text-slate-900 dark:text-white ${
          isCore ? 'mt-1 text-base sm:text-lg' : 'mt-1 text-sm sm:text-base'
        }`}
      >
        {person.name}
      </h4>
      {isCore && person.focus && (
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed max-w-[14rem]">{person.focus}</p>
      )}
      {isCore && person.tags && person.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1 mt-2">
          {person.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export function TeamOrgChart() {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
        {CORE_TEAM.map((person) => (
          <MemberCard key={person.id} person={person} variant="core" />
        ))}
      </div>

      <div className="relative my-3 max-w-2xl mx-auto hidden sm:flex flex-col items-center" aria-hidden>
        <div className="h-3 w-px bg-brand-500/35" />
        <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
        <div className="h-3 w-px bg-brand-500/35" />
      </div>
      <div className="sm:hidden my-2 flex justify-center" aria-hidden>
        <div className="h-4 w-px bg-brand-500/30" />
      </div>

      <div className="flex flex-nowrap justify-center gap-4 sm:gap-5 max-w-7xl mx-auto px-1 overflow-x-auto scrollbar-hidden sm:overflow-visible pb-1 sm:pb-0">
        {PROJECT_TEAM.map((person) => (
          <MemberCard key={person.id} person={person} variant="member" />
        ))}
      </div>
    </div>
  )
}
