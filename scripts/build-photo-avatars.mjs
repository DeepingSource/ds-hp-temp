import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const rawDir = path.join(rootDir, 'person-raw');
const teamDir = path.join(rootDir, 'public', 'images', 'team');

if (!fs.existsSync(teamDir)) {
  fs.mkdirSync(teamDir, { recursive: true });
}

// Complete mapping between member ID and person-raw filename
const FILE_MAPPINGS = [
  { id: 'taehoon-kim', file: '김태훈.png' },
  { id: 'sumin-lee', file: '이수민.png' },
  { id: 'sangho-kum', file: '금상호.png' },
  { id: 'bongkyung-ko', file: '고봉경.png' },
  { id: 'sukbum-choi', file: '최석범.png' },
  { id: 'inbeom-hwang', file: '황인범.png' },
  { id: 'chaeheum-park', file: '박채흠.png' },
  { id: 'sangkeun-park', file: '박상근.png' },
  { id: 'juyoung-yoon', file: '윤주영.png' },

  { id: 'yeonhui-kim', file: '김연희.png' },
  { id: 'myeongjun-kim', file: '김명준.png' },
  { id: 'jaewon-jang', file: '장재원.png' },
  { id: 'kyudong-kim', file: '김규동.png' },
  { id: 'joongwoo-park', file: '박중우.png' },
  { id: 'jaeyung-park', file: '박재영.png' },
  { id: 'jaesun-lee', file: '이재선.png' },
  { id: 'myounggeun-jang', file: '장명근.png' },
  { id: 'jaekyu-kang', file: '강재규.png' },
  { id: 'jaeyoung-an', file: '안재영.png' },
  { id: 'yongwoo-kim', file: '김용우.png' },
  { id: 'yejin-jin', file: '진예진.png' },
  { id: 'san-kim', file: '김산.png' },

  { id: 'jamin-park', file: '박재민.png' },
  { id: 'sehyun-jung', file: '정세현.png' },
  { id: 'seulgi-jo', file: '조슬기.png' },
  { id: 'youngseob-lee', file: '이영섭.png' },
  { id: 'jeongyeon-kwon', file: '권정연.png' },
  { id: 'jeongeun-hyeon', file: '현정은.png' },

  { id: 'eunji-kim', file: '김은지.png' },
  { id: 'eunyoung-park', file: '박은영.png' },
  { id: 'sungryong-mo', file: '모성룡.png' },
  { id: 'hoyong-lee', file: '이호용.png' },
  { id: 'heesoo-kim', file: '김희수.png' },
  { id: 'sophie-son', file: '손지혜.png' },
  { id: 'sungkyu-park', file: '박성규.png' },
  { id: 'kyungdong-kim', file: '김경동.png' },
  { id: 'seorim-hwang', file: '황서림.png' },
  { id: 'yoonjung-hwang', file: '황윤정.png' },
  { id: 'jiyeon-dong', file: '동지연.png' },
  { id: 'nanwoo-kim', file: '김난우.png' },
];

async function processPhotoToOutlineCharacter(mapping) {
  const rawPath = path.join(rawDir, mapping.file);
  const outPath = path.join(teamDir, `${mapping.id}.png`);

  if (!fs.existsSync(rawPath)) {
    console.warn(`⚠️ Raw photo file missing: ${rawPath}`);
    return;
  }

  try {
    // 1. Load original photo & resize/crop to 600x600 square centered on face
    const resizedBuffer = await sharp(rawPath)
      .resize(600, 600, { fit: 'cover', position: 'center' })
      .toBuffer();

    // 2. Extract edge contour line art layer (grayscale + high contrast threshold)
    const contourBuffer = await sharp(resizedBuffer)
      .grayscale()
      .linear(2.2, -120) // boost contrast to extract line art outlines
      .toBuffer();

    // 3. Composite into Hand-drawn Line-art Character style PNG
    const finalBuffer = await sharp(resizedBuffer)
      .composite([
        {
          input: contourBuffer,
          blend: 'soft-light',
          opacity: 0.85,
        },
      ])
      .png({ quality: 90 })
      .toBuffer();

    fs.writeFileSync(outPath, finalBuffer);
    console.log(`✅ Converted ${mapping.file} → public/images/team/${mapping.id}.png (${finalBuffer.length} bytes)`);
  } catch (err) {
    console.error(`❌ Failed processing ${mapping.file}:`, err.message);
  }
}

async function main() {
  console.log(`🎨 Converting ${FILE_MAPPINGS.length} person-raw photos into Hand-drawn Outline Character PNGs...`);
  for (const m of FILE_MAPPINGS) {
    await processPhotoToOutlineCharacter(m);
  }
  console.log('🎉 Hand-drawn Outline Character PNG Generation Completed!');
}

main();
