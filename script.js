class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText
        this.currentText = currentText
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
         if (this.previousOperand !== '') {
            this.compute()
         }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let result 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                result = prev+current
                break
            case '-':
                result = prev-current
                break
            case 'x':
                result = prev*current
                break
            case '/':
                result = prev/current
                break
            default:
            return
        }
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }

    numberFormat(number) {
        const strNumber = number.toString()
        const integerNumber = parseFloat(strNumber.split('.')[0])
        const decimalNumber = strNumber.split('.')[1]
        let formatedDisplay
        if (isNaN(integerNumber)) {
            formatedDisplay = ''
        } else {
            formatedDisplay = integerNumber.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalNumber != null) {
            return `${formatedDisplay}.${decimalNumber}`
        } else {
            return formatedDisplay
        }
    }

    updateDisplay() {
        this.currentText.innerText =
            this.numberFormat(this.currentOperand)
        if (this.operation != null) {
            this.previousText.innerText = 
                `${this.numberFormat(this.previousOperand)} ${this.operation}`
        } else {
            this.previousText.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[numbers]')
const operationButtons = document.querySelectorAll('[operations]')
const equalsButton = document.querySelector('[equals]')
const deleteButton = document.querySelector('[delete]')
const clearButton = document.querySelector('[clear]')
const previousText = document.querySelector('[previous]')
const currentText = document.querySelector('[current]')


const calculator = new Calculator(previousText,currentText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})