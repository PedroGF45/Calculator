
const defaultNumber = null;
let currentNumber = "";
let previousNumber = "";
let currentOperator = "";



//updates the number in the display bottom portion
function updateDisplay(value) {
        cache.innerText += `${value}`;
        currentOperator != "" ? currentNumber += `${value}` : previousNumber += `${value}`;
        currentOperator != "" ? display.innerText = currentNumber : display.innerText += `${value}`;
}

//updates de current operator being used
function updateOperator(signal) {
    currentOperator = signal;
    cache.innerText += `${signal}`;
}

//Get numbers and operators
let operator = document.querySelectorAll(".operator");
let number = document.querySelectorAll(".number");
let display = document.getElementById("input");
let cache = document.getElementById("cache");
const clear = document.getElementById("clear");

//Add listener onclick and sends the respective function
operator.forEach(operator => operator.addEventListener("click", () => operate(operator.getAttribute("id"))));
number.forEach(number => number.addEventListener("click", () => updateDisplay(number.getAttribute("value"))));
clear.addEventListener("click", clearDisplay);

//Clear function
function clearDisplay() {
    display.innerText = "";
    cache.innerText = "";
    currentNumber = "";
    previousNumber = "";
    currentOperator = "";
}

//operator functions
function add(a, b) {
    let result = (Number(a) + Number(b));
    display.innerText = result;
    previousNumber = result;
    currentNumber = "";
    cache.innerText = `${result}${currentOperator}`;
}

function subtract(a, b) {
    let result = (Number(a) - Number(b));
    display.innerText = result;
    previousNumber = result;
    currentNumber = "";
    cache.innerText = `${result}${currentOperator}`;
}

function multiply(a, b) {
    console.log(`a ${a}`);
    console.log(`b ${b}`);
    let result = (Number(a) * Number(b));
    display.innerText = result;
    previousNumber = result;
    currentNumber = "";
    cache.innerText = `${result}${currentOperator}`;
}

function divide(a, b){
    let result = (Number(a) / Number(b));
    display.innerText = result;
    previousNumber = result;
    currentNumber = "";
    cache.innerText = `${result}${currentOperator}`;
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
    for(let i = 0; i < cache.innerText.length; i++) {
        if (cache.innerText[i] == "+" && cache.innerText.length > 2) {
            add(previousNumber, currentNumber);
        } else if (cache.innerText[i] == "-" && cache.innerText.length > 2) {
            subtract(previousNumber, currentNumber);
        } else if (cache.innerText[i] == "x" && cache.innerText.length > 3) {
            multiply(previousNumber, currentNumber);
        } else if (cache.innerText[i] == "/" && cache.innerText.length > 3) {
            divide(previousNumber, currentNumber);
        }
    } 
}
