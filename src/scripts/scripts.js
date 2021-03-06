let currentNumber = "";
let previousNumber = "";

let currentOperator = "";
let previousOperator = "";

//Get numbers and operators
let operator = document.querySelectorAll(".operator");
let number = document.querySelectorAll(".number");
let display = document.getElementById("input");
let cache = document.getElementById("cache");
const decimal = document.getElementById("decimal");
const clear = document.getElementById("clear");
const back = document.getElementById("back");

decimal.addEventListener("click", addDecimal);
clear.addEventListener("click", clearDisplay);
back.addEventListener("click", backDisplay);

//adds decimal point
function addDecimal() {
    if (previousOperator == "" && !display.innerText.includes(".")) {
        display.innerText += ".";
        previousNumber += ".";
    } else if (!display.innerText.includes(".")){
        display.innerText += ".";
        currentNumber += ".";
    }
}

//erase last number
function backDisplay() {
    if (previousOperator != "=") {
        display.innerText = display.innerText.slice(0, -1);
        previousOperator == "" ? previousNumber = previousNumber.slice(0, -1) : currentNumber = currentNumber.slice(0, -1);
    }
}


//Add listener onclick and sends the respective function
operator.forEach(operator => operator.addEventListener("click", () => operate(operator.getAttribute("id"))));
number.forEach(number => number.addEventListener("click", () => updateDisplay(number.getAttribute("value"))));

//updates the number in the display bottom portion
function updateDisplay(value) {
    if (previousOperator == "=") {
        clearDisplay(); 
    } else {
        (previousOperator != "") ? currentNumber += `${value}` : previousNumber += `${value}`;
        (previousOperator != "") ? display.innerText = currentNumber : display.innerText += `${value}`;
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
            updateOperator("??");
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

//updates de current operator being used
function updateOperator(signal) {
    previousOperator += signal;
    if (previousOperator.length > 1) {
        currentOperator = previousOperator.split("")[0];
        previousOperator = previousOperator.substring(1);
    }
    cache.innerText = `${previousNumber}${previousOperator}`;
}

//choses the function to operate based on the operator
function evaluate() {
    if (currentOperator == "+" && cache.innerText.length > 1 || (currentOperator == "+" && previousOperator == "=" && cache.innerText.length > 1)) {
        add(previousNumber, currentNumber);
    } else if (currentOperator == "-" && cache.innerText.length > 1 || (currentOperator == "-" && previousOperator == "=" && cache.innerText.length > 1)) {
        subtract(previousNumber, currentNumber);
    } else if (currentOperator == "x" && cache.innerText.length > 1 || (currentOperator == "x" && previousOperator == "=" && cache.innerText.length > 1)) {
        multiply(previousNumber, currentNumber);
    } else if (currentOperator == "??" && cache.innerText.length > 1 || (currentOperator == "/" && previousOperator == "=" && cache.innerText.length > 1)) {
        divide(previousNumber, currentNumber);
    }
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
    if (b == 0) {
        display.innerText = "You can't divide by 0!";
        cache.innerText = "";
    } else {
        getResult(result);
    }
}

//If the signal is equal display the equation on display.
function getResult(result) {
    result % 1 == 0 ? a = result : a = result.toFixed(2);
    result.toString().length > 12 ? a = result.toExponential(1) : a = result;
    Number(previousNumber) % 1 == 0 ? b = Number(previousNumber) : b = Number(previousNumber).toFixed(2);
    Number(currentNumber) % 1 == 0 ? c = Number(currentNumber) : c = Number(currentNumber).toFixed(2);
    display.innerText = a;
    if (previousOperator == "=") {
        cache.innerText = `${b}${currentOperator}${c}=${a}`;
    } else {
        cache.innerText = `${a}${previousOperator}`;
    }
    previousNumber = result;
    currentNumber = ""; 
}

//add listener to keyboard
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    if (event.key >= 0 && event.key <= 9) { //gets input from 0 to 9
        updateDisplay(event.key);
    }
    //if (typeof event.key)
    switch (event.key) {
        case "Enter":
            operate("equal");
            break;
        case "-":
            operate("minus");
            break;
        case "+":
            operate("plus");
            break;
        case "*":
            operate("multiply");
            break;
        case "/":
            operate("divide");
            break;
        case ".":
            addDecimal();
            break;
        case "Backspace":
            backDisplay();
            break;
    }
    event.preventDefault();
}, true)

//Dark mode
//get variables
const darkMode = document.getElementById("toggle");
const body = document.body;
const pMode = document.getElementById("mode");
const calculator = document.getElementById("calculator");
const displayCalculator = document.getElementById("display");
const switchInput = document.getElementById("switch");
const github = document.getElementById("github");

darkMode.addEventListener("change", function(){
    console.log(decimal);
    if (darkMode.checked) {
        body.classList.add("darkMode");
        calculator.style.cssText = `background-color: white;`;
        displayCalculator.style.cssText = `background-color: black;`;
        number.forEach(number => number.classList.add("darkMode"));
        operator.forEach(operator => operator.classList.add("darkModeOp"));
        decimal.classList.remove("lightModeOp");
        decimal.classList.add("darkModeOp");
        pMode.innerText = "DARK";
        github.style.cssText = `color: white`;
      } else {
        body.classList.remove("darkMode");
        calculator.style.cssText = `background-color: black;`;
        displayCalculator.style.cssText = `background-color: white;`;
        number.forEach(number => number.classList.remove("darkMode"));
        operator.forEach(operator => operator.classList.remove("darkModeOp"));
        decimal.classList.remove("darkModeOp");
        decimal.classList.add("lightModeOp");
        pMode.innerText = "LIGHT";
        github.style.cssText = `color: black`;
      }
});

