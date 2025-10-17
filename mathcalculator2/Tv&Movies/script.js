// ===== Navigation Function =====
function navigateTo(page) {
    // Navigate to the correct folder inside mathcalculator2
    window.location.href = `/mathcalculator2/${page}/index.html`;
}

// ===== Panel Button Navigation =====
document.addEventListener('DOMContentLoaded', () => {
    const panelButtons = document.querySelectorAll('.panel-btn');

    panelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.dataset.page; // reads "Home", "Games", etc.
            navigateTo(page); // call the navigation function
        });
    });

    // Make openGameplay globally accessible for game cards (if you have any)
    window.openGameplay = openGameplay;
});

// ===== Example Gameplay Overlay Functions =====
function openGameplay(url) {
    const overlay = document.getElementById('gameplay');
    const frame = document.getElementById('gameFrame');
    if (!overlay || !frame) return; // safety check
    frame.src = url;
    overlay.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('closeGameplay');
    const fullscreenBtn = document.getElementById('fullscreenGameplay');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const overlay = document.getElementById('gameplay');
            const frame = document.getElementById('gameFrame');
            frame.src = '';
            overlay.style.display = 'none';
        });
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const frame = document.getElementById('gameFrame');
            if (frame.requestFullscreen) frame.requestFullscreen();
            else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
            else if (frame.msRequestFullscreen) frame.msRequestFullscreen();
        });
    }
});
