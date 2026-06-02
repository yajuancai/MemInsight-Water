import { useEffect, useState } from 'react'

function pct(value: number, min: number, max: number) {
  if (max <= min) return 0
  return ((value - min) / (max - min)) * 100
}

function formatValue(value: number) {
  if (Number.isInteger(value)) return String(value)
  return value.toFixed(1).replace(/\.0$/, '')
}

function inputStep(min: number, max: number) {
  const span = max - min
  if (span <= 10) return 0.1
  if (span <= 100) return 1
  return Math.max(1, Math.round(span / 100))
}

export function RangeDual({
  label,
  min,
  max,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
  unit = '',
}: {
  label: string
  min: number
  max: number
  valueMin: number
  valueMax: number
  onChangeMin: (v: number) => void
  onChangeMax: (v: number) => void
  unit?: string
}) {
  const step = inputStep(min, max)
  const sliderStep = (max - min) / 100 || step
  const left = pct(valueMin, min, max)
  const right = pct(valueMax, min, max)
  const unitTrim = unit.trim()

  const [draftMin, setDraftMin] = useState<string | null>(null)
  const [draftMax, setDraftMax] = useState<string | null>(null)

  useEffect(() => {
    setDraftMin(null)
    setDraftMax(null)
  }, [valueMin, valueMax, min, max])

  const clampMin = (n: number) => Math.max(min, Math.min(n, valueMax))
  const clampMax = (n: number) => Math.min(max, Math.max(n, valueMin))

  const commitMin = (raw: string) => {
    setDraftMin(null)
    const trimmed = raw.trim()
    if (trimmed === '') {
      onChangeMin(min)
      return
    }
    const n = Number(trimmed)
    if (Number.isNaN(n)) return
    onChangeMin(clampMin(n))
  }

  const commitMax = (raw: string) => {
    setDraftMax(null)
    const trimmed = raw.trim()
    if (trimmed === '') {
      onChangeMax(max)
      return
    }
    const n = Number(trimmed)
    if (Number.isNaN(n)) return
    onChangeMax(clampMax(n))
  }

  return (
    <div className="range-dual-wrap rounded-lg border border-slate-200/80 bg-slate-50/80 px-2.5 py-2 dark:border-slate-700/60 dark:bg-slate-800/40">
      <div className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">{label}</div>

      <div className="mb-2 flex items-center gap-1">
        <div className="range-dual-number-wrap flex-1 min-w-0">
          <input
            type="number"
            min={min}
            max={valueMax}
            step={step}
            value={draftMin !== null ? draftMin : valueMin}
            onChange={(e) => setDraftMin(e.target.value)}
            onBlur={(e) => commitMin(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                commitMin((e.target as HTMLInputElement).value)
                ;(e.target as HTMLInputElement).blur()
              }
            }}
            className="range-dual-number"
            aria-label={`${label} minimum`}
          />
          {unitTrim ? <span className="range-dual-number-unit">{unitTrim}</span> : null}
        </div>
        <span className="shrink-0 text-xs text-slate-400 dark:text-slate-500">—</span>
        <div className="range-dual-number-wrap range-dual-number-wrap-accent flex-1 min-w-0">
          <input
            type="number"
            min={valueMin}
            max={max}
            step={step}
            value={draftMax !== null ? draftMax : valueMax}
            onChange={(e) => setDraftMax(e.target.value)}
            onBlur={(e) => commitMax(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                commitMax((e.target as HTMLInputElement).value)
                ;(e.target as HTMLInputElement).blur()
              }
            }}
            className="range-dual-number range-dual-number-accent"
            aria-label={`${label} maximum`}
          />
          {unitTrim ? <span className="range-dual-number-unit">{unitTrim}</span> : null}
        </div>
      </div>

      <div className="range-dual relative mx-0.5 h-7 flex items-center">
        <div className="range-dual-track" />
        <div className="range-dual-fill" style={{ left: `${left}%`, right: `${100 - right}%` }} />
        <input
          type="range"
          min={min}
          max={max}
          step={sliderStep}
          value={valueMin}
          onChange={(e) => onChangeMin(clampMin(Number(e.target.value)))}
          className="range-dual-input range-dual-input-min"
          aria-label={`${label} minimum slider`}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={sliderStep}
          value={valueMax}
          onChange={(e) => onChangeMax(clampMax(Number(e.target.value)))}
          className="range-dual-input range-dual-input-max"
          aria-label={`${label} maximum slider`}
        />
      </div>

      <div className="mt-1.5 flex justify-between text-xs tabular-nums text-slate-500 dark:text-slate-400">
        <span>{formatValue(min)}{unitTrim}</span>
        <span>{formatValue(max)}{unitTrim}</span>
      </div>
    </div>
  )
}
