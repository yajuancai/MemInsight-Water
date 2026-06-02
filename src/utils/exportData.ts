import type { MembraneRecord } from '../types/membrane'

function flattenRecord(r: MembraneRecord) {
  return {
    ...r,
    ...r.moduleFields,
    saltRejection_NaCl: r.saltRejection.NaCl,
    saltRejection_MgCl2: r.saltRejection.MgCl2,
    saltRejection_CaCl2: r.saltRejection.CaCl2,
    saltRejection_Na2SO4: r.saltRejection.Na2SO4,
    saltRejection: undefined,
    moduleFields: undefined,
  }
}

async function loadXlsx() {
  const mod = await import('xlsx')
  return mod.default ?? mod
}

export async function exportToXlsx(records: MembraneRecord[], filename = 'membrane_data.xlsx') {
  const XLSX = await loadXlsx()
  const data = records.map((r) => {
    const flat = flattenRecord(r)
    delete (flat as { saltRejection?: unknown }).saltRejection
    return flat
  })
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Membranes')
  XLSX.writeFile(wb, filename)
}

export async function exportToCsv(records: MembraneRecord[], filename = 'membrane_data.csv') {
  const XLSX = await loadXlsx()
  const data = records.map(flattenRecord)
  const ws = XLSX.utils.json_to_sheet(data)
  const csv = XLSX.utils.sheet_to_csv(ws)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}
