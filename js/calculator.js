// JS Calculator

const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector(".calculator_keys")
const display = calculator.querySelector("#display")
const equation = calculator.querySelector(".equation_display")

let calcState = calculator.dataset.previousKeyType
let lastOperator = calculator.dataset.lastOperator

let numbers = []
let number = ""
let operators = []


keys.addEventListener('click', event => {
    const key = event.target
    if (!key.closest('button')) return

    const keyValue = key.textContent

    if (calcState === "equals") {
        if (!key.classList.contains("operators")) {
            equation.textContent = ""
            calcState = ""
        } else {
            equation.textContent = display.textContent
            number = display.textContent
            calcState = ""
        }
    }


    if (keyValue === ".") {
        let dot = /\./g
        if (dot.test(display.textContent)) return
        showOnDisplay(keyValue)
        calcState = "decimal"
    }


    if (key.classList.contains("numbers")) {
        showOnDisplay(keyValue)
        calcState = "numbers"
    }


    if (key.classList.contains("operators")) {
        if (calcState !== "operators") {
            display.textContent = "0"
            numbers.push(number)
            number = ""
            equation.textContent += keyValue
            operators.push(key.id)
        } else if (keyValue === " - " && lastOperator === "multiply" || lastOperator === "divide") {
            number += "-"
            display.textContent = number
            equation.textContent += "-"
        } else {
            equation.textContent = equation.textContent
            .replace(/(\s[÷×]\s.|..)$/, "") + keyValue
            operators.pop()
            operators.push(key.id)
	    number = ""
        }
        calcState = "operators"
        lastOperator = key.id
    }


    if (keyValue === "C") {
        display.textContent = "0"
        equation.textContent = ""
        numbers = []
        operators = []
        number = ""
        calcState = "clear"
    }

    if (keyValue === " = ") {
        numbers.push(number)
        display.textContent = calculate(numbers, operators)
        equation.textContent += keyValue + display.textContent

        calcState = "equals"

        numbers = []
        operators = []
        number = ""
    }

})






function showOnDisplay(keyValue) {
    if (display.textContent === "0") { 
        number = keyValue 
    } else {
        number += keyValue
        }

    if (equation.textContent === "0") {
        equation.textContent = keyValue
    } else {
        equation.textContent += keyValue
    }
    
    display.textContent = number
}





function calculate(numbers, operators) {
    const newNumbers = numbers.map(num => Number(num))
    let operator = ""

    return newNumbers.reduce(function(result, current, index) {
        operator = operators[index - 1]

        if (operator === "add") return result + current
        if (operator === "subtract") return result - current
        if (operator === "divide") return result / current
        if (operator === "multiply") return result * current

    })

}

