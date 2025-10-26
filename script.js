gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    
    cursorX += distX * 0.3;
    cursorY += distY * 0.3;
    
    const distFollowerX = mouseX - followerX;
    const distFollowerY = mouseY - followerY;
    
    followerX += distFollowerX * 0.1;
    followerY += distFollowerY * 0.1;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll('a, button, .skill-card, .project-card, .nav-toggle').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(2)';
        cursorFollower.style.transform += ' scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
        cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
    });
});

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const menuOverlay = document.querySelector('.menu-overlay');

function toggleMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

navToggle.addEventListener('click', toggleMenu);

menuOverlay.addEventListener('click', toggleMenu);

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

if (!prefersReducedMotion) {
    gsap.timeline()
        .from('.nav', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.nav-logo', {
            opacity: 0,
            x: -30,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.nav-link', {
            opacity: 0,
            y: -20,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.5');

    gsap.timeline()
        .to('.hero-title-line', {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power4.out',
            delay: 0.5
        })
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-cta .btn', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.scroll-indicator', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.5');
} else {
    gsap.set(['.nav', '.nav-logo', '.nav-link', '.hero-title-line', '.hero-subtitle', '.hero-cta .btn', '.scroll-indicator'], {
        opacity: 1,
        y: 0,
        x: 0
    });
}

if (!prefersReducedMotion) {
    gsap.from('.floating-shape', {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)',
        delay: 1
    });

    gsap.to('.shape-1', {
        y: -50,
        x: 30,
        rotation: 90,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.shape-2', {
        y: 40,
        x: -30,
        scale: 1.2,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.shape-3', {
        y: -30,
        x: 40,
        rotation: -45,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
} else {
    gsap.set('.floating-shape', { opacity: 0.1 });
}

gsap.to('.scroll-line', {
    scaleY: 0.5,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});

gsap.to('.orb-1', {
    x: 100,
    y: 100,
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.orb-2', {
    x: -80,
    y: -80,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.orb-3', {
    x: 60,
    y: -60,
    scale: 1.1,
    duration: 18,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.from('.about-image', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
});

gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
});

gsap.from('.section-label', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
});

gsap.from('.about .section-title', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2
});

gsap.from('.about-text', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    delay: 0.4
});

gsap.from('.stat-item', {
    scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'back.out(1.7)'
});

document.querySelectorAll('.stat-number').forEach(stat => {
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        onEnter: () => {
            const target = stat.textContent;
            const isPercent = target.includes('%');
            const number = parseInt(target);
            
            gsap.from(stat, {
                textContent: 0,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: 1 },
                onUpdate: function() {
                    const current = Math.ceil(this.targets()[0].textContent);
                    stat.textContent = isPercent ? current + '%' : current + '+';
                }
            });
        }
    });
});

gsap.to('.image-placeholder', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
    },
    y: -80,
    ease: 'none'
});

gsap.from('.skills .section-label', {
    scrollTrigger: {
        trigger: '.skills',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
});

gsap.from('.skills .section-title', {
    scrollTrigger: {
        trigger: '.skills',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2
});

gsap.from('.skill-card', {
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: {
        amount: 0.8,
        from: 'start',
        grid: 'auto'
    },
    ease: 'back.out(1.4)'
});

document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        gsap.to(card.querySelector('.skill-icon'), {
            rotation: 360,
            duration: 0.6,
            ease: 'back.out(1.7)'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

gsap.from('.projects .section-label', {
    scrollTrigger: {
        trigger: '.projects',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
});

gsap.from('.projects .section-title', {
    scrollTrigger: {
        trigger: '.projects',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2
});

gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
});

document.querySelectorAll('.project-card').forEach(card => {
    gsap.to(card.querySelector('.project-image'), {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -30,
        ease: 'none'
    });
    
    card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.project-overlay'), {
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out'
        });
        
        gsap.to(card.querySelector('.project-title'), {
            x: 10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.project-overlay'), {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
        });
        
        gsap.to(card.querySelector('.project-title'), {
            x: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

gsap.from('.contact .section-label', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
});

gsap.from('.contact .section-title', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2
});

gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    x: -80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.contact-form-wrapper', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    x: 80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.contact-item', {
    scrollTrigger: {
        trigger: '.contact-details',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)'
});

gsap.from('.form-group', {
    scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
});

document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    input.addEventListener('blur', () => {
        gsap.to(input, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = e.target.querySelector('.btn-primary');
    const originalText = button.textContent;
    
    gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        onComplete: () => {
            button.textContent = 'Sent!';
            gsap.to(button, {
                backgroundColor: '#715A5A',
                duration: 0.3
            });
            
            setTimeout(() => {
                button.textContent = originalText;
                e.target.reset();
            }, 2000);
        }
    });
});

gsap.from('.footer-content', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: 'power3.inOut'
            });
        }
    });
});

let lastScrollTop = 0;
const nav = document.querySelector('.nav');

ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: '.nav' },
    onUpdate: (self) => {
        const currentScroll = self.scroll();
        
        if (currentScroll > lastScrollTop && currentScroll > 500) {
            gsap.to(nav, {
                y: -100,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            gsap.to(nav, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
        
        lastScrollTop = currentScroll;
    }
});

gsap.to('.hero-content', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: 200,
    opacity: 0.5,
    ease: 'none'
});

gsap.to('.hero-decoration', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: -100,
    ease: 'none'
});

document.querySelectorAll('.section-title').forEach(title => {
    gsap.to(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
        },
        x: 30,
        ease: 'none'
    });
});

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.about',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
    }
});

tl.to('.image-wrapper', {
    rotation: 5,
    scale: 1.05,
    ease: 'none'
});

ScrollTrigger.create({
    trigger: '.skills',
    start: 'top center',
    end: 'bottom center',
    onEnter: () => {
        document.querySelectorAll('.skill-card').forEach((card, index) => {
            gsap.to(card, {
                y: Math.sin(index) * 20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: index * 0.1
            });
        });
    }
});

const parallaxElements = document.querySelectorAll('.about-image, .project-image, .contact-icon');

parallaxElements.forEach(el => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: -50,
        ease: 'none'
    });
});

window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

if (!prefersReducedMotion) {
    gsap.from('.social-sidebar', {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: 'power3.out'
    });

    gsap.from('.social-icon', {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 2,
        ease: 'back.out(1.7)'
    });
}

document.querySelectorAll('.social-icon').forEach((icon, index) => {
    icon.addEventListener('mouseenter', () => {
        if (!prefersReducedMotion) {
            gsap.to(icon, {
                scale: 1.2,
                rotation: 5,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        }
    });

    icon.addEventListener('mouseleave', () => {
        if (!prefersReducedMotion) {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        if (!prefersReducedMotion) {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });

    btn.addEventListener('mouseleave', () => {
        if (!prefersReducedMotion) {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
});

if (!prefersReducedMotion) {
    const navLinks = document.querySelectorAll('.nav-menu.active .nav-link');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const menu = mutation.target;
                if (menu.classList.contains('active')) {
                    gsap.from('.nav-menu .nav-link', {
                        x: 50,
                        opacity: 0,
                        duration: 0.4,
                        stagger: 0.1,
                        ease: 'power3.out'
                    });
                }
            }
        });
    });

    const navMenu = document.querySelector('.nav-menu');
    observer.observe(navMenu, { attributes: true });
}
