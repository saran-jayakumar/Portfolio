const fs = require('fs');
const path = require('path');

const logoJobs = [
  {
    src: path.join(__dirname, 'project-logo/onescoop_logo.png'),
    dest: '/Users/saran_j/Desktop/Projects/ONE SCOOP/frontend/public/logo.png',
    name: 'One Scoop logo (Projects)'
  },
  {
    src: path.join(__dirname, 'project-logo/onescoop_logo.png'),
    dest: '/Users/saran_j/Desktop/ONE SCOOP/frontend/public/logo.png',
    name: 'One Scoop logo (Desktop)'
  },
  {
    src: path.join(__dirname, 'project-logo/onescoop_logo.png'),
    dest: path.join(__dirname, 'one-scoop-logo.png'),
    name: 'One Scoop logo (Portfolio)'
  },
  {
    src: path.join(__dirname, 'project-logo/news.png'),
    dest: '/Users/saran_j/Desktop/Projects/News_Website/frontend/news.png',
    name: 'News App logo (News_Website)'
  },
  {
    src: path.join(__dirname, 'project-logo/news.png'),
    dest: path.join(__dirname, 'news.png'),
    name: 'News App logo (Portfolio)'
  },
  {
    src: path.join(__dirname, 'project-logo/MCP.png'),
    dest: '/Users/saran_j/Desktop/Projects/Weather_App/MCP.png',
    name: 'MCP logo (Weather_App)'
  },
  {
    src: path.join(__dirname, 'project-logo/MCP.png'),
    dest: '/Users/saran_j/Desktop/MCP_Server/MeteoBridge_Real-Time_Weather_Tool_for_LLM/MCP.png',
    name: 'MCP logo (MeteoBridge MCP Server)'
  },
  {
    src: path.join(__dirname, 'project-logo/MCP.png'),
    dest: path.join(__dirname, 'icons/mcp.png'),
    name: 'MCP logo (Portfolio icons)'
  }
];

console.log('Starting logo copy process...');

logoJobs.forEach(job => {
  try {
    // Ensure destination directory exists
    const destDir = path.dirname(job.dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
      console.log(`Created directory: ${destDir}`);
    }
    
    // Copy file
    fs.copyFileSync(job.src, job.dest);
    console.log(`✅ Successfully copied ${job.name} to ${job.dest}`);
  } catch (error) {
    console.error(`❌ Failed to copy ${job.name} to ${job.dest}:`, error.message);
  }
});

console.log('Logo copy process completed.');
