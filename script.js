// Theme toggle functionality
function initTheme() {
    const themeToggles = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply initial theme
    applyTheme(savedTheme);

    // Add click handlers to both toggles
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

function applyTheme(theme) {
    const html = document.documentElement;
    const themeToggles = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');
    
    // Update HTML attribute
    html.setAttribute('data-theme', theme);
    
    // Update toggle buttons
    themeToggles.forEach(toggle => {
        if (theme === 'dark') {
            toggle.classList.add('dark');
        } else {
            toggle.classList.remove('dark');
        }
    });
    
    // Save preference
    localStorage.setItem('theme', theme);
}

// Mega menu functionality
function initMegaMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    let currentOpenMenu = null;
    let isClosing = false;

    menuItems.forEach(item => {
        const button = item.querySelector('button');
        const megaMenu = item.querySelector('.mega-menu');
        let timeout;

        item.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            if (currentOpenMenu && currentOpenMenu !== megaMenu) {
                currentOpenMenu.style.display = 'none';
            }
            megaMenu.style.display = 'block';
            currentOpenMenu = megaMenu;
            isClosing = false;
        });

        item.addEventListener('mouseleave', () => {
            isClosing = true;
            timeout = setTimeout(() => {
                if (isClosing) {
                    megaMenu.style.display = 'none';
                    currentOpenMenu = null;
                }
            }, 200);
        });
    });

    // Close mega menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-item')) {
            menuItems.forEach(item => {
                const megaMenu = item.querySelector('.mega-menu');
                megaMenu.style.display = 'none';
            });
            currentOpenMenu = null;
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuContent = mobileMenu.querySelector('.fixed.inset-y-0');
    const openMenuButton = document.getElementById('open-menu');
    const closeMenuButton = document.getElementById('close-menu');
    const submenuButtons = document.querySelectorAll('.py-2.border-b button');

    function openMenu() {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenuContent.classList.remove('translate-x-full');
        }, 10);
    }

    function closeMenu() {
        mobileMenuContent.classList.add('translate-x-full');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }

    openMenuButton.addEventListener('click', openMenu);
    closeMenuButton.addEventListener('click', closeMenu);
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });

    // Mobile submenu functionality
    submenuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const submenu = this.nextElementSibling;
            const icon = this.querySelector('.fas');
            const allSubmenus = document.querySelectorAll('.py-2.border-b .pr-4');
            const allIcons = document.querySelectorAll('.py-2.border-b .fas');

            // Close other submenus
            allSubmenus.forEach(menu => {
                if (menu !== submenu) {
                    menu.classList.add('hidden');
                }
            });
            allIcons.forEach(i => {
                if (i !== icon) {
                    i.classList.remove('fa-chevron-up');
                    i.classList.add('fa-chevron-down');
                }
            });

            // Toggle current submenu
            submenu.classList.toggle('hidden');
            if (submenu.classList.contains('hidden')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMegaMenu();
    initMobileMenu();
});

// Random hero background
const heroBackgrounds = [
    'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573739122661-d7cd308f6577?auto=format&fit=crop&q=80'
];

function setRandomHeroBackground() {
    const hero = document.getElementById('hero');
    const randomBg = heroBackgrounds[Math.floor(Math.random() * heroBackgrounds.length)];
    hero.style.backgroundImage = `url(${randomBg})`;
}

// Set initial background
document.addEventListener('DOMContentLoaded', setRandomHeroBackground);

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Filter buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.mt-8.flex.flex-wrap button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700');
            });
            
            // Add active class to clicked button
            this.classList.remove('bg-white', 'text-gray-700');
            this.classList.add('bg-blue-600', 'text-white');
        });
    });
});

// Add to cart button animation
document.querySelectorAll('.bg-blue-600.text-white.px-4.py-2').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'افزوده شد ✓';
        this.classList.add('bg-green-600');
        
        setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove('bg-green-600');
        }, 1500);
    });
}); 