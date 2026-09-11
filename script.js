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
  return a / b;
}
let firstNumber;
let secondNumber;
let operator;
const numberButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const operation = document.querySelector(".operation");
numberButtons.forEach((ele) =>
  ele.addEventListener("click", (e) => {
    operation.textContent += e.target.textContent;
  }),
);
operatorButtons.forEach((ele) =>
  ele.addEventListener("click", (e) => {
    // Grap and test the last character if it's an operator or a number
    let lastStr = operation.textContent[operation.textContent.length - 1];

    if (
      lastStr === "/" ||
      lastStr === "*" ||
      lastStr === "+" ||
      lastStr === "-" ||
      lastStr === "%"
    ) {
      operation.textContent =
        operation.textContent.slice(0, operation.textContent.length - 1) +
        e.target.textContent;
    } else {
      operation.textContent += e.target.textContent;
    }

    operator = e.target.textContent;
    console.log(operator);
    console.log(lastStr);
  }),
);
