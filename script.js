const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const perviousOperationTextElement = document.querySelector('[data-pervious-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


class Calculator {
  constructor(perviousOperationTextElement, currentOperandTextElement){
    console.log("Hello");
    this.perviousOperationTextElement = perviousOperationTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
    this.updateDisplay();
  }
  clear(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    console.log("Clear Function ran");
  }
  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number){
    if (number === '.' && this.currentOperand.includes('.')){
      return ;
      // this return stops the function from executing and doesn't allow more than one period to be added to the field
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
    console.log("appendNumber Function ran")
  }
  chooseOperation(operation){
    if (this.currentOperand === '') {return ;}
    if (this.previousOperand !== ''){this.compute();}
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }
  compute(){
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)){
      console.log('It is not a Number');
      return ;
    }
    switch(this.operation){
      case '+':  
        computation = prev + current;
        break;
      case '-': 
        computation = prev - current;
        break;
      case '*': 
        computation = prev * current;
        break;
      case '÷': 
        computation = prev / current;
        break;
      default: 
        return ;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number){
    const stringNumber = number.toString();
    // first convent the number to string 
    const integerDigit = parseFloat(stringNumber.split('.')[0]);
    // now we split the number before and after the period where the first [0] is stored in integerDigit 
    const decimalDigits = stringNumber.split('.')[1];
    // split [1] is stored in decimalDigit

    // if condition for basically [0]

    let integerDisplay;
    if(isNaN(integerDigit)){
      integerDisplay = '';
    }else {
      integerDisplay = integerDigit.toLocaleString('en', {
        maximumFractionDigits: 0});
    }

    // if condition for [1]
    
    if (decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`;
    }else {
      return integerDisplay;
    }

    // const floatNumber = parseFloat(number);
    // if (isNaN(floatNumber)){return '';}
    // return floatNumber.toLocaleString('en');
  }
  updateDisplay(){
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    // console.log(this.currentOperandTextElement.innerText);
    if (this.operation != null){
    this.perviousOperationTextElement.innerText = 
      `${this.getDisplayNumber(this.previousOperand) } ${this.operation}`;
    }else {
      // operation is null
      this.perviousOperationTextElement.innerText = '';
      // when there is not operation to be done then keep it empty
    }
    console.log('updateDisplay Function ran');
  }

}

const calculator = new Calculator(perviousOperationTextElement, currentOperandTextElement);

numberButtons.forEach(button =>{
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    console.log("Button clicked");
  });
});

operationButtons.forEach(button =>{
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
    console.log("Button clicked");
  });
});

equalsButton.addEventListener('click', button =>{
  calculator.compute();
  calculator.updateDisplay();
}); 

allClearButton.addEventListener('click', button =>{
  calculator.clear();
  calculator.updateDisplay();
}); 

deleteButton.addEventListener('click', button =>{
  calculator.delete();
  calculator.updateDisplay();
}); 

