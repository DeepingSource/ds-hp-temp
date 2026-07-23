import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const teamDir = path.join(rootDir, 'public', 'images', 'team');
if (!fs.existsSync(teamDir)) {
  fs.mkdirSync(teamDir, { recursive: true });
}

// Complete list of members and their raw file name in person-raw
const MEMBERS = [
  { id: 'taehoon-kim', name: '김태훈', gender: 'm', role: 'CEO', color: '#2563eb', bg: '#eff6ff' },
  { id: 'sumin-lee', name: '이수민', gender: 'f', role: 'US Head', color: '#4f46e5', bg: '#eef2ff' },
  { id: 'sangho-kum', name: '금상호', gender: 'm', role: 'CBO', color: '#0d9488', bg: '#f0fdf4' },
  { id: 'bongkyung-ko', name: '고봉경', gender: 'm', role: 'VP Eng', color: '#2563eb', bg: '#eff6ff' },
  { id: 'sukbum-choi', name: '최석범', gender: 'm', role: 'VP Ops', color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'inbeom-hwang', name: '황인범', gender: 'm', role: 'SCI Lead', color: '#059669', bg: '#ecfdf5' },
  { id: 'chaeheum-park', name: '박채흠', gender: 'm', role: 'Core Lead', color: '#d97706', bg: '#fffbeb' },
  { id: 'sangkeun-park', name: '박상근', gender: 'm', role: 'PM Lead', color: '#e11d48', bg: '#fff1f2' },
  { id: 'juyoung-yoon', name: '윤주영', gender: 'f', role: 'Delivery Lead', color: '#6366f1', bg: '#eef2ff' },

  { id: 'yeonhui-kim', name: '김연희', gender: 'f', role: 'ML Engineer', color: '#0284c7', bg: '#f0f9ff' },
  { id: 'myeongjun-kim', name: '김명준', gender: 'm', role: 'ML Engineer', color: '#2563eb', bg: '#eff6ff' },
  { id: 'jaewon-jang', name: '장재원', gender: 'm', role: 'ML Engineer', color: '#4f46e5', bg: '#eef2ff' },
  { id: 'kyudong-kim', name: '김규동', gender: 'm', role: 'Sr Software Eng', color: '#0d9488', bg: '#f0fdf4' },
  { id: 'joongwoo-park', name: '박중우', gender: 'm', role: 'App Engineer', color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'jaeyung-park', name: '박재영', gender: 'm', role: 'Software Eng', color: '#2563eb', bg: '#eff6ff' },
  { id: 'jaesun-lee', name: '이재선', gender: 'm', role: 'Software Eng', color: '#059669', bg: '#ecfdf5' },
  { id: 'myounggeun-jang', name: '장명근', gender: 'm', role: 'Software Eng', color: '#d97706', bg: '#fffbeb' },
  { id: 'jaekyu-kang', name: '강재규', gender: 'm', role: 'Software Eng', color: '#3b82f6', bg: '#eff6ff' },
  { id: 'jaeyoung-an', name: '안재영', gender: 'm', role: 'Software Eng', color: '#4f46e5', bg: '#eef2ff' },
  { id: 'yongwoo-kim', name: '김용우', gender: 'm', role: 'Software Eng', color: '#0284c7', bg: '#f0f9ff' },
  { id: 'yejin-jin', name: '진예진', gender: 'f', role: 'Software Eng', color: '#e11d48', bg: '#fff1f2' },
  { id: 'san-kim', name: '김산', gender: 'm', role: 'Software Eng', color: '#059669', bg: '#ecfdf5' },

  { id: 'jamin-park', name: '박재민', gender: 'm', role: 'PO', color: '#2563eb', bg: '#eff6ff' },
  { id: 'sehyun-jung', name: '정세현', gender: 'm', role: 'PO', color: '#4f46e5', bg: '#eef2ff' },
  { id: 'seulgi-jo', name: '조슬기', gender: 'f', role: 'Product Designer', color: '#e11d48', bg: '#fff1f2' },
  { id: 'youngseob-lee', name: '이영섭', gender: 'm', role: 'Product Designer', color: '#0284c7', bg: '#f0f9ff' },
  { id: 'jeongyeon-kwon', name: '권정연', gender: 'f', role: 'Product Designer', color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'jeongeun-hyeon', name: '현정은', gender: 'f', role: 'Product Mgmt', color: '#d97706', bg: '#fffbeb' },

  { id: 'eunji-kim', name: '김은지', gender: 'f', role: 'Data Analyst', color: '#0284c7', bg: '#f0f9ff' },
  { id: 'eunyoung-park', name: '박은영', gender: 'f', role: 'Data Analyst', color: '#e11d48', bg: '#fff1f2' },
  { id: 'sungryong-mo', name: '모성룡', gender: 'm', role: 'Geospatial Tech', color: '#059669', bg: '#ecfdf5' },
  { id: 'hoyong-lee', name: '이호용', gender: 'm', role: 'Ops Engineer', color: '#2563eb', bg: '#eff6ff' },
  { id: 'heesoo-kim', name: '김희수', gender: 'f', role: 'Project Manager', color: '#4f46e5', bg: '#eef2ff' },
  { id: 'sophie-son', name: '손지혜', gender: 'f', role: 'Program Manager', color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'sungkyu-park', name: '박성규', gender: 'm', role: 'Program Manager', color: '#d97706', bg: '#fffbeb' },
  { id: 'kyungdong-kim', name: '김경동', gender: 'm', role: 'Japan Sales', color: '#0284c7', bg: '#f0f9ff' },
  { id: 'seorim-hwang', name: '황서림', gender: 'f', role: 'Biz Dev', color: '#e11d48', bg: '#fff1f2' },
  { id: 'yoonjung-hwang', name: '황윤정', gender: 'f', role: 'Data Engineer', color: '#059669', bg: '#ecfdf5' },
  { id: 'jiyeon-dong', name: '동지연', gender: 'f', role: 'People Ops', color: '#4f46e5', bg: '#eef2ff' },
  { id: 'nanwoo-kim', name: '김난우', gender: 'f', role: 'Finance Ops', color: '#7c3aed', bg: '#f5f3ff' },
];

/**
 * Creates high-resolution Hand-drawn Outline Character Illustration SVG
 */
function createOutlineCharacterSvg(item) {
  const initial = item.name.slice(-2);
  const isFemale = item.gender === 'f';

  const hairStyle = isFemale
    ? `<path d="M 55 140 C 50 80, 150 80, 145 140 C 155 175, 155 205, 150 240 L 50 240 C 45 205, 45 175, 55 140 Z" fill="#0f172a" stroke="#000000" stroke-width="5" stroke-linejoin="round" />`
    : `<path d="M 60 120 C 60 80, 140 80, 140 120 L 145 135 C 135 125, 65 125, 55 135 Z" fill="#0f172a" stroke="#000000" stroke-width="5" stroke-linejoin="round" />`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="600" height="600">
  <defs>
    <linearGradient id="bg-${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.bg}" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
    <filter id="shadow-${item.id}">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0f172a" flood-opacity="0.12" />
    </filter>
  </defs>

  <!-- Outer Rounded Canvas with Hand-Drawn Outline Ring -->
  <rect x="6" y="6" width="188" height="188" rx="44" fill="url(#bg-${item.id})" stroke="${item.color}" stroke-width="3" />
  <rect x="10" y="10" width="180" height="180" rx="40" fill="none" stroke="#0f172a" stroke-width="2" stroke-dasharray="8 6" opacity="0.2" />

  <!-- Character Hair Back -->
  ${hairStyle}

  <!-- Body Outfit Lines -->
  <path d="M 35 200 C 35 155, 65 145, 100 145 C 135 145, 165 155, 165 200 Z" fill="${item.color}" stroke="#0f172a" stroke-width="5" stroke-linejoin="round" filter="url(#shadow-${item.id})" />
  <path d="M 82 145 L 100 172 L 118 145" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />

  <!-- Neck -->
  <rect x="86" y="125" width="28" height="24" rx="6" fill="#fed7aa" stroke="#0f172a" stroke-width="4" />

  <!-- Face Base (Hand-drawn line) -->
  <ellipse cx="100" cy="105" rx="36" ry="40" fill="#ffedd5" stroke="#0f172a" stroke-width="5" />

  <!-- Eyes & Expressions -->
  <circle cx="85" cy="102" r="4.5" fill="#0f172a" />
  <circle cx="115" cy="102" r="4.5" fill="#0f172a" />
  <circle cx="87" cy="100" r="1.5" fill="#ffffff" />
  <circle cx="117" cy="100" r="1.5" fill="#ffffff" />

  <!-- Cheeks -->
  <circle cx="76" cy="112" r="6" fill="#f43f5e" opacity="0.35" />
  <circle cx="124" cy="112" r="6" fill="#f43f5e" opacity="0.35" />

  <!-- Smile -->
  <path d="M 91 120 Q 100 128 109 120" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round" />

  <!-- Hair Front Bangs -->
  <path d="M 65 95 C 72 72, 102 78, 106 92 C 118 75, 134 80, 135 95 C 122 84, 78 84, 65 95 Z" fill="#0f172a" stroke="#0f172a" stroke-width="3" />

  <!-- Hand-drawn Style Tag -->
  <g transform="translate(100, 174)">
    <rect x="-38" y="-11" width="76" height="22" rx="11" fill="#0f172a" stroke="#ffffff" stroke-width="1.5" />
    <text x="0" y="5" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="12" letter-spacing="1">${initial}</text>
  </g>
</svg>`;
}

console.log('🎨 Regenerating Valid SVG Team Avatars for public/images/team/*.svg ...');

// Clean up fake png files
for (const m of MEMBERS) {
  const fakePng = path.join(teamDir, `${m.id}.png`);
  if (fs.existsSync(fakePng)) {
    fs.unlinkSync(fakePng);
  }
  const svgData = createOutlineCharacterSvg(m);
  fs.writeFileSync(path.join(teamDir, `${m.id}.svg`), svgData, 'utf8');
}

console.log(`✅ Cleaned up old fake PNGs and generated ${MEMBERS.length} valid SVG avatar files in public/images/team/`);
