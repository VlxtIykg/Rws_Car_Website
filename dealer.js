const brandList = ["Porsche", "Volkswagen", "Audi", "BMW"]

let counter = 0;
let client = Math.floor((Math.random()*10)+1);
if(client > 8) client = 8;
function NewClient(){
	const client_image = Math.floor(Math.random()*9)+1;
	const carChoice = brandList[Math.floor(Math.random() * brandList.length)];

	let elem = document.getElementById("aoc");
	if(typeof elem !== 'undefined' && elem !== null) {
		elem.parentNode.removeChild(elem);
		console.log("Customer amount message deleted.");
	}
 
	if(counter >= 10 || counter >= client) {
		const amountOfClient = document.querySelectorAll("#clients_queue .disappear").length
		const currentCount = counter-amountOfClient
		const customerAmtDiv = document.createElement("div");
		customerAmtDiv.id = "aoc";
		const customerAmtText = document.createTextNode(`${currentCount} customers waiting..`);
		customerAmtDiv.appendChild(customerAmtText);
		document.getElementById("clients_queue").prepend(customerAmtDiv);
		console.log("Customer amount message added.");
		return false;
	};

	if(client > 5) {
		const elem = document.getElementById("clients_queue");
		elem.classList.add("amountOver5");
	}

	if(client === counter) return;


	$("#clients_queue").append(`
	<div class="clientcard choice_${carChoice}">
	<div class="clientcard__image client_${client_image} ">
	</div>
	<span class="preference">Client for ${carChoice}</span>
	</div>
	`)
	
	counter++;

	setTimeout(function(){NewClient();},100);
}

const addClass = () => {
	const client_queue = document.getElementById("clients_queue");
	const child = client_queue.querySelector('.clientcard')
	console.log(child);
	child.classList.add("first_customer");
	// client_queue?.children?.[2].classList.add("first_customer");
	console.log("Running");
	$(function() {
		$(".first_customer").draggable();
		
		// Return the draggable (or it's helper) to its original location when dragging stops with the boolean revert option.
		$(".first_customer").draggable({ revert: true });
		
		$(".first_customer").draggable( "option", "zIndex", 10 );
		
	});
};

const dropFunctionGlobal = (getThis, getCurrentElement) => {
	console.log(getCurrentElement);
	$(getThis).not(`:has(".clientcard")`).each(function() {
		$(getThis).prepend(getCurrentElement);
	})
	counter--;
	NewClient();
	addClass();
}

$("document").ready(function(e) {
	NewClient();
	addClass();
	
	// Porsche
	$('#porsche > ul > li ').droppable({
		accept: '.choice_Porsche',
		drop: function(e, ui) {
			console.log(`This tag ${this}`);
			dropFunctionGlobal(this, ui.draggable);
		}
	});

	// Volkswagen
	$('#volkswagen > ul > li ').droppable({
		accept: '.choice_Volkswagen',
		drop: function(e, ui) {
			console.log(ui.draggable);
			dropFunctionGlobal(this, ui.draggable);
		}
	});

	// audi
	$('#audi > ul > li ').droppable({
		accept: '.choice_Audi',
		drop: function(e, ui) {
			console.log(ui.draggable);
			dropFunctionGlobal(this, ui.draggable);
		}
	});

	// Volkswagen
	$('#bmw > ul > li ').droppable({
		accept: '.choice_BMW',
		drop: function(e, ui) {
			console.log(ui.draggable);
			dropFunctionGlobal(this, ui.draggable);
		}
	});
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