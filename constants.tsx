import { 
  Scan, 
  Target, 
  TriangleAlert, 
  Search, 
  EyeOff, 
  Radio, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Timer, 
  Settings, 
  Lightbulb 
} from 'lucide-react';
import { SlideContent, SlideType, PDCAStage } from './types';

export const SLIDES: SlideContent[] = [
  {
    id: 1,
    type: SlideType.COVER,
    title: "基于RFID技术的固定资产盘点流程优化",
    subtitle: "突破视距限制，实现资产“盲扫”式管理",
    highlight: "汇报人：熊远政",
    visualDescription: "Background: Circuit board abstract pattern"
  },
  {
    id: 2,
    type: SlideType.PROCESS,
    pdca: PDCAStage.NONE,
    title: "课题逻辑框架：PDCA循环应用",
    subtitle: "以精益管理思维推动技术落地",
    icon: Settings,
    points: [
      "Plan (策划)：针对视距限制痛点，确定引入RFID技术，制定抗干扰测试方案。",
      "Do (实施)：选取6台“硬骨头”设备极限测试（3台电脑+3台打印机），验证盲扫可行性。",
      "Check (检查)：收集实测数据，对比单机作业时间，验证效率提升。",
      "Act (处置)：总结测试问题，制定标签粘贴规范，提出增益天线升级计划。"
    ]
  },
  {
    id: 3,
    type: SlideType.Content,
    pdca: PDCAStage.PLAN,
    title: "现状与挑战：严苛的“账实相符”要求",
    icon: Target,
    points: [
      "管理现状：部门资产数量庞大，分布极度分散（电脑、打印机、办公家具）。",
      "行业标准：烟草行业国有资产管理红线——确保 100% 账实相符。",
      "当前困境：传统条码依赖人工逐一核对，耗时费力，压力巨大。"
    ]
  },
  {
    id: 4,
    type: SlideType.SPLIT,
    pdca: PDCAStage.PLAN,
    title: "痛点分析：传统方式的“姿势之痛”",
    subtitle: "为什么我们需要改变？",
    icon: TriangleAlert,
    points: [
      "姿势难：主机在桌底，标签靠里，需“钻桌底”查看。",
      "搬运难：打印机靠墙，标签在背部，核对需挪动重物。",
      "效率低：“寻找标签”的时间占盘点过程的 80%。"
    ]
  },
  {
    id: 5,
    type: SlideType.PROCESS,
    pdca: PDCAStage.PLAN,
    title: "试点方案设计：专啃“硬骨头”",
    icon: Search,
    points: [
      "选点逻辑：不选容易的，只选最难的。",
      "试点对象：3台台式电脑（测金属干扰） + 3台大型打印机（测死角盲区）。",
      "验证目标：不移动、不钻桌底，准确识别。"
    ]
  },
  {
    id: 6,
    type: SlideType.Content,
    pdca: PDCAStage.PLAN,
    title: "原因分析：核心症结—视距限制",
    subtitle: "Line of Sight",
    icon: EyeOff,
    points: [
      "根本原因：传统条形码/二维码必须“看见才能读”。",
      "直接影响：一旦有机箱、外壳遮挡，必须人工干预消除遮挡。",
      "结论：必须寻找一种具备“穿透性”的非接触识别技术。"
    ]
  },
  {
    id: 7,
    type: SlideType.SPLIT,
    pdca: PDCAStage.PLAN,
    title: "技术破局：引入RFID近场感应",
    icon: Radio,
    points: [
      "原理：利用无线射频信号穿透性，无需“一对一”对准。",
      "变革：从“眼睛找码”变为“设备感应”。",
      "预期：手持机靠近即读，无需弯腰，无需搬运。"
    ]
  },
  {
    id: 8,
    type: SlideType.PROCESS,
    pdca: PDCAStage.DO,
    title: "实施步骤一：攻克金属干扰",
    icon: ShieldCheck,
    points: [
      "问题：普通标签贴在金属机箱上，信号被屏蔽。",
      "对策：引入特种“抗金属RFID标签”。",
      "部署：贴附于主机侧面或隐蔽处。",
      "结果：成功解决屏蔽问题，实现稳定读取。"
    ]
  },
  {
    id: 9,
    type: SlideType.SPLIT,
    pdca: PDCAStage.DO,
    title: "实施步骤二：近场“盲扫”验证",
    icon: Zap,
    points: [
      "操作：手持PDA在设备周围 10-30cm 处“划过”。",
      "实测：隔着挡板听到“滴”声确认，无需挪动重物。",
      "体验：盘点从“体力活”变成简单的“挥手动作”。"
    ]
  },
  {
    id: 10,
    type: SlideType.CHART,
    pdca: PDCAStage.CHECK,
    title: "效果对比：单机效率模型验证",
    icon: TrendingUp,
    chartData: [
      { name: '传统方式', value: 45, fill: '#64748b' },
      { name: 'RFID方式', value: 4, fill: '#06b6d4' },
    ],
    points: [
      "传统方式：45秒 (查找、搬运、核对)",
      "RFID方式：4秒 (靠近即读)",
      "效率提升：> 10倍"
    ]
  },
  {
    id: 11,
    type: SlideType.BIG_NUMBER,
    pdca: PDCAStage.CHECK,
    title: "效益推算：从“半天”到“一杯咖啡”",
    icon: Timer,
    highlight: "20 分钟",
    subtitle: "300件资产盘点耗时对比",
    points: [
      "传统工时：300件 × 45秒 ≈ 3.75小时",
      "新技术工时：300件 × 4秒 ≈ 20分钟",
      "意义：极低成本让“周度盘点”成为可能。"
    ]
  },
  {
    id: 12,
    type: SlideType.Content,
    pdca: PDCAStage.ACT,
    title: "标准化与持续改进",
    icon: Settings,
    points: [
      "不足：当前功率下，有效距离 < 50cm，未实现“进门全扫”。",
      "改进：计划升级高增益天线，目标距离 > 2米。",
      "固化：起草《固定资产RFID标签粘贴规范》，入库即贴标。"
    ]
  },
  {
    id: 13,
    type: SlideType.CONCLUSION,
    title: "科技赋能，智慧管理",
    icon: Lightbulb,
    points: [
      "小样本试点验证了RFID在“盲区读取”的巨大优势。",
      "星星之火，可以燎原。为全公司数字化转型提供数据支撑。",
    ],
    highlight: "让资产管理不再繁琐，让数据真实可见。"
  }
];