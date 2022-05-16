const numberButtons = document.querySelectorAll('.digits')
const operatorButtons = document.querySelectorAll('.operator')
const equalsButton = document.getElementById('equal')
const clearButton = document.getElementById('allClear')
const deleteButton = document.getElementById('clear')
const decimalButton = document.getElementById('decimal')
const lastOperationScreen = document.getElementById('input')
const currentOperationScreen = document.getElementById('result')

let firstOperand = ''
let secondOperand = ''
let currentOperation = null
shouldResetScreen = false

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
decimalButton.addEventListener('click', appendDecimal)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen){
        resetScreen()
    }
    currentOperationScreen.textContent += number
}

function resetScreen() {
    currentOperationScreen.textContent = ''
    shouldResetScreen = false
}

function clear(){
    currentOperationScreen.textContent='0'
    lastOperationScreen.textContent=' '
    shouldResetScreen = false
}

function appendDecimal() {
    if (shouldResetScreen) resetScreen()
    if (currentOperationScreen.textContent === '')
      currentOperationScreen.textContent = '0'
    if (currentOperationScreen.textContent.includes('.')) return
    currentOperationScreen.textContent += '.'
  }

  function deleteNumber() {
    if (currentOperationScreen.textContent === '0'||currentOperationScreen.textContent === '1' ||currentOperationScreen.textContent === '2' ||currentOperationScreen.textContent === '3' ||currentOperationScreen.textContent === '4' ||currentOperationScreen.textContent === '5' ||currentOperationScreen.textContent === '6' ||currentOperationScreen.textContent === '7' ||currentOperationScreen.textContent === '8' ||currentOperationScreen.textContent === '9'){
        currentOperationScreen.textContent = '0'
    }
    else{
     currentOperationScreen.textContent = currentOperationScreen.textContent
      .toString()
      .slice(0, -1)
    }
  }

  function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
  }
  
  function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
      currentOperationScreen.textContent = "Math Error"
      return
    }
    secondOperand = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(
      operate(currentOperation, firstOperand, secondOperand)
    )
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
  }
  
  function roundResult(number) {
    return Math.round(number * 10000000000) / 10000000000
  }
  
  function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) {
        appendNumber(e.key)
    }
    if (e.key === '.') {
        appendDecimal()
    }
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape'){
        clear()
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%'){
      setOperation(convertOperator(e.key))
    }
  }
  
  function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/'){
        return '÷'
    }
    if (keyboardOperator === '*') {
        return 'x'
    }
    if (keyboardOperator === '-') {
        return '-'
    }
    if (keyboardOperator === '+') {
        return '+'
    }
    if (keyboardOperator === '%'){
        return '%'
    }
  }

  function add(x, y) {
    return x + y
  }
  
  function subtract(x, y) {
    return x - y
  }
  
  function multiply(x, y) {
    return x * y
  }
  
  function divide(x, y) {
    return x / y
  }

  function remainder(x, y){
      return x % y
  }

  function operate(operator, x, y) {
    x = Number(x)
    y = Number(y)
    switch (operator) {
      case '+':
        return add(x, y)
      case '-':
        return subtract(x, y)
      case 'x':
        return multiply(x, y)
      case '÷':
        if (y === 0){
            return null
        }
        else return divide(x, y)
      case '%':
          return remainder(x, y)    
      default:
        return null
    }
  }
 