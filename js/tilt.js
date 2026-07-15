export function initTilt() {
    // 1. Background Blob Hover Trail
    const blobs = document.querySelectorAll('.blob');
    if (blobs.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const offsetX = (mouseX - window.innerWidth / 2) * 0.03;
            const offsetY = (mouseY - window.innerHeight / 2) * 0.03;
            
            blobs.forEach((blob, idx) => {
                const multiplier = (idx + 1) * 0.5;
                blob.style.transform = `translate(${offsetX * multiplier}px, ${offsetY * multiplier}px)`;
            });
        });
    }

    // 2. 3D Card Hover Perspective Rotation
    const tiltCards = document.querySelectorAll('.card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((centerY - y) / centerY) * 6;
            const rotateY = ((x - centerX) / centerX) * 6;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            
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
}
