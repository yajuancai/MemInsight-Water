export type DatasetSourceType = 'literature' | 'scholar'

export interface SharedDataset {
  id: string
  title: string
  contributor: string
  sourceType: DatasetSourceType
  recordCount: number
  modules: string[]
  year: number
  doi?: string
}

export const SHARED_DATASETS: SharedDataset[] = [
  {
    id: 'ds-001',
    title: 'NF 聚电解质膜通量与截留性能文献集',
    contributor: 'J. Membr. Sci. 2018–2023 批量抽取',
    sourceType: 'literature',
    recordCount: 186,
    modules: ['separation', 'synthesis'],
    year: 2024,
    doi: '10.1016/j.memsci.2023.122145',
  },
  {
    id: 'ds-002',
    title: '聚电解质 NF 膜长期稳定性数据',
    contributor: 'Desalination 专题文献挖掘',
    sourceType: 'literature',
    recordCount: 94,
    modules: ['stability', 'separation'],
    year: 2024,
  },
  {
    id: 'ds-003',
    title: '中空纤维 UF 抗污染实验批次',
    contributor: '同济大学环境学院 · 李课题组',
    sourceType: 'scholar',
    recordCount: 42,
    modules: ['fouling', 'separation'],
    year: 2025,
  },
  {
    id: 'ds-004',
    title: 'PSS/PDADMAC 聚电解质纳滤膜结构表征参数集',
    contributor: 'Harbin Institute of Technology',
    sourceType: 'scholar',
    recordCount: 58,
    modules: ['synthesis', 'simulation'],
    year: 2025,
  },
  {
    id: 'ds-005',
    title: '有机溶剂纳滤膜文献描述符库',
    contributor: 'ACS Appl. Mater. Interfaces 综述扩展',
    sourceType: 'literature',
    recordCount: 127,
    modules: ['synthesis', 'separation'],
    year: 2023,
    doi: '10.1021/acsami.2c12345',
  },
  {
    id: 'ds-006',
    title: '工业卷式 NF 组件现场运行数据',
    contributor: '某膜企业合作方（脱敏）',
    sourceType: 'scholar',
    recordCount: 31,
    modules: ['separation', 'stability'],
    year: 2025,
  },
  {
    id: 'ds-007',
    title: '铸膜液配方与相转化条件文献集',
    contributor: 'J. Membr. Sci. / Water Res. 联合抽取',
    sourceType: 'literature',
    recordCount: 203,
    modules: ['fabrication'],
    year: 2024,
  },
  {
    id: 'ds-008',
    title: 'PEI/PSS 正电荷聚电解质纳滤膜性能贡献',
    contributor: '新加坡国立大学 · 合作学者投稿',
    sourceType: 'scholar',
    recordCount: 26,
    modules: ['synthesis', 'separation'],
    year: 2025,
  },
]
