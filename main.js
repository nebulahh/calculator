const currentDisplayNumber = document.querySelector('#current-number');
const previousDisplayNumber = document.querySelector('#previous-number');
const equal = document.querySelector('.equal-sign');
const decimal = document.querySelector('.decimal');
const clear = document.querySelector('.clear');
const numberBtn = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
let clearAll = document.querySelector('.all-clear');

let currentNum = '';
let previousNum = '';
let operatorSign = '';

window.addEventListener('keydown', handleKeyPress);
clear.addEventListener('click', clearCalculator);

equal.addEventListener('click', () => {
  if (currentNum !== '' && previousNum !== '') {
    calculate();
  }
});

decimal.addEventListener('click', () => {
  addDecimal();
});

numberBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(number) {
  if (previousNum !== '' && currentNum !== '' && operator === '') {
    previousNum = '';
    currentDisplayNumber.textContent = currentNum;
  }
  if (currentNum.length <= 11) {
    currentNum += number;
    currentDisplayNumber.textContent = currentNum;
  }
}

operators.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleOperator(op) {
  if (previousNum === '') {
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum === '') {
    operatorCheck(op);
  } else {
    calculate();
    operator = op;
    currentDisplayNumber.textContent = '0';
    previousDisplayNumber.textContent = previousNum + ' ' + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  previousDisplayNumber.textContent = previousNum + ' ' + operator;
  currentDisplayNumber.textContent = '0';
  currentNum = '';
}

function calculate() {
  previousNum = +previousNum;
  currentNum = +currentNum;
  if (operator === '+') {
    previousNum += currentNum;
  } else if (operator === '-') {
    previousNum -= currentNum;
  } else if (operator === '*') {
    previousNum *= currentNum;
  } else if (operator === '/') {
    if (currentNum <= 0) {
      previousNum = 'Error';
      displayResult();
      return;
    }
    previousNum /= currentNum;
  }
  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResult();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResult() {
  if (previousNum.length <= 11) {
    currentDisplayNumber.textContent = previousNum;
  } else {
    currentDisplayNumber.textContent = previousNum.slice(0, 11) + '...';
  }
  previousDisplayNumber.textContent = '';
  operator = '';
  currentNum = '';
}

function clearCalculator() {
  currentNum = '';
  previousNum = '';
  operator = '';
  currentDisplayNumber.textContent = '0';
  previousDisplayNumber.textContent = '';
}

function addDecimal() {
  if (!currentNum.includes('.')) {
    currentNum += '.';
    currentDisplayNumber.textContent = currentNum;
  }
}

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (
    e.key === 'Enter' ||
    (e.key === '=' && currentNum !== '' && previousNum !== '')
  ) {
    compute();
  }
  if (e.key === '+' || e.key === '-' || e.key === '/') {
    handleOperator(e.key);
  }
  if (e.key === '*') {
    handleOperator('x');
  }
  if (e.key === '.') {
    addDecimal();
  }
  if (e.key === 'Backspace') {
    handleDelete();
  }
}

function handleDelete() {
  if (currentNum !== '') {
    currentNum = currentNum.slice(0, -1);

    currentDisplayNumber.textContent = currentNum;
    if (currentNum === '') {
      currentDisplayNumber.textContent = '0';
    }
  }
  if (currentNum === '' && previousNum !== '' && operator === '') {
    previousNum = previousNum.slice(0, -1);
    currentDisplayNumber.textContent = previousNum;
  }
}
