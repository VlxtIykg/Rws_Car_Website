const brandList = ["Porsche", "Volkswagen", "Audi", "BMW"]

let counter = 0;
function newClient(){
	if(counter >= 2) return;
 	let client = Math.floor((Math.random()*10)+1);
	$("#clients_queue").append(`
	<div class="client client_${client} choice_${brandList[0]}">
	<span class="preference">Client for ${brandList[0]}</span></div>
	`)
	if(counter === 0) {
		document.getElementsByClassName("client")[0].classList.add("first_customer")
		console.log("rawr");
	}
	counter++;
	$(function() {
		$(".client").draggable();
		
    // Return the draggable (or it's helper) to its original location when dragging stops with the boolean revert option.
    $(".client").draggable({ revert: true });
		
    $(".client").draggable( "option", "zIndex", 10 );
		
  });

	setTimeout(function(){newClient();},100);
}
$("document").ready(function(e) {
	newClient();
	
	$('#porsche > ul > li > img.car').droppable({
		accept: '.choice_Porsche',
		drop: function(e, ui) {
			console.log(this.parentElement); //parent element is LI, this tag is the img
			$(this.parentElement).append(ui.draggable);
			const firstCustomer = document.getElementsByClassName("first_customer")[0];
			// console.log();			
			$(this.parentElement).append(firstCustomer.children[0]);
			
			ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});
			// counter--;
			// newClient();
		}
	});

	
});

const testFunc = () => {
	const elem = document.getElementsByClassName("choice_Porsche")
	if ($(elem[0]).data('draggable')) {
		alert("yes");
	}
	else {
		alert("no");
	}
}