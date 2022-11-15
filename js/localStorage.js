const colorTheme = document.querySelectorAll(`[name="theme"]`);

const StoreTheme = (theme) => {
	localStorage.setItem("theme", theme);
	console.log(`StoreTheme function: ${theme}`);
	GetTheme();
}


// fallback for no has selector support
const SetTheme = (theme) => {
	document.documentElement.className = theme;
	console.log(`SetTheme function: ${theme}`);
}

const GetTheme = () => {
	const currentTheme = localStorage.getItem("theme")
	colorTheme.forEach(perChoice => {
		if(perChoice.id === currentTheme) {
			perChoice.checked = true;
		}
	});
	SetTheme(currentTheme)
}


document.onload = GetTheme();
colorTheme.forEach((perChoice) => {
	perChoice.addEventListener("click", () => {
		StoreTheme(perChoice.id);
	})
});