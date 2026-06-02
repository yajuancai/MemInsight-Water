import type { ModuleKey } from './moduleStats'

export type FilterFieldDef =
  | { id: string; type: 'multi'; options: string[] }
  | { id: string; type: 'range'; min: number; max: number; unit?: string }

export interface ModuleSchema {
  columns: string[]
  fields: FilterFieldDef[]
}

export const MODULE_FILTER_SCHEMAS: Record<ModuleKey, ModuleSchema> = {
  fabrication: {
    columns: ['id', 'name', 'castingSolvent', 'basePolymer', 'fabricationMethod', 'poreSize', 'doi', 'year'],
    fields: [
      { id: 'castingSolvent', type: 'multi', options: ['DMAC', 'DMF', 'NMP', 'DMAc', 'Water'] },
      { id: 'basePolymer', type: 'multi', options: ['PES', 'PAN', 'PVDF', 'PSf', 'PE', 'PP'] },
      { id: 'fabricationMethod', type: 'multi', options: ['Phase inversion', 'Electrospinning', 'Stretching', 'Track-etch'] },
      { id: 'coagulationBath', type: 'multi', options: ['Water', 'Water/Ethanol', 'Nonsolvent'] },
    ],
  },
  synthesis: {
    columns: [
      'id',
      'name',
      'support_material',
      'support_geometry',
      'polycation_name',
      'polyanion_name',
      'assembly_mode',
      'bilayer_number',
      'first_layer',
      'outermost_layer',
      'rejection_salt',
      'salt_rejection',
      'rejection_salt_permeance',
      'year',
      'doi',
    ],
    fields: [
      { id: 'support_material', type: 'multi', options: ['PES'] },
      { id: 'support_geometry', type: 'multi', options: ['hollow fiber'] },
      { id: 'polycation_name', type: 'multi', options: ['PAH', 'PDADMAC', 'PEI', 'PVAm', 'PVBTMAC'] },
      { id: 'polyanion_name', type: 'multi', options: ['PSS'] },
      { id: 'assembly_mode', type: 'multi', options: ['dynamic', 'dynamic-static', 'static'] },
      { id: 'assembly_position', type: 'multi', options: ['hollow_fiber_inner', 'hollow_fiber_outer'] },
      { id: 'first_layer', type: 'multi', options: ['PAH', 'PDADMAC', 'PSS', 'PVAm'] },
      { id: 'outermost_layer', type: 'multi', options: ['PAH', 'PDADMAC', 'PEI', 'PSS'] },
      { id: 'crosslinker', type: 'multi', options: ['GA'] },
      { id: 'rejection_salt', type: 'multi', options: ['Ca2+', 'CaCl2', 'LiCl', 'Mg2+', 'MgCl2', 'MgSO4', 'Na2SO4', 'NaCl', 'Sr2+', 'SrCl2'] },
      { id: 'bilayer_number', type: 'range', min: 1, max: 10, unit: '' },
      { id: 'polycation_deposition_time', type: 'range', min: 0, max: 30, unit: ' min' },
      { id: 'polyanion_deposition_time', type: 'range', min: 0, max: 30, unit: ' min' },
      { id: 'salt_rejection', type: 'range', min: 0, max: 100, unit: '%' },
      { id: 'zeta_potential', type: 'range', min: -31, max: 10, unit: ' mV' },
      { id: 'rejection_salt_permeance', type: 'range', min: 0, max: 350, unit: ' LMH/bar' },
    ],
  },
  separation: {
    columns: ['id', 'name', 'membraneType', 'flux', 'monoDivalentFactor', 'tocRejection', 'testPressure', 'doi'],
    fields: [
      { id: 'membraneType', type: 'multi', options: ['NF', 'RO', 'UF', 'MF'] },
      { id: 'monoSalt', type: 'multi', options: ['NaCl', 'LiCl', 'KCl'] },
      { id: 'divalentSalt', type: 'multi', options: ['MgCl2', 'CaCl2', 'MgSO4', 'Na2SO4'] },
      { id: 'flux', type: 'range', min: 0, max: 50, unit: ' LMH/bar' },
      { id: 'saltRejection', type: 'range', min: 0, max: 100, unit: '%' },
    ],
  },
  stability: {
    columns: ['id', 'name', 'stabilityHours', 'testPressure', 'testTemp', 'chemicalExposure', 'doi'],
    fields: [
      { id: 'testMedium', type: 'multi', options: ['NaClO', 'HCl', 'NaOH', 'Chlorine', 'Pure water'] },
      { id: 'duration', type: 'multi', options: ['<100 h', '100–500 h', '500–1000 h', '>1000 h'] },
      { id: 'mechanical', type: 'multi', options: ['Tensile', 'Burst', 'Compaction'] },
    ],
  },
  fouling: {
    columns: ['id', 'name', 'foulingResistance', 'foulantType', 'fluxRecovery', 'cleaningMethod', 'doi'],
    fields: [
      { id: 'foulantType', type: 'multi', options: ['HA', 'BSA', 'SA', 'Oil', 'Silica'] },
      { id: 'cleaningMethod', type: 'multi', options: ['Physical flush', 'NaOH wash', 'Acid wash', 'Enzyme'] },
      { id: 'antifouling', type: 'multi', options: ['PVA coating', 'Zwitterion', 'PEGylation', 'None'] },
    ],
  },
  simulation: {
    columns: ['id', 'name', 'processModel', 'operatingMode', 'feedComposition', 'optimizationObjective', 'targetFlux', 'doi'],
    fields: [
      { id: 'processModel', type: 'multi', options: ['CFD', 'Process simulation', 'Techno-economic', 'ML surrogate'] },
      { id: 'operatingMode', type: 'multi', options: ['NF', 'RO', 'BMED', 'ED', 'Hybrid NF-RO'] },
      { id: 'feedComposition', type: 'multi', options: ['Brackish', 'Seawater', 'Reuse water', 'Industrial wastewater'] },
      { id: 'optimizationObjective', type: 'multi', options: ['Energy', 'Flux', 'Recovery', 'Cost', 'Salt selectivity'] },
      { id: 'targetFlux', type: 'range', min: 0, max: 60, unit: ' LMH' },
    ],
  },
}
