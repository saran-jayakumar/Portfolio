const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9005;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
};

function assembleIndexHtml() {
    const components = [
        'head.html',
        'header.html',
        'hero.html',
        'about.html',
        'skills.html',
        'projects.html',
        'certifications.html',
        'education.html',
        'contact.html',
        'footer.html',
        'foot.html'
    ];
    let html = '';
    components.forEach(comp => {
        const compPath = path.join(__dirname, 'components', comp);
        if (fs.existsSync(compPath)) {
            html += fs.readFileSync(compPath, 'utf8') + '\n';
        }
    });
    try {
        fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
    } catch (writeError) {
        console.warn('Warning: Could not save assembled index.html to disk (permissions/sandbox issue). serving fresh in-memory buffer instead.');
    }
    return html;
}

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './' || filePath === './index.html') {
        try {
            const assembledHtml = assembleIndexHtml();
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(assembledHtml, 'utf-8');
            return;
        } catch (err) {
            console.error('Error assembling index.html in-memory:', err);
        }
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code} ..\n`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Auto assemble index.html on server boot
try {
    assembleIndexHtml();
    console.log('Successfully compiled separate HTML components into index.html');
} catch (err) {
    console.warn('Initial index.html compilation warned:', err.message);
}

server.listen(PORT, () => {
    console.log(`Local development server running at http://localhost:${PORT}`);
});
