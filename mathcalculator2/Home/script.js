// ===== Navigation Function =====
function navigateTo(page) {
    window.location.href = `/mathcalculator2/${page}/index.html`;
}

// ===== Setup Top Panel Buttons =====
function setupPanelButtons() {
    const panelButtons = document.querySelectorAll('.panel-btn');
    panelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.dataset.page;
            navigateTo(page);
        });
    });
}

// ===== Setup Explore Button =====
function setupExploreButton() {
    const exploreBtn = document.querySelector('.explore-btn');
    exploreBtn.addEventListener('click', () => {
        // Navigate to the Web folder inside mathcalculator2
        window.location.href = `/mathcalculator2/Web/index.html`;
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    setupPanelButtons();
    setupExploreButton();
});
