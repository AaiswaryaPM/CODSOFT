let currentInput = "";
let isFinished = false; 

const mainDisplay = document.getElementById('main-display');
const previewDisplay = document.getElementById('expression-preview');
const liveDisplay = document.getElementById('live-result');
const historyList = document.getElementById('history-list');

// Dark Mode Toggle Logic
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
}

// Keyboard support
window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') append(e.key);
    if (['+', '-', '*', '/', '%'].includes(e.key)) append(e.key);
    if (e.key === 'Enter') { e.preventDefault(); calculate(); }
    if (e.key === 'Backspace') backspace();
    if (e.key === 'Escape') allClear();
});

function append(char) {
    const operators = ['+', '-', '*', '/', '%'];
    if (isFinished) {
        if (!operators.includes(char)) {
            currentInput = "";
            previewDisplay.innerText = "";
        }
        isFinished = false;
    }
    if (currentInput === "0" && char !== ".") currentInput = "";
    const lastChar = currentInput.slice(-1);
    if (operators.includes(char) && operators.includes(lastChar)) return;
    currentInput += char;
    updateUI();
}

function allClear() {
    currentInput = "";
    previewDisplay.innerText = "";
    liveDisplay.innerText = "";
    isFinished = false;
    updateUI();
}

function backspace() {
    if (isFinished) {
        previewDisplay.innerText = "";
        isFinished = false;
    }
    currentInput = currentInput.toString().slice(0, -1);
    updateUI();
}

function updateUI() {
    mainDisplay.innerText = currentInput || "0";
    try {
        const hasOp = /[+\-*/%]/.test(currentInput);
        if (hasOp && !['+', '-', '*', '/', '%'].includes(currentInput.slice(-1))) {
            let result = eval(currentInput);
            liveDisplay.innerText = result !== undefined ? "= " + formatNumber(result) : "";
        } else {
            liveDisplay.innerText = "";
        }
    } catch {
        liveDisplay.innerText = "";
    }
}

function calculate() {
    if (!currentInput || isFinished) return;
    try {
        let result = eval(currentInput);
        let formattedResult = formatNumber(result);
        addToHistory(`${currentInput} = ${formattedResult}`);
        previewDisplay.innerText = currentInput + " =";
        currentInput = formattedResult.toString();
        liveDisplay.innerText = "";
        isFinished = true; 
        updateUI();
    } catch (e) {
        mainDisplay.innerText = "Error";
        currentInput = "";
    }
}

function formatNumber(num) {
    return parseFloat(Number(num).toFixed(4));
}

function addToHistory(entry) {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerText = entry;
    div.onclick = () => {
        currentInput = entry.split('=')[1].trim();
        isFinished = true; 
        updateUI();
    };
    historyList.prepend(div);
}

function clearHistory() {
    historyList.innerHTML = "";
}