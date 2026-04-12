gsap.registerPlugin(ScrollTrigger);

// Global GSAP Performance Configuration
gsap.config({ force3D: true });
ScrollTrigger.config({ 
    limitCallbacks: true,
    ignoreMobileResize: true,
    fastScrollEnd: true
});

document.addEventListener("DOMContentLoaded", () => {
    
    // Header Color Switch Logic
    const header = document.querySelector('header');
    const sections = gsap.utils.toArray('.section-light, #ecosistema');
    
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 40px",
            end: "bottom 40px",
            anticipatePin: 1,
            onEnter: () => header.classList.add('nav-light-mode'),
            onLeave: () => header.classList.remove('nav-light-mode'),
            onEnterBack: () => header.classList.add('nav-light-mode'),
            onLeaveBack: () => header.classList.remove('nav-light-mode')
        });
    });

    // Intelligent Video Visibility Management
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        ScrollTrigger.create({
            trigger: ".hero-video",
            start: "top top",
            end: "bottom top",
            onLeave: () => heroVideo.style.visibility = 'hidden',
            onEnterBack: () => heroVideo.style.visibility = 'visible'
        });
    }

    // Drawer Logic
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('drawer-overlay');
    const submenuParent = document.getElementById('submenu-parent');
    const submenu = document.getElementById('submenu');

    const toggleDrawer = (open) => {
        if (open) {
            drawer.classList.add('open');
            overlay.classList.add('open');
            header.style.display = 'none'; // Hide entire header to avoid overlap
            document.body.style.overflow = 'hidden';
        } else {
            drawer.classList.remove('open');
            overlay.classList.remove('open');
            header.style.display = 'flex';
            document.body.style.overflow = '';
        }
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleDrawer(true);
        });
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleDrawer(false);
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => toggleDrawer(false));
    }

    if (submenuParent && submenu) {
        submenuParent.addEventListener('mouseenter', () => submenu.classList.add('open'));
        submenuParent.addEventListener('mouseleave', () => submenu.classList.remove('open'));
    }

    // Reveal Animations Strategy
    gsap.utils.toArray('section').forEach(section => {
        const elements = section.querySelectorAll('h2, .eco-card, .service-item, .service-block, .animate-reveal');
        if (elements.length > 0) {
            gsap.from(elements, {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.1,
                overwrite: "auto",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                    fastScrollEnd: true
                }
            });
        }
    });

    // Hero Specific Reveal (if present)
    const heroContent = document.querySelectorAll('h1, h1 + p');
    if (heroContent.length > 0) {
        gsap.from(heroContent, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.2
        });
    }
});
