import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Legend,
} from 'recharts'
import { useWorkspace } from '../../contexts/WorkspaceContext'
import type { MembraneRecord } from '../../types/membrane'

type ChartKind = 'scatter' | 'heatmap' | 'box' | 'radar'
type AxisKey =
  | 'poreSize'
  | 'flux'
  | 'baseMembraneFlux'
  | 'crosslinkDegree'
  | 'surfaceCharge'
  | 'monoDivalentFactor'
  | 'tocRejection'
  | 'saltRejection'

const COLORS = ['#06b6d4', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444']

function getSaltRejection(r: MembraneRecord): number {
  const fromField = Number(r.moduleFields.salt_rejection)
  if (r.moduleFields.salt_rejection && !Number.isNaN(fromField)) return fromField
  if (r.monoSalt && r.saltRejection[r.monoSalt] !== undefined) return r.saltRejection[r.monoSalt]
  const vals = Object.values(r.saltRejection)
  return vals.length > 0 ? vals[0] : 0
}

function getBaseMembraneFlux(r: MembraneRecord): number {
  const raw = r.moduleFields.support_material_water_permeance
  if (raw) {
    const n = Number(raw)
    if (!Number.isNaN(n)) return n
  }
  return 0
}

function getAxisValue(r: MembraneRecord, key: AxisKey): number {
  if (key === 'saltRejection') return getSaltRejection(r)
  if (key === 'baseMembraneFlux') return getBaseMembraneFlux(r)
  return r[key] as number
}

export function VisualizationSection() {
  const { t } = useTranslation()
  const { favorites } = useWorkspace()
  const data = favorites

  const [chartKind, setChartKind] = useState<ChartKind>('scatter')
  const [xKey, setXKey] = useState<AxisKey>('poreSize')
  const [yKey, setYKey] = useState<AxisKey>('flux')
  const [groupBy, setGroupBy] = useState(true)

  const scatterData = useMemo(
    () =>
      data.map((r) => ({
        x: getAxisValue(r, xKey),
        y: getAxisValue(r, yKey),
        group: r.monomerSystem,
        name: r.id,
      })),
    [data, xKey, yKey],
  )

  const systems = [...new Set(data.map((r) => r.monomerSystem))]

  const boxData = useMemo(() => {
    return systems.map((sys) => {
      const subset = data.filter((r) => r.monomerSystem === sys)
      const vals = subset.map((r) => getAxisValue(r, yKey))
      const avg = vals.reduce((a, b) => a + b, 0) / (vals.length || 1)
      return { system: sys, min: Math.min(...vals), max: Math.max(...vals), avg, count: vals.length }
    })
  }, [data, systems, yKey])

  const heatmapData = useMemo(() => {
    const bins = 5
    const xVals = data.map((r) => getAxisValue(r, xKey))
    const yVals = data.map((r) => getAxisValue(r, yKey))
    const xMin = Math.min(...xVals)
    const xMax = Math.max(...xVals)
    const yMin = Math.min(...yVals)
    const yMax = Math.max(...yVals)
    const grid: { x: number; y: number; count: number }[] = []
    for (let i = 0; i < bins; i++) {
      for (let j = 0; j < bins; j++) {
        const x0 = xMin + ((xMax - xMin) * i) / bins
        const x1 = xMin + ((xMax - xMin) * (i + 1)) / bins
        const y0 = yMin + ((yMax - yMin) * j) / bins
        const y1 = yMin + ((yMax - yMin) * (j + 1)) / bins
        const count = data.filter((r) => {
          const xv = getAxisValue(r, xKey)
          const yv = getAxisValue(r, yKey)
          return xv >= x0 && xv < x1 && yv >= y0 && yv < y1
        }).length
        grid.push({ x: (x0 + x1) / 2, y: (y0 + y1) / 2, count })
      }
    }
    return grid
  }, [data, xKey, yKey])

  const radarData = useMemo(() => {
    const avg = (key: AxisKey) =>
      data.reduce((s, r) => s + getAxisValue(r, key), 0) / (data.length || 1)
    return [
      { metric: t('columns.poreSize'), value: avg('poreSize') * 40 },
      { metric: t('columns.flux'), value: avg('flux') * 2 },
      { metric: t('columns.monoDivalentFactor'), value: avg('monoDivalentFactor') * 4 },
      { metric: t('columns.tocRejection'), value: avg('tocRejection') },
      { metric: t('columns.saltRejection'), value: avg('saltRejection') },
      { metric: t('columns.crosslinkDegree'), value: avg('crosslinkDegree') },
    ]
  }, [data, t])

  const axisOptions: { key: AxisKey; label: string }[] = [
    { key: 'poreSize', label: t('columns.poreSize') },
    { key: 'flux', label: t('columns.flux') },
    { key: 'baseMembraneFlux', label: t('columns.baseMembraneFlux') },
    { key: 'saltRejection', label: t('columns.saltRejection') },
    { key: 'crosslinkDegree', label: t('columns.crosslinkDegree') },
    { key: 'surfaceCharge', label: t('columns.surfaceCharge') },
    { key: 'monoDivalentFactor', label: t('columns.monoDivalentFactor') },
    { key: 'tocRejection', label: t('columns.tocRejection') },
  ]

  const xLabel = axisOptions.find((o) => o.key === xKey)?.label ?? xKey
  const yLabel = axisOptions.find((o) => o.key === yKey)?.label ?? yKey

  function renderChart() {
    if (chartKind === 'scatter') {
      return (
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis type="number" dataKey="x" name={xKey} />
          <YAxis type="number" dataKey="y" name={yKey} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          {groupBy ? (
            systems.map((sys, i) => (
              <Scatter
                key={sys}
                name={sys}
                data={scatterData.filter((d) => d.group === sys)}
                fill={COLORS[i % COLORS.length]}
              />
            ))
          ) : (
            <Scatter data={scatterData} fill="#06b6d4" />
          )}
        </ScatterChart>
      )
    }
    if (chartKind === 'heatmap') {
      return (
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" />
          <YAxis type="number" dataKey="y" />
          <ZAxis type="number" dataKey="count" range={[50, 400]} />
          <Tooltip />
          <Scatter data={heatmapData}>
            {heatmapData.map((entry, i) => (
              <Cell key={i} fill={COLORS[entry.count % COLORS.length]} fillOpacity={0.3 + entry.count * 0.15} />
            ))}
          </Scatter>
        </ScatterChart>
      )
    }
    if (chartKind === 'box') {
      return (
        <BarChart data={boxData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="system" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="min" stackId="a" fill="#94a3b8" name="min" />
          <Bar dataKey="avg" stackId="a" fill="#06b6d4" name="avg" />
          <Bar dataKey="max" stackId="a" fill="#0891b2" name="max" />
        </BarChart>
      )
    }
    return (
      <RadarChart data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
        <PolarRadiusAxis />
        <Radar dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
      </RadarChart>
    )
  }

  return (
    <section className="snap-section bg-white dark:bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h2 className="text-2xl font-bold">{t('viz.title')}</h2>
          <p className="text-slate-500">{t('viz.subtitle')}</p>
        </header>

        {data.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <Select label={t('viz.chartType')} value={chartKind} onChange={(v) => setChartKind(v as ChartKind)}>
            <option value="scatter">{t('viz.scatter')}</option>
            <option value="heatmap">{t('viz.heatmap')}</option>
            <option value="box">{t('viz.box')}</option>
            <option value="radar">{t('viz.radar')}</option>
          </Select>
          <Select label={t('viz.xAxis')} value={xKey} onChange={(v) => setXKey(v as AxisKey)}>
            {axisOptions.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </Select>
          <Select label={t('viz.yAxis')} value={yKey} onChange={(v) => setYKey(v as AxisKey)}>
            {axisOptions.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </Select>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={groupBy} onChange={(e) => setGroupBy(e.target.checked)} />
            {t('viz.groupBy')}
          </label>
        </div>
        )}

        {data.length === 0 ? (
          <div className="glass-panel rounded-xl p-12 text-center text-slate-500">
            <p>{t('export.emptyFav')}</p>
          </div>
        ) : (
          <>
            <div className="glass-panel rounded-xl p-4 h-[420px]">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-400 mt-3 font-mono">
              n = {data.length} · {xLabel} vs {yLabel} · {t('viz.favoritesSource')}
            </p>
          </>
        )}
      </div>
    </section>
  )
}

function Select({
  label, value, onChange, children,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1"
      >
        {children}
      </select>
    </label>
  )
}
