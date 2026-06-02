function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden className="shrink-0">
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        className="fill-brand-500/10 stroke-brand-500/20 dark:fill-brand-400/12 dark:stroke-brand-400/25"
        strokeWidth="1"
      />
      {/* 膜截面：弧形外壳 + 孔道 */}
      <path
        d="M26 9.5c4.2 1.2 6.5 4.8 6.5 10.5s-2.3 9.3-6.5 10.5"
        className="stroke-brand-600/35 dark:stroke-brand-300/40"
        strokeWidth="1.25"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M14 8.5h7.5c5.8 0 10.5 4.6 10.5 11.5S27.3 31.5 21.5 31.5H14V8.5z"
        className="fill-brand-600 dark:fill-brand-400"
      />
      <circle cx="18.5" cy="14" r="1.35" className="fill-white/90 dark:fill-slate-950/75" />
      <circle cx="22.5" cy="14" r="1.35" className="fill-white/90 dark:fill-slate-950/75" />
      <circle cx="18.5" cy="18.5" r="1.35" className="fill-white/90 dark:fill-slate-950/75" />
      <circle cx="22.5" cy="18.5" r="1.35" className="fill-white/90 dark:fill-slate-950/75" />
      <circle cx="18.5" cy="23" r="1.35" className="fill-white/90 dark:fill-slate-950/75" />
      <circle cx="22.5" cy="23" r="1.35" className="fill-white/90 dark:fill-slate-950/75" />
      <circle cx="20.5" cy="27.5" r="1.35" className="fill-white/90 dark:fill-slate-950/75" />
      {/* 透水流线 */}
      <path
        d="M27.5 15.5c3.2 0 5.5 1.6 5.5 4.5s-2.3 4.5-5.5 4.5"
        className="stroke-brand-300 dark:stroke-brand-200"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M27.5 20.5c4 0 6.8 2 6.8 5.2 0 2.4-1.4 4.2-3.6 5"
        className="stroke-brand-400/80 dark:stroke-brand-300/90"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* 数据节点：Insight */}
      <circle cx="11" cy="12" r="1.6" className="fill-brand-500 dark:fill-brand-300" />
      <circle cx="8" cy="17" r="1.2" className="fill-brand-500/55 dark:fill-brand-300/60" />
      <circle cx="11.5" cy="21" r="1.4" className="fill-brand-500/75 dark:fill-brand-300/80" />
      <path
        d="M11 13.6v2.2M11 17.4v1.4"
        className="stroke-brand-500/40 dark:stroke-brand-300/45"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M9.2 16.2l1.6 0.8M9.5 20.2l2 0.5"
        className="stroke-brand-500/35 dark:stroke-brand-300/40"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Logo({ compact = false }: { compact?: boolean }) {
  const markSize = compact ? 30 : 36

  return (
    <div className="flex items-center gap-3">
      <LogoMark size={markSize} />
      {!compact && (
        <div className="leading-none">
          <p className="text-[15px] font-semibold tracking-tight">
            <span className="text-navy-900 dark:text-white">MemInsight</span>
            <span className="text-brand-600 dark:text-brand-400"> Water</span>
          </p>
          <p className="mt-1 text-[10px] font-medium tracking-wide text-slate-500 dark:text-slate-400 uppercase hidden sm:block">
            Membrane · Data · Insight
          </p>
        </div>
      )}
    </div>
  )
}
