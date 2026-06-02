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
          ? 'p-4 border-2 border-brand-500/25 dark:border-brand-400/30 shadow-soft'
          : 'p-5 sm:p-6 min-w-0 flex-1 sm:flex-none sm:w-[11rem] md:w-[12.5rem]'
      }`}
    >
      {person.photo ? (
        <img
          src={person.photo}
          alt={person.name}
          className={`rounded-full object-cover object-top shrink-0 border-2 border-white dark:border-slate-700 shadow-sm bg-white ${
            isCore ? 'w-20 h-20 sm:w-24 sm:h-24 mb-3' : 'w-16 h-16 sm:w-20 sm:h-20 mb-3.5'
          }`}
        />
      ) : (
        <div
          className={`rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold shrink-0 ${
            isCore ? 'w-20 h-20 sm:w-24 sm:h-24 text-lg mb-3' : 'w-16 h-16 sm:w-20 sm:h-20 text-lg mb-3.5'
          }`}
        >
          {person.name[0]}
        </div>
      )}
      <span
        className={`font-medium text-brand-600 dark:text-brand-400 ${
          isCore ? 'text-sm' : 'text-sm sm:text-base'
        }`}
      >
        {person.photo && !isCore ? person.name : t(`team.roles.${person.roleKey}`)}
      </span>
      <h4 className={`font-semibold text-slate-900 dark:text-white ${isCore ? 'mt-1 text-sm' : 'mt-1.5 text-base sm:text-lg'}`}>
        {person.photo && !isCore ? t(`team.roles.${person.roleKey}`) : person.name}
      </h4>
      {isCore && person.focus && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed max-w-[12rem]">{person.focus}</p>
      )}
      {isCore && person.tags && person.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1 mt-2">
          {person.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
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
