
const defaultNumber = null;
let currentNumber = null;

let previousNumber = null;
let currentOperator = "";

//updates de current operator being used
function updateOperator(signal) {
    currentOperator = signal;
    cache.innerText += `${signal}`;
}

//updates the number in the display bottom portion
function updateDisplay(num) {
    display.innerText = `${num}`;
    (previousNumber == null) ? previousNumber = Number(num) : currentNumber = Number(num);
    updateCache(`${num}`);
}

//updates the number in the display top portion
function updateCache(value) {
    cache.innerText += `${value}`;
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
    display.innerText = null;
    cache.innerText = "";
    currentNumber = null;
    previousNumber = null;
}


//operator functions
function add(a, b) {
        let result = a + b;
        display.innerText = result;
        previousNumber = result;
        currentNumber = null;
        cache.innerText = `${result}${currentOperator}`;
}

function subtract(a, b) {
    let result = (a-b);
    display.innerText = result;
    previousNumber = result;
    currentNumber = null;
    cache.innerText = `${result}${currentOperator}`;
}

function multiply(a, b) {
    let result = (a * b);
    display.innerText = result;
    previousNumber = result;
    currentNumber = null;
    cache.innerText = `${result}${currentOperator}`;
}

function divide(a, b){
    let result = (a/b);
    display.innerText = result;
    previousNumber = result;
    currentNumber = null;
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


function evaluate() {
    console.log(cache.innerText);
    for(let i = 0; i < cache.innerText.length; i++) {
        if (cache.innerText[i] == "+" && cache.innerText.length > 2) {
            add(previousNumber, currentNumber);
        } else if (cache.innerText[i] == "-" && cache.innerText.length > 2) {
            subtract(previousNumber, currentNumber);
        } else if (cache.innerText[i] == "x" && cache.innerText.length > 2) {
            multiply(previousNumber, currentNumber);
        } else if (cache.innerText[i] == "/" && cache.innerText.length > 2) {
            divide(previousNumber, currentNumber);
        }
    }
    
}
