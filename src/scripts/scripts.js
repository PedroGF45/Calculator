let currentNumber = "";
let previousNumber = "";

let currentOperator = "";
let previousOperator = "";

//updates the number in the display bottom portion
function updateDisplay(value) {
    if (previousOperator == "=") {
        clearDisplay(); 
    }
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
const decimal = document.getElementById("decimal");
const clear = document.getElementById("clear");
const back = document.getElementById("back");

//Add listener onclick and sends the respective function
operator.forEach(operator => operator.addEventListener("click", () => operate(operator.getAttribute("id"))));
number.forEach(number => number.addEventListener("click", () => updateDisplay(number.getAttribute("value"))));

//add listener to keyboard
window.addEventListener("keydown", function (event) {
    console.log(event.key);
    //if (typeof event.key)
    switch (event.key) {
        case "crl":
            console.log("é um crl");
            break;
    }
})






decimal.addEventListener("click", addDecimal);
clear.addEventListener("click", clearDisplay);
back.addEventListener("click", backDisplay);

function addDecimal() {
    if (previousOperator == "" && !display.innerText.includes(".")) {
        display.innerText += ".";
        previousNumber += ".";
    } else if (!display.innerText.includes(".")){
        display.innerText += ".";
        currentNumber += ".";
    }
}

function backDisplay() {
    if (previousOperator != "=") {
        display.innerText = display.innerText.slice(0, -1);
        previousOperator == "" ? previousNumber = previousNumber.slice(0, -1) : currentNumber = currentNumber.slice(0, -1);
    }
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

//If the signal is equal display the equation on display.
function getResult(result) {
    display.innerText = result;
    if (previousOperator == "=") {
        cache.innerText = `${previousNumber}${currentOperator}${currentNumber}=${result}`;
    } else {
        cache.innerText = `${result}${previousOperator}`;
    }
    previousNumber = result;
    currentNumber = ""; 
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
        case "equal":
            updateOperator("=");
            evaluate();
            break;
        case "plusOrMinus":
            //adds and removes "-" based on appearence
            if (previousOperator == "") {
                if (!previousNumber.includes("-")) {
                    display.innerText = "-" + display.innerText;
                    previousNumber = "-" + previousNumber;
                } else {
                    display.innerText = display.innerText.substr(1);
                    previousNumber = previousNumber.substr(1);
                }
            } else {
                if (!currentNumber.includes("-")) {
                    display.innerText = "-" + display.innerText;
                    currentNumber = "-" + currentNumber;
                } else {
                    display.innerText = display.innerText.substr(1);
                    currentNumber = currentNumber.substr(1);
                }
            }
            break;
        case "square":
            cache.innerText = `sqr(${previousNumber})`;
            previousNumber = Number(previousNumber) * Number(previousNumber);
            display.innerText = previousNumber;
            break;
        case "root":
            cache.innerHTML = `&#8730;${previousNumber}`;
            previousNumber = Math.sqrt(Number(previousNumber));
            display.innerText = previousNumber;
            break;
    }
}

//choses the function to operate based on the operator
function evaluate() {
    if (currentOperator == "+" && cache.innerText.length > 1 || (currentOperator == "+" && previousOperator == "=" && cache.innerText.length > 1)) {
        add(previousNumber, currentNumber);
    } else if (currentOperator == "-" && cache.innerText.length > 1 || (currentOperator == "-" && previousOperator == "=" && cache.innerText.length > 1)) {
        subtract(previousNumber, currentNumber);
    } else if (currentOperator == "x" && cache.innerText.length > 1 || (currentOperator == "x" && previousOperator == "=" && cache.innerText.length > 1)) {
        multiply(previousNumber, currentNumber);
    } else if (currentOperator == "/" && cache.innerText.length > 1 || (currentOperator == "/" && previousOperator == "=" && cache.innerText.length > 1)) {
        divide(previousNumber, currentNumber);
    }
}
