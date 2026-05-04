// ================= RENDER PROJECTS FROM projects.js =================
/**
 * এই ফাংশনটি projects.js থেকে ডাটা নিয়ে HTML এ কার্ড তৈরি করবে।
 * আপনার HTML এ অবশ্যই একটি container থাকতে হবে যার id="projects-grid"
 */
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid'); 
    
    // চেক করা হচ্ছে projects.js এর PROJECTS ভ্যারিয়েবলটি আছে কিনা
    if (typeof PROJECTS !== 'undefined' && projectsGrid) {
        projectsGrid.innerHTML = PROJECTS.map(project => `
            <div class="project-card hidden-element">
                <div class="project-number">${project.number}</div>
                <div class="project-emoji" style="font-size: 3rem;">${project.emoji}</div>
                <h3>${project.title}</h3>
                <p>${project.shortDesc}</p>
                <div class="tech-stack">
                    ${project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                </div>
                <button class="view-btn" onclick="openModal('${project.id}-modal')">View Details</button>
            </div>
        `).join('');

        // কার্ডগুলো রেন্ডার হওয়ার পর আবার এনিমেশন অবজর্ভারকে জানানো হচ্ছে
        const newElements = document.querySelectorAll('.hidden-element');
        newElements.forEach((el) => observer.observe(el));
    }
}

// ================= MOBILE NAVBAR MENU =================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active-menu');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active-menu');
    });
});

// ================= SMOOTH SCROLL REVEAL ANIMATION =================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden-element');
hiddenElements.forEach((el) => observer.observe(el));

// ================= STICKY NAVBAR HIGHLIGHTING =================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// ================= MODAL (POP-UP) LOGIC =================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
}

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ================= INITIALIZE =================
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(); // পেজ লোড হলে প্রজেক্টগুলো দেখাবে
});
