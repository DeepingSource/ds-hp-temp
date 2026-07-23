import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('❌ OPENAI_API_KEY environment variable is required.');
  process.exit(1);
}

const teamDir = path.join(rootDir, 'public', 'images', 'team');
if (!fs.existsSync(teamDir)) {
  fs.mkdirSync(teamDir, { recursive: true });
}

// Complete list of members with gender and role context for DALL-E prompt
const MEMBERS = [
  { id: 'taehoon-kim', name: 'Pete Tae-Hoon Kim', gender: 'male', role: 'visionary CEO Founder with glasses' },
  { id: 'sumin-lee', name: 'Sumin Lee', gender: 'female', role: 'US branch head executive' },
  { id: 'sangho-kum', name: 'Sangho Kum', gender: 'male', role: 'Chief Business Officer' },
  { id: 'bongkyung-ko', name: 'Bongkyung Ko', gender: 'male', role: 'VP of Engineering' },
  { id: 'sukbum-choi', name: 'Sukbum Choi', gender: 'male', role: 'VP of Operations' },
  { id: 'inbeom-hwang', name: 'Inbeom Hwang', gender: 'male', role: 'AI Research Lead' },
  { id: 'chaeheum-park', name: 'Chaeheum Park', gender: 'male', role: 'Core Engine Research Lead' },
  { id: 'sangkeun-park', name: 'Sangkeun Park', gender: 'male', role: 'Product Management Team Lead' },
  { id: 'juyoung-yoon', name: 'JuYoung Yoon', gender: 'female', role: 'Solution Delivery Lead' },

  { id: 'yeonhui-kim', name: 'Yeonhui Kim', gender: 'female', role: 'Senior Machine Learning Engineer' },
  { id: 'myeongjun-kim', name: 'Myeongjun Kim', gender: 'male', role: 'Machine Learning Engineer' },
  { id: 'jaewon-jang', name: 'Jaewon Jang', gender: 'male', role: 'Machine Learning Engineer' },
  { id: 'kyudong-kim', name: 'Kyudong Kim', gender: 'male', role: 'Senior Software Engineer' },
  { id: 'joongwoo-park', name: 'Joongwoo Park', gender: 'male', role: 'Mobile Application Engineer' },
  { id: 'jaeyung-park', name: 'Jaeyung Park', gender: 'male', role: 'Software Engineer' },
  { id: 'jaesun-lee', name: 'Jaesun Lee', gender: 'male', role: 'Software Engineer' },
  { id: 'myounggeun-jang', name: 'Myounggeun Jang', gender: 'male', role: 'Software Engineer' },
  { id: 'jaekyu-kang', name: 'Jaekyu Kang', gender: 'male', role: 'Software Engineer' },
  { id: 'jaeyoung-an', name: 'Jaeyoung An', gender: 'male', role: 'Software Engineer' },
  { id: 'yongwoo-kim', name: 'Yongwoo Kim', gender: 'male', role: 'Software Engineer' },
  { id: 'yejin-jin', name: 'Yejin Jin', gender: 'female', role: 'Software Engineer' },
  { id: 'san-kim', name: 'San Kim', gender: 'male', role: 'Software Engineer' },

  { id: 'jamin-park', name: 'Jamin Park', gender: 'male', role: 'Product Owner' },
  { id: 'sehyun-jung', name: 'Sehyun Jung', gender: 'male', role: 'Product Owner' },
  { id: 'seulgi-jo', name: 'Seulgi Jo', gender: 'female', role: 'Product Designer' },
  { id: 'youngseob-lee', name: 'Youngseob Lee', gender: 'male', role: 'Product Designer' },
  { id: 'jeongyeon-kwon', name: 'Jeongyeon Kwon', gender: 'female', role: 'Product Designer' },
  { id: 'jeongeun-hyeon', name: 'Jeongeun Hyeon', gender: 'female', role: 'Product Manager' },

  { id: 'eunji-kim', name: 'Eunji Kim', gender: 'female', role: 'Business Data Analyst' },
  { id: 'eunyoung-park', name: 'Eunyoung Park', gender: 'female', role: 'Business Data Analyst' },
  { id: 'sungryong-mo', name: 'Sungryong Mo', gender: 'male', role: 'Geospatial Technician' },
  { id: 'hoyong-lee', name: 'Hoyong Lee', gender: 'male', role: 'Operation Engineer' },
  { id: 'heesoo-kim', name: 'Heesoo Kim', gender: 'female', role: 'Project Manager' },
  { id: 'sophie-son', name: 'Sophie Son', gender: 'female', role: 'Program Manager' },
  { id: 'sungkyu-park', name: 'Sungkyu Park', gender: 'male', role: 'Program Manager' },
  { id: 'kyungdong-kim', name: 'Kyungdong Kim', gender: 'male', role: 'Japan Sales Specialist' },
  { id: 'seorim-hwang', name: 'Seorim Hwang', gender: 'female', role: 'Business Development' },
  { id: 'yoonjung-hwang', name: 'Yoonjung Hwang', gender: 'female', role: 'Senior Data Engineer' },
  { id: 'jiyeon-dong', name: 'Jiyeon Dong', gender: 'female', role: 'People Team Specialist' },
  { id: 'nanwoo-kim', name: 'Nanwoo Kim', gender: 'female', role: 'Finance Operations' },
];

async function generateAvatar(member) {
  const targetPath = path.join(teamDir, `${member.id}.png`);
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 10000) {
    console.log(`⏩ Skipping ${member.name} (${member.id}.png already exists)`);
    return;
  }

  const prompt = `Hand drawn outline character illustration avatar of a Korean ${member.gender} ${member.role}, clean artistic line art sketch style with subtle pastel color accent, minimalist vector outline style, professional modern avatar portrait, isolated on clean background`;

  console.log(`🎨 Generating AI avatar for ${member.name} (${member.id})...`);

  try {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-2',
        prompt: prompt,
        n: 1,
        size: '512x512',
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.data || !data.data[0] || !data.data[0].url) {
      console.error(`❌ Failed to generate for ${member.name}:`, data.error?.message || data);
      return;
    }

    const imgUrl = data.data[0].url;
    const imgRes = await fetch(imgUrl);
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    fs.writeFileSync(targetPath, buffer);
    console.log(`✅ Saved ${member.id}.png successfully (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`❌ Exception for ${member.name}:`, err.message);
  }
}

async function main() {
  console.log(`🚀 Starting OpenAI DALL-E 2 Avatar Generation for ${MEMBERS.length} members...`);
  for (const m of MEMBERS) {
    await generateAvatar(m);
  }
  console.log('🎉 OpenAI DALL-E Avatar Generation Completed!');
}

main();
