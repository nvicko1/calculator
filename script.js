'use strict';

const numberButtons = document.querySelectorAll('#data-number');
const operationButton = document.querySelectorAll('#data-operation');
const equalsButton = document.querySelector('#data-equals');
const deleteButton = document.querySelector('#data-delete');
const allclearButton = document.querySelector('#data-all-clear');
const previsiousOperantAndTextElement = document.querySelector(
  '#data-previsious-operant'
);
const currentOperantTextElement = document.querySelector(
  '#data-current-operant'
);
class Calculator {
  constructor(previsiousOperantAndTextElement, currentOperantTextElement) {
    this.previsiousOperantAndTextElement = previsiousOperantAndTextElement;
    this.currentOperantTextElement = currentOperantTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previsiousOperant = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  choseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previsiousOperant !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previsiousOperant = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previsiousOperant);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previsiousOperant = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let intigerDisplay;
    if (isNaN(integerDigits)) {
      intigerDisplay = '';
    } else {
      intigerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${intigerDisplay}.${decimalDigits}`;
    } else {
      return intigerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperantTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previsiousOperantAndTextElement.innerText = `${this.getDisplayNumber(
        this.previsiousOperant
      )} ${this.operation}`;
    } else {
      this.previsiousOperantAndTextElement.innerText = '';
    }
  }
}

const calculator = new Calculator(
  previsiousOperantAndTextElement,
  currentOperantTextElement
);
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.choseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', function () {
  calculator.compute();
  calculator.updateDisplay();
});

allclearButton.addEventListener('click', function () {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', function () {
  calculator.delete();
  calculator.updateDisplay();
});
