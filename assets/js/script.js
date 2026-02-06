/* ============================================================
   1. LOADING SCREEN SCRIPT
   ============================================================ */
const canvas = document.getElementById("particles");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.4;
            this.speedX = Math.random() * 0.6 - 0.3;
            this.speedY = Math.random() * 0.6 - 0.3;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = "rgba(255,255,255,0.12)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 70; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            p.update();
            p.draw();
        }
        requestAnimationFrame(animate);
    }
    animate();

    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                const destination = localStorage.getItem('redirectDestination');
                if (destination === 'admin') {
                    localStorage.removeItem('redirectDestination');
                    window.location.href = "../skillsphere/index.html";
                } else {
                    window.location.href = "../math-calculator/index.html";
                }
            }, 1800);
        }
    }, 4200);
}

/* ============================================================
   2. MATH CALCULATOR HOME & BROWSER PAGE SCRIPT
   ============================================================ */
// Navigation Helper
function navigateTo(page) {
    window.location.href = `${page}/home.html`;
}

// --- Math Calculator Home Page Logic ---
const mathPanelButtons = document.querySelectorAll('.panel-btn');
if (mathPanelButtons.length > 0) { // Check if we're on the Math Calculator page
    mathPanelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.dataset.page;
            navigateTo(page);
        });
    });

    // Profile and Settings Button Actions on MATH HOME
    const profileButtonMath = document.querySelector('.profile-button');
    const settingsButtonMath = document.querySelector('.settings-button');

    if (profileButtonMath) {
        profileButtonMath.addEventListener('click', () => {
            alert('Profile button clicked!');
        });
    }

    if (settingsButtonMath) {
        settingsButtonMath.addEventListener('click', () => {
            alert('Settings button clicked!');
        });
    }

    // Panel Toggle Logic (for the hide/show bar)
    const panelToggleBtn = document.getElementById('panel-toggle-btn');
    const mainPanel = document.getElementById('main-panel');
    if (panelToggleBtn && mainPanel) {
        panelToggleBtn.addEventListener('click', () => {
            mainPanel.classList.toggle('retracted');
        });
    }
}


// --- Browser Page Logic ---
const browserUrlInput = document.getElementById('browser-url');
const browserFrame = document.getElementById('browser-frame');
const goButton = document.getElementById('go-button');
const tabBar = document.querySelector('.tab-bar');

if (browserUrlInput && browserFrame && goButton && tabBar) { 
    const proxyBaseUrl = '/proxy'; 

    const loadUrl = (urlToLoad, addToHistory = true) => {
        if (!urlToLoad) return;

        let finalUrl = urlToLoad;
        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
            if (finalUrl.includes('.')) { 
                finalUrl = 'https://' + finalUrl;
            } else {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(finalUrl)}`, '_blank');
                return;
            }
        }

        const proxiedUrl = `${proxyBaseUrl}?url=${encodeURIComponent(finalUrl)}`;
        browserFrame.src = proxiedUrl;
        browserUrlInput.value = finalUrl; 
    };

    browserUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loadUrl(browserUrlInput.value);
        }
    });

    goButton.addEventListener('click', () => {
        loadUrl(browserUrlInput.value);
    });

    // Navigation Buttons (Placeholders)
    const navBackButton = document.querySelector('.back-button');
    const navForwardButton = document.querySelector('.forward-button');
    const navReloadButton = document.querySelector('.reload-button');

    if (navBackButton) navBackButton.addEventListener('click', () => alert('Back button clicked!'));
    if (navForwardButton) navForwardButton.addEventListener('click', () => alert('Forward button clicked!'));
    if (navReloadButton) navReloadButton.addEventListener('click', () => browserFrame.src = browserFrame.src);

    // Tab Management
    const initialTabUrl = document.querySelector('.tab.active')?.dataset.url || 'https://example.com'; 
    loadUrl(initialTabUrl);

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('new-tab')) {
                alert('New Tab functionality is not yet implemented.');
            } else {
                loadUrl(tab.dataset.url);
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            }
        });
    });
}

/* ============================================================
   3. SKILLSPHERE DASHBOARD SCRIPT
   ============================================================ */
// Check if we are on the SkillSphere page before running this code
if (document.querySelector('.app-container')) { 
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Initial State & Security
        const currentUser = localStorage.getItem('currentUser') || 'Guest Student';
        const userNameEl = document.getElementById('user-name');
        const userInitialEl = document.getElementById('user-initial');
        
        if(userNameEl) userNameEl.textContent = currentUser;
        if(userInitialEl) userInitialEl.textContent = currentUser.charAt(0).toUpperCase();

        // 2. View Switcher Logic
        const navButtons = document.querySelectorAll('.nav-btn');
        const views = document.querySelectorAll('.view-content');

        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-target');
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                views.forEach(v => {
                    v.classList.remove('active');
                    if (v.id === target) v.classList.add('active');
                });
            });
        });

        // 3. Dynamic Greeting
        const updateGreeting = () => {
            const hr = new Date().getHours();
            const greetEl = document.getElementById('greeting');
            if (greetEl) {
                let msg = "Good Evening";
                if (hr < 12) msg = "Good Morning";
                else if (hr < 18) msg = "Good Afternoon";
                greetEl.textContent = `${msg}, ${currentUser}!`;
            }
        };
        updateGreeting();

        // 4. Modal Logic
        const modal = document.getElementById('skill-modal');
        const closeModal = document.querySelector('.close-modal');

        if (modal) {
            document.querySelectorAll('.skill-item, .btn-primary').forEach(item => {
                item.addEventListener('click', () => {
                    modal.style.display = 'block';
                    const modalTitle = document.getElementById('modal-title');
                    if(modalTitle) modalTitle.textContent = item.textContent.replace('Start Skill', 'Skill Practice');
                });
            });

            if(closeModal) closeModal.onclick = () => modal.style.display = 'none';
            window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
        }

        // 5. Generate Awards
        const awardContainer = document.getElementById('award-container');
        if (awardContainer) {
            const awardList = [
                { icon: 'fa-certificate', title: 'First Steps', locked: false },
                { icon: 'fa-bolt', title: 'Speed Demon', locked: false },
                { icon: 'fa-star', title: 'Mastery', locked: true },
                { icon: 'fa-fire', title: 'Hot Streak', locked: false },
                { icon: 'fa-brain', title: 'Genius', locked: true },
                { icon: 'fa-medal', title: 'Top Grade', locked: true },
                { icon: 'fa-book', title: 'Reader', locked: false },
                { icon: 'fa-flask', title: 'Scientist', locked: true }
            ];

            awardList.forEach(award => {
                const div = document.createElement('div');
                div.className = `badge-item ${award.locked ? 'locked' : ''}`;
                div.innerHTML = `
                    <i class="fa-solid ${award.icon}"></i>
                    <p style="font-weight:bold; font-size:12px;">${award.title}</p>
                    <p style="font-size:10px; color:#64748b;">${award.locked ? 'Locked' : 'Earned'}</p>
                `;
                awardContainer.appendChild(div);
            });
        }

        // 6. Search & Chips
        const searchInput = document.getElementById('global-search');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') alert('Searching for: ' + searchInput.value);
            });
        }
        document.querySelectorAll('.grade-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('.grade-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
            });
        });
    });
}

// GLOBAL LOGOUT FUNCTION
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

// --- Game-Specific Logic (NOW GLOBAL) ---
// Declare these variables in the global scope so they can be accessed by onclick in HTML
const gameplayOverlay = document.getElementById('gameplay');
const gameFrame = document.getElementById('gameFrame');

// Check if game elements exist before defining functions and listeners
if (gameplayOverlay && gameFrame) {
    // Make openGameplay globally accessible so onclick in HTML can use it
    window.openGameplay = function(url) {
        gameFrame.src = url; // Corrected from 'frame.src' to 'gameFrame.src'
        gameplayOverlay.style.display = 'flex';
    };

    const closeGameplayButton = document.getElementById('closeGameplay');
    const fullscreenGameplayButton = document.getElementById('fullscreenGameplay');

    if (closeGameplayButton) {
        closeGameplayButton.addEventListener('click', () => {
            gameplayOverlay.style.display = 'none';
            gameFrame.src = ''; // Clear the iframe source
        });
    }

    if (fullscreenGameplayButton) {
        fullscreenGameplayButton.addEventListener('click', () => {
            if (gameFrame.requestFullscreen) gameFrame.requestFullscreen();
            else if (gameFrame.webkitRequestFullscreen) gameFrame.webkitRequestFullscreen();
            else if (gameFrame.msRequestFullscreen) gameFrame.msRequestFullscreen();
        });
    }
}
