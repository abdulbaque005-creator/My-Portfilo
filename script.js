// Typing Animation
const roles = [
    " Aspiring Data Scientist",
    " AI/ML Engineer",
    " Software Developer",
    " State-Level Badminton Player"
];

let i = 0;
let j = 0;
let current = "";
let typing = document.querySelector(".typing");

function type() {
    if (j < roles[i].length) {
        current += roles[i][j];
        typing.innerHTML = current;
        j++;
        setTimeout(type, 100);
    } else {
        setTimeout(() => {
            current = "";
            j = 0;
            i = (i + 1) % roles.length;
            type();
        }, 1500);
    }
}
type();

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');
const progressBars = document.querySelectorAll('.fill');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // If it's a progress bar container, animate the bar
            if(entry.target.classList.contains('progress')) {
                const fill = entry.target.querySelector('.fill');
                if(fill) {
                    fill.style.width = fill.getAttribute('data-width');
                }
            }
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Animate Progress bars separately if they don't have reveal class on parent
progressBars.forEach(bar => {
    const parent = bar.closest('.progress');
    if(!parent || !parent.classList.contains('reveal')) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    bar.style.width = bar.getAttribute('data-width');
                }
            });
        }, revealOptions);
        barObserver.observe(bar);
    }
});

// --- NEW INTERACTIVE FEATURES ---

// Custom Cursor
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Add a slight delay to the outline for a smooth trailing effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .card, .skill, .hero img");
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
        });
        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
        });
    });
}

// Scroll Progress Bar
const scrollProgressBar = document.querySelector(".scroll-progress-bar");

window.addEventListener("scroll", () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${(totalScroll / windowHeight) * 100}%`;
    
    if (scrollProgressBar) {
        scrollProgressBar.style.width = scroll;
    }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) { // Offset for fixed nav
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current) && current !== "") {
            link.classList.add("active");
        }
    });
});

// 3D Tilt Effect on Cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        // Only apply on non-touch devices
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Max rotation is 8 degrees
        const rotateX = ((y - centerY) / centerY) * -8; 
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none'; 
    });
    
    card.addEventListener('mouseleave', () => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; 
    });
    
    card.addEventListener('mouseenter', () => {
         if (!window.matchMedia("(pointer: fine)").matches) return;
         card.style.transition = 'all 0.1s ease-out';
    });
});
