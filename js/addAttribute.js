window.addAttributeFunction = async () => {
	// DOnt know If I can use factory function when exporting
	$("#porsche > ul").children().map(function(n, i) {
		n++;
		const getID = localStorage.getItem(`car_porsche${n}`);
		i.dataset.name=getID
	})
	$("#volkswagen > ul").children().map(function(n, i) {
		n++;
		const getID = localStorage.getItem(`car_volkswagen${n}`);
		i.dataset.name=getID
	})
	$("#audi > ul").children().map(function(n, i) {
		n++;
		const getID = localStorage.getItem(`car_audi${n}`);
		i.dataset.name=getID
	})
	$("#bmw > ul").children().map(function(n, i) {
		n++;
		const getID = localStorage.getItem(`car_bmw${n}`);
		i.dataset.name=getID
	})
}