
function unblockItem(idElemento){
	if (document.getElementById(idElemento) != null) {
		document.getElementById(idElemento).removeAttribute("disabled");
	}
}

function blockItem(idElemento){
	if (document.getElementById(idElemento) != null) {
		document.getElementById(idElemento).setAttribute("disabled", "disabled");
	}
}

function showItem(idElemento){
	if (document.getElementById(idElemento) != null) {
		document.getElementById(idElemento).removeAttribute("hidden");
	}
}

function hideItem(idElemento){
	if (document.getElementById(idElemento) != null) {
		document.getElementById(idElemento).setAttribute("hidden", "hidden");
	}
}

function showHideItem(idElemento, ValueBoolean){
	if (ValueBoolean) {
		document.getElementById(idElemento).setAttribute("hidden", "hidden");
	}else{
		document.getElementById(idElemento).removeAttribute("hidden");
	}
}

function ativaItemViaCheckBox(nomeCheckbox, idElemento){
	
	var checkbox = document.getElementById(nomeCheckbox);
	if ( checkbox.checked ) {
		document.getElementById(idElemento).removeAttribute("disabled");
	}else{
		document.getElementById(idElemento).setAttribute("disabled", "disabled");
	}

}

function showHideItemViaCheckBox(nomeCheckbox, idElemento){
	
	var checkbox = document.getElementById(nomeCheckbox);
	if ( checkbox.checked ) {
		document.getElementById(idElemento).removeAttribute("hidden");
	}else{
		document.getElementById(idElemento).setAttribute("hidden", "hidden");
	}

}

function addClass(idElement, className){
	
	const elemento = document.getElementById(idElement);
	if (elemento.classList){
	  elemento.classList.add(className);
	}else{
	  elemento.className += (' ' + className);
	}

}

function removeClass(idElement, className){

	const elemento = document.getElementById(idElement);
	elemento.classList.remove(className);

}

function validaData(dataString){
	var date = dataString;
	var ardt = new Array;
	var ExpReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
	ardt = date.split("/");
	erro = false;
	if (date.search(ExpReg)==-1){
		erro = true;
	}else if (((ardt[1]==4)||(ardt[1]==6)||(ardt[1]==9)||(ardt[1]==11))&&(ardt[0]>30)){
		erro = true;
	}else if ( ardt[1]==2) {
		if ((ardt[0]>28)&&((ardt[2]%4)!=0)){
			erro = true;
		}
		if ((ardt[0]>29)&&((ardt[2]%4)==0)){
			erro = true;
		}
	}
	return !erro;
}

function validaHora(horaString){
	var hora = horaString;
	var ahora = new Array;
	ahora = hora.split(":");
	erro = false;
	if ((ahora[0]<0)||(ahora[0]>24)||(ahora[1]<0)||(ahora[1]>59)||(typeof ahora[0] === 'undefined')||(typeof ahora[1] === 'undefined')){
		erro = true;
	}
	return !erro;
}

function retornaData(dataString){
	var dts = dataString.split("/");
	var dt = new Date(dts[2],(dts[1]-1),dts[0]);
	return dt;
}

function retornaHora(horaString){
	var hrs = horaString.split(":");
	var hr = new Date();
	hr.setHours(hrs[0],hrs[1],0);
	return hr;
}

function abreJanelaModal(idModal){
	$('#'+idModal).modal('show');
}

function fechaJanelaModal(idModal){
	$('#'+idModal).modal('hide');
}