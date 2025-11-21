// upload-carousel-to-cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dpkjgfhcc',
  api_key: '915729591589788',
  api_secret: 'kX2n1tJcxjCNma9z0YU3htgVnkc'
});

// 📸 Carousel images
const carouselImages = [
  { 
    name: 'carousel-welcome', 
    url: 'https://images.pexels.com/photos/30574975/pexels-photo-30574975.jpeg',
    title: 'Welcome to MoroccoExplore',
    subtitle: 'Discover the magic of Morocco'
  },
  { 
    name: 'carousel-cities', 
    url: 'https://images.pexels.com/photos/4502973/pexels-photo-4502973.jpeg',
    title: 'Explore Ancient Cities',
    subtitle: 'From Marrakech to Fes'
  },
  { 
    name: 'carousel-desert', 
    url: 'https://images.pexels.com/photos/12214734/pexels-photo-12214734.jpeg',
    title: 'Desert Adventures',
    subtitle: 'Experience the Sahara'
  },
];

// 🚀 Function to upload with error handling
const uploadImage = async (img) => {
  try {
    console.log(`⏳ Uploading ${img.name}...`);
    
    const result = await cloudinary.uploader.upload(img.url, {
      public_id: img.name,
      folder: 'carousel', // Folder in Cloudinary
      overwrite: true,
      resource_type: 'image',
      transformation: [
        { width: 1200, crop: "limit" }, // Max 1200px for hero images
        { quality: "auto:good" },
        { fetch_format: "auto" } // WebP/AVIF support
      ]
    });
    
    console.log(`✅ ${img.name} uploaded successfully!`);
    console.log(`   URL: ${result.secure_url}`);
    console.log(`   Size: ${(result.bytes / 1024).toFixed(2)} KB`);
    console.log('');
    
    return { ...result, originalName: img.name, title: img.title, subtitle: img.subtitle };
  } catch (error) {
    console.error(`❌ Error uploading ${img.name}:`);
    console.error(`   ${error.message}`);
    console.log('');
    return null;
  }
};

// 🎯 Sequential upload to avoid API overload
const uploadAllImages = async () => {
  console.log('🚀 Starting upload to Cloudinary...\n');
  console.log(`📁 Uploading ${carouselImages.length} carousel images\n`);
  
  const results = [];
  
  for (const img of carouselImages) {
    const result = await uploadImage(img);
    results.push(result);
    
    // 500ms pause between uploads
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // 📊 Final summary
  const successful = results.filter(r => r !== null).length;
  const failed = results.length - successful;
  
  console.log('═══════════════════════════════════════');
  console.log('📊 UPLOAD SUMMARY');
  console.log('═══════════════════════════════════════');
  console.log(`✅ Successful: ${successful}/${carouselImages.length}`);
  console.log(`❌ Failed: ${failed}/${carouselImages.length}`);
  console.log('═══════════════════════════════════════\n');
  
  // 🔗 Generate optimized URLs for your code
  if (successful > 0) {
    console.log('📋 Copy this to your carousel component:\n');
    console.log('const carouselData = [');
    
    results.forEach((result, index) => {
      if (result) {
        const url = `https://res.cloudinary.com/dpkjgfhcc/image/upload/w_1200,q_auto,f_auto,dpr_auto/carousel/${result.originalName}.jpg`;
        console.log(`  {`);
        console.log(`    id: ${index + 1},`);
        console.log(`    image: '${url}',`);
        console.log(`    title: '${result.title}',`);
        console.log(`    subtitle: '${result.subtitle}'`);
        console.log(`  }${index < results.length - 1 ? ',' : ''}`);
      }
    });
    
    console.log('];\n');
  }
};

// 🎬 Execute
uploadAllImages()
  .then(() => {
    console.log('🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });