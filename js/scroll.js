export function initScroll() {
    // 1. Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const scrollProgress = document.getElementById('scroll-progress');
        if (scrollProgress) {
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (scrollHeight > 0) {
                const scrolled = (window.scrollY / scrollHeight) * 100;
                scrollProgress.style.width = scrolled + '%';
            }
        }
    });

    // 2. Intersection Observer (Scroll Reveal)
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }
}
