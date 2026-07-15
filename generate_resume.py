import sys
try:
    from fpdf import FPDF
except ImportError:
    print("fpdf2 library not found. Please install it first.")
    sys.exit(1)

class ResumePDF(FPDF):
    def __init__(self):
        super().__init__(orientation='P', unit='mm', format='A4')
        self.set_margins(12, 12, 12)
        self.set_auto_page_break(auto=True, margin=10)
        
    def draw_header(self):
        # Background design (top bar in slate-900 equivalent)
        self.set_fill_color(15, 23, 42)
        self.rect(0, 0, 210, 42, 'F')
        
        # Name
        self.set_xy(15, 8)
        self.set_font('Helvetica', 'B', 26)
        self.set_text_color(255, 255, 255)
        self.cell(0, 10, "Saran Jayakumar", ln=True)
        
        # Subtitle
        self.set_x(15)
        self.set_font('Helvetica', 'B', 13)
        self.set_text_color(6, 182, 212) # Accent color Cyan
        self.cell(0, 6, "Java Full-Stack & AI-Augmented Developer", ln=True)
        
        # Contact information block (Right aligned or formatted)
        self.set_font('Helvetica', '', 8.5)
        self.set_text_color(203, 213, 225)
        
        contacts = [
            "saranjayakumar22@gmail.com  |  +91 6379928948",
            "GitHub: github.com/saran-jayakumar  |  LinkedIn: linkedin.com/in/saran-jayakumar",
            "Location: Trichy, Tamil Nadu, India"
        ]
        
        self.set_xy(15, 23)
        for contact in contacts:
            self.set_x(15)
            self.cell(0, 4.5, contact, ln=True)
            
        self.set_xy(12, 48)

    def section_title(self, title):
        self.set_font('Helvetica', 'B', 12)
        self.set_text_color(139, 92, 246) # Secondary color Violet
        self.cell(0, 6, title.upper(), ln=True)
        
        # Bottom border for section header
        x = self.get_x()
        y = self.get_y()
        self.set_draw_color(59, 130, 246) # Primary color Blue
        self.set_line_width(0.4)
        self.line(x, y + 1, x + 186, y + 1)
        self.ln(3)

    def add_bullet_point(self, title, desc, tech=""):
        self.set_x(15)
        self.set_font('Helvetica', 'B', 9.5)
        self.set_text_color(15, 23, 42)
        self.cell(0, 5, title, ln=True)
        
        if tech:
            self.set_x(15)
            self.set_font('Helvetica', 'I', 8.5)
            self.set_text_color(100, 116, 139)
            self.cell(0, 4.5, tech, ln=True)
            
        self.set_x(18)
        self.set_font('Helvetica', '', 9)
        self.set_text_color(51, 65, 85)
        self.multi_cell(180, 4.5, desc)
        self.ln(2)

def generate_resume():
    pdf = ResumePDF()
    pdf.add_page()
    pdf.draw_header()
    
    # 1. Professional Summary
    pdf.section_title("Professional Summary")
    pdf.set_font('Helvetica', '', 9.5)
    pdf.set_text_color(51, 65, 85)
    summary_text = (
        "Software engineer and Electronics & Communication Engineering graduate with a strong foundation in "
        "Object-Oriented Programming (OOP) and hands-on experience building full-stack applications with Node.js, "
        "Java, React.js, and SQL. Practised in AI-augmented development using agentic coding assistants (Claude Code) "
        "to write and test production-quality features faster. Anthropic-certified in Claude Code, Model Context Protocol, "
        "and Agent Skills. Product-first mindset and strong English communication."
    )
    pdf.multi_cell(186, 4.5, summary_text)
    pdf.ln(4)
    
    # 2. Technical Experience
    pdf.section_title("Technical Experience")
    
    pdf.add_bullet_point(
        "One Scoop (AI-Augmented Development)",
        "- Fully architected, coded, and debugged a complex multi-dashboard system by directing agentic AI coding assistants, demonstrating advanced prompt engineering and AI-augmented software development workflows.\n"
        "- Guided AI agents to implement secure Role-Based Access Control (RBAC) using Spring Security and JWT, protecting API endpoints for 4 user roles.\n"
        "- Directed the generation of tableside order pipelines and billing workflows, validating AI-generated code for security, logic, and component modularity.\n"
        "- Managed AI agents to build a normalized MySQL schema and responsive React dashboards, achieving significantly faster development speed from concept to deployment.",
        "Technologies: Java | Spring Boot | React.js | MySQL | Agentic AI (Claude Code/Gemini)"
    )
    
    pdf.add_bullet_point(
        "News App",
        "- Created a news website and NewsAPI to fetch and display live news articles dynamically.\n"
        "- Added category-based filtering for sports, business, and technology news with a responsive and user-friendly interface.",
        "Technologies: HTML | CSS | JavaScript"
    )
    
    pdf.add_bullet_point(
        "Weather App",
        "- Integrated with the OpenWeather API to display real-time weather information based on user input.\n"
        "- Focused on clean UI design, accurate data fetching, and optimized performance for all devices.",
        "Technologies: HTML | CSS | JavaScript"
    )
    pdf.ln(2)
    
    # 3. Technical Skills
    pdf.section_title("Technical Skills")
    
    # Draw skills as a two-column grid
    col_width = 90
    y_start = pdf.get_y()
    
    pdf.set_font('Helvetica', 'B', 9)
    pdf.set_text_color(15, 23, 42)
    
    # Column 1
    pdf.text(15, y_start + 4, "Languages:")
    pdf.set_font('Helvetica', '', 8.5)
    pdf.text(45, y_start + 4, "Java, JavaScript (ES6+), SQL, HTML5 & CSS3")
    
    pdf.set_font('Helvetica', 'B', 9)
    pdf.text(15, y_start + 9, "Frameworks & Libs:")
    pdf.set_font('Helvetica', '', 8.5)
    pdf.text(45, y_start + 9, "Spring Boot, Node.js, React.js")
    
    pdf.set_font('Helvetica', 'B', 9)
    pdf.text(15, y_start + 14, "Databases:")
    pdf.set_font('Helvetica', '', 8.5)
    pdf.text(45, y_start + 14, "SQL (MySQL), MongoDB")

    # Column 2
    pdf.set_font('Helvetica', 'B', 9)
    pdf.text(110, y_start + 4, "AI-Augmented Dev:")
    pdf.set_font('Helvetica', '', 8.5)
    pdf.text(142, y_start + 4, "Claude Code, GitHub Copilot, MCP, Ollama & OpenWebUI")
    
    pdf.set_font('Helvetica', 'B', 9)
    pdf.text(110, y_start + 9, "Tools & Practices:")
    pdf.set_font('Helvetica', '', 8.5)
    pdf.text(142, y_start + 9, "Git, GitHub, Postman, Agile/Scrum")
    
    pdf.set_font('Helvetica', 'B', 9)
    pdf.text(110, y_start + 14, "CS Fundamentals:")
    pdf.set_font('Helvetica', '', 8.5)
    pdf.text(142, y_start + 14, "OOPs, DBMS, REST API design")
    
    pdf.set_y(y_start + 18)
    pdf.ln(3)

    # 4. Academic Project
    pdf.section_title("Academic Project")
    pdf.add_bullet_point(
        "Dynamic Wireless E-Vehicle Charging (2023 - 2024)",
        "- Designed and implemented an inductive power transfer system for EVs using a ground-embedded charging pad and onboard receiver.\n"
        "- Achieved up to 95% charging efficiency in prototype tests.\n"
        "- Created safety mechanisms with alignment detection, improving operational reliability.",
        "Technologies: Arduino Nano | Embedded Coil | Prototype Testing"
    )
    pdf.ln(1)

    # 5. Certifications & Education (Side-by-side or stacked)
    # Let's stack them elegantly
    pdf.section_title("Certifications")
    pdf.set_font('Helvetica', '', 9)
    pdf.set_text_color(51, 65, 85)
    certs = (
        "Anthropic: Claude 101  |  Claude Code in Action  |  Model Context Protocol  |  Agent Skills\n"
        "SimpliLearn: OOPS in Java"
    )
    pdf.multi_cell(186, 4.5, certs)
    pdf.ln(3)
    
    pdf.section_title("Education")
    
    # BE
    pdf.set_font('Helvetica', 'B', 9)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(140, 4.5, "Bachelor of Engineering in ECE | K.Ramakrishnan College of Engineering | Trichy", ln=False)
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(46, 4.5, "2021 - 2024 | CGPA: 7.1", ln=True, align='R')
    pdf.ln(1)
    
    # Diploma
    pdf.set_font('Helvetica', 'B', 9)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(140, 4.5, "Diploma Certification in ECE | Sri Vignesh Polytechnic College | Trichy", ln=False)
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(46, 4.5, "2019 - 2021 | Percentage: 80%", ln=True, align='R')
    
    # Save the file
    pdf.output("saran_jayakumar_resume.pdf")
    print("Resume PDF generated successfully as 'saran_jayakumar_resume.pdf'")

if __name__ == "__main__":
    generate_resume()
