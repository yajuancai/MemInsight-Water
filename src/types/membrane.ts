import type { ModuleKey } from '../data/moduleStats'

export type MembraneType = 'NF' | 'RO' | 'UF' | 'MF'
export type MonomerSystem = string

export interface MembraneRecord {
  id: string
  name: string
  module: ModuleKey
  moduleFields: Record<string, string>
  membraneType: MembraneType
  polymer: string
  monomerSystem: MonomerSystem
  mwco: number // Da
  flux: number // LMH/bar
  saltRejection: Record<string, number> // salt name -> %
  monoDivalentFactor: number
  monoSalt: string
  divalentSalt: string
  tocRejection: number
  poreSize: number // nm
  crosslinkDegree: number // %
  surfaceCharge: number // mV (zeta)
  testPressure: number // bar
  testTemp: number // °C
  stabilityHours: number
  foulingResistance: number // 0-100 score
  doi: string
  authors: string
  year: number
  journal: string
  fabrication: string
  ipConditions: string
  characterization: string
}

export interface DatabaseStats {
  literatureCount: number
  materialCount: number
  polymerTypes: number
  performanceEntries: number
  testSystems: number
}

export interface FilterState {
  search: string
  membraneTypes: MembraneType[]
  monomerSystems: MonomerSystem[]
  monoSalt: string
  divalentSalt: string
  monoDivalentMin: number
  monoDivalentMax: number
  fluxMin: number
  fluxMax: number
  saltForRejection: string
  saltRejectionMin: number
  saltRejectionMax: number
  tocRejectionMin: number
  mwcoMin: number
  mwcoMax: number
  sortField: keyof MembraneRecord | ''
  sortDir: 'asc' | 'desc'
  visibleColumns: (keyof MembraneRecord)[]
}

export const ALL_COLUMNS: (keyof MembraneRecord)[] = [
  'id', 'name', 'membraneType', 'polymer', 'monomerSystem', 'mwco', 'flux',
  'monoDivalentFactor', 'monoSalt', 'divalentSalt', 'tocRejection', 'poreSize',
  'crosslinkDegree', 'surfaceCharge', 'testPressure', 'testTemp', 'stabilityHours',
  'foulingResistance', 'doi', 'authors', 'year', 'journal', 'fabrication',
  'ipConditions', 'characterization',
]

export const DEFAULT_VISIBLE_COLUMNS: (keyof MembraneRecord)[] = [
  'id', 'name', 'membraneType', 'monomerSystem', 'mwco', 'flux',
  'monoDivalentFactor', 'tocRejection', 'doi', 'year',
]
