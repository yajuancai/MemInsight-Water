import type { ModuleKey } from './moduleStats'
import type { DatabaseStats, MembraneRecord } from '../types/membrane'
import { PE_SYNTHESIS_RECORDS } from './peSynthesisRecords'

export const databaseStats: DatabaseStats = {
  literatureCount: 2980,
  materialCount: 6248,
  polymerTypes: 1236,
  performanceEntries: 3482,
  testSystems: 45,
}

const MODULES: ModuleKey[] = ['fabrication', 'synthesis', 'separation', 'stability', 'fouling', 'simulation']

const FIELD_POOLS: Record<ModuleKey, Record<string, string[]>> = {
  fabrication: {
    castingSolvent: ['DMAC', 'DMF', 'NMP', 'DMAc', 'Water'],
    basePolymer: ['PES', 'PAN', 'PVDF', 'PSf', 'PE', 'PP'],
    fabricationMethod: ['Phase inversion', 'Electrospinning', 'Stretching', 'Track-etch'],
    coagulationBath: ['Water', 'Water/Ethanol', 'Nonsolvent'],
  },
  synthesis: {
    monomerSystem: ['PSS/PDADMAC', 'PEI/PSS', 'PAA/PAH', 'PEI/PAA', 'Other'],
    monomerA: ['PSS', 'PAA', 'Alginate', 'Heparin', 'DNA'],
    monomerB: ['PDADMAC', 'PEI', 'PAH', 'Chitosan', 'PLL'],
    solvent: ['Water', 'NaCl buffer', 'pH buffer', 'Ethanol/Water'],
    poreRange: ['<0.5 nm', '0.5–1 nm', '1–2 nm', '>2 nm'],
    hydrophilicity: ['Hydrophilic', 'Moderate', 'Hydrophobic'],
  },
  separation: {
    membraneType: ['NF', 'RO', 'UF', 'MF'],
    monoSalt: ['NaCl', 'LiCl', 'KCl'],
    divalentSalt: ['MgCl2', 'CaCl2', 'MgSO4', 'Na2SO4'],
  },
  stability: {
    testMedium: ['NaClO', 'HCl', 'NaOH', 'Chlorine', 'Pure water'],
    duration: ['<100 h', '100–500 h', '500–1000 h', '>1000 h'],
    mechanical: ['Tensile', 'Burst', 'Compaction'],
  },
  fouling: {
    foulantType: ['HA', 'BSA', 'SA', 'Oil', 'Silica'],
    cleaningMethod: ['Physical flush', 'NaOH wash', 'Acid wash', 'Enzyme'],
    antifouling: ['PVA coating', 'Zwitterion', 'PEGylation', 'None'],
  },
  simulation: {
    processModel: ['CFD', 'Process simulation', 'Techno-economic', 'ML surrogate'],
    operatingMode: ['NF', 'RO', 'BMED', 'ED', 'Hybrid NF-RO'],
    feedComposition: ['Brackish', 'Seawater', 'Reuse water', 'Industrial wastewater'],
    optimizationObjective: ['Energy', 'Flux', 'Recovery', 'Cost', 'Salt selectivity'],
  },
}

function rand(min: number, max: number, dec = 1) {
  const v = Math.random() * (max - min) + min
  return Math.round(v * 10 ** dec) / 10 ** dec
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function buildModuleFields(module: ModuleKey): Record<string, string> {
  if (module === 'synthesis') {
    const pool = FIELD_POOLS.synthesis
    const fields: Record<string, string> = {}
    for (const [key, options] of Object.entries(pool)) {
      fields[key] = pick(options)
    }
    fields.roughnessRa = String(rand(0.5, 28, 1))
    fields.roughnessRq = String(rand(0.6, 35, 1))
    fields.contactAngle = String(rand(28, 95, 0))
    fields.zetaPotential = String(rand(-55, 15, 1))
    return fields
  }
  if (module === 'simulation') {
    const pool = FIELD_POOLS.simulation
    return {
      processModel: pick(pool.processModel),
      operatingMode: pick(pool.operatingMode),
      feedComposition: pick(pool.feedComposition),
      optimizationObjective: pick(pool.optimizationObjective),
      targetFlux: String(rand(2, 48, 1)),
    }
  }
  const pool = FIELD_POOLS[module]
  const fields: Record<string, string> = {}
  for (const [key, options] of Object.entries(pool)) {
    fields[key] = pick(options)
  }
  return fields
}

const salts = ['NaCl', 'MgCl2', 'CaCl2', 'Na2SO4', 'MgSO4', 'LiCl', 'KCl']
const OTHER_MODULES = MODULES.filter((m) => m !== 'synthesis')

const mockOtherRecords: MembraneRecord[] = Array.from({ length: 120 }, (_, i) => {
  const module = OTHER_MODULES[i % OTHER_MODULES.length]
  const moduleFields = buildModuleFields(module)
  const saltRej: Record<string, number> = {}
  salts.forEach((s) => { saltRej[s] = rand(15, 99) })

  return {
    id: `MEM-${String(i + 1).padStart(4, '0')}`,
    name: `Membrane-${module.slice(0, 3).toUpperCase()}-${i + 1}`,
    module,
    moduleFields,
    membraneType: (moduleFields.membraneType as MembraneRecord['membraneType']) || pick(['NF', 'RO', 'UF', 'MF']),
    polymer: pick(['Polyelectrolyte', 'PES', 'PAN', 'PVDF', 'PSf']),
    monomerSystem: (moduleFields.monomerSystem as MembraneRecord['monomerSystem']) || 'PSS/PDADMAC',
    mwco: rand(150, 800, 0),
    flux: rand(2, 45),
    saltRejection: saltRej,
    monoDivalentFactor: rand(1.2, 25, 2),
    monoSalt: moduleFields.monoSalt || pick(['NaCl', 'LiCl', 'KCl']),
    divalentSalt: moduleFields.divalentSalt || pick(['MgCl2', 'CaCl2']),
    tocRejection: rand(40, 99),
    poreSize: rand(0.3, 2.5, 2),
    crosslinkDegree: rand(30, 95, 0),
    surfaceCharge: rand(-45, 15, 1),
    testPressure: pick([5, 6, 10, 15]),
    testTemp: pick([20, 25, 35]),
    stabilityHours: rand(24, 2000, 0),
    foulingResistance: rand(40, 98, 0),
    doi: `10.1016/j.memsci.202${i % 5}.${10000 + i}`,
    authors: pick(['Zhang et al.', 'Li et al.', 'Wang et al.', 'Chen et al.', 'Kumar et al.']),
    year: 2018 + (i % 7),
    journal: pick(['J. Membr. Sci.', 'Desalination', 'Water Res.', 'ACS Appl. Mater.']),
    fabrication: `${moduleFields.fabricationMethod || 'Phase inversion'} on ${moduleFields.basePolymer || 'PES'}`,
    ipConditions: `${moduleFields.monomerSystem || 'PSS/PDADMAC'} ${Math.floor(rand(2, 12, 0))} bilayers, pH ${rand(3, 10, 0)}`,
    characterization: `Ra ${moduleFields.roughnessRa ?? '—'} nm, θ ${moduleFields.contactAngle ?? '—'}°`,
  }
})

export const membraneRecords: MembraneRecord[] = [...PE_SYNTHESIS_RECORDS, ...mockOtherRecords]
