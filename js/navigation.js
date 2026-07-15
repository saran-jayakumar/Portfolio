export function initNavigation() {
    // Responsive Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Sticky Header & Active Scrollspy Indicator
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    
    if (header && sections.length > 0) {
        window.addEventListener('scroll', () => {
            // Sticky padding reduction
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Active navspy tracking
            let scrollY = window.scrollY;
            
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 120;
                const sectionId = current.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
                } else {
                    document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
                }
            });
        });
    }
}
