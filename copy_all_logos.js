const fs = require('fs');
const path = require('path');

// Configuration for copy jobs across your local system
const copyJobs = [
  // 1. ONE SCOOP LOGOS
  {
    src: path.join(__dirname, 'project-logo/onescoop_logo.png'),
    dest: '/Users/saran_j/Desktop/Projects/ONE SCOOP/frontend/public/logo.png',
    name: 'ONE SCOOP Logo (Projects Directory)'
  },
  {
    src: path.join(__dirname, 'project-logo/onescoop_logo.png'),
    dest: '/Users/saran_j/Desktop/ONE SCOOP/frontend/public/logo.png',
    name: 'ONE SCOOP Logo (Desktop Directory)'
  },
  
  // 2. NEWS APP LOGOS
  {
    src: path.join(__dirname, 'project-logo/news.png'),
    dest: '/Users/saran_j/Desktop/Projects/News_Website/frontend/news.png',
    name: 'News App Logo (News Website Projects)'
  },
  
  // 3. METEOBRIDGE MCP LOGOS
  {
    src: path.join(__dirname, 'project-logo/MCP.png'),
    dest: '/Users/saran_j/Desktop/Projects/Weather_App/MCP.png',
    name: 'MeteoBridge Logo (Weather App Projects)'
  },
  {
    src: path.join(__dirname, 'project-logo/MCP.png'),
    dest: '/Users/saran_j/Desktop/MCP_Server/MeteoBridge_Real-Time_Weather_Tool_for_LLM/MCP.png',
    name: 'MeteoBridge Logo (MeteoBridge Desktop)'
  },
  {
    src: path.join(__dirname, 'project-logo/MCP.png'),
    dest: path.join(__dirname, 'icons/mcp.png'),
    name: 'MeteoBridge Logo (Portfolio Icons Folder)'
  }
];

console.log('==================================================');
console.log('🚀 Starting Logo Deployment & Copy Process...');
console.log('==================================================');

let successCount = 0;
let failCount = 0;

copyJobs.forEach((job, index) => {
  console.log(`[Job ${index + 1}/${copyJobs.length}] Processing: ${job.name}`);
  
  try {
    // 1. Verify source file exists
    if (!fs.existsSync(job.src)) {
      throw new Error(`Source file does not exist at: ${job.src}`);
    }
    
    // 2. Ensure destination parent directory exists recursively
    const destDir = path.dirname(job.dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
      console.log(`   📁 Created directory path: ${destDir}`);
    }
    
    // 3. Copy file
    fs.copyFileSync(job.src, job.dest);
    console.log(`   ✅ Copied successfully to: ${job.dest}`);
    successCount++;
  } catch (error) {
    console.error(`   ❌ Failed to copy: ${error.message}`);
    failCount++;
  }
  console.log('--------------------------------------------------');
});

console.log('==================================================');
console.log('📊 Execution Summary:');
console.log(`   Success: ${successCount}`);
console.log(`   Failed:  ${failCount}`);
console.log('==================================================');
