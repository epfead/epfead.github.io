
function launchToMain(){
	let url = window.location.href;
	urlBase = url.replace("index.php", "");
	window.location.href = urlBase+'principal.php?idregiao-abrangencia='+document.querySelector('#idregiao-abrangencia').value;
}

