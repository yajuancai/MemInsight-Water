import { createContext, useContext, useState, type ReactNode } from 'react'
import type { ModuleKey } from '../data/moduleStats'
import { MODULE_FILTER_SCHEMAS } from '../data/moduleFilterSchemas'
import type { ModuleFilterValues } from '../hooks/useModuleRecordFilter'
import type { MembraneRecord } from '../types/membrane'

function emptyModuleFilters(): ModuleFilterValues {
  return { search: '', multi: {}, ranges: {} }
}

function initMultiForModule(module: ModuleKey): Record<string, string[]> {
  const multi: Record<string, string[]> = {}
  MODULE_FILTER_SCHEMAS[module].fields.forEach((f) => {
    if (f.type === 'multi') multi[f.id] = []
  })
  return multi
}

type WorkspaceCtx = {
  activeModule: ModuleKey | null
  setActiveModule: (m: ModuleKey | null) => void
  moduleFilters: ModuleFilterValues
  setModuleFilters: React.Dispatch<React.SetStateAction<ModuleFilterValues>>
  resetModuleFilters: (module: ModuleKey) => void
  favorites: MembraneRecord[]
  addFavorite: (r: MembraneRecord) => void
  addFavorites: (records: MembraneRecord[]) => void
  removeFavorites: (records: MembraneRecord[]) => void
  toggleFavorites: (records: MembraneRecord[]) => void
  isFavorite: (id: string) => boolean
  removeFavorite: (id: string) => void
  selectedIds: Set<string>
  toggleSelect: (id: string) => void
  toggleSelectAll: (ids: string[]) => void
  clearSelection: () => void
  filteredRecords: MembraneRecord[]
  setFilteredRecords: (records: MembraneRecord[]) => void
}

const WorkspaceContext = createContext<WorkspaceCtx | null>(null)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [activeModule, setActiveModuleState] = useState<ModuleKey | null>(null)
  const [moduleFilters, setModuleFilters] = useState<ModuleFilterValues>(emptyModuleFilters())
  const [favorites, setFavorites] = useState<MembraneRecord[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [filteredRecords, setFilteredRecords] = useState<MembraneRecord[]>([])

  const setActiveModule = (m: ModuleKey | null) => {
    setActiveModuleState(m)
    if (m) {
      setModuleFilters({ search: '', multi: initMultiForModule(m), ranges: {} })
      setSelectedIds(new Set())
    } else {
      setModuleFilters(emptyModuleFilters())
    }
  }

  const resetModuleFilters = (module: ModuleKey) => {
    setModuleFilters({ search: '', multi: initMultiForModule(module), ranges: {} })
  }

  const addFavorite = (r: MembraneRecord) => {
    setFavorites((prev) => (prev.some((x) => x.id === r.id) ? prev : [...prev, r]))
  }
  const addFavorites = (records: MembraneRecord[]) => {
    if (records.length === 0) return
    setFavorites((prev) => {
      const ids = new Set(prev.map((x) => x.id))
      const added = records.filter((r) => !ids.has(r.id))
      return added.length > 0 ? [...prev, ...added] : prev
    })
  }
  const removeFavorites = (records: MembraneRecord[]) => {
    if (records.length === 0) return
    const ids = new Set(records.map((r) => r.id))
    setFavorites((prev) => prev.filter((x) => !ids.has(x.id)))
  }
  const isFavorite = (id: string) => favorites.some((x) => x.id === id)
  const toggleFavorites = (records: MembraneRecord[]) => {
    if (records.length === 0) return
    const allFavorited = records.every((r) => favorites.some((x) => x.id === r.id))
    if (allFavorited) removeFavorites(records)
    else addFavorites(records)
  }
  const removeFavorite = (id: string) => setFavorites((prev) => prev.filter((x) => x.id !== id))
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = (ids: string[]) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      const allSelected = ids.length > 0 && ids.every((id) => next.has(id))
      if (allSelected) ids.forEach((id) => next.delete(id))
      else ids.forEach((id) => next.add(id))
      return next
    })
  }

  return (
    <WorkspaceContext.Provider
      value={{
        activeModule,
        setActiveModule,
        moduleFilters,
        setModuleFilters,
        resetModuleFilters,
        favorites,
        addFavorite,
        addFavorites,
        removeFavorites,
        toggleFavorites,
        isFavorite,
        removeFavorite,
        selectedIds,
        toggleSelect,
        toggleSelectAll,
        clearSelection: () => setSelectedIds(new Set()),
        filteredRecords,
        setFilteredRecords,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) throw new Error('useWorkspace must be used within WorkspaceProvider')
  return ctx
}
