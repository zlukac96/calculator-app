var switchLever = document.getElementById("switch-lever");

const calculatorThemes = [ "classic", "light", "dark" ];

var buttonElements = document.querySelectorAll(".button-container > div");
var displayNumberElement = document.getElementById("display-number");
var displayNumber = "0";
var firstVariable = "empty";
var secondVariable = "empty";
var operation = "empty";
var result = "empty";

displayNumberElement.innerText = displayNumber;

function calculateResult(matOperation, firstVar, secondVar){
	if(matOperation === "plus") outputResult = firstVar + secondVar;
	if(matOperation === "minus") outputResult = firstVar - secondVar;
	if(matOperation === "multiply") outputResult = firstVar * secondVar;
	if(matOperation === "divide") outputResult = firstVar / secondVar;
	return outputResult;
}

function buttonPressed(event){
	let buttonName = event.target.id.split("-")[1];
	if( ! isNaN(parseInt(buttonName)) ){
		
		if(displayNumber.length === 1){
			
			if(displayNumber === "0"){
				displayNumber = buttonName;
			}else{
				displayNumber += buttonName;
			}
			
			
		} else{
			displayNumber += buttonName;
		}
		
		
		if(operation === "empty"){
			firstVariable = parseFloat(displayNumber);
		} else{
			secondVariable = parseFloat(displayNumber);
		}
		
		
		displayNumberElement.innerText = displayNumber;
		
	} else{
		
		if(buttonName === "point"){
			
			if( ! displayNumber.includes(".") ){
				displayNumber += ".";
				displayNumberElement.innerText = displayNumber;
			}
			
		}
		
		if(buttonName === "del"){
			
			
			if(displayNumber.length === 1){
				
				if(displayNumber !== "0"){
					displayNumber = "0";
				}
				
				
			} else{
				displayNumber = displayNumber.slice(0, (displayNumber.length - 1));
			}
			
			if(operation === "empty"){
				firstVariable = parseFloat(displayNumber);
			} else{
				secondVariable = parseFloat(displayNumber);
			}
			
			displayNumberElement.innerText = displayNumber;
			
		}
		
		if(buttonName === "plus" || buttonName === "minus" || buttonName === "multiply" || buttonName === "divide"){
			
			if(firstVariable === "empty") {
				firstVariable = 0;
				if(result !== "empty"){
					firstVariable = result;
				}
			}
			
			result = "empty";
			
			if(secondVariable === "empty"){
				operation = buttonName;
				displayNumber = "0";
			} else{

				firstVariable = calculateResult(operation, firstVariable, secondVariable);
				
				operation = buttonName;
				displayNumberElement.innerText = firstVariable.toString();
				displayNumber = "0";
				secondVariable = "empty";
			}
		}
		
		if(buttonName === "equal"){
			if(secondVariable === "empty"){

			} else{
				result = calculateResult(operation, firstVariable, secondVariable);
				
				operation = "empty";
				displayNumberElement.innerText = result.toString();
				displayNumber = "0";
				secondVariable = "empty";
				firstVariable = "empty";
			}
		}
		
		if(buttonName === "reset"){
			
			displayNumber = "0";
			firstVariable = "empty";
			secondVariable = "empty";
			operation = "empty";
			result = "empty";
			displayNumberElement.innerText = displayNumber;
			
		}
		
	}
	
}

for(let i = 0; i < buttonElements.length; i++) {
	buttonElements[i].addEventListener("click", buttonPressed);
}

class ToggleSwitch {
	constructor(switchElement, numberOfPositions=2) {
		this.switchElement = switchElement;
		this.numberOfPositions = numberOfPositions;
		this.switchPosition = 0;
	}
	getSwitchPosition() {
		return this.switchPosition;
	}
	toggleSwitch() {
		
		let positionLeft = "";
		
		this.switchPosition++;
		if (this.switchPosition > this.numberOfPositions - 1) this.switchPosition = 0;

		positionLeft += "calc(";
		positionLeft += (this.switchPosition * (100 / (this.numberOfPositions - 1))).toString();
		positionLeft += "% - ";
		positionLeft += (this.switchElement.children[0].offsetWidth * (this.switchPosition / ( this.numberOfPositions - 1 ))).toString();
		positionLeft += "px)";
		
		switchLever.children[0].style.left = positionLeft;
	}
}

var switch1 = new ToggleSwitch(switchLever, calculatorThemes.length);

function switchFunction(){
	
	switch1.toggleSwitch()
	
	document.documentElement.className = calculatorThemes[switch1.getSwitchPosition()];
	
}

switchLever.addEventListener("click", switchFunction);
