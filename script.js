const display = document.getElementById('display');

function appendNumber(number) {
    display.value += number;
}

function appendOperator(operator) {
    if (display.value === '' && operator !== '-') return; 
    display.value += operator;
}

function clearDisplay() {
    display.value = '';
}

function calculateResult() {
    // Secret code check (5879)
    if (display.value === '5879') {
        window.location.href = '../loading/index.html';
        return;
    }
    
    try {
        display.value = eval(display.value);
    } catch {
        display.value = 'Error';
    }
}
