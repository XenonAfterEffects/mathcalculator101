const tabsContainer = document.getElementById('tabsContainer');
const addTabBtn = document.getElementById('addTabBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPopup = document.getElementById('settingsPopup');
const closeSettings = document.getElementById('closeSettings');

let tabCount = 1;
const maxTabs = 10;
const BASE_TAB_WIDTH = 120;
const MIN_TAB_WIDTH = 60;

// Add a new tab
addTabBtn.addEventListener('click', () => {
    if (tabCount >= maxTabs) {
        alert("Maximum of 10 tabs reached!");
        return;
    }

    tabCount++;
    const newTab = createTab("New Tab");
    tabsContainer.appendChild(newTab);
    setActiveTab(newTab);
    updateTabWidths();
    updateCloseButtons();
});

// Create a tab element
function createTab(title) {
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.textContent = title;

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tab.remove();
        tabCount--;
        if (!document.querySelector('.tab.active') && tabsContainer.firstChild) {
            setActiveTab(tabsContainer.firstChild);
        }
        updateTabWidths();
        updateCloseButtons();
    });
    tab.appendChild(closeBtn);

    tab.addEventListener('click', () => setActiveTab(tab));

    return tab;
}

// Set active tab
function setActiveTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
}

// Update tab widths
function updateTabWidths() {
    const tabs = document.querySelectorAll('.tab');
    const totalTabs = tabs.length;
    const containerWidth = tabsContainer.clientWidth - 45; // account for + button

    let tabWidth;
    if (totalTabs <= 7) {
        tabWidth = BASE_TAB_WIDTH;
    } else {
        tabWidth = Math.max(MIN_TAB_WIDTH, containerWidth / totalTabs);
    }

    tabs.forEach(tab => {
        tab.style.flex = `0 0 ${tabWidth}px`;
    });
}

// Show/hide close buttons depending on number of tabs
function updateCloseButtons() {
    const tabs = document.querySelectorAll('.tab');
    if (tabs.length === 1) {
        tabs[0].querySelector('.close-btn').style.display = 'none';
    } else {
        tabs.forEach(tab => tab.querySelector('.close-btn').style.display = 'inline');
    }
}

// Initialize first tab
const firstTab = document.querySelector('.tab');
firstTab.textContent = "New Tab";
updateCloseButtons();
updateTabWidths();

// Settings popup
settingsBtn.addEventListener('click', () => {
    settingsPopup.style.display = 'flex';
});
closeSettings.addEventListener('click', () => {
    settingsPopup.style.display = 'none';
});
settingsPopup.addEventListener('click', (e) => {
    if (e.target === settingsPopup) settingsPopup.style.display = 'none';
});

// Adjust widths on window resize
window.addEventListener('resize', updateTabWidths);
