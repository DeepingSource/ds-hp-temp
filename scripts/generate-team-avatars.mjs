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

// Map of member id to Korean file name in person-raw
const ID_TO_NAME = [
  { id: 'taehoon-kim', name: '김태훈', gender: 'm', color: '#3b82f6', bg: '#eff6ff' },
  { id: 'sumin-lee', name: '이수민', gender: 'f', color: '#4f46e5', bg: '#eef2ff' },
  { id: 'sangho-kum', name: '금상호', gender: 'm', color: '#0d9488', bg: '#f0fdf4' },
  { id: 'bongkyung-ko', name: '고봉경', gender: 'm', color: '#2563eb', bg: '#eff6ff' },
  { id: 'sukbum-choi', name: '최석범', gender: 'm', color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'inbeom-hwang', name: '황인범', gender: 'm', color: '#059669', bg: '#ecfdf5' },
  { id: 'chaeheum-park', name: '박채흠', gender: 'm', color: '#d97706', bg: '#fffbeb' },
  { id: 'sangkeun-park', name: '박상근', gender: 'm', color: '#e11d48', bg: '#fff1f2' },
  { id: 'juyoung-yoon', name: '윤주영', gender: 'f', color: '#6366f1', bg: '#eef2ff' },

  { id: 'yeonhui-kim', name: '김연희', gender: 'f', color: '#0284c7', bg: '#f0f9ff' },
  { id: 'myeongjun-kim', name: '김명준', gender: 'm', color: '#2563eb', bg: '#eff6ff' },
  { id: 'jaewon-jang', name: '장재원', gender: 'm', color: '#4f46e5', bg: '#eef2ff' },
  { id: 'kyudong-kim', name: '김규동', gender: 'm', color: '#0d9488', bg: '#f0fdf4' },
  { id: 'joongwoo-park', name: '박중우', gender: 'm', color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'jaeyung-park', name: '박재영', gender: 'm', color: '#2563eb', bg: '#eff6ff' },
  { id: 'jaesun-lee', name: '이재선', gender: 'm', color: '#059669', bg: '#ecfdf5' },
  { id: 'myounggeun-jang', name: '장명근', gender: 'm', color: '#d97706', bg: '#fffbeb' },
  { id: 'jaekyu-kang', name: '강재규', gender: 'm', color: '#3b82f6', bg: '#eff6ff' },
  { id: 'jaeyoung-an', name: '안재영', gender: 'm', color: '#4f46e5', bg: '#eef2ff' },
  { id: 'yongwoo-kim', name: '김용우', gender: 'm', color: '#0284c7', bg: '#f0f9ff' },
  { id: 'yejin-jin', name: '진예진', gender: 'f', color: '#e11d48', bg: '#fff1f2' },
  { id: 'san-kim', name: '김산', gender: 'm', color: '#059669', bg: '#ecfdf5' },

  { id: 'jamin-park', name: '박재민', gender: 'm', color: '#2563eb', bg: '#eff6ff' },
  { id: 'sehyun-jung', name: '정세현', gender: 'm', color: '#4f46e5', bg: '#eef2ff' },
  { id: 'seulgi-jo', name: '조슬기', gender: 'f', color: '#e11d48', bg: '#fff1f2' },
  { id: 'youngseob-lee', name: '이영섭', gender: 'm', color: '#0284c7', bg: '#f0f9ff' },
  { id: 'jeongyeon-kwon', name: '권정연', gender: 'f', color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'jeongeun-hyeon', name: '현정은', gender: 'f', color: '#d97706', bg: '#fffbeb' },

  { id: 'eunji-kim', name: '김은지', gender: 'f', color: '#0284c7', bg: '#f0f9ff' },
  { id: 'eunyoung-park', name: '박은영', gender: 'f', color: '#e11d48', bg: '#fff1f2' },
  { id: 'sungryong-mo', name: '모성룡', gender: 'm', color: '#059669', bg: '#ecfdf5' },
  { id: 'hoyong-lee', name: '이호용', gender: 'm', color: '#2563eb', bg: '#eff6ff' },
  { id: 'heesoo-kim', name: '김희수', gender: 'f', color: '#4f46e5', bg: '#eef2ff' },
  { id: 'sophie-son', name: '손지혜', gender: 'f', color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'sungkyu-park', name: '박성규', gender: 'm', color: '#d97706', bg: '#fffbeb' },
  { id: 'kyungdong-kim', name: '김경동', gender: 'm', color: '#0284c7', bg: '#f0f9ff' },
  { id: 'seorim-hwang', name: '황서림', gender: 'f', color: '#e11d48', bg: '#fff1f2' },
  { id: 'yoonjung-hwang', name: '황윤정', gender: 'f', color: '#059669', bg: '#ecfdf5' },
  { id: 'jiyeon-dong', name: '동지연', gender: 'f', color: '#4f46e5', bg: '#eef2ff' },
  { id: 'nanwoo-kim', name: '김난우', gender: 'f', color: '#7c3aed', bg: '#f5f3ff' },
];

/**
 * Generates clean, artistic Hand-Drawn Outline Character Illustration SVG for each member.
 */
function createOutlineCharacterSvg(item) {
  const initial = item.name.slice(-2);
  const isFemale = item.gender === 'f';

  // Artistic hair variations
  const hairPath = isFemale
    ? `<path d="M 60 130 C 60 70, 140 70, 140 130 C 150 160, 150 190, 145 220 L 55 220 C 50 190, 50 160, 60 130 Z" fill="#1e293b" stroke="#0f172a" stroke-width="4" stroke-linejoin="round" />`
    : `<path d="M 65 110 C 65 75, 135 75, 135 110 L 140 125 C 130 115, 70 115, 60 125 Z" fill="#1e293b" stroke="#0f172a" stroke-width="4" stroke-linejoin="round" />`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
  <defs>
    <linearGradient id="bgGrad-${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.bg}" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
    <filter id="shadow-${item.id}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.08" />
    </filter>
  </defs>

  <!-- Background Circle with Soft Outline -->
  <circle cx="100" cy="100" r="92" fill="url(#bgGrad-${item.id})" stroke="${item.color}" stroke-width="3" stroke-dasharray="800" />

  <!-- Outer Hand-drawn Sketch Ring -->
  <circle cx="100" cy="100" r="95" fill="none" stroke="#0f172a" stroke-width="2" stroke-opacity="0.15" stroke-dasharray="6 4" />

  <!-- Character Hair Back -->
  ${hairPath}

  <!-- Character Body / Outfit Lines -->
  <path d="M 40 195 C 40 155, 70 145, 100 145 C 130 145, 160 155, 160 195 Z" fill="${item.color}" stroke="#0f172a" stroke-width="4" stroke-linejoin="round" filter="url(#shadow-${item.id})" />
  <path d="M 85 145 L 100 170 L 115 145" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

  <!-- Neck -->
  <rect x="88" y="125" width="24" height="22" rx="4" fill="#fed7aa" stroke="#0f172a" stroke-width="3" />

  <!-- Face Base (Hand Drawn Line) -->
  <ellipse cx="100" cy="105" rx="34" ry="38" fill="#ffedd5" stroke="#0f172a" stroke-width="4" />

  <!-- Eyes & Glasses / Expressions -->
  <circle cx="86" cy="102" r="4" fill="#0f172a" />
  <circle cx="114" cy="102" r="4" fill="#0f172a" />
  <circle cx="87" cy="100" r="1.5" fill="#ffffff" />
  <circle cx="115" cy="100" r="1.5" fill="#ffffff" />

  <!-- Cheeks -->
  <circle cx="78" cy="110" r="5" fill="#f43f5e" opacity="0.3" />
  <circle cx="122" cy="110" r="5" fill="#f43f5e" opacity="0.3" />

  <!-- Smile -->
  <path d="M 92 118 Q 100 126 108 118" fill="none" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" />

  <!-- Hair Front Fringe -->
  <path d="M 68 95 C 75 75, 100 80, 105 92 C 115 78, 130 82, 132 95 C 120 85, 80 85, 68 95 Z" fill="#1e293b" stroke="#0f172a" stroke-width="3" />

  <!-- Name Badge Accent -->
  <g transform="translate(100, 172)">
    <rect x="-36" y="-10" width="72" height="20" rx="10" fill="#0f172a" />
    <text x="0" y="4" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="11" letter-spacing="1">${initial}</text>
  </g>
</svg>`;
}

console.log('🎨 Generating Hand-Drawn Outline Character Illustrations for Team Members...');

for (const item of ID_TO_NAME) {
  const svgContent = createOutlineCharacterSvg(item);
  const filePath = path.join(teamDir, `${item.id}.svg`);
  fs.writeFileSync(filePath, svgContent, 'utf8');
}

console.log(`✅ Generated ${ID_TO_NAME.length} team avatar SVGs in public/images/team/`);
