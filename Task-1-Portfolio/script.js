tailwind.config = {
    darkMode: 'class',
}
lucide.createIcons();
function toggleDarkMode() { document.documentElement.classList.toggle('dark'); }

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    
    const isHidden = menu.classList.contains('hidden');
    
    if (isHidden) {
        menu.classList.remove('hidden');
        menu.classList.add('active');
        icon.setAttribute('data-lucide', 'x');
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('active');
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
}

(() => {
    // Everything inside here is protected scope
    const tracker = document.getElementById('nav-tracker');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function moveTracker(element) {
        if (!element || !tracker) return;
        
        navLinks.forEach(link => {
            link.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'font-bold');
        });

        element.classList.add('text-indigo-600', 'dark:text-indigo-400', 'font-bold');

        tracker.style.opacity = '1';
        tracker.style.width = `${element.offsetWidth}px`;
        tracker.style.left = `${element.offsetLeft}px`;
    }

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', 
        threshold: 0
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    moveTracker(activeLink);
                }
            }
        });
    }, observerOptions);

    if (sections.length > 0) {
        sections.forEach((section) => scrollObserver.observe(section));
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            moveTracker(this);
        });
    });

    window.addEventListener('load', () => {
        const currentHash = window.location.hash || '#home';
        const initialLink = document.querySelector(`.nav-link[href="${currentHash}"]`) || navLinks[0];
        if (initialLink) moveTracker(initialLink);
    });

    // Handle window resize to keep tracker aligned
    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.nav-link.font-bold');
        if (activeLink) moveTracker(activeLink);
    });
})();

function switchTab(type) {
    const highlight = document.getElementById('tab-highlight');
    const btnCourses = document.getElementById('btn-courses');
    const btnBootcamps = document.getElementById('btn-bootcamps');
    const containerCourses = document.getElementById('container-courses');
    const containerBootcamps = document.getElementById('container-bootcamps');

    if (type === 'courses') {
        // Sliding effect
        highlight.style.transform = 'translateX(0%)';
        
        // Button colors
        btnCourses.classList.add('text-white');
        btnCourses.classList.remove('text-slate-600', 'dark:text-slate-400');
        btnBootcamps.classList.add('text-slate-600', 'dark:text-slate-400');
        btnBootcamps.classList.remove('text-white');
        
        // Content visibility
        containerCourses.classList.remove('hidden');
        containerBootcamps.classList.add('hidden');
    } else {
        // Sliding effect
        highlight.style.transform = 'translateX(100%)';
        
        // Button colors
        btnBootcamps.classList.add('text-white');
        btnBootcamps.classList.remove('text-slate-600', 'dark:text-slate-400');
        btnCourses.classList.add('text-slate-600', 'dark:text-slate-400');
        btnCourses.classList.remove('text-white');
        
        // Content visibility
        containerCourses.classList.add('hidden');
        containerBootcamps.classList.remove('hidden');
    }
}

// Form Functionality
const contactForm = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
const btnText = document.getElementById('btnText');

contactForm.addEventListener('submit', (e) => {
    // e.preventDefault();
    btnText.innerText = "Sending...";
    
    setTimeout(() => {
        feedback.classList.remove('hidden');
        contactForm.reset();
        btnText.innerText = "Send Message";
        
        setTimeout(() => {
            feedback.classList.add('hidden');
        }, 5000);
    }, 1000);
});

window.addEventListener('scroll', () => {
    const icons = document.querySelectorAll('.floating-icon');
    const scrolled = window.pageYOffset;
    icons.forEach(icon => {
        const speed = icon.getAttribute('data-speed');
        const yPos = -(scrolled * speed / 10);
        icon.style.transform = `translateY(${yPos}px)`;
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card').forEach(card => {
    card.classList.add('opacity-0', 'transition-all', 'duration-700');
    card.style.transform = "translateY(20px)";
    observer.observe(card);
});

// --- Word Scramble Game Logic ---
const words = [
    { word: "tailwind", hint: "A utility-first CSS framework" },
    { word: "python", hint: "A versatile programming language with a snake name" },
    { word: "react", hint: "A JavaScript library for building user interfaces" },
    { word: "javascript", hint: "The programming language of the Web" },
    { word: "database", hint: "An organized collection of structured information" },
    { word: "developer", hint: "A person who creates computer software" },
    { word: "frontend", hint: "The part of a website users interact with" },
    { word: "backend", hint: "The server-side of an application" }
];

let currentWord = "";
let currentHint = "";

function initGame() {
    const randomObj = words[Math.floor(Math.random() * words.length)];
    currentWord = randomObj.word;
    currentHint = randomObj.hint;
    
    let wordArray = currentWord.split("");
    // Shuffle
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    
    document.getElementById("scrambled-word").innerText = wordArray.join("");
    document.getElementById("hint-text").innerText = "Hint: " + currentHint;
    document.getElementById("hint-text").classList.add("hidden");
    document.getElementById("game-feedback").classList.add("hidden");
    document.getElementById("game-input").value = "";
    document.getElementById("game-input").classList.remove("border-emerald-500", "border-red-500");
}

function checkGuess() {
    const userGuess = document.getElementById("game-input").value.toLowerCase().trim();
    const feedbackDisplay = document.getElementById("game-feedback");
    
    feedbackDisplay.classList.remove("hidden");
    if (userGuess === currentWord) {
        feedbackDisplay.innerText = "Correct! Well done. 🎉";
        feedbackDisplay.className = "mt-4 font-bold text-sm text-emerald-500";
        document.getElementById("game-input").classList.add("border-emerald-500");
        setTimeout(initGame, 2000);
    } else {
        feedbackDisplay.innerText = "Not quite, try again! ❌";
        feedbackDisplay.className = "mt-4 font-bold text-sm text-red-500";
        document.getElementById("game-input").classList.add("border-red-500");
    }
}

function showHint() {
    document.getElementById("hint-text").classList.remove("hidden");
}

// Initialize game on load
window.addEventListener('DOMContentLoaded', initGame);