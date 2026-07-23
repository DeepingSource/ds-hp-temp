export type TeamGroup =
  | 'Executive'
  | 'Store Agent'
  | 'Core'
  | 'Future'
  | 'Solution Delivery'
  | 'SCI'
  | 'PM & Business'
  | 'Operations';

export interface TeamMember {
  id: string;
  nameKo: string;
  nameEn: string;
  team: string;
  group: TeamGroup;
  role: string;
  isLeadership?: boolean;
  avatarColor?: string;
  bioKo?: string;
  bioEn?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  // ── Leadership ──
  {
    id: 'taehoon-kim',
    nameKo: '김태훈',
    nameEn: 'Pete Tae-Hoon Kim',
    team: 'Corporation',
    group: 'Executive',
    role: 'CEO and Founder, Ph.D',
    isLeadership: true,
    avatarColor: 'bg-primary text-white',
    bioKo: 'KAIST 전산학 박사. 딥핑소스 창업자로서 프라이버시 존중형 공간 AI의 비전을 이끌고 있습니다.',
    bioEn: 'Ph.D. in CS from KAIST. Leading DeepingSource’s vision for privacy-preserving spatial AI.',
  },
  {
    id: 'sumin-lee',
    nameKo: '이수민',
    nameEn: 'Sumin Lee',
    team: 'Corporation',
    group: 'Executive',
    role: 'Head of US Branch & Founder',
    isLeadership: true,
    avatarColor: 'bg-indigo-600 text-white',
    bioKo: '공동 창업자 및 미국 법인장으로서 글로벌 사업 확장 및 전략 파트너십을 총괄합니다.',
    bioEn: 'Co-founder & Head of US Branch, driving global expansion and strategic enterprise partnerships.',
  },
  {
    id: 'sangho-kum',
    nameKo: '금상호',
    nameEn: 'Sangho Kum',
    team: 'CBO',
    group: 'Executive',
    role: 'Chief Business Officer',
    isLeadership: true,
    avatarColor: 'bg-emerald-600 text-white',
    bioKo: 'CBO로서 글로벌 리테일 및 글로벌 사업 성장 전략과 영업 파트너십을 이끕니다.',
    bioEn: 'Chief Business Officer leading enterprise sales, growth strategies, and market partnerships.',
  },
  {
    id: 'bongkyung-ko',
    nameKo: '고봉경',
    nameEn: 'Bongkyung Ko',
    team: 'SCI / Engineering',
    group: 'Executive',
    role: 'VP of Engineering',
    isLeadership: true,
    avatarColor: 'bg-blue-600 text-white',
    bioKo: '엔지니어링 총괄 VP로서 SAAI 코어 기술 엔진 및 프라이버시 AI 파이프라인의 엔지니어링을 지휘합니다.',
    bioEn: 'VP of Engineering overseeing core SAAI spatial AI engine and software architectures.',
  },
  {
    id: 'sukbum-choi',
    nameKo: '최석범',
    nameEn: 'Sukbum Choi',
    team: 'Operations',
    group: 'Executive',
    role: 'VP of Operations',
    isLeadership: true,
    avatarColor: 'bg-violet-600 text-white',
    bioKo: '운영 총괄 VP로서 글로벌 오프라인 현장 솔루션 딜리버리 및 기업 운영 체계를 총괄합니다.',
    bioEn: 'VP of Operations overseeing global solution delivery and operational excellence.',
  },
  {
    id: 'inbeom-hwang',
    nameKo: '황인범',
    nameEn: 'Inbeom Hwang',
    team: 'SCI',
    group: 'SCI',
    role: 'SCI Team Manager',
    isLeadership: true,
    avatarColor: 'bg-cyan-600 text-white',
    bioKo: 'SCI 팀 매니저로서 공간 인지 AI 기술 고도화 및 인프라 연구개발을 이끕니다.',
    bioEn: 'SCI Team Manager leading spatial intelligence research and model innovation.',
  },
  {
    id: 'chaeheum-park',
    nameKo: '박채흠',
    nameEn: 'Chaeheum Park',
    team: 'Core',
    group: 'Core',
    role: 'Core Team Manager',
    isLeadership: true,
    avatarColor: 'bg-amber-600 text-white',
    bioKo: 'Core 팀 매니저로서 익명화 및 기초 비전 모델 기반 기술을 안정화합니다.',
    bioEn: 'Core Team Manager focusing on foundational vision models and anonymization tech.',
  },
  {
    id: 'sangkeun-park',
    nameKo: '박상근',
    nameEn: 'Sangkeun Park',
    team: 'PM',
    group: 'PM & Business',
    role: 'PM Team Manager',
    isLeadership: true,
    avatarColor: 'bg-rose-600 text-white',
    bioKo: 'PM 팀 매니저로서 제품 로드맵 및 오프라인 공간 고객 가치를 관리합니다.',
    bioEn: 'PM Team Manager governing product roadmaps and customer value alignment.',
  },
  {
    id: 'juyoung-yoon',
    nameKo: '윤주영',
    nameEn: 'Juyoung Yoon',
    team: 'Future / Solution Delivery',
    group: 'Solution Delivery',
    role: 'Solution Delivery Team Manager',
    isLeadership: true,
    avatarColor: 'bg-teal-600 text-white',
    bioKo: '솔루션 딜리버리 팀 매니저로서 고객 매장 맞춤 배포 및 필드 엔지니어링을 총괄합니다.',
    bioEn: 'Solution Delivery Manager directing field deployments and customer engineering.',
  },

  // ── Store Agent Team ──
  { id: 'jamin-park', nameKo: '박재민', nameEn: 'Jamin Park', team: 'Store Agent', group: 'Store Agent', role: 'Product Owner' },
  { id: 'jaewon-jang', nameKo: '장재원', nameEn: 'Jaewon Jang', team: 'Store Agent', group: 'Store Agent', role: 'Machine Learning Engineer' },
  { id: 'jaeyung-park', nameKo: '박재영', nameEn: 'Jaeyung Park', team: 'Store Agent', group: 'Store Agent', role: 'Software Engineer' },
  { id: 'yongwoo-kim', nameKo: '김용우', nameEn: 'Yongwoo Kim', team: 'Store Agent', group: 'Store Agent', role: 'Software Engineer' },
  { id: 'seulgi-jo', nameKo: '조슬기', nameEn: 'Seulgi Jo', team: 'Store Agent', group: 'Store Agent', role: 'Product Designer' },
  { id: 'eunji-kim', nameKo: '김은지', nameEn: 'Eunji Kim', team: 'Store Agent', group: 'Store Agent', role: 'Business Data Analyst' },
  { id: 'eunyoung-park', nameKo: '박은영', nameEn: 'Eunyoung Park', team: 'Store Agent', group: 'Store Agent', role: 'Business Data Analyst' },
  { id: 'jeongeun-hyeon', nameKo: '현정은', nameEn: 'Jeongeun Hyeon', team: 'Store Agent', group: 'Store Agent', role: 'Product Management' },

  // ── Core Team ──
  { id: 'myeongjun-kim', nameKo: '김명준', nameEn: 'Myeongjun Kim', team: 'Core', group: 'Core', role: 'Machine Learning Engineer' },
  { id: 'yeonhui-kim', nameKo: '김연희', nameEn: 'Yeonhui Kim', team: 'Core', group: 'Core', role: 'Senior Machine Learning Engineer' },

  // ── Future Team ──
  { id: 'joongwoo-park', nameKo: '박중우', nameEn: 'Joongwoo Park', team: 'Future', group: 'Future', role: 'Application Engineer' },
  { id: 'youngseob-lee', nameKo: '이영섭', nameEn: 'Youngseob Lee', team: 'Future', group: 'Future', role: 'Product Designer' },
  { id: 'myounggeun-jang', nameKo: '장명근', nameEn: 'Myounggeun Jang', team: 'Future', group: 'Future', role: 'Software Engineer' },
  { id: 'jaesun-lee', nameKo: '이재선', nameEn: 'Jaesun Lee', team: 'Future', group: 'Future', role: 'Software Engineer' },
  { id: 'jaekyu-kang', nameKo: '강재규', nameEn: 'Jaekyu Kang', team: 'Future', group: 'Future', role: 'Software Engineer' },

  // ── SCI Team ──
  { id: 'sehyun-jung', nameKo: '정세현', nameEn: 'Sehyun Jung', team: 'SCI', group: 'SCI', role: 'Product Owner' },
  { id: 'jeongyeon-kwon', nameKo: '권정연', nameEn: 'Jeongyeon Kwon', team: 'SCI', group: 'SCI', role: 'Product Designer' },
  { id: 'kyudong-kim', nameKo: '김규동', nameEn: 'Kyudong Kim', team: 'SCI', group: 'SCI', role: 'Senior Software Engineer' },
  { id: 'jaeyoung-an', nameKo: '안재영', nameEn: 'Jaeyoung An', team: 'SCI', group: 'SCI', role: 'Software Engineer' },
  { id: 'yejin-jin', nameKo: '진예진', nameEn: 'Yejin Jin', team: 'SCI', group: 'SCI', role: 'Software Engineer' },
  { id: 'san-kim', nameKo: '김산', nameEn: 'San Kim', team: 'SCI', group: 'SCI', role: 'Software Engineer' },

  // ── Solution Delivery Team ──
  { id: 'sungryong-mo', nameKo: '모성룡', nameEn: 'Sungryong Mo', team: 'Solution Delivery', group: 'Solution Delivery', role: 'Geospatial Technician' },
  { id: 'hoyong-lee', nameKo: '이호용', nameEn: 'Hoyong Lee', team: 'Solution Delivery', group: 'Solution Delivery', role: 'Operation Engineer (External)' },
  { id: 'heesoo-kim', nameKo: '김희수', nameEn: 'Heesoo Kim', team: 'Solution Delivery', group: 'Solution Delivery', role: 'Project Manager' },

  // ── PM & Business ──
  { id: 'sophie-son', nameKo: '손지혜', nameEn: 'Sophie Jihye Son', team: 'PM', group: 'PM & Business', role: 'Program Manager' },
  { id: 'sungkyu-park', nameKo: '박성규', nameEn: 'Sungkyu Park', team: 'PM', group: 'PM & Business', role: 'Program Manager' },
  { id: 'kyungdong-kim', nameKo: '김경동', nameEn: 'Kyungdong Kim', team: 'Japan PM', group: 'PM & Business', role: 'Sales Representative' },
  { id: 'seorim-hwang', nameKo: '황서림', nameEn: 'Seorim Hwang', team: 'Japan PM', group: 'PM & Business', role: 'Business Development' },
  { id: 'yoonjung-hwang', nameKo: '황윤정', nameEn: 'Yoonjung Hwang', team: 'Data Office', group: 'PM & Business', role: 'Senior Data Engineer' },

  // ── Operations ──
  { id: 'jiyeon-dong', nameKo: '동지연', nameEn: 'Jiyeon Dong', team: 'Operations', group: 'Operations', role: 'People Team Operation' },
  { id: 'nanwoo-kim', nameKo: '김난우', nameEn: 'Nanwoo Kim', team: 'Operations', group: 'Operations', role: 'Finance' },
];
