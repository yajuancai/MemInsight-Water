/**
 * Reads PE_membrane_sum.xlsx and generates src/data/peSynthesisRecords.ts
 * Run: node scripts/generate-pe-synthesis.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import XLSX from 'xlsx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const xlsxPath = path.join(root, 'data import', 'PE_membrane_sum.xlsx')
const outPath = path.join(root, 'src', 'data', 'peSynthesisRecords.ts')

function str(v) {
  if (v === null || v === undefined || v === '') return ''
  return String(v).trim()
}

function num(v, fallback = 0) {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

function fixDoi(source) {
  return str(source).replace(/%/g, '/')
}

function rowToRecord(row, index) {
  const polycation = str(row.polycation_name)
  const polyanion = str(row.polyanion_name)
  const rejectionSalt = str(row.rejection_salt)
  const saltRejection = num(row.salt_rejection)
  const bilayers = num(row.bilayer_number)
  const permeance = num(row.rejection_salt_permeance) || num(row.PE_water_permeance)
  const mwco = num(row.support_material_MWCO)
  const zeta = num(row.zeta_potential, NaN)
  const contactAngle = num(row.water_contact_angle, NaN)

  const moduleFields = {
    support_material: str(row.support_material),
    support_geometry: str(row.support_geometry),
    support_material_MWCO: str(row.support_material_MWCO),
    support_material_water_permeance: str(row.support_material_water_permeance),
    polycation_name: polycation,
    polycation_Mw_range: str(row.polycation_Mw_range),
    polycation_concentration: str(row.polycation_concentration),
    polycation_pH: str(row.polycation_pH),
    polycation_electrolyte_salt: str(row.polycation_electrolyte_salt),
    polycation_electrolyte_salt_concentration: str(row.polycation_electrolyte_salt_concentration),
    polycation_deposition_time: str(row.polycation_deposition_time),
    polyanion_name: polyanion,
    polyanion_Mw_range: str(row.polyanion_Mw_range),
    polyanion_concentration: str(row.polyanion_concentration),
    polyanion_pH: str(row.polyanion_pH),
    polyanion_electrolyte_salt: str(row.polyanion_electrolyte_salt),
    polyanion_electrolyte_salt_concentration: str(row.polyanion_electrolyte_salt_concentration),
    polyanion_deposition_time: str(row.polyanion_deposition_time),
    assembly_mode: str(row.assembly_mode),
    assembly_position: str(row.assembly_position),
    first_layer: str(row.first_layer),
    outermost_layer: str(row.outermost_layer),
    crosslinker: str(row.crosslinker),
    crosslinker_concentration: str(row.crosslinker_concentration),
    crosslinking_time: str(row.crosslinking_time),
    bilayer_number: str(row.bilayer_number),
    active_layer_thickness: str(row.active_layer_thickness),
    water_contact_angle: str(row.water_contact_angle),
    zeta_potential: str(row.zeta_potential),
    PE_water_test_pressure: str(row.PE_water_test_pressure),
    PE_water_permeance: str(row.PE_water_permeance),
    rejection_salt: rejectionSalt,
    rejection_salt_concentration: str(row.rejection_salt_concentration),
    rejection_salt_test_pressure: str(row.rejection_salt_test_pressure),
    rejection_salt_permeance: str(row.rejection_salt_permeance),
    salt_rejection: str(row.salt_rejection),
    processing_time_s: str(row['processing time (s)']),
  }

  const saltRej = {}
  if (rejectionSalt) saltRej[rejectionSalt] = saltRejection

  const doi = fixDoi(row.source)
  const year = num(row.year, 2014)

  return {
    id: `PE-SYN-${String(index + 1).padStart(3, '0')}`,
    name: `${polyanion}/${polycation} · ${bilayers || '?'} BL`,
    module: 'synthesis',
    moduleFields,
    membraneType: 'NF',
    polymer: 'Polyelectrolyte',
    monomerSystem: polyanion && polycation ? `${polyanion}/${polycation}` : 'Other',
    mwco: mwco || 0,
    flux: permeance,
    saltRejection: saltRej,
    monoDivalentFactor: 0,
    monoSalt: rejectionSalt,
    divalentSalt: rejectionSalt,
    tocRejection: 0,
    poreSize: 0,
    crosslinkDegree: bilayers,
    surfaceCharge: Number.isFinite(zeta) ? zeta : 0,
    testPressure: num(row.rejection_salt_test_pressure) || num(row.PE_water_test_pressure),
    testTemp: 25,
    stabilityHours: 0,
    foulingResistance: 0,
    doi,
    authors: '',
    year,
    journal: '',
    fabrication: `${moduleFields.support_material} ${moduleFields.support_geometry}`.trim(),
    ipConditions: [
      moduleFields.assembly_mode,
      `${moduleFields.first_layer}→${moduleFields.outermost_layer}`,
      `${bilayers} bilayers`,
    ]
      .filter(Boolean)
      .join(', '),
    characterization: [
      Number.isFinite(contactAngle) ? `θ ${contactAngle}°` : '',
      Number.isFinite(zeta) ? `ζ ${zeta} mV` : '',
    ]
      .filter(Boolean)
      .join(', ') || '—',
  }
}

const wb = XLSX.readFile(xlsxPath)
const rows = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'], { defval: '' })
const records = rows.map((row, i) => rowToRecord(row, i))

const header = `/* Auto-generated from data import/PE_membrane_sum.xlsx — do not edit by hand */
import type { MembraneRecord } from '../types/membrane'

export const PE_SYNTHESIS_RECORDS: MembraneRecord[] = `

fs.writeFileSync(outPath, header + JSON.stringify(records, null, 2) + '\n', 'utf8')
console.log(`Wrote ${records.length} records to ${outPath}`)
