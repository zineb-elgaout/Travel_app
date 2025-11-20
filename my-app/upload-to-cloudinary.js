// upload-to-cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dpkjgfhcc',
  api_key: '915729591589788',
  api_secret: 'kX2n1tJcxjCNma9z0YU3htgVnkc'
});

// 📸 Liste de toutes vos images
const images = [
  { 
    name: 'transport', 
    url: 'https://images.pexels.com/photos/3889761/pexels-photo-3889761.jpeg' 
  },
  { 
    name: 'walking', 
    url: 'https://images.pexels.com/photos/19190382/pexels-photo-19190382.jpeg' 
  },
  { 
    name: 'riads', 
    url: 'https://images.pexels.com/photos/30257102/pexels-photo-30257102.jpeg' 
  },
  { 
    name: 'water', 
    url: 'https://images.pexels.com/photos/14602556/pexels-photo-14602556.jpeg' 
  },
  { 
    name: 'food', 
    url: 'https://images.pexels.com/photos/30574975/pexels-photo-30574975.jpeg' 
  },
  { 
    name: 'waste', 
    url: 'https://images.pexels.com/photos/4502972/pexels-photo-4502972.jpeg' 
  },
  { 
    name: 'bottle', 
    url: 'https://images.pexels.com/photos/4916544/pexels-photo-4916544.jpeg' 
  },
  { 
    name: 'artisan', 
    url: 'https://images.pexels.com/photos/8169414/pexels-photo-8169414.jpeg' 
  },
  { 
    name: 'baskets', 
    url: 'https://images.pexels.com/photos/4502967/pexels-photo-4502967.jpeg' 
  },
  { 
    name: 'quality', 
    url: 'https://images.pexels.com/photos/18687094/pexels-photo-18687094.jpeg' 
  },
  { 
    name: 'heritage', 
    url: 'https://images.pexels.com/photos/13811658/pexels-photo-13811658.jpeg' 
  },
  { 
    name: 'hiking', 
    url: 'https://images.pexels.com/photos/1632259/pexels-photo-1632259.jpeg' 
  },
  { 
    name: 'photography', 
    url: 'https://images.pexels.com/photos/4621092/pexels-photo-4621092.jpeg' 
  },
  { 
    name: 'recycling', 
    url: 'https://images.pexels.com/photos/30550611/pexels-photo-30550611.jpeg' 
  },
  { 
    name: 'plastic', 
    url: 'https://images.pexels.com/photos/30413959/pexels-photo-30413959.jpeg' 
  },
  { 
    name: 'beach', 
    url: 'https://images.pexels.com/photos/34626734/pexels-photo-34626734.jpeg' 
  },
];

// 🚀 Fonction pour uploader avec gestion d'erreurs
const uploadImage = async (img) => {
  try {
    console.log(`⏳ Uploading ${img.name}...`);
    
    const result = await cloudinary.uploader.upload(img.url, {
      public_id: img.name, // Nom de l'image (sans extension)
      folder: 'ecotips', // Dossier dans Cloudinary
      overwrite: true, // Écrase si existe déjà
      resource_type: 'image',
      transformation: [
        { width: 1200, crop: "limit" }, // Max 1200px de large
        { quality: "auto:good" }, // Qualité automatique optimale
        { fetch_format: "auto" } // Format optimal (WebP, AVIF)
      ]
    });
    
    console.log(`✅ ${img.name} uploaded successfully!`);
    console.log(`   URL: ${result.secure_url}`);
    console.log(`   Size: ${(result.bytes / 1024).toFixed(2)} KB`);
    console.log('');
    
    return result;
  } catch (error) {
    console.error(`❌ Error uploading ${img.name}:`);
    console.error(`   ${error.message}`);
    console.log('');
    return null;
  }
};

// 🎯 Upload séquentiel pour éviter de surcharger l'API
const uploadAllImages = async () => {
  console.log('🚀 Starting upload to Cloudinary...\n');
  console.log(`📁 Uploading ${images.length} images to folder: ecotips\n`);
  
  const results = [];
  
  for (const img of images) {
    const result = await uploadImage(img);
    results.push(result);
    
    // Pause de 500ms entre chaque upload pour être respectueux de l'API
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // 📊 Résumé final
  const successful = results.filter(r => r !== null).length;
  const failed = results.length - successful;
  
  console.log('═══════════════════════════════════════');
  console.log('📊 UPLOAD SUMMARY');
  console.log('═══════════════════════════════════════');
  console.log(`✅ Successful: ${successful}/${images.length}`);
  console.log(`❌ Failed: ${failed}/${images.length}`);
  console.log('═══════════════════════════════════════\n');
  
  // 🔗 Générer les URLs optimisées pour votre code
  if (successful > 0) {
    console.log('📋 Copy this to your constants/ecotips.ts:\n');
    console.log('export const ANIMATED_IMAGES = {');
    
    results.forEach((result, index) => {
      if (result) {
        const name = images[index].name;
        const url = `https://res.cloudinary.com/dpkjgfhcc/image/upload/w_800,q_auto,f_auto,dpr_auto/ecotips/${name}.jpg`;
        console.log(`  ${name}: '${url}',`);
      }
    });
    
    console.log('};\n');
  }
};

// 🎬 Exécution
uploadAllImages()
  .then(() => {
    console.log('🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });