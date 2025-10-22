const display = document.getElementById('display');

function appendNumber(number) {
    display.value += number;
}

function appendOperator(operator) {
    if (display.value === '' && operator !== '-') return;
    const lastChar = display.value.slice(-1);
    if (['+', '-', 'x', '÷'].includes(lastChar)) return; // prevent double ops
    display.value += operator;
}

function clearDisplay() {
    display.value = '';
}

function calculateResult() {
    if (display.value === '5879') {
        window.location.href = '../loading/index.html';
        return;
    }

    let expression = display.value.replace(/x/g, '*').replace(/÷/g, '/');
    try {
        display.value = eval(expression);
    } catch {
        display.value = 'Error';
    }
}
