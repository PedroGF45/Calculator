//tentar fazer com a,b



const defaultNumber = 0;

let currentNumber = 0;

//updates the number in the display bottom portion
function updateNumber(num) {
    display.innerText = num;
    updateCache(num);
    currentNumber = num;
}

//updates the number in the display top portion
function updateCache(value) {
        cache.innerText += ` ${value} `;
}


//Get numbers and operators
let operator = document.querySelectorAll(".operator");
let number = document.querySelectorAll(".number");
let display = document.getElementById("input");
let cache = document.getElementById("cache");
const clear = document.getElementById("clear");

//Add listener onclick and sends the respective function
operator.forEach(operator => operator.addEventListener("click", () => operate(operator.getAttribute("id"))));
number.forEach(number => number.addEventListener("click", () => updateNumber(number.getAttribute("value"))));
clear.addEventListener("click", clearDisplay);

//Clear function
function clearDisplay() {
    display.innerText = "";
    cache.innerText = "";
    updateNumber(defaultNumber);
}


//operator functions
function add(a, b) {
    updateCache(" + ");
    a = currentNumber;
    console.log(num);
    let sum = a + b;
    console.log(sum);
    //cache.innerHTML.indexOf("+") !== 0
}

function subtract(a, b) {
    updateCache(" - ");
    return (a - b);
}

function multiply(a, b) {
    updateCache(" x ");
    return (a * b);
}

function divide(a, b){
    updateCache(" / ");
    return (a / b);
}

//choses the operation based on id of the button clicked
function operate(operand) {
    if (operand === "plus") {
        add();
    } else if (operand === "minus") {
        subtract();
    } else if (operand === "multiply") {
        multiply();
    } else if (operand === "divide") {
        divide();
    }
}


