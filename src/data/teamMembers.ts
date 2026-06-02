export interface TeamPerson {
  id: string
  roleKey: string
  name: string
  photo?: string
  focus?: string
  tags?: string[]
}

/** 核心团队：项目负责人、指导教师、领域专家 */
export const CORE_TEAM: TeamPerson[] = [
  {
    id: 'lead',
    roleKey: 'projectLead',
    name: '蔡雅娟',
    photo: '/team/cai-yajuan.png',
    focus: '项目统筹 · 数据库架构 · 膜数据标准',
    tags: ['项目管理', '数据库'],
  },
  {
    id: 'advisor',
    roleKey: 'advisor',
    name: '王盼盼',
    photo: '/team/wang-panpan.png',
    focus: '研究方向把握 · 学术指导 · 成果把关',
    tags: ['膜分离', '水处理'],
  },
  {
    id: 'expert',
    roleKey: 'domainExpert',
    name: '马军院士',
    photo: '/team/ma-jun.png',
    focus: '水处理与膜分离 · 学术引领 · 战略咨询',
    tags: ['院士', '水处理'],
  },
]

/** 项目成员：数据挖掘等执行角色 */
export const PROJECT_TEAM: TeamPerson[] = [
  {
    id: 'data-mining',
    roleKey: 'dataMining',
    name: '翟亚茹',
    photo: '/team/zhai-yaru.png',
    focus: '特征工程 · 关联规则 · 结构–性能建模',
    tags: ['Python', '统计分析'],
  },
  {
    id: 'literature',
    roleKey: 'literatureMining',
    name: '刘欣',
    photo: '/team/liu-xin.png',
    focus: '文献采集 · 实体抽取 · 描述符规范化',
    tags: ['NLP', '知识抽取'],
  },
  {
    id: 'database',
    roleKey: 'databaseEngineer',
    name: '廖俊剑',
    photo: '/team/liao-junjian.png',
    focus: 'Schema 设计 · 数据清洗 · 接口与导出',
    tags: ['PostgreSQL', 'ETL'],
  },
  {
    id: 'ml',
    roleKey: 'mlEngineer',
    name: '周睿',
    photo: '/team/zhou-rui.png',
    focus: '性能预测 · 材料筛选 · 模型评估',
    tags: ['ML', '膜性能'],
  },
  {
    id: 'testing',
    roleKey: 'membraneTesting',
    name: '膜性能测试',
    focus: '通量/截留 · 稳定性 · 抗污染评价',
    tags: ['分离性能', '实验'],
  },
  {
    id: 'platform',
    roleKey: 'platformDev',
    name: '平台开发',
    focus: '前端交互 · 可视化 · 工作区功能',
    tags: ['React', '数据可视化'],
  },
]
