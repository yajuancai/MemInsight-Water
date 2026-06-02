import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { globalPartners, networkLinks, projectMapPercent, projectMapSvg } from '../../data/collaborationPartners'
import { publicAsset } from '../../utils/publicAsset'

const partnerById = Object.fromEntries(globalPartners.map((p) => [p.id, p]))

export function WorldMapNetwork() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<string | null>(globalPartners[0]?.id ?? null)
  const active = globalPartners.find((p) => p.id === activeId)

  const linkPaths = useMemo(
    () =>
      networkLinks
        .map(([a, b]) => {
          const pa = partnerById[a]
          const pb = partnerById[b]
          if (!pa || !pb) return null
          const p1 = projectMapSvg(pa.lng, pa.lat)
          const p2 = projectMapSvg(pb.lng, pb.lat)
          return { id: `${a}-${b}`, x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }
        })
        .filter(Boolean) as { id: string; x1: number; y1: number; x2: number; y2: number }[],
    [],
  )

  return (
    <div className="world-map-root relative -mx-6 md:-mx-0" role="region" aria-label={t('collab.networkTitle')}>
      <div
        className="world-map-shell relative overflow-hidden bg-transparent"
      >
        <div className="relative aspect-[2/1] w-full min-h-[300px] md:min-h-[420px]">
          <img
            src={publicAsset('world-map-network.png')}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center select-none"
            draggable={false}
          />

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 50"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
            </defs>
            {linkPaths.map((link, i) => (
              <line
                key={link.id}
                x1={link.x1}
                y1={link.y1}
                x2={link.x2}
                y2={link.y2}
                stroke="url(#linkGrad)"
                strokeWidth="0.18"
                strokeDasharray="0.6 0.4"
                opacity={0.4 + (i % 3) * 0.12}
                className="map-network-line"
              />
            ))}
          </svg>

          {globalPartners.map((p, i) => {
            const { x, y } = projectMapPercent(p.lng, p.lat)
            const isActive = activeId === p.id
            return (
              <button
                key={p.id}
                type="button"
                className="absolute z-10 group"
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setActiveId(p.id)}
                onFocus={() => setActiveId(p.id)}
                onClick={() => setActiveId(p.id)}
                aria-label={p.institution}
              >
                <span
                  className={`absolute inset-0 rounded-full -m-3 animate-ping ${
                    isActive ? 'bg-amber-400/45' : 'bg-cyan-400/30'
                  }`}
                  style={{ animationDuration: `${2.5 + (i % 3) * 0.3}s` }}
                />
                <span
                  className={`relative block rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'h-4 w-4 border-amber-200 bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.95)]'
                      : 'h-2.5 w-2.5 border-cyan-200 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.85)] group-hover:h-3.5 group-hover:w-3.5'
                  }`}
                />
                <span
                  className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-cyan-500/35 bg-black/75 px-2 py-0.5 text-[10px] font-medium text-cyan-100 transition-opacity ${
                    isActive ? '-top-7 opacity-100' : '-top-6 opacity-0 group-hover:opacity-90'
                  }`}
                >
                  {p.institution}
                </span>
              </button>
            )
          })}

          <div className="pointer-events-none absolute left-4 top-4 z-10 font-mono text-[10px] tracking-widest text-cyan-400/75">
            GLOBAL NETWORK
          </div>
          <div className="pointer-events-none absolute right-4 top-4 z-10 font-mono text-[10px] text-cyan-400/55">
            {globalPartners.length} NODES
          </div>
        </div>

        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 z-30 md:right-auto md:w-80 rounded-lg border border-cyan-500/35 bg-[#0a1018]/92 p-4 text-sm shadow-lg shadow-cyan-500/15 backdrop-blur-md"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.85)]" />
              <div>
                <p className="font-semibold text-cyan-50">{active.institution}</p>
                <p className="mt-0.5 text-xs text-cyan-400/80">
                  {active.country} · {active.region}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{active.focus}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2 px-2 md:px-0">
        {globalPartners.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveId(p.id)}
            className={`rounded-full border px-2.5 py-1 text-[10px] transition-all ${
              activeId === p.id
                ? 'border-amber-400/60 bg-amber-400/10 text-amber-700 shadow-[0_0_12px_rgba(251,191,36,0.12)] dark:text-amber-200'
                : 'border-slate-200 bg-white/80 text-slate-600 hover:border-cyan-400/50 dark:border-cyan-500/25 dark:bg-[#0a1018]/60 dark:text-cyan-300/75'
            }`}
          >
            {p.institution}
          </button>
        ))}
      </div>
    </div>
  )
}
