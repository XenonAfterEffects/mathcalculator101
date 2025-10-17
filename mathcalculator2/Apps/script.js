// ===== Navigation =====
function navigateTo(page) {
    window.location.href = `../${page}/index.html`;
}

// ===== Open Gameplay Overlay =====
function openGameplay(url) {
    const overlay = document.getElementById('gameplay');
    const frame = document.getElementById('gameFrame');
    frame.src = url;
    overlay.style.display = 'flex';
}

// ===== Close Gameplay Overlay =====
document.getElementById('closeGameplay').addEventListener('click', () => {
    const overlay = document.getElementById('gameplay');
    const frame = document.getElementById('gameFrame');
    frame.src = '';
    overlay.style.display = 'none';
});

// ===== Fullscreen Gameplay =====
document.getElementById('fullscreenGameplay').addEventListener('click', () => {
    const frame = document.getElementById('gameFrame');
    if (frame.requestFullscreen) frame.requestFullscreen();
    else if (frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
    else if (frame.msRequestFullscreen) frame.msRequestFullscreen();
});

// ===== Panel Button Navigation & Dynamic Image Loading =====
document.addEventListener('DOMContentLoaded', () => {
    const panelButtons = document.querySelectorAll('.panel-btn');
    panelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.dataset.page;
            window.location.href = `/mathcalculator2/${page}/index.html`;
        });
    });

    // Make openGameplay globally accessible
    window.openGameplay = openGameplay;

    // ===== Dynamically Load App Images =====
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach((card, index) => {
        const imageNumber = index + 1; // 1-based numbering
        const imagePath = `appimages/app${imageNumber}.png`;
        card.style.backgroundImage = `url('${imagePath}')`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
    });
});
