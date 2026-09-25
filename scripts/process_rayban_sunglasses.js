const fs = require('fs');
const path = require('path');

const raybanSrcDir = 'C:/Users/lucas/Desktop/Projetos/Landing-pages/Ótica-Gracinha/ÓCULOS SOLARES _ SITES-20260909T105001Z-1-001/ÓCULOS SOLARES _ SITES/Ray.Ban-20260924T200940Z-1-001/Ray.Ban';
const destDir = 'C:/Users/lucas/Desktop/Projetos/Landing-pages/Ótica-Gracinha/otica-landing-page/public/images/solares/rayban';
const jsonPath = 'C:/Users/lucas/Desktop/Projetos/Landing-pages/Ótica-Gracinha/otica-landing-page/app/sunglasses_data.json';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Model configurations for Ray-Ban
const modelConfigs = [
  {
    key: 'asap_rb_3929',
    modelName: 'A$AP RB 3929',
    tag: 'Lentes Polarizadas & UV400',
    filePatterns: ['A$AP _ RB 3929.jpg', 'A$AP _ RB 3929(1).jpg']
  },
  {
    key: 'asap_rb_3931',
    modelName: 'A$AP RB 3931',
    tag: 'Proteção UV400',
    filePatterns: ['A$AP _ RB 3931.jpg', 'A$AP _ RB 3931(1).jpg']
  },
  {
    key: 'aviator_rb_3025_l',
    modelName: 'AVIATOR RB 3025-L',
    tag: 'Ícone Mundial & UV400',
    filePatterns: ['AVIATOR _ RB 3025-L_.jpg', 'AVIATOR _ RB 3025-L_(1).jpg']
  },
  {
    key: 'clubmaster_rb_3016l',
    modelName: 'CLUBMASTER RB 3016L',
    tag: 'Clássico Atemporal',
    filePatterns: ['CLUBMASTER _ RB 3016L.jpg', 'CLUBMASTER _ RB 3016L(1).jpg']
  },
  {
    key: 'hexagonal_rb_3548_nl',
    modelName: 'HEXAGONAL RB 3548-NL',
    tag: 'Tendência Geométrica',
    filePatterns: ['HEXAGONAL _ RB 3548-NL.jpg', 'HEXAGONAL _ RB 3548-NL(1).jpg']
  },
  {
    key: 'highstreet_rb_2225',
    modelName: 'HIGHSTREET RB 2225',
    tag: 'Design Contemporâneo',
    filePatterns: ['HIGHSTREET _ RB 2225.jpg', 'HIGHSTREET _ RB 2225(1).jpg']
  },
  {
    key: 'jeffrey_rb_4448l',
    modelName: 'JEFFREY RB 4448L',
    tag: 'Proteção UV400',
    filePatterns: ['JEFFREY _ RB 4448L.jpg', 'JEFFREY _ RB 4448L(1).jpg']
  },
  {
    key: 'kahl_rb_4472',
    modelName: 'KAHL RB 4472',
    tag: 'Coleção Destaque',
    filePatterns: ['KAHL _ RB 4472.jpg', 'KAHL _ RB 4472_.jpg', 'KAHL _ RB 4472(1).jpg']
  },
  {
    key: 'liteforce_rb_3770',
    modelName: 'LITEFORCE RB 3770',
    tag: 'Ultraleve & Resistente',
    filePatterns: ['LITEFORCE _ RB 3770.jpg', 'LITEFORCE _ RB 3770(1).jpg']
  },
  {
    key: 'mega_clubmaster_rb_0316_s',
    modelName: 'MEGA CLUBMASTER RB 0316-S',
    tag: 'Coleção Destaque',
    filePatterns: ['MEGA CLUBMASTER _ RB 0316-S.jpg', 'MEGA CLUBMASTER _ RB 0316-S(1).jpg', 'MEGA CLUBMASTER _ RB 0316-S(2).jpg']
  },
  {
    key: 'mega_wayfarer_rb_0840_s',
    modelName: 'MEGA WAYFARER RB 0840-S',
    tag: 'Ícone Reestilizado',
    filePatterns: ['MEGA WAYFARER _ RB 0840-5_.jpg', 'MEGA WAYFARER _ RB 0840-5_(1).jpg']
  },
  {
    key: 'oval_bio_based_rb_4457d',
    modelName: 'OVAL BIO-BASED RB 4457D',
    tag: 'Sustentável Bio-Based',
    filePatterns: ['OVAL BIO-BASED _ RB 4457D.jpg', 'OVAL BIO-BASED _ RB 4457D(1).jpg']
  },
  {
    key: 'oval_flat_lenses_rb_3547n',
    modelName: 'OVAL FLAT LENSES RB 3547N',
    tag: 'Lentes Planas Flat',
    filePatterns: ['OVAL FLAT LENSES _ RB 3547N.jpg', 'OVAL FLAT LENSES _ RB 3547N(1).jpg']
  },
  {
    key: 'round_double_rb_3765',
    modelName: 'ROUND DOUBLE RB 3765',
    tag: 'Ponte Dupla Retrô',
    filePatterns: ['ROUND DOUBLE _ RB 3765.jpg', 'ROUND DOUBLE _ RB 3765(1).jpg']
  }
];

const newRaybanModels = [];
let totalCopiedImages = 0;

for (const config of modelConfigs) {
  const images = [];

  config.filePatterns.forEach((fileName, idx) => {
    const srcFile = path.join(raybanSrcDir, fileName);
    if (!fs.existsSync(srcFile)) {
      console.error(`Source file not found: ${srcFile}`);
      return;
    }

    const destFileName = `${config.key}_${idx}.jpg`;
    const destFilePath = path.join(destDir, destFileName);
    fs.copyFileSync(srcFile, destFilePath);
    totalCopiedImages++;
    images.push(`/images/solares/rayban/${destFileName}`);
  });

  newRaybanModels.push({
    id: `rayban-${config.key.replace(/_/g, '-')}`,
    brand: 'Ray-Ban',
    brandKey: 'rayban',
    modelName: config.modelName,
    category: 'unissex',
    tag: config.tag,
    description: 'Modelo solar Ray-Ban com design icônico, lentes de alta proteção contra raios solares e acabamento premium.',
    images: images
  });
}

console.log(`Copied ${totalCopiedImages} images to ${destDir}`);
console.log(`Created ${newRaybanModels.length} Ray-Ban models`);

// Read existing dataset and merge (keep existing Guess, Versace, Vogue and add Ray-Ban)
let existingData = [];
if (fs.existsSync(jsonPath)) {
  existingData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
}

// Remove any existing rayban entries if previously added to avoid duplicates
const nonRayban = existingData.filter(item => item.brandKey !== 'rayban');

// Prepend or append Ray-Ban (let's put Ray-Ban as featured / at the start of dataset or organized with other brands)
const updatedDataset = [...newRaybanModels, ...nonRayban];

fs.writeFileSync(jsonPath, JSON.stringify(updatedDataset, null, 2), 'utf-8');
console.log(`Successfully updated ${jsonPath} with total ${updatedDataset.length} models (${newRaybanModels.length} Ray-Ban + ${nonRayban.length} others).`);
