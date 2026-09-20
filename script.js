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
let firstNumber = "";
let secondNumber = "";
let operator = null;
let equalPressed = false;
const numberButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const operation = document.querySelector(".operation");
const equalBtn = document.querySelector(".equal-btn");
const result = document.querySelector(".result");
equalBtn.addEventListener("click", (e) => {
  if (firstNumber !== "" && secondNumber !== "") {
    let calculatedResult = operate(
      Number(firstNumber),
      Number(secondNumber),
      operator,
    );
    result.textContent = calculatedResult;
    operation.textContent =
      firstNumber + operator + secondNumber + "=" + calculatedResult;
    firstNumber = String(calculatedResult);
    secondNumber = "";
    operator = null;
    equalPressed = true;
  }
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
    // let lastStr = operation.textContent[operation.textContent.length - 1];
    // let lastStrIsOp =
    //   lastStr === "/" ||
    //   lastStr === "*" ||
    //   lastStr === "+" ||
    //   lastStr === "-" ||
    //   lastStr === "%";
    // let includeOp =
    //   operation.textContent.includes("+") ||
    //   operation.textContent.includes("-") ||
    //   operation.textContent.includes("*") ||
    //   operation.textContent.includes("/") ||
    //   operation.textContent.includes("%");
    // // Grap and test the last character if it's an operator or a number
    // if (lastStrIsOp) {
    //   // firstNumber = Number(
    //   //   operation.textContent.slice(0, operation.textContent.length - 1),
    //   // );
    //   operation.textContent =
    //     operation.textContent.slice(0, operation.textContent.length - 1) +
    //     e.target.textContent;
    //   operator = e.target.textContent;
    // } else {
    //   // Test if the operation already have an operator so we calculate it before add a new operator
    //   if (includeOp) {
    //     console.log(operation.textContent);
    //     // if (operation.textContent.startsWith("-")) {
    //     //   secondNumber = Number(
    //     //     operation.textContent.split(operator)[
    //     //       operation.textContent.split(operator).length - 1
    //     //     ],
    //     //   );
    //     // } else {
    //     //   secondNumber = Number(operation.textContent.split(operator)[1]);
    //     // }
    //     // secondNumber = Number(
    //     //   operation.textContent.split(operator)[
    //     //     operation.textContent.split(operator).length - 1
    //     //   ],
    //     // );
    //     firstNumber = operate(firstNumber, secondNumber, operator);
    //     operator = e.target.textContent;
    //     operation.textContent = firstNumber + e.target.textContent;
    //   } else {
    //     operator = e.target.textContent;
    //     firstNumber = Number(operation.textContent);
    //     operation.textContent += e.target.textContent;
    //   }
    // }
    // *** claude Idea which is better
    if (operator !== null && secondNumber !== "") {
      firstNumber = operate(
        Number(firstNumber),
        Number(secondNumber),
        operator,
      );
      console.log(firstNumber);
      operation.textContent = firstNumber + e.target.textContent;
      result.textContent = firstNumber;
      secondNumber = "";
    } else {
      operation.textContent =
        operator === null
          ? firstNumber + e.target.textContent
          : operation.textContent.slice(0, -1) + e.target.textContent;
    }
    if (firstNumber === "") firstNumber = "0";
    operator = e.target.textContent;
  }),
);
