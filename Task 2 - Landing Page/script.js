lucide.createIcons();

// Testimonial Scroll Logic
const container = document.getElementById('testimonial-container');
const dots = document.querySelectorAll('.dot');

function scrollT(amount) { 
    container.scrollBy({ left: amount, behavior: 'smooth' }); 
}

function scrollToIndex(index) {
    const cards = document.querySelectorAll('.testimonial-card');
    const cardWidth = cards[0].offsetWidth + 24; // width + gap
    container.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
}

container.addEventListener('scroll', () => {
    const cardWidth = document.querySelector('.testimonial-card').offsetWidth + 24;
    const index = Math.round(container.scrollLeft / cardWidth);
    dots.forEach((dot, i) => { 
        dot.classList.toggle('active', i === index); 
    });
});

// Toggle Logic for Hamburger Menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    const isActive = mobileMenu.classList.toggle('menu-active');
    menuBtn.innerHTML = isActive 
        ? '<i data-lucide="x" class="w-7 h-7"></i>' 
        : '<i data-lucide="menu" class="w-7 h-7"></i>';
    lucide.createIcons(); 
}

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking links
mobileLinks.forEach(link => link.addEventListener('click', () => {
    mobileMenu.classList.remove('menu-active');
    menuBtn.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
    lucide.createIcons();
}));

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.remove('menu-active');
        menuBtn.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
        lucide.createIcons();
    }
});

// Drag-to-scroll
let isDown = false; let startX; let scrollLeft;
container.addEventListener('mousedown', (e) => { isDown = true; startX = e.pageX - container.offsetLeft; scrollLeft = container.scrollLeft; });
container.addEventListener('mouseleave', () => isDown = false);
container.addEventListener('mouseup', () => isDown = false);
container.addEventListener('mousemove', (e) => { if(!isDown) return; e.preventDefault(); const x = e.pageX - container.offsetLeft; const walk = (x - startX) * 2; container.scrollLeft = scrollLeft - walk; });