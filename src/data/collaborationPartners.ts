export interface GlobalPartner {
  id: string
  /** Short label on map pins and tag row */
  institution: string
  /** Full name shown when a node is selected */
  fullName: string
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
  { id: 'hit', institution: 'HIT', fullName: 'Harbin Institute of Technology', country: 'China', region: 'Asia', focus: 'Membrane separation & water treatment', lng: 126.63, lat: 45.75 },
  { id: 'tsinghua', institution: 'THU', fullName: 'Tsinghua University', country: 'China', region: 'Asia', focus: 'Membrane science & environmental engineering', lng: 116.33, lat: 40.00 },
  { id: 'nju', institution: 'NJU', fullName: 'Nanjing University', country: 'China', region: 'Asia', focus: 'Environmental chemistry & membrane materials', lng: 118.78, lat: 32.06 },
  { id: 'yale', institution: 'Yale', fullName: 'Yale University', country: 'USA', region: 'North America', focus: 'Water science & membrane chemistry', lng: -72.92, lat: 41.31 },
  { id: 'stanford', institution: 'Stanford', fullName: 'Stanford University', country: 'USA', region: 'North America', focus: 'Advanced membrane materials & desalination', lng: -122.17, lat: 37.43 },
  { id: 'cambridge', institution: 'Cambridge', fullName: 'University of Cambridge', country: 'UK', region: 'Europe', focus: 'Membrane transport & separation science', lng: 0.12, lat: 52.20 },
  { id: 'oxford', institution: 'Oxford', fullName: 'University of Oxford', country: 'UK', region: 'Europe', focus: 'Water treatment & environmental engineering', lng: -1.25, lat: 51.75 },
  { id: 'imperial', institution: 'Imperial', fullName: 'Imperial College London', country: 'UK', region: 'Europe', focus: 'Sustainable separation & membrane processes', lng: -0.17, lat: 51.50 },
  { id: 'eth', institution: 'ETH', fullName: 'ETH Zurich', country: 'Switzerland', region: 'Europe', focus: 'Thin-film composite NF/RO membranes', lng: 8.55, lat: 47.38 },
]

/** Hub-to-hub links for network animation */
export const networkLinks: [string, string][] = [
  ['hit', 'tsinghua'],
  ['hit', 'nju'],
  ['tsinghua', 'nju'],
  ['hit', 'yale'],
  ['yale', 'stanford'],
  ['yale', 'cambridge'],
  ['cambridge', 'oxford'],
  ['cambridge', 'imperial'],
  ['oxford', 'imperial'],
  ['imperial', 'eth'],
  ['eth', 'cambridge'],
  ['stanford', 'yale'],
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
