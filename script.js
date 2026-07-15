document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // THEME TOGGLE (DARK / LIGHT MODE)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Dynamic feedback ripple effect inside button
        themeToggleBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggleBtn.style.transform = 'scale(1.05)';
        }, 150);
    });

    // ==========================================================================
    // RESPONSIVE MOBILE NAVIGATION MENU
    // ==========================================================================
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================================================
    // STICKY HEADER & SCROLLSPY (ACTIVE NAV INDICATOR)
    // ==========================================================================
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        // Sticky Navigation padding reduction
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active scrollspy tracking
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

    // ==========================================================================
    // TYPEWRITER EFFECT IN HERO
    // ==========================================================================
    const typewriterElement = document.getElementById('typewriter-text');
    const words = ['Java Full-Stack Developer', 'Web Developer', 'AI-Augmented Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Natural typing speed
        }
        
        // Handle transitions
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before starting next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    if (typewriterElement) {
        type();
    }

    // ==========================================================================
    // PROJECT FILTERING
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state in buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Add fade out animation first
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        // Trigger reflow for animation
                        card.offsetHeight;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // ==========================================================================
    // PERSISTENT FLOATING BLOB INTERACTIONS (MOUSE TRACKING)
    // ==========================================================================
    const blobs = document.querySelectorAll('.blob');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Compute delta offsets relative to center
        const offsetX = (mouseX - window.innerWidth / 2) * 0.03;
        const offsetY = (mouseY - window.innerHeight / 2) * 0.03;
        
        blobs.forEach((blob, idx) => {
            const multiplier = (idx + 1) * 0.5;
            blob.style.transform = `translate(${offsetX * multiplier}px, ${offsetY * multiplier}px)`;
        });
    });

    // ==========================================================================
    // CARD 3D TILT EFFECT
    // ==========================================================================
    const tiltCards = document.querySelectorAll('.card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate inside the element.
            const y = e.clientY - rect.top;  // y coordinate inside the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angle (max 10 degrees)
            const rotateX = ((centerY - y) / centerY) * 6;
            const rotateY = ((x - centerX) / centerX) * 6;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            
            // Update glass glow overlay background gradient based on pointer location
            const glowEl = card.querySelector('.avatar-card-glow');
            if (glowEl) {
                glowEl.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(59, 130, 246, 0.25) 0%, rgba(6, 186, 212, 0.05) 50%, transparent 100%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            
            const glowEl = card.querySelector('.avatar-card-glow');
            if (glowEl) {
                glowEl.style.background = '';
            }
        });
    });

    // ==========================================================================
    // CONTACT FORM INTERACTION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formSuccessMessage = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const submitBtnText = submitBtn.querySelector('span');
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            submitBtn.disabled = true;
            submitBtnText.textContent = 'Sending Message...';
            
            // Send the form data to FormSubmit AJAX endpoint
            fetch("https://formsubmit.co/ajax/saranjayakumar22@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Name: name,
                    Email: email,
                    Subject: subject,
                    Message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtnText.textContent = 'Send Message';
                
                // Show glassmorphic success overlay
                formSuccessMessage.style.display = 'flex';
                // Trigger reflow
                formSuccessMessage.offsetHeight;
                formSuccessMessage.classList.add('active');
                
                // Auto hide success overlay after 5 seconds
                setTimeout(() => {
                    formSuccessMessage.classList.remove('active');
                    setTimeout(() => {
                        formSuccessMessage.style.display = 'none';
                    }, 300);
                }, 5000);
            })
            .catch(error => {
                console.error('Error sending message:', error);
                submitBtn.disabled = false;
                submitBtnText.textContent = 'Send Message';
                alert('Oops! There was an issue sending your message. Please try again or email me directly.');
            });
        });
    }
});
