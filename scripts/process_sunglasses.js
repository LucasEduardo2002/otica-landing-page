const fs = require('fs');
const path = require('path');

const srcRoot = 'C:/Users/lucas/Desktop/Projetos/Landing-pages/Ótica-Gracinha/ÓCULOS SOLARES _ SITES-20260909T105001Z-1-001/ÓCULOS SOLARES _ SITES';
const destRoot = 'C:/Users/lucas/Desktop/Projetos/Landing-pages/Ótica-Gracinha/otica-landing-page/public/images/solares';

if (!fs.existsSync(destRoot)) {
  fs.mkdirSync(destRoot, { recursive: true });
}

const brands = ['Guess', 'Versace', 'Vogue'];
const dataset = [];

for (const brand of brands) {
  const brandDir = path.join(srcRoot, brand);
  const brandKey = brand.toLowerCase();
  const brandDestDir = path.join(destRoot, brandKey);
  
  if (!fs.existsSync(brandDestDir)) {
    fs.mkdirSync(brandDestDir, { recursive: true });
  }

  const files = fs.readdirSync(brandDir);
  console.log(`Processing ${brand}: ${files.length} files`);

  // Group files by model
  const modelGroups = {};

  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

    // Determine base model name
    let baseModel = file.replace(/\.(jpg|jpeg|png)$/i, '');
    baseModel = baseModel.replace(/\(\d+\)$/, ''); // remove (1), (2), etc.
    baseModel = baseModel.replace(/_$/, ''); // remove trailing _
    baseModel = baseModel.trim();

    // Standardize model name for display
    let displayModelName = baseModel;
    if (brand === 'Versace' && !displayModelName.startsWith('VE')) {
      displayModelName = 'VE ' + displayModelName;
    } else if (brand === 'Vogue') {
      // Normalize 'VO4329-S' to 'VO 4329-S'
      displayModelName = displayModelName.replace(/^VO(?=\d)/, 'VO ');
    }

    if (!modelGroups[baseModel]) {
      modelGroups[baseModel] = {
        baseModel,
        displayModelName,
        files: []
      };
    }
    modelGroups[baseModel].files.push(file);
  }

  for (const group of Object.values(modelGroups)) {
    // Sort files so main file (without parenthesis) is first
    group.files.sort((a, b) => {
      const aHasParen = a.includes('(');
      const bHasParen = b.includes('(');
      if (!aHasParen && bHasParen) return -1;
      if (aHasParen && !bHasParen) return 1;
      return a.localeCompare(b);
    });

    const copiedImages = [];
    group.files.forEach((file, idx) => {
      const srcFile = path.join(brandDir, file);
      // Clean safe destination filename
      const safeModel = group.baseModel.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
      const destFileName = `${safeModel}_${idx}.jpg`;
      const destFile = path.join(brandDestDir, destFileName);
      fs.copyFileSync(srcFile, destFile);
      copiedImages.push(`/images/solares/${brandKey}/${destFileName}`);
    });

    // Determine category and tags
    let category = 'unissex';
    if (brand === 'Guess') {
      if (group.displayModelName.startsWith('GJ') || group.displayModelName.startsWith('GU')) {
        category = 'feminino';
      } else if (group.displayModelName.startsWith('GM')) {
        category = 'masculino';
      }
    } else if (brand === 'Versace') {
      category = group.displayModelName.includes('4470') ? 'feminino' : 'unissex';
    } else if (brand === 'Vogue') {
      category = 'feminino';
    }

    let tag = 'Proteção UV400';
    if (copiedImages.length >= 4) {
      tag = 'Coleção Destaque';
    } else if (brand === 'Versace') {
      tag = 'Alta Grife Italiana';
    } else if (brand === 'Guess') {
      tag = 'Lentes Polarizadas & UV400';
    } else if (brand === 'Vogue') {
      tag = 'Tendência Fashion';
    }

    let description = `Modelo solar ${brand} com design exclusivo, lentes de alta proteção contra raios solares e acabamento de luxo.`;

    dataset.push({
      id: `${brandKey}-${group.baseModel.toLowerCase().replace(/[^a-z0-9_-]/g, '_')}`,
      brand: brand,
      brandKey: brandKey,
      modelName: group.displayModelName,
      category: category,
      tag: tag,
      description: description,
      images: copiedImages
    });
  }
}

const outputPath = 'C:/Users/lucas/Desktop/Projetos/Landing-pages/Ótica-Gracinha/otica-landing-page/app/sunglasses_data.json';
fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2), 'utf-8');
console.log(`Successfully generated ${dataset.length} models in ${outputPath}`);
