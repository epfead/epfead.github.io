
window.onload = initPage;


function initPage(){

	initializeMask();
	document.querySelector("#botao-localizar").addEventListener("click", ()=>{
		getValidaParams();
	})

}


function getValidaParams(){
	
	var params = '';

	if (document.getElementById('idevento').value == 0) {
	
		alert('Selecione um evento antes de confirmar.')
	
	}else if (document.getElementById('matricula').value == "") {
	
		alert('Informe sua matrícula antes de continuar.')
	
	}else{
	
		params = 'idevento=' + document.getElementById('idevento').value + '&matricula=' + document.getElementById('matricula').value;
		execRequestAjaxAcoes('../public/resource/res_seleciona_avaliacao.php', params, 'dados');

	}


}


function execRequestAjaxAcoes(url, params, idElement){
	$(document).ready( function(){

		$.ajax({

			url: url + '?' + params,

			success: function(data){
				carregaContainerAcoes(idElement, data);
			},

			beforeSend: function(){
				showItem('loading-local');
			},

			complete: function(){
				hideItem('loading-local');
			}

		});

	});
};


function carregaContainerAcoes(idContainer, htmlAcoes){

	container = document.getElementById(idContainer);
	container.innerHTML = htmlAcoes;

}
