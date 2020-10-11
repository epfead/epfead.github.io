
//initializeMask();

// Funções para iniciar rastreio de máscaras
//=====================================================================

function initializeMask(){

	// Seleciona os elementos que tiverem a classe ".mask"
	let elements = document.querySelectorAll(".mask");

	if (elements != null) {

		elements.forEach(element=>{

			// Rastreia os elementos com eventos de "keyup" e "keydown"
			addEventListenerAll(element, 'keyup keydown', ()=>{

				let elClasses = element.className.split(" ");

				if (elClasses.length > 0) {

					elClasses.forEach(fn=>{

						if ((fn.includes('mask'))&&(fn != 'mask')) {
							element.value = eval('this.'+fn+'("'+element.value+'")');
						}

					})

				}

			})

		})

	}

}

function addEventListenerAll(element, events, fn){

	events.split(' ').forEach(event=>{

		element.addEventListener(event, fn);

	});

}




// Funções para utilização das máscaras no HTML direto (caso haja erro com Ajax)
// Utilizar juntamente com os eventos onkeyup e onkeydown
//=====================================================================

function execMascara(val, mascara) {
	valor = val;
	mask_fun = mascara;
	execute();
}

function execute() {
	valor.value = mask_fun(valor.value);
}




// Funções das máscaras
//=====================================================================

function maskTel(v) {
	if (v.length > 14) { v = v.slice(0,14); }   // Caso o engraçadinho tenha "travado" o dedo em um número
	v = v.replace(/\D/g, "");             	    // Remove tudo o que não é dígito
	v = v.replace(/^(\d{2})(\d)/g, "($1)$2");   // Coloca parênteses em volta dos dois primeiros dígitos
	v = v.replace(/(\d)(\d{4})$/, "$1-$2");     // Coloca hífen entre o quarto e o quinto dígitos
	return v;
}

function maskCPF(v) {
	if (v.length > 14) { v = v.slice(0, 14); }
	v = v.replace(/\D/g, "");
	if (v.length > 9) {
		v = v.replace(/^(\d{3})(\d{3})(\d{3})(\d)/g, "$1.$2.$3-$4");
	}else if (v.length > 6) {
		v = v.replace(/^(\d{3})(\d{3})(\d)/g, "$1.$2.$3");
	}else if (v.length > 3 ) {
		v = v.replace(/^(\d{3})(\d)/g, "$1.$2");
	}
	return v;
}

function maskMatricula(v) {
	if (v.length > 9) { v = v.slice(0, 9); }
	v = v.replace(/\D/g, "");
	if (v.length > 6) {
		v = v.replace(/^(\d{3})(\d{3})(\d)/g, "$1.$2-$3");
	} else if (v.length > 3) {
		v = v.replace(/^(\d{3})(\d)/g, "$1.$2");
	}
	return v;
}

function maskData(v) {
	if (v.length > 10) { v = v.slice(0, 10); }
	v = v.replace(/\D/g, "");
	if (v.length > 4) {
		v = v.replace(/^(\d{2})(\d{2})(\d)/g, "$1/$2/$3");
	} else if (v.length > 2) {
		v = v.replace(/^(\d{2})(\d)/g, "$1/$2");
	}
	return v;
}

function maskHora(v) {
	if (v.length > 5) { v = v.slice(0, 5); }
	v = v.replace(/\:/g, "");
	if (v.length > 4) {
		v = v.replace(/^(\d{2})(\d{2})(\d)/g, "$1:$2:$3");
	} else if (v.length > 2) {
		v = v.replace(/^(\d{2})(\d)/g, "$1:$2");
	}
	return v;
}

function maskMaiuscula(v) {
	return v.toUpperCase();
}

function maskMinuscula(v) {
	return v.toLowerCase();
}

