
// Abre um link na mesma janela
function abreLink(link){
	window.location.href = link;
}

// Abre um link em uma nova aba
function abreLinkNovaAba(link){
	window.open(link);
}

// Envia formulário
function submitForm(formId){
	document.querySelector('#'+formId).submit();
}