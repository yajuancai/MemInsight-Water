import { useMemo } from 'react'
import type { FilterState, MembraneRecord } from '../types/membrane'

export function useMembraneFilter(records: MembraneRecord[], filters: FilterState) {
  return useMemo(() => {
    let result = [...records]

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.doi.toLowerCase().includes(q) ||
          r.authors.toLowerCase().includes(q) ||
          r.journal.toLowerCase().includes(q),
      )
    }

    if (filters.membraneTypes.length) {
      result = result.filter((r) => filters.membraneTypes.includes(r.membraneType))
    }
    if (filters.monomerSystems.length) {
      result = result.filter((r) => filters.monomerSystems.includes(r.monomerSystem))
    }
    if (filters.monoSalt) {
      result = result.filter((r) => r.monoSalt === filters.monoSalt)
    }
    if (filters.divalentSalt) {
      result = result.filter((r) => r.divalentSalt === filters.divalentSalt)
    }

    result = result.filter(
      (r) =>
        r.monoDivalentFactor >= filters.monoDivalentMin &&
        r.monoDivalentFactor <= filters.monoDivalentMax &&
        r.flux >= filters.fluxMin &&
        r.flux <= filters.fluxMax &&
        r.tocRejection >= filters.tocRejectionMin &&
        r.mwco >= filters.mwcoMin &&
        r.mwco <= filters.mwcoMax,
    )

    const salt = filters.saltForRejection
    result = result.filter((r) => {
      const rej = r.saltRejection[salt] ?? 0
      return rej >= filters.saltRejectionMin && rej <= filters.saltRejectionMax
    })

    if (filters.sortField) {
      const field = filters.sortField
      result.sort((a, b) => {
        const av = a[field]
        const bv = b[field]
        if (typeof av === 'number' && typeof bv === 'number') {
          return filters.sortDir === 'asc' ? av - bv : bv - av
        }
        return filters.sortDir === 'asc'
          ? String(av).localeCompare(String(bv))
          : String(bv).localeCompare(String(av))
      })
    }

    return result
  }, [records, filters])
}
