export interface GlobalPartner {
  id: string
  institution: string
  country: string
  region: string
  focus: string
  lng: number
  lat: number
}

/** Equirectangular projection → percent (0–100) for map overlay */
export function projectMapPercent(lng: number, lat: number) {
  return {
    x: ((lng + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  }
}

/** SVG viewBox 0 0 100 50 (2:1) */
export function projectMapSvg(lng: number, lat: number) {
  return {
    x: ((lng + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 50,
  }
}

export const globalPartners: GlobalPartner[] = [
  { id: 'hit', institution: 'HIT', country: 'China', region: 'Asia', focus: 'Membrane separation & water treatment', lng: 126.63, lat: 45.75 },
  { id: 'tsinghua', institution: 'THU', country: 'China', region: 'Asia', focus: 'Membrane science & environmental engineering', lng: 116.33, lat: 40.00 },
  { id: 'mit', institution: 'MIT', country: 'USA', region: 'North America', focus: 'Membrane materials & transport', lng: -71.09, lat: 42.36 },
  { id: 'yale', institution: 'Yale', country: 'USA', region: 'North America', focus: 'Water science & membrane chemistry', lng: -72.92, lat: 41.31 },
  { id: 'nus', institution: 'NUS', country: 'Singapore', region: 'Asia', focus: 'Water treatment membranes', lng: 103.77, lat: 1.30 },
  { id: 'tongji', institution: 'TJU', country: 'China', region: 'Asia', focus: 'Municipal water & desalination', lng: 121.50, lat: 31.28 },
  { id: 'tu', institution: 'TU Delft', country: 'Netherlands', region: 'Europe', focus: 'Process design & ion separation', lng: 4.36, lat: 52.01 },
  { id: 'kaust', institution: 'KAUST', country: 'Saudi Arabia', region: 'Middle East', focus: 'Desalination & NF', lng: 39.10, lat: 22.31 },
  { id: 'toronto', institution: 'U of Toronto', country: 'Canada', region: 'North America', focus: 'Polyamide IP & characterization', lng: -79.40, lat: 43.66 },
  { id: 'kyoto', institution: 'Kyoto U', country: 'Japan', region: 'Asia', focus: 'Organic solvent NF', lng: 135.77, lat: 35.01 },
]

/** Hub-to-hub links for network animation */
export const networkLinks: [string, string][] = [
  ['hit', 'tsinghua'],
  ['tsinghua', 'tongji'],
  ['hit', 'tongji'],
  ['hit', 'nus'],
  ['hit', 'kyoto'],
  ['mit', 'yale'],
  ['yale', 'toronto'],
  ['mit', 'tu'],
  ['tu', 'kaust'],
  ['kaust', 'nus'],
  ['nus', 'tongji'],
  ['tongji', 'kyoto'],
  ['kyoto', 'nus'],
  ['mit', 'toronto'],
  ['toronto', 'mit'],
]

export const COLLAB_AREA_KEYS = [
  'dataShare',
  'aiMembrane',
  'literatureExtract',
  'highThroughput',
  'waterTreatment',
  'openPlatform',
] as const

export type CollabAreaKey = (typeof COLLAB_AREA_KEYS)[number]
