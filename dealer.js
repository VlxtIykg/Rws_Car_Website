const brandList = ["Porsche", "Volkswagen", "Audi", "Bmw"]
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

let counter = 0; /* Make sure title of how many customers we have is displayed, add appropriate class if there is more than 5 customers */
let totalProducedClient = 0; /* Make sure we do not exceed more than max client allowed */
// let clientAppearing = Math.floor((Math.random()*10)+1);
let clientAppearing = 2;
if(clientAppearing > 8) { clientAppearing = 8; };

const bindTarget = (car_uuid, manual) => {
		const getTotalBinds = localStorage.getItem("bind");
		for (let index = 1; index <= getTotalBinds; index++) {
			const getSpecificBind = localStorage.getItem(`bind_${index}`);
			$(getSpecificBind.car_uuid).append(getSpecificBind.client_uuid);
		}
		// console.log("Binded");
}

const RemoveLocalStorage = () => {
	window.localStorage.clear();
	alert("You have cleared your local storage. If you would like your settings back, you have to re-enable them again.");
	window.location.reload();
};

const SetStandardClient = currentMaxClient => {
	localStorage.setItem("maxClient", currentMaxClient)
	localStorage.setItem("client_Bmw", 3);
	localStorage.setItem("client_Porsche", 4);
	localStorage.setItem("client_Audi", 5);
	localStorage.setItem("client_Volkswagen", 6);
	localStorage.setItem("bind", 0);
	localStorage.setItem("car_statistics", JSON.stringify({
		car_bought: {
			amount: 				system.carBought ?? 0,
			client: 				system.newestClientReceived ?? [],
		},
		car_reserved: {
			amount: 				system.carReserved ?? 0,
			client: 				system.newestClientReceived ?? [],
		},
		client_served: 		system.client ?? 0,
		car_reserved: 		system.carReserved ?? 0,
		income_generated: system.revenueIncured ?? 0
	}));
};

const checkFirstVisit = () => {
	if(localStorage.getItem('was_visited')) {
		// const addUUID = require("js/addAttribute.js")();
		addAttributeFunction();
		return;
	}
	SetStandardClient(18);
	setCarUUID();
	localStorage.setItem('was_visited', 1);
}

const setCarUUID = () => {
	const everyCar = document.getElementsByClassName("car_in_stock");
	for (let index = 0; index < everyCar.length; index++) {
		const element = everyCar[index];
		// element.dataset.name=
		fetch("https://raw.githubusercontent.com/VlxtIykg/Api-for-page/main/rws/carUUID.json")
		.then((response) => response.json())
		.then(data => {
			// data = JSON.stringify(data)
			console.log(data[index]);
			let trim = JSON.stringify(Object.values(data[index]));
			trim = trim.split('');
			for (let index = 0; index < 2; index++) {
				trim.shift();
				trim.pop();
			}
			trim = trim.join("").toString()
			element.dataset.name=trim;
			// console.log(Object.keys(data?.[index]).join("").toString(), trim);
			localStorage.setItem(Object.keys(data?.[index]).join("").toString(), trim)
		})
		.catch(err => console.error(err));
	}
	console.log(everyCar.length);
		// everyCar.dataset.name=
}

const GetLocalStorage = item => {
	if(item === "maxClient") {
		// console.log(`Max client: ${localStorage.getItem(item)}`);
		// console.log(item);
		return localStorage.getItem(item);
	}
	else {
		// console.log(`Some item : ${localStorage.getItem(item)}`);
		return localStorage.getItem(item);
	}
}

const SetCarStatistic = item => {
	const getCarStat = GetCarStorage();
	localStorage.setItem("car_statistics", JSON.stringify(
		{
			"car_bought": {"amount": System.carBought,"client": System.clients_uuid},
			"car_reserved": System.carReserved,
			"client_served": System.client,
			"income_generated": System.revenueIncured
		}
	));
	console.log(System.carBought);
	console.log(System.clients_uuid);
	console.log(System.carReserved);
	console.log(System.revenueIncured);
}

const GetCarStorage = () => {
	return localStorage.getItem("car_statistics");
}

const setCarStorage = (carSummary, carNA) => {
	// console.log(carSummary);
}

const setCarLocally = (carSummary, car, /* carNA, -- deprecated */ carSold, client_uuid) => {
	const totalClient = document.getElementById("clients_served");
	const totalSold = document.getElementById("cars_sold");
	
	// Updates the object we created from class
	let getClient = System.client;
	let carBought = System.carBought;
	let carReserved = System.carReserved;
	System.client = getClient + 1 || 0;
	// console.log(carSold);
	if(carSold) {
		System.carBought = carBought + 1 || 0;
	} else {
		System.carReserved = carReserved + 1 || 0;
	}
	
	// console.table(getClient);
	// console.table(carBought);
	// console.table(System);
	// Updates the text
	totalClient.innerHTML = System.client + " clients" || 0; 
	totalSold.innerHTML = System.carBought + System.carReserved + " cars" || 0;

	System.newestClientReceived = client_uuid;
	System.clients_uuid.push(client_uuid);
	console.log(client_uuid);
	console.log(System.clients_uuid);
}

const update = (car, carSold, client_uuid) => {
	const carSummary = JSON.parse(GetCarStorage());
	// console.table(JSON.stringify(carSummary));
	setCarStorage(carSummary);
	setCarLocally(carSummary, car, true, client_uuid);
	price(carSummary, car);
	SetCarStatistic();
}

const price = (carSummary, car) => {
	const amountEarned = document.getElementById("amount");
	const carPricesArr = System?.carSummaryObject?.[car]?.integerCost ?? 0;
	// console.table(carPricesArr);
	
	System.revenueIncured = carPricesArr + System.revenueIncured || 0;
	amountEarned.innerHTML = `S$${System.revenueIncured}`;
	return carPricesArr;
}

class system {
	constructor() {
		this.client = 0;
		this.carReserved = 0;
		this.carBought = 0;
		this.revenueIncured = 0;
		this.newestClientReceived = "";
		this.clients_uuid = [];
		// carCost has been converted from Pound sterling to sgd. (using current rates 1:1.63)
		this.carCost = [118.40, 39.08, 51.05, 71.84];
		this.carSummaryObject = {};
		this.createCarSummary = function() {
			this.carSummaryObject.bmw = {
				brand: "bmw",
				cost: `S$${this.carCost[0]}k`,
				integerCost: this.extractPrices(0),
				amountSold: 0,
			}
			this.carSummaryObject.porsche = {
				brand: "porsche",
				cost: `S$${this.carCost[1]}k`,
				integerCost: this.extractPrices(1),
				amountSold: 0,
			}
			this.carSummaryObject.audi = {
				brand: "audi",
				cost: `S$${this.carCost[2]}k`,
				integerCost: this.extractPrices(2),
				amountSold: 0,
			}
			this.carSummaryObject.volkswagen = {
				brand: "volkswagen",
				cost: `S$${this.carCost[3]}k`,
				integerCost: this.extractPrices(3),
				amountSold: 0,
			}
		}
		
		this.createCarSummary();
	}
	
	extractPrices(whichCar) {
		return this.carCost[whichCar] * 1000;
	}
	
	getCarSummary() {
		console.log(this.carSummaryObject);
	}
}

class Car extends system {
	constructor(extractPrices) {
		super(extractPrices);
		this.individualCars = {
			Bmw 				: parseInt(GetLocalStorage("client_Bmw")),
			Porsche 		: parseInt(GetLocalStorage("client_Porsche")),
			Audi 				: parseInt(GetLocalStorage("client_Audi")),
			Volkswagen 	: parseInt(GetLocalStorage("client_Volkswagen")),
		}
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
		car["individualCars"][choice] -= 1;
		// console.log(`updateCarObj choice: ${choice}`);
		// console.table(car);
	}
}

let car;
let System;
const RandomCarChoice = () => {
	const getCarAmount = car.individualCars;
	for (const carAmt in getCarAmount) {
		if(getCarAmount[carAmt] === 0 || getCarAmount[carAmt] === "0" || getCarAmount[carAmt] < 0) {
			// console.log(`Car type: ${carAmt}`); Enable later
			// console.log(`Car amount: ${getCarAmount[carAmt]}`);
			delete car[carAmt];
		}
	}
	// console.table(System.carSummaryObject);

	let keys = Object.keys(getCarAmount);
	const randomCar = keys[ keys.length * Math.random() << 0]
	// console.table(randomCar);
	return randomCar;
}

const AddClients = () => {
	const client_image = Math.floor(Math.random()*9)+1;
	const carChoice = RandomCarChoice();
	// console.log(carChoice);

	if(carChoice === null || carChoice === undefined) {
		console.log("AINSDAiBNSDAUBAUSIDBUIbdiuSA");
		return;
	}
	car.updateLocalStorage(`client_${carChoice}`);
	car.updateCarObj(carChoice)
	const getUuid = uuidv4();
	// console.log(getUuid);
	$("#clients_queue").append(`
	<div class="clientcard choice_${carChoice}" id="${getUuid}">
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
		document.querySelector("[queue]").prepend(customerAmtDiv);
	 }; // Add #aoc message

	if(clientAppearing > 4) {
		const elem = document.querySelector("[queue]");
		elem.classList.add("amountOver5");
	} // Add class if client over 4

	/* Uncomment if need */
	// console.log(`Client total appeared: ${clientAppearing}\nCurrent counter: ${counter}\nTotal customer so far: ${totalProducedClient}`);

	if(counter >= clientAppearing) {
		return;
		} else if (counter !== clientAppearing) {
		AddClients();
		setTimeout(function(){NewClient();},100);
		// console.log(`New Client function ran once`);
		}
	else {}
	counter++;
	totalProducedClient++;

};

const AddClass = () => {
	const client_queue = document.querySelector("[queue]");
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
	if($(getThis).hasClass(`car_selected`)) {
		alert("This spot is taken");
		return;
	}
	$(getThis).not(`:has(".clientcard")`).each(function(n, i) {
		$(getThis).prepend(getCurrentElement);
		
		if(!getCurrentElement.hasClass("chosenCar")) {
			let currentBind = localStorage.getItem("bind");
			currentBind++;
			localStorage.setItem("bind", currentBind);
			/* console.log($(getThis).children().first().attr("id")); //client uuid
			console.log($(getThis).closest('li').attr("data-name")); //car uuid */
			localStorage.setItem(`bind_${currentBind}`, JSON.stringify({
				car_uuid: $(getThis).closest('li').attr("data-name"),
				client_uuid: $(getThis).children().first().attr("id")
			}));
			$(getThis).children().first().addClass(`bind_${currentBind}`);
			counter--;
			// probably remove client here
			NewClient();
			AddClass();
			// console.log(`New Client function ran once`);
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
	car = new Car();
	System = new system()
	checkFirstVisit();
	NewClient(); 
	// console.log(`New Client function ran once`);
	AddClass();
	// update();
	// RemoveLocalStorage();
	bindTarget();
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
			// console.log("DOES THIS WORK?");
			DropFunctionGlobal(this, ui.draggable);
			RemoveClient(this,ui.draggable, 200000)
		}
	})

	// Cashier
	$("#cashier").droppable({
		accept: ".chosenCar",

		drop: function(e, ui) {
			// console.log("RAWRRR");
			const carParent = ui.draggable.parent();
			DropFunctionGlobal(this, ui.draggable);
			const reserveCar = document.querySelector("[reserve-car]");
			const buyCar = document.querySelector("[buy-car]");
			const chooseNewCar = document.querySelector("[leave-car]");
			document.getElementsByClassName("payment")?.[0].classList.add("payment__screen")
			document.getElementById("salon").className = "unfocused";
			const someClass = document.getElementsByClassName("payment")?.[0];
			// console.log(someClass);
			if(!someClass.classList.contains("payment__screen")) {
				return false;
			}
		
			const removeDialog = (e, ui) => {
				// alert("I've been clicked!");
				document.getElementsByClassName("payment")?.[0].classList.remove("payment__screen");
				document.getElementById("salon").className = "";
				$("#confirmation").dialog("close");
				// bind_0:"{"client_uuid":"9fbcd3d3-660e-4158-a168-1485820ea1c8"}"
				// const getBindedClient = GetLocalStorage("bind_");
				// const bind_int = $("#cashier > clientcard");
				// bindTarget() //wip
				return;
			}
		
			reserveCar.addEventListener("click", e => {
				alert("Work in progress");
			})
			chooseNewCar.addEventListener("click", e => {
				// alert("Work in progress"); wip to put client back to car
				$(ui.draggable).prependTo("#exit")
				setTimeout(RemoveClient(this, ui.draggable, 20000), 3000);
				setTimeout(removeDialog(), 3300);
				return;
			});
			const checkClass = () => {
				if(ui.draggable.hasClass("choice_Porsche")) { return "porsche" }
				else if(ui.draggable.hasClass("choice_Volkswagen")) { return "volkswagen" }
				else if(ui.draggable.hasClass("choice_Audi")) { return "audi" }
				else if(ui.draggable.hasClass("choice_Bmw")) { return "bmw"}
				else  { return console.error("Error, car not found or class not found.") }
			}
			
			$(buyCar).unbind("click").click(e => {
				e.stopPropagation();
				e.preventDefault();
				// console.log(e);
				carParent.addClass("car_selected");
				const getCarClass = checkClass();
				update(getCarClass, "yes", ui.draggable.attr("id"));
				RemoveClient(this, ui.draggable, 20000);
				removeDialog();
				return;	
			})
			
			$("#confirmation").dialog({
				appendTo: "#confirmation",
				modal: true, //not working?
				closeOnEcapse: true,
			})
			$("#confirmation").dialog({
				beforeClose: function(e, ui) {
					document.getElementsByClassName("payment")?.[0].classList.remove("payment__screen");
					document.getElementById("salon").className = "";
				}
			})
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
