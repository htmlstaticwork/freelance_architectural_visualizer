// Register GSAP plugins (if any)
document.addEventListener('DOMContentLoaded', () => {
    // Basic Fade In Animation
    gsap.from('.reveal-text', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2
    });

    // Image Reveal (Clip Path Animation)
    gsap.utils.toArray('.img-reveal').forEach((image) => {
        gsap.from(image, {
            clipPath: 'inset(100% 0% 0% 0%)',
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: image,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Simple Scroll Based Fade In for sections
    gsap.utils.toArray('.section-scroll').forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
});
