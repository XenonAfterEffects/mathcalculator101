/* ============================================================
   1. LOADING SCREEN SCRIPT
   (Only used for the Secret Math Calculator)
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

    // ==== FADE OUT & REDIRECT TO MATH CALCULATOR ====
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                // The loading screen now ALWAYS goes to Math Calculator
                window.location.href = "../math-calculator/index.html"; 
            }, 1800);
        }
    }, 4200);
}

/* ============================================================
   2. MATH CALCULATOR HOME SCRIPT
   ============================================================ */
// Navigation Helper
function navigateTo(page) {
    window.location.href = `../${page}/index.html`;
}

// Panel Buttons
const panelButtons = document.querySelectorAll('.panel-btn');
if (panelButtons.length > 0) {
    panelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.dataset.page; 
            navigateTo(page);
        });
    });
}

// Explore Button
const exploreBtn = document.querySelector('.explore-btn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        window.location.href = `../web/index.html`;
    });
}

/* ============================================================
   3. LOGIN PAGE SCRIPT (The Logic Fix)
   ============================================================ */
const authForm = document.getElementById('auth-form');
if (authForm) {
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const isLoginMode = document.getElementById('submit-btn').textContent === "Log In";

        // === 1. SECRET ADMIN (Charlie) ===
        // Goes to Loading Screen -> Then Math Calculator
        if (user === "Charlie" && pass === "5879") {
            localStorage.setItem('currentUser', 'Charlie');
            window.location.href = "loading/index.html"; 
            return;
        }

        // === 2. NORMAL USER ===
        // Goes directly to SkillSphere Dashboard
        let users = JSON.parse(localStorage.getItem('skillSphereUsers')) || [];

        if (isLoginMode) {
            const foundUser = users.find(u => u.username === user && u.password === pass);
            if (foundUser) {
                localStorage.setItem('currentUser', user);
                // DIRECT LINK to SkillSphere (Skipping loading screen)
                window.location.href = "skillsphere/index.html"; 
            } else {
                alert("Invalid credentials");
            }
        } else {
            // Sign Up Logic
            if (users.some(u => u.username === user)) {
                alert("Username taken");
            } else {
                users.push({ username: user, password: pass });
                localStorage.setItem('skillSphereUsers', JSON.stringify(users));
                alert("Account created! Now please log in.");
                location.reload();
            }
        }
    });

    // Toggle Link Logic (Login vs Join)
    const toggleLink = document.getElementById('toggle-link');
    if (toggleLink) {
        toggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const title = document.getElementById('form-title');
            const toggleText = document.getElementById('toggle-text');

            if (btn.textContent === "Log In") {
                title.textContent = "Create Account";
                btn.textContent = "Join SkillSphere";
                toggleText.innerHTML = 'Already have an account? <a href="#" onclick="location.reload()">Log in</a>';
            } else {
                title.textContent = "Sign in to SkillSphere";
                btn.textContent = "Log In";
                toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-link">Join now</a>';
            }
        });
    }
}

/* ============================================================
   4. SKILLSPHERE DASHBOARD SCRIPT
   ============================================================ */
if (document.querySelector('.app-container')) {
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Initial State
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

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}
