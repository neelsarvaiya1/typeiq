document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Fade-in Animation on Scroll using Intersection Observer
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 3D Card Tilt Effect on Showcase Cards
    const cards = document.querySelectorAll('.showcase-card');
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    
    if (supportsHover) {
        cards.forEach(card => {
            let tiltFrame;
            card.addEventListener('mousemove', (e) => {
                if (tiltFrame) cancelAnimationFrame(tiltFrame);
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate rotation: max 6 degrees for executive subtlety
                const rotateX = ((rect.height / 2) - y) / (rect.height / 2) * 6;
                const rotateY = (x - (rect.width / 2)) / (rect.width / 2) * 6;
                
                tiltFrame = requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });
            });
            
            card.addEventListener('mouseleave', () => {
                if (tiltFrame) cancelAnimationFrame(tiltFrame);
                tiltFrame = requestAnimationFrame(() => {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                });
            });
        });
    }

    // Subtle Parallax on Hero Profile Photo Wrapper
    const heroPhotoWrap = document.querySelector('.hero-photo-wrap');
    
    if (heroPhotoWrap && window.innerWidth > 860) {
        let scrollFrame;
        window.addEventListener('scroll', () => {
            if (scrollFrame) cancelAnimationFrame(scrollFrame);
            
            scrollFrame = requestAnimationFrame(() => {
                const rect = heroPhotoWrap.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Only animate if the element is visible on screen
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const relativeY = rect.top - (windowHeight / 2);
                    const translateY = relativeY * 0.05; // 5% scroll rate
                    heroPhotoWrap.style.transform = `translateY(${translateY}px)`;
                }
            });
        }, { passive: true });
    }

    // Animated Counters for Highlights
    const counters = document.querySelectorAll('.counter');
    const counterOptions = {
        threshold: 0.2,
        rootMargin: "0px"
    };
    
    const countUp = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 1200; // ms
        const startTime = performance.now();
        
        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            
            const currentValue = Math.floor(easeProgress * target);
            counter.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCount);
    };
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, counterOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});
