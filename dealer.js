const brandList = ["Porsche", "Volkswagen", "Audi", "Bmw"]

let counter = 0; /* Make sure title of how many customers we have is displayed, add appropriate class if there is more than 5 customers */
let totalProducedClient = 0; /* Make sure we do not exceed more than max client allowed */
// let clientAppearing = Math.floor((Math.random()*10)+1);
let clientAppearing = 2;
if(clientAppearing > 8) { clientAppearing = 8; };

const RemoveLocalStorage = () => {
	window.localStorage.clear();
	alert("You have cleared your local storage. If you would like your settings back, you have to re-enable them again.");
	window.location.reload();
}; 

const SetMaxClient = currentMaxClient => {
	localStorage.setItem("maxClient", currentMaxClient)
	localStorage.setItem("client_Bmw", 3);
	localStorage.setItem("client_Porsche", 4);
	localStorage.setItem("client_Audi", 5);
	localStorage.setItem("client_Volkswagen", 6);
};

const GetLocalStorage = item => {
	if(item === "maxClient") {
		// console.log(`Max client: ${localStorage.getItem(item)}`);
		return localStorage.getItem(item);
	}
	else {
		return localStorage.getItem(item);
	}
}

class Car {
	constructor() {
		this.Bmw = parseInt(GetLocalStorage("client_Bmw"));
		this.Porsche = parseInt(GetLocalStorage("client_Porsche"));
		this.Audi = parseInt(GetLocalStorage("client_Audi"));
		this.Volkswagen = parseInt(GetLocalStorage("client_Volkswagen"));
	}

	getCar(car) {
		console.log(GetLocalStorage(car));
		return GetLocalStorage(car);
	}

	updateLocalStorage(car) {
		let currentMax = GetLocalStorage("maxClient");
		currentMax--;
		let currentCarAmt = GetLocalStorage(car);
		currentCarAmt--;
		localStorage.setItem("maxClient", currentMax);
		localStorage.setItem(car, currentCarAmt--);
	}

	updateCarObj(choice) {
		car[choice] -= 1;
		console.log(`updateCarObj choice: ${choice}`);
		console.log(car);
	}
}
let car;
const RandomCarChoice = () => {
	for (const carAmt in car) {
		if(car[carAmt] === 0 || car[carAmt] === "0" || car[carAmt] < 0) {
			console.log(`Car type: ${carAmt}`);
			console.log(`Car amount: ${car[carAmt]}`);
			console.log("trololol");
			delete car[carAmt];
		}
	}
	// console.log(car);
	
	let keys = Object.keys(car);
	const randomCar = keys[ keys.length * Math.random() << 0]
	return randomCar;
}

const AddClients = () => {
	const client_image = Math.floor(Math.random()*9)+1;
	const carChoice = RandomCarChoice();
	console.log(carChoice);
	if(carChoice === null || carChoice === undefined) {
		console.log("AINSDAiBNSDAUBAUSIDBUIbdiuSA");
		return;
	}
	car.updateLocalStorage(`client_${carChoice}`);
	car.updateCarObj(carChoice)
	$("#clients_queue").append(`
	<div class="clientcard choice_${carChoice}">
	<div class="clientcard__image client_${client_image} ">
	</div>
	<span class="preference">Client for ${carChoice}</span>
	</div>
	`)
}

const RemoveClient = (getThis, getCurrentElement, getWhere) => {
	getCurrentElement.animate(
		{ top: getWhere }
		).fadeOut("fast",function() {
			getCurrentElement.remove();
		});
}
function NewClient(){
	const maxClient = GetLocalStorage("maxClient");
	// const maxClientWithQueue = maxClient-
	if(totalProducedClient > 18) {
		console.log(`Total produced exceeded max client of ${maxClient} with total produced client of ${totalProducedClient}`);
		return;
	}
	// console.log(totalProducedClient);


	let elem = document.getElementById("aoc");
	if(typeof elem !== 'undefined' && elem !== null) {
		elem.parentNode.removeChild(elem);
	}
 
	if( counter >= 1) {
		const amountOfClient = document.querySelectorAll("#clients_queue .disappear").length;
		const currentCount = counter-amountOfClient;
		const customerAmtDiv = document.createElement("div");
		customerAmtDiv.id = "aoc";
		const customerAmtText = document.createTextNode(`${currentCount} customers waiting..`);
		customerAmtDiv.appendChild(customerAmtText);
		document.getElementById("clients_queue").prepend(customerAmtDiv);
	 }; // Add #aoc message

	if(clientAppearing > 4) {
		const elem = document.getElementById("clients_queue");
		elem.classList.add("amountOver5");
	} // Add class if client over 4

	/* Uncomment if need */
	console.log(`Client total appeared: ${clientAppearing}\nCurrent counter: ${counter}\nTotal customer so far: ${totalProducedClient}`);

	if(counter >= clientAppearing) {
		return;
		} else if (counter !== clientAppearing) {
		AddClients();
		setTimeout(function(){NewClient();},100);
		console.log(`New Client function ran once`);
		}
	else {}
	counter++;
	totalProducedClient++;

};

const AddClass = () => {
	const client_queue = document.getElementById("clients_queue");
	const child = client_queue.querySelector('.clientcard')
	// console.log(child);
	if(child === null || child === undefined) {
		console.log("Child is nulllll");
		return;
	}
	child.classList.add("first_customer");
	// client_queue?.children?.[2].classList.add("first_customer");
	$(function() {
		$(".first_customer").draggable();
		
		// Return the draggable (or it's helper) to its original location when dragging stops with the boolean revert option.
		$(".first_customer").draggable({ revert: true });
		
		$(".first_customer").draggable( "option", "zIndex", 10 );
		
	});
};

const DropFunctionGlobal = (getThis, getCurrentElement) => {
	// console.log(getCurrentElement);
	$(getThis).not(`:has(".clientcard")`).each(function() {
		$(getThis).prepend(getCurrentElement);
		
		if(!getCurrentElement.hasClass("chosenCar")) {
			counter--;
			NewClient();
			AddClass();
			console.log(`New Client function ran once`);
		}

		getCurrentElement.addClass("chosenCar");

	})
	// counter--;
	// console.log(`Counter: ${counter}`);
	// NewClient();
	// console.log(`New Client function ran once`);
	// AddClass();
}

$("document").ready(function(e) {
	SetMaxClient(18);
	car = new Car();
	NewClient(); 
	console.log(`New Client function ran once`);
	AddClass();
	// RemoveLocalStorage();
	$("#reset").click(function() {RemoveLocalStorage()})
	
	// Porsche
	$("#porsche > ul > li").droppable({
		accept: ".choice_Porsche",
		drop: function(e, ui) {
			DropFunctionGlobal(this, ui.draggable);
		}
	});

	// Volkswagen
	$("#volkswagen > ul > li").droppable({
		accept: ".choice_Volkswagen",
		drop: function(e, ui) {
			
			DropFunctionGlobal(this, ui.draggable);
		}
	});

	// audi
	$("#audi > ul > li").droppable({
		accept: ".choice_Audi",
		drop: function(e, ui) {
			
			DropFunctionGlobal(this, ui.draggable);
		}
	});

	// Volkswagen
	$("#bmw > ul > li").droppable({
		accept: ".choice_Bmw",
		drop: function(e, ui) {
			DropFunctionGlobal(this, ui.draggable);
		}
	});

	// Exit
	$("#exit").droppable({
		accept: ".chosenCar",

		drop: function(e, ui) {
			console.log("DOES THIS WORK?");
			DropFunctionGlobal(this, ui.draggable);
			RemoveClient(this,ui.draggable, 200000)
		}
	})

// 	// test Add an alert if user tries to stack two people on exit
// 	$("#staffbox").droppable({
// 		accept: ".chosenCar",

// 		drop: function(e, ui) {
// 			console.log("DOES THIS WORK?");
// 			DropFunctionGlobal(this, ui.draggable);
// 			const getStaffBox = document.getElementById("staffbox");
// 			console.log();
// 		}
// 	})
});

/* setTimeout(function() {
	const cards =  document.getElementsByClassName("clientcard");
	for(let key in cards) {
		if( typeof cards[key] === 'object' ) {
			console.log(cards[key]);
			cards[key].addEventListener("click", () => {console.log("I was clicked, this is a placeholder");});
		}
		//obj func number
	}
}, 2000) */