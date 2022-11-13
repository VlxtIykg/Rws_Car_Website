const brandList = ["Porsche", "Volkswagen", "Audi", "BMW"]

let counter = 0;
// const client = Math.floor((Math.random()*10)+1);
const client = 10;
console.log(client);	
function NewClient(){

	let elem = document.getElementById("aoc");
	if(typeof elem !== 'undefined' && elem !== null) {
		elem.parentNode.removeChild(elem);
		console.log("Customer amount message deleted.");
	}
 
	if(counter >= 10 || counter >= client) {
		console.log(`Counter: ${counter}`);
		const amountOfClient = document.querySelectorAll("#clients_queue .disappear").length
		const currentCount = counter-amountOfClient
		const customerAmtDiv = document.createElement("div");
		customerAmtDiv.id = "aoc";
		const customerAmtText = document.createTextNode(`${currentCount} customers waiting..`);
		// if(client === 6) {
		// 	customerAmtDiv.class = "6clients";
		// }
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
	<div class="clientcard choice_${brandList[0]}">
	<div class="clientcard__image client_${client} ">
	</div>
	<span class="preference">Client for ${brandList[0]}</span>
	</div>
	`)
	if(counter === 0) {
		document.getElementsByClassName("clientcard")[0].classList.add("first_customer")
	}
	
	counter++;
	$(function() {
		$(".clientcard").draggable();
		
    // Return the draggable (or it's helper) to its original location when dragging stops with the boolean revert option.
    $(".clientcard").draggable({ revert: false });
		
    $(".clientcard").draggable( "option", "zIndex", 10 );
		
  });

	setTimeout(function(){NewClient();},100);
}
$("document").ready(function(e) {
	NewClient();
	
	$('#porsche > ul > li ').droppable({
		accept: '.choice_Porsche',
		drop: function(e, ui) {
			console.log(this.parentElement); //parent element is LI, this tag is the img
			$(this.parentElement).append(ui.draggable);
			const firstCustomer = document.getElementsByClassName("first_customer")[0];
			$(this.parentElement).append(firstCustomer.children[0]);
			ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});
			counter--;
			NewClient();
		}
	});

	
});
