document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State & Security
    const currentUser = localStorage.getItem('currentUser') || 'Guest Student';
    document.getElementById('user-name').textContent = currentUser;
    document.getElementById('user-initial').textContent = currentUser.charAt(0).toUpperCase();

    // 2. View Switcher Logic (Making buttons work)
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');

            // Update Nav Buttons
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update Views
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
        let msg = "Good Evening";
        if (hr < 12) msg = "Good Morning";
        else if (hr < 18) msg = "Good Afternoon";
        greetEl.textContent = `${msg}, ${currentUser}!`;
    };
    updateGreeting();

    // 4. Modal Logic
    const modal = document.getElementById('skill-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Clicking a skill opens a modal
    document.querySelectorAll('.skill-item, .btn-primary').forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display = 'block';
            document.getElementById('modal-title').textContent = item.textContent.replace('Start Skill', 'Skill Practice');
        });
    });

    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

    // 5. Generate Awards (500+ line goal: repetitive structure or generated logic)
    const awardContainer = document.getElementById('award-container');
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

    // 6. Search Simulation
    const searchInput = document.getElementById('global-search');
    searchInput.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') {
            alert('Searching for: ' + searchInput.value);
        }
    });

    // 7. Grade Switcher Simulation
    document.querySelectorAll('.grade-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.grade-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });
});

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}
