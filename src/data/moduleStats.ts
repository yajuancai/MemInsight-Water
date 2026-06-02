export type ModuleKey =
  | 'fabrication'
  | 'synthesis'
  | 'separation'
  | 'stability'
  | 'fouling'
  | 'simulation'

export interface ModuleStat {
  key: ModuleKey
  entries: number
  literature: number
  fields: number
}

export const MODULE_STATS: ModuleStat[] = [
  { key: 'fabrication', entries: 1240, literature: 486, fields: 28 },
  { key: 'synthesis', entries: 101, literature: 10, fields: 38 },
  { key: 'separation', entries: 3482, literature: 890, fields: 42 },
  { key: 'stability', entries: 720, literature: 298, fields: 18 },
  { key: 'fouling', entries: 640, literature: 274, fields: 16 },
  { key: 'simulation', entries: 860, literature: 312, fields: 24 },
]

export const MODULE_TOTAL_ENTRIES = MODULE_STATS.reduce((s, m) => s + m.entries, 0)
