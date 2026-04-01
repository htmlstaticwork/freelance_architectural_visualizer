document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Sticky Nav Logic
    const hasHero = document.querySelector('.hero');
    if (!hasHero) navbar.classList.add('scrolled');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50 || !hasHero) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile Nav Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is active
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const dropdown = link.closest('.dropdown');
                
                // If it's a dropdown toggle on mobile, just open the dropdown and don't close the main menu
                if (window.innerWidth <= 1024 && dropdown && link.classList.contains('nav-link')) {
                    e.preventDefault();
                    dropdown.classList.toggle('mobile-active');
                    const icon = link.querySelector('i');
                    if (icon) {
                        icon.style.transform = dropdown.classList.contains('mobile-active') ? 'rotate(180deg)' : 'none';
                        icon.style.transition = 'transform 0.3s ease';
                        icon.style.display = 'inline-block';
                    }
                    return;
                }

                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }


    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Active Navbar Highlighting Logic
    const currentPath = window.location.pathname;
    const page = currentPath.split("/").pop() || 'index.html';
    
    // Highlight top-level nav-links
    document.querySelectorAll('.nav-links .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        // Handle root path or index.html comparison
        if (href === page || (page === 'index.html' && href === './') || (page === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Handle dropdown items separately to highlight their parents if necessary
    document.querySelectorAll('.dropdown-item').forEach(link => {
        const href = link.getAttribute('href');
        if (href === page) {
            link.classList.add('active');
            
            // Highlight the parent nav-link if child is active
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const parentLink = parentDropdown.querySelector('.nav-link');
                if (parentLink) parentLink.classList.add('active');
            }
        }
    });

    // Lazy Loading Images (Intersection Observer)
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
