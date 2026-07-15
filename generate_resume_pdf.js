const fs = require('fs');

function generatePDF() {
    let objects = [];
    let streamData = "";
    
    // Helper to escape PDF text
    function escapePDFText(text) {
        return text
            .replace(/\\/g, '\\\\')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)');
    }
    
    // Draw horizontal line
    function drawLine(x1, y1, x2, y2, width = 0.5, r = 0.2, g = 0.3, b = 0.4) {
        streamData += `${r} ${g} ${b} RG\n`;
        streamData += `${width} w\n`;
        streamData += `${x1} ${y1} m\n`;
        streamData += `${x2} ${y2} l\n`;
        streamData += `S\n`;
    }
    
    // Draw text line
    function drawText(text, font, size, x, y, r = 0.1, g = 0.1, b = 0.1) {
        streamData += `BT\n`;
        streamData += `/${font} ${size} Tf\n`;
        streamData += `${r} ${g} ${b} rg\n`;
        streamData += `1.0 0.0 0.0 1.0 ${x} ${y} Tm\n`;
        streamData += `(${escapePDFText(text)}) Tj\n`;
        streamData += `ET\n`;
    }
    
    // Draw wrapped text paragraph
    function drawParagraph(text, font, size, x, startY, maxWidth, lineHeight, r = 0.2, g = 0.2, b = 0.2) {
        const words = text.split(' ');
        let currentLine = "";
        let currentY = startY;
        
        // Approximate character width calculation for Helvetica (average width is ~0.6 of font size)
        const avgCharWidth = size * 0.5;
        
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine ? currentLine + " " + word : word;
            const testWidth = testLine.length * avgCharWidth;
            
            if (testWidth > maxWidth && currentLine) {
                drawText(currentLine, font, size, x, currentY, r, g, b);
                currentY -= lineHeight;
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        
        if (currentLine) {
            drawText(currentLine, font, size, x, currentY, r, g, b);
            currentY -= lineHeight;
        }
        
        return currentY;
    }
    
    // Header block colored background
    // In PDF, standard fill rectangle command is: x y w h re f
    // Let's add a rectangle: 0 790 595.275 60
    streamData += `0.06 0.09 0.16 rg\n`; // Slate 900
    streamData += `0 780 595.275 70 re f\n`;
    
    // Header content
    drawText("Saran Jayakumar", "F1", 24, 40, 815, 1.0, 1.0, 1.0);
    drawText("Java Full-Stack & AI-Augmented Developer", "F1", 12, 40, 798, 0.02, 0.71, 0.84); // Cyan
    
    // Contact
    drawText("saranjayakumar22@gmail.com  |  +91 6379928948", "F2", 8.5, 40, 785, 0.8, 0.83, 0.88);
    drawText("GitHub: github.com/saran_jayakumar  |  LinkedIn: linkedin.com/in/saran_jayakumar", "F2", 8.5, 40, 773, 0.8, 0.83, 0.88);
    drawText("Location: Trichy, Tamil Nadu, India", "F2", 8.5, 40, 761, 0.8, 0.83, 0.88);
    
    let y = 735;
    
    // SECTION: Professional Summary
    drawText("PROFESSIONAL SUMMARY", "F1", 11, 40, y, 0.54, 0.36, 0.96); // Purple
    drawLine(40, y - 4, 555, y - 4, 0.5, 0.23, 0.51, 0.96); // Blue
    y -= 18;
    
    const summary = "Software engineer and Electronics & Communication Engineering graduate with a strong foundation in Object-Oriented Programming (OOP), and hands-on experience building full-stack applications with Node.js, Java, React.js, and SQL. Practised in AI-augmented development using agentic coding assistants (Claude Code) to write and test production-quality features faster. Anthropic-certified in Claude Code, Model Context Protocol, and Agent Skills. Product-first mindset and strong English communication.";
    y = drawParagraph(summary, "F2", 9, 40, y, 515, 13, 0.2, 0.27, 0.33);
    y -= 10;
    
    // SECTION: Technical Experience
    drawText("TECHNICAL EXPERIENCE", "F1", 11, 40, y, 0.54, 0.36, 0.96);
    drawLine(40, y - 4, 555, y - 4, 0.5, 0.23, 0.51, 0.96);
    y -= 16;
    
    // One Scoop
    drawText("One Scoop (AI-Augmented Development)", "F1", 10, 45, y, 0.06, 0.09, 0.16);
    drawText("Java | Spring Boot | React.js | MySQL | Agentic AI (Claude Code/Gemini)", "F2", 8.5, 240, y, 0.4, 0.45, 0.5);
    y -= 12;
    y = drawParagraph("- Fully architected, coded, and debugged a complex multi-dashboard system by directing agentic AI coding assistants, demonstrating advanced prompt engineering and AI-augmented software development workflows.", "F2", 9, 50, y, 500, 11, 0.2, 0.27, 0.33);
    y -= 1;
    y = drawParagraph("- Guided AI agents to implement secure Role-Based Access Control (RBAC) using Spring Security and JWT, protecting API endpoints for 4 user roles.", "F2", 9, 50, y, 500, 11, 0.2, 0.27, 0.33);
    y -= 1;
    y = drawParagraph("- Directed the generation of tableside order pipelines and billing workflows, validating AI-generated code for security, logic, and component modularity.", "F2", 9, 50, y, 500, 11, 0.2, 0.27, 0.33);
    y -= 1;
    y = drawParagraph("- Managed AI agents to build a normalized MySQL schema and responsive React dashboards, achieving significantly faster development speed from concept to deployment.", "F2", 9, 50, y, 500, 11, 0.2, 0.27, 0.33);
    y -= 4;
    
    // News App
    drawText("News App", "F1", 10, 45, y, 0.06, 0.09, 0.16);
    drawText("HTML | CSS | JavaScript", "F2", 8.5, 360, y, 0.4, 0.45, 0.5);
    y -= 12;
    drawText("- Created a news portal and NewsAPI to fetch and display live news articles dynamically.", "F2", 9, 50, y, 0.2, 0.27, 0.33);
    y -= 12;
    drawText("- Added category-based filtering (sports, business, tech) with a responsive user interface.", "F2", 9, 50, y, 0.2, 0.27, 0.33);
    y -= 16;
    
    // Weather App
    drawText("Weather App", "F1", 10, 45, y, 0.06, 0.09, 0.16);
    drawText("HTML | CSS | JavaScript", "F2", 8.5, 360, y, 0.4, 0.45, 0.5);
    y -= 12;
    drawText("- Integrated with the OpenWeather API to display real-time weather information by user input.", "F2", 9, 50, y, 0.2, 0.27, 0.33);
    y -= 12;
    drawText("- Focused on clean UI design, accurate data serialization, and optimized rendering speed.", "F2", 9, 50, y, 0.2, 0.27, 0.33);
    y -= 20;

    // SECTION: Technical Skills
    drawText("TECHNICAL SKILLS", "F1", 11, 40, y, 0.54, 0.36, 0.96);
    drawLine(40, y - 4, 555, y - 4, 0.5, 0.23, 0.51, 0.96);
    y -= 16;
    
    // Grid design for skills
    drawText("Languages:", "F1", 9, 45, y, 0.06, 0.09, 0.16);
    drawText("Java, JavaScript (ES6+), SQL, HTML5 & CSS3", "F2", 8.5, 140, y, 0.2, 0.27, 0.33);
    
    drawText("AI-Augmented Dev:", "F1", 9, 310, y, 0.06, 0.09, 0.16);
    drawText("Claude Code, Copilot, MCP, Ollama", "F2", 8.5, 415, y, 0.2, 0.27, 0.33);
    y -= 12;
    
    drawText("Frameworks & Libs:", "F1", 9, 45, y, 0.06, 0.09, 0.16);
    drawText("Spring Boot, Node.js, React.js", "F2", 8.5, 140, y, 0.2, 0.27, 0.33);
    
    drawText("Tools & Practices:", "F1", 9, 310, y, 0.06, 0.09, 0.16);
    drawText("Git, GitHub, Postman, Agile/Scrum", "F2", 8.5, 415, y, 0.2, 0.27, 0.33);
    y -= 12;
    
    drawText("Databases:", "F1", 9, 45, y, 0.06, 0.09, 0.16);
    drawText("SQL (MySQL), MongoDB", "F2", 8.5, 140, y, 0.2, 0.27, 0.33);
    
    drawText("CS Fundamentals:", "F1", 9, 310, y, 0.06, 0.09, 0.16);
    drawText("OOPs, DBMS, REST API design", "F2", 8.5, 415, y, 0.2, 0.27, 0.33);
    y -= 20;

    // SECTION: Academic Project & Certifications
    drawText("ACADEMIC PROJECT", "F1", 11, 40, y, 0.54, 0.36, 0.96);
    drawLine(40, y - 4, 555, y - 4, 0.5, 0.23, 0.51, 0.96);
    y -= 16;
    
    drawText("Dynamic Wireless E-Vehicle Charging (2023 - 2024)", "F1", 9.5, 45, y, 0.06, 0.09, 0.16);
    drawText("Arduino Nano | Embedded Coil | Prototype", "F2", 8.5, 360, y, 0.4, 0.45, 0.5);
    y -= 12;
    drawText("- Designed inductive power transfer system using ground charging pad and onboard receiver.", "F2", 9, 50, y, 0.2, 0.27, 0.33);
    y -= 12;
    drawText("- Achieved up to 95% charging efficiency in prototype tests with alignment safety mechanisms.", "F2", 9, 50, y, 0.2, 0.27, 0.33);
    y -= 20;
    
    // SECTION: Certifications & Education Timeline
    drawText("CERTIFICATIONS & EDUCATION", "F1", 11, 40, y, 0.54, 0.36, 0.96);
    drawLine(40, y - 4, 555, y - 4, 0.5, 0.23, 0.51, 0.96);
    y -= 16;
    
    drawText("Certifications:", "F1", 9.5, 45, y, 0.06, 0.09, 0.16);
    drawText("Anthropic: Claude 101, Claude Code in Action, Model Context Protocol, Agent Skills", "F2", 8.5, 140, y, 0.2, 0.27, 0.33);
    y -= 10;
    drawText("SimpliLearn: OOPS in Java", "F2", 8.5, 140, y, 0.2, 0.27, 0.33);
    y -= 16;
    
    drawText("Education:", "F1", 9.5, 45, y, 0.06, 0.09, 0.16);
    drawText("B.Eng. in ECE | K.Ramakrishnan College of Engineering | 2021 - 2024 | CGPA: 7.1", "F2", 9, 140, y, 0.2, 0.27, 0.33);
    y -= 12;
    drawText("Diploma in ECE | Sri Vignesh Polytechnic College | 2019 - 2021 | Percentage: 80%", "F2", 9, 140, y, 0.2, 0.27, 0.33);

    // ==========================================================================
    // COMPILING PDF BINARY FORMAT
    // ==========================================================================
    
    let offsets = [];
    let out = [];
    
    function writeToBuffer(content) {
        let pos = out.reduce((acc, chunk) => acc + chunk.length, 0);
        offsets.push(pos);
        out.push(Buffer.isBuffer(content) ? content : Buffer.from(content, 'binary'));
    }
    
    // PDF Magic Header
    out.push(Buffer.from("%PDF-1.4\n", 'binary'));
    
    // Obj 1: Catalog
    writeToBuffer("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
    // Obj 2: Pages
    writeToBuffer("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
    // Obj 3: Page (A4 is 595.275 x 841.889 points)
    writeToBuffer("3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.275 841.889] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n");
    // Obj 4: Font 1 Bold
    writeToBuffer("4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n");
    // Obj 5: Font 2 Regular
    writeToBuffer("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n");
    
    // Obj 6: Contents Stream
    let streamContent = streamData;
    let streamHeader = `6 0 obj\n<< /Length ${streamContent.length} >>\nstream\n`;
    let streamFooter = "\nendstream\nendobj\n";
    writeToBuffer(streamHeader + streamContent + streamFooter);
    
    // XREF Table
    let startXref = out.reduce((acc, chunk) => acc + chunk.length, 0);
    let xref = "xref\n0 7\n0000000000 65535 f \n";
    for (let i = 0; i < offsets.length; i++) {
        let offsetStr = String(offsets[i]).padStart(10, '0');
        xref += `${offsetStr} 00000 n \n`;
    }
    
    let trailer = `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;
    
    out.push(Buffer.from(xref + trailer, 'binary'));
    
    const finalBuffer = Buffer.concat(out);
    const outputPath = '/Users/saran_j/.gemini/antigravity-ide/scratch/saran_jayakumar_resume.pdf';
    fs.writeFileSync(outputPath, finalBuffer);
    console.log("PDF Resume compiled and saved to " + outputPath + " successfully!");
    try {
        fs.writeFileSync('saran_jayakumar_resume.pdf', finalBuffer);
        console.log("PDF Resume also updated in the local workspace directory successfully!");
    } catch (err) {
        console.error("Warning: Could not save to local workspace directory: ", err);
    }
}

generatePDF();
