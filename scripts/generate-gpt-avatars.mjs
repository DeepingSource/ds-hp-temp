import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI();

const TEAM_DIR = path.resolve('public/images/team');
const RAW_DIR = path.resolve('person-raw');

// Remaining 25 members (jaeyung-park already done in test)
const MEMBERS = [
  { raw: '이재선.png', id: 'jaesun-lee' },
  { raw: '장명근.png', id: 'myounggeun-jang' },
  { raw: '강재규.png', id: 'jaekyu-kang' },
  { raw: '안재영.png', id: 'jaeyoung-an' },
  { raw: '김용우.png', id: 'yongwoo-kim' },
  { raw: '진예진.png', id: 'yejin-jin' },
  { raw: '김산.png', id: 'san-kim' },
  { raw: '박재민.png', id: 'jamin-park' },
  { raw: '정세현.png', id: 'sehyun-jung' },
  { raw: '조슬기.png', id: 'seulgi-jo' },
  { raw: '이영섭.png', id: 'youngseob-lee' },
  { raw: '권정연.png', id: 'jeongyeon-kwon' },
  { raw: '현정은.png', id: 'jeongeun-hyeon' },
  { raw: '김은지.png', id: 'eunji-kim' },
  { raw: '박은영.png', id: 'eunyoung-park' },
  { raw: '모성룡.png', id: 'sungryong-mo' },
  { raw: '이호용.png', id: 'hoyong-lee' },
  { raw: '김희수.png', id: 'heesoo-kim' },
  { raw: '손지혜.png', id: 'sophie-son' },
  { raw: '박성규.png', id: 'sungkyu-park' },
  { raw: '김경동.png', id: 'kyungdong-kim' },
  { raw: '황서림.png', id: 'seorim-hwang' },
  { raw: '황윤정.png', id: 'yoonjung-hwang' },
  { raw: '동지연.png', id: 'jiyeon-dong' },
  { raw: '김난우.png', id: 'nanwoo-kim' },
];

const PROMPT = 'Create a clean hand-drawn outline character illustration portrait based on this person photo. Study their exact facial features, hairstyle, face shape, glasses (if any), and clothing from the reference photo. Redraw them as a stylish minimalist line-art character illustration. Use confident black ink outlines with subtle warm pastel color accents. Professional modern avatar style, upper body portrait, isolated on clean white background. Hand drawn character style, NOT a photo filter. Do not add any text or watermarks.';

async function generateOne(member) {
  const rawPath = path.join(RAW_DIR, member.raw);
  const outPath = path.join(TEAM_DIR, `${member.id}.png`);

  if (!fs.existsSync(rawPath)) {
    console.error(`❌ Source not found: ${rawPath}`);
    return false;
  }

  try {
    const imgBuffer = fs.readFileSync(rawPath);
    const file = new File([imgBuffer], member.raw, { type: 'image/png' });

    const result = await openai.images.edit({
      model: 'gpt-image-1',
      image: file,
      prompt: PROMPT,
      size: '1024x1024',
    });

    if (result.data[0].b64_json) {
      const buf = Buffer.from(result.data[0].b64_json, 'base64');
      fs.writeFileSync(outPath, buf);
      console.log(`✅ ${member.raw} → ${member.id}.png (${(buf.length/1024).toFixed(0)}KB)`);
      return true;
    } else if (result.data[0].url) {
      const resp = await fetch(result.data[0].url);
      const arrBuf = await resp.arrayBuffer();
      fs.writeFileSync(outPath, Buffer.from(arrBuf));
      console.log(`✅ ${member.raw} → ${member.id}.png (URL)`);
      return true;
    }
  } catch(e) {
    console.error(`❌ ${member.id}: ${e.message}`);
    return false;
  }
  return false;
}

async function main() {
  console.log(`🚀 Generating ${MEMBERS.length} character illustrations via GPT Image API\n`);
  let ok = 0, fail = 0;

  // Sequential to avoid rate limits  
  for (const m of MEMBERS) {
    const result = await generateOne(m);
    result ? ok++ : fail++;
    // 500ms delay between requests
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n📊 Done: ${ok} success, ${fail} failed / ${MEMBERS.length} total`);
}

main();
