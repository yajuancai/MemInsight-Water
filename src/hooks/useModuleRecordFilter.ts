import { useMemo } from 'react'
import type { ModuleKey } from '../data/moduleStats'
import type { MembraneRecord } from '../types/membrane'

export type ModuleFilterValues = {
  search: string
  multi: Record<string, string[]>
  ranges: Record<string, { min: number; max: number }>
}

export function useModuleRecordFilter(
  records: MembraneRecord[],
  module: ModuleKey,
  filters: ModuleFilterValues,
) {
  return useMemo(() => {
    let result = records.filter((r) => r.module === module)

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.doi.toLowerCase().includes(q) ||
          Object.values(r.moduleFields).some((v) => v.toLowerCase().includes(q)),
      )
    }

    for (const [fieldId, selected] of Object.entries(filters.multi)) {
      if (!selected.length) continue
      result = result.filter((r) => selected.includes(r.moduleFields[fieldId] ?? ''))
    }

    if (filters.ranges.flux) {
      const { min, max } = filters.ranges.flux
      result = result.filter((r) => r.flux >= min && r.flux <= max)
    }
    if (filters.ranges.saltRejection) {
      const { min, max } = filters.ranges.saltRejection
      const salt = filters.multi.monoSalt?.[0] || 'NaCl'
      result = result.filter((r) => {
        const rej = r.saltRejection[salt] ?? 0
        return rej >= min && rej <= max
      })
    }

    for (const [fieldId, range] of Object.entries(filters.ranges)) {
      if (fieldId === 'flux' || fieldId === 'saltRejection' || !range) continue
      result = result.filter((r) => {
        const raw = r.moduleFields[fieldId]
        if (raw === undefined) return false
        const val = Number(raw)
        return !Number.isNaN(val) && val >= range.min && val <= range.max
      })
    }

    return result
  }, [records, module, filters])
}
