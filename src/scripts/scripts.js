//tentar fazer com a,b



const defaultNumber = null;

let currentNumber = null;
let previousNumber = null;

//updates the number in the display bottom portion
function updateDisplay(num) {
    display.innerText = `${num}`;
    if (currentNumber != null) {
        previousNumber = Number(num);
    } else {
        currentNumber = Number(num);
    }
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
operator.forEach(operator => operator.addEventListener("click", () => operate(operator.getAttribute("id"), currentNumber, previousNumber)));
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
    updateCache(" + ");
    display.innerText = currentNumber;
    if (a != null && b != null) {
        let result = a + b;
        display.innerText = result;
        currentNumber = result;
        previousNumber = null;
    }  
}

function subtract(a, b) {
    updateCache(" - ");
    display.innerText = currentNumber;
    if (a != null && b != null) {
        let result = (a - b);
        console.log(`${a} - ${b} = ${result}`);
        display.innerText = result;
        currentNumber = result;
        previousNumber = null;
    } 
}

function multiply(a, b) {
    updateCache(" x ");
    display.innerText = currentNumber;
    if (a != null && b != null) {
        let result = (a * b);
        display.innerText = result;
        currentNumber = result;
        previousNumber = null;
    } 
}

function divide(a, b){
    updateCache(" / ");
    display.innerText = currentNumber;
    if (a != null && b != null) {
        let result = (a / b);
        display.innerText = result;
        currentNumber = result;
        previousNumber = null;
    } 
}

//choses the operation based on id of the button clicked
function operate(operand, currentNumber, previousNumber) {
    if (operand === "plus") {
        add(currentNumber, previousNumber);
    } else if (operand === "minus") {
        subtract(currentNumber, previousNumber);
    } else if (operand === "multiply") {
        multiply(currentNumber, previousNumber);
    } else if (operand === "divide") {
        divide(currentNumber, previousNumber);
    }
}


