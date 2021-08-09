//Get numbers and operators
const operator = document.querySelectorAll(".operator");
const number = document.querySelectorAll(".number");


//Add listener onclick and sends the respective function
operator.forEach(addEventListener("click", alerta));
number.forEach(addEventListener("click", displayNumber));


function add(a, b) {
    return (a + b);
}

function subtract(a, b) {
    return (a - b);
}

function multiply(a, b) {
    return (a * b);
}

function divide(a, b){
    return (a / b);
}

function alerta() {
    alert("hi");
}


