// ===== Navigation Function =====
function navigateTo(page) {
    window.location.href = `/mathcalculator2/${page}/index.html`;
}

// ===== Attach Panel Button Listeners =====
function setupPanelButtons() {
    const panelButtons = document.querySelectorAll('.panel-btn');
    panelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.dataset.page;
            navigateTo(page);
        });
    });
}

// Call setup on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setupPanelButtons();
});
