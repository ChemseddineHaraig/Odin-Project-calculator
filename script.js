function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b === Infinity || a / b === -Infinity
    ? `${a} Can't divide by 0`
    : a / b;
}
function percentage(a) {
  return a / 100;
}
function operate(a, b, op) {
  switch (op) {
    case "+":
      return add(a, b);

    case "-":
      return subtract(a, b);

    case "/":
      return divide(a, b);

    case "*":
      return multiply(a, b);
  }
}
function resetState() {
  operation.textContent = "";
  result.textContent = "";
  firstNumber = "";
  secondNumber = "";
  operator = null;
  previousResult = "";
  equalPressed = false;
}
function toggleCalculator() {
  on = !on;
  decimalBtn.disabled = !on;
  equalBtn.disabled = !on;
  clearBtn.disabled = !on;
  backspaceBtn.disabled = !on;
  numberButtons.forEach((btn) => (btn.disabled = !on));
  operatorButtons.forEach((btn) => (btn.disabled = !on));
  screen.style.backgroundColor = on ? "white" : "gray";
  resetState();
}
let firstNumber = "";
let secondNumber = "";
let operator = null;
let equalPressed = false;
let on = true;
let previousResult = "";
let previousFirstNumber = "";
let previousSecondNumber = "";
let previousOperator = null;
const numberButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const screen = document.querySelector(".screen");
const operation = document.querySelector(".operation");
const equalBtn = document.querySelector(".equal-btn");
const result = document.querySelector(".result");
const decimalBtn = document.querySelector(".decimal-btn");
const onOffBtn = document.querySelector(".on-off-btn");
const clearBtn = document.querySelector(".clear-btn");
const backspaceBtn = document.querySelector(".backspace-btn");
const percentageBtn = document.querySelector(".percentage-btn");
percentageBtn.addEventListener("click", (e) => {
  if (operator === null) {
    if (firstNumber === "") firstNumber = "0";
    firstNumber = String(percentage(Number(firstNumber)));
    operation.textContent = firstNumber;
    result.textContent = firstNumber;
    if (equalPressed) equalPressed = false;
  } else {
    if (secondNumber === "") {
      firstNumber = String(percentage(Number(firstNumber)));
      operation.textContent = firstNumber;
      result.textContent = firstNumber;
      operator = null;
    } else {
      secondNumber = String(percentage(Number(secondNumber)));
      operation.textContent = firstNumber + operator + secondNumber;
    }
  }
});
onOffBtn.addEventListener("click", toggleCalculator);
clearBtn.addEventListener("click", resetState);
backspaceBtn.addEventListener("click", (e) => {
  if (!equalPressed) {
    if (operator !== null && secondNumber !== "") {
      secondNumber = secondNumber.slice(0, -1);
    } else {
      if (operator !== null) {
        operator = null;
        if (previousResult !== "") {
          operation.textContent = previousResult;
          previousResult = "";
          firstNumber = previousFirstNumber;
          operator = previousOperator;
          secondNumber = previousSecondNumber;
        }
      } else {
        if (firstNumber !== "") {
          firstNumber = firstNumber.slice(0, -1);
        }
      }
    }
    operation.textContent = operation.textContent.slice(0, -1);
  }
});
decimalBtn.addEventListener("click", (e) => {
  if (operator === null) {
    if (equalPressed) {
      firstNumber = "";
      operation.textContent = "";
      equalPressed = false;
    }
    if (!firstNumber.includes(".")) {
      if (firstNumber === "") {
        firstNumber = "0";
        firstNumber += e.target.textContent;
        operation.textContent += firstNumber;
      } else {
        firstNumber += e.target.textContent;
        operation.textContent += e.target.textContent;
      }
    }
  } else {
    if (!secondNumber.includes(".")) {
      if (secondNumber === "") {
        secondNumber = "0";
        secondNumber += e.target.textContent;
        operation.textContent += secondNumber;
      } else {
        secondNumber += e.target.textContent;
        operation.textContent += e.target.textContent;
      }
    }
  }
});
equalBtn.addEventListener("click", (e) => {
  if (firstNumber !== "" && secondNumber !== "") {
    let calculatedResult = operate(
      Number(firstNumber),
      Number(secondNumber),
      operator,
    );
    if (isNaN(calculatedResult)) {
      resetState();
    } else {
      operation.textContent =
        firstNumber + operator + secondNumber + "=" + calculatedResult;
      firstNumber = String(calculatedResult);
      secondNumber = "";
      operator = null;
      equalPressed = true;
    }
    result.textContent = calculatedResult;
  }
  previousResult = "";
});
numberButtons.forEach((ele) =>
  ele.addEventListener("click", (e) => {
    if (operator === null) {
      if (equalPressed) {
        firstNumber = "";
        operation.textContent = "";
        equalPressed = false;
      }
      firstNumber += e.target.textContent;
    } else {
      secondNumber += e.target.textContent;
    }

    operation.textContent += e.target.textContent;
  }),
);
operatorButtons.forEach((ele) =>
  ele.addEventListener("click", (e) => {
    if (firstNumber === "") firstNumber = "0";
    if (operator !== null && secondNumber !== "") {
      previousResult = operation.textContent + e.target.textContent;
      previousFirstNumber = firstNumber;
      previousOperator = operator;
      previousSecondNumber = secondNumber;
      firstNumber = String(
        operate(Number(firstNumber), Number(secondNumber), operator),
      );

      result.textContent = firstNumber;
      if (isNaN(firstNumber)) firstNumber = "0";
      operation.textContent = firstNumber + e.target.textContent;
      secondNumber = "";
    } else {
      operation.textContent =
        operator === null
          ? firstNumber + e.target.textContent
          : operation.textContent.slice(0, -1) + e.target.textContent;
      equalPressed = false;
    }

    operator = e.target.textContent;
  }),
);
