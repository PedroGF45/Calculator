//resolver bug de multiplicaçao e divisão

const defaultNumber = null;
let currentNumber = "";
let previousNumber = "";

let currentOperator = "";
let previousOperator = "";

//updates the number in the display bottom portion
function updateDisplay(value) {
    previousOperator != "" ? currentNumber += `${value}` : previousNumber += `${value}`;
    previousOperator != "" ? display.innerText = currentNumber : display.innerText += `${value}`;
}

//updates de current operator being used
function updateOperator(signal) {
    previousOperator += signal;
    if (previousOperator.length > 1) {
        currentOperator = previousOperator.split("")[0];
        previousOperator = previousOperator.substring(1);
    }
    cache.innerText = `${previousNumber}${previousOperator}`;
}

//Get numbers and operators
let operator = document.querySelectorAll(".operator");
let number = document.querySelectorAll(".number");
let display = document.getElementById("input");
let cache = document.getElementById("cache");
const clear = document.getElementById("clear");
const back = document.getElementById("back");

//Add listener onclick and sends the respective function
operator.forEach(operator => operator.addEventListener("click", () => operate(operator.getAttribute("id"))));
number.forEach(number => number.addEventListener("click", () => updateDisplay(number.getAttribute("value"))));
clear.addEventListener("click", clearDisplay);
back.addEventListener("click", backDisplay);

function backDisplay() {
    display.innerText = display.innerText.slice(0, -1);
    previousOperator == "" ? previousNumber = previousNumber.slice(0, -1) : currentNumber = currentNumber.slice(0, -1);
}

//Clear function
function clearDisplay() {
    display.innerText = "";
    cache.innerText = "";
    currentNumber = "";
    previousNumber = "";
    currentOperator = "";
    previousOperator = "";
}

//operator functions
function add(a, b) {
    let result = (Number(a) + Number(b));
    getResult(result);
}

function subtract(a, b) {
    let result = (Number(a) - Number(b));
    getResult(result);
}

function multiply(a, b) {
    let result = (Number(a) * Number(b));
    getResult(result);
}

function divide(a, b){
    let result = (Number(a) / Number(b));
    getResult(result);
}

function getResult(result) {
    display.innerText = result;
    previousNumber = result;
    currentNumber = "";
    cache.innerText = `${result}${previousOperator}`;
}

//choses the operation based on id of the button clicked
function operate(operand) {
    switch (operand) {
        case "plus":
            updateOperator("+");
            evaluate();
            break;
        case "minus":
            updateOperator("-");
            evaluate();
            break;
        case "multiply":
            updateOperator("x");
            evaluate();
            break;
        case "divide":
            updateOperator("/");
            evaluate();
            break;
    }
}

//choses the function to operate based on the operator
function evaluate() {
    if (currentOperator == "+" && cache.innerText.length > 1) {
        add(previousNumber, currentNumber);
    } else if (currentOperator == "-" && cache.innerText.length > 1) {
        subtract(previousNumber, currentNumber);
    } else if (currentOperator == "x" && cache.innerText.length > 1) {
        multiply(previousNumber, currentNumber);
    } else if (currentOperator == "/" && cache.innerText.length > 1) {
        divide(previousNumber, currentNumber);
    }
}
