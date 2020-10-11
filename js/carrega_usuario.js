
function execRequestAjax(url, params, idElement){
	$(document).ready( function(){

		$.ajax({

			url: url + '?' + params,

			success: function(data){
				carregaComboBox(idElement, data);
			},

			beforeSend: function(){

			},

			complete: function(){

			}

		});

	});
};

// Carrega um combobox (Elemento <SELECT>) informando um "array_texto" 
// de valores (arrayValue) e um array com seus respectivos textos (arrayText)
// esses "arrays_texto" vem de um array gerado pelo PHP e seus valores
// separados pelo "|" e categorias separados pelo "~";
function carregaComboBox(idCombobox, arrayStringValorTexto){

	var i, array_value, array_text, comboBox;
	var opt = [];
	
	array_duplo = arrayStringValorTexto.split("~");

	array_value = array_duplo[0].split("|");
	array_text = array_duplo[1].split("|");

	comboBox = document.getElementById(idCombobox);
	comboBox.options.length = 0;
	
	opt[0] = document.createElement("option");
	opt[0].selected;
	opt[0].text = 'Selecione...';
	comboBox.add(opt[0],comboBox.options[0]);

	for (i in array_value){
		opt[i+1] = document.createElement("option");
		opt[i+1].value = array_value[i];
		opt[i+1].text = array_text[i];
		comboBox.add(opt[i+1],comboBox.options[i+1]);
	}

}
