let upperScreen = document.querySelector('.upper-display');
let lowerScreen = document.querySelector('.lower-display');
let numKeys = document.querySelectorAll('.number');
let decimal = document.querySelector('.decimal');
let operatorKeys = document.querySelectorAll('.operator');
let equals = document.querySelector('.equal-sign');
let clearAll = document.querySelector('.all-clear');
let clear = document.querySelector('.clear');

let firstOperand;
let secondOperand;
let operatorSign;

const sum = function add(num1, num2) {
  return num1 + num2;
};
const differnce = function subtract(num1, num2) {
  return num1 - num2;
};
const quotient = function divide(num1, num2) {
  return num1 / num2;
};
const product = function multiply(num1, num2) {
  return num1 * num2;
};

function operate(first, second, operator) {
  if (operator === '+') {
    return sum(first, second);
  } else if (operator === '-') {
    return differnce(first, second);
  } else if (operator === '*') {
    return product(first, second);
  } else if (operator === '/') {
    return quotient(first, second);
  }
}

numKeys.forEach((num) => {
  num.addEventListener('click', (e) => {
    let { target } = e;
    populateDisplay(target.value);
  });
});

function populateDisplay(number) {
  lowerScreen.textContent = 
    (lowerScreen.textContent === '0' ? number : (lowerScreen.textContent += number));

  if (lowerScreen.textContent.length === 10) {
    numKeys.forEach((elem) => {
      elem.disabled = true;
    });
  }
}
