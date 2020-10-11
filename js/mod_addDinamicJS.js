function addScript(src){
	var scrpt = document.createElement('script');
	scrpt.src = src;
	scrpt.type = "text/javascript"; 
	document.head.appendChild(scrpt);
}