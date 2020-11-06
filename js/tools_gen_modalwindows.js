/*======================================================================================================
Gerador de "Janelas Modais Bootstrap"

Requer: JQuery e Bootstrap


O que faz?
	Cria a estrutura e insere uma janela Modal Bootstrap em um elemento "<div>"

Como usar?
	Informar os seguintes parâmetros na função "msgModalCreate"
	- jsonData : uma string no padrão JSON (será convertido em Objeto JSON JavaScript)
				 Deverá seguir o padrão abaixo e conter os parâmetros informados:

	{
		"idEvento":"1",
		"idJanelaModal":"msgModal01",
		"blockModal":true,
		"idElement":"div-de-janelas-modais",
		"insertionMode":"ADD",
		"gatilho":{
			"id":"bt-gatilho",
			"event":"onclick"
		},
		"titulo":"Importante!, Atenção!, Olá!, etc...",
		"mensagem":"Mensagem principal explicando as informações...",
		"botoes":[
			{
				"label":"Confirmar",
				"type":"success", 
				"fn":"salvarResposta()"
			},
			{
				"label":"Cancelar",
				"type":"danger",
				"fn":""
			}
		],
		"perguntas":[
			{
				"idpergunta":0,
				"pergunta":"Você está no período de ESTÁGIO PROBATÓRIO?",
				"controle":"radio",
				"respostas":["Sim","Não"]
			},
			{
				"idpergunta":1,
				"pergunta":"Após concluir seu curso, como deseja receber seu certificado?",
				"controle":"checkbox",
				"respostas":["Através do meu e-mail","Quero uma opção para imprimir","Costumo solicitar meu extrato de certificados"]
			},
			{
				"idpergunta":2,
				"pergunta":"Para você, qual o melhor período para fazer o curso?",
				"controle":"combobox",
				"respostas":["Manhã","Tarde","Noite","Madrugada"]
			},
			{
				"idpergunta":3,
				"pergunta":"Informe seu telefone:",
				"controle":"text",
				"respostas":[20]
			},
			{
				"idpergunta":4,
				"pergunta":"Descreva sua experiência ou dê sugestões:",
				"controle":"longtext",
				"respostas":[250]
			},
			{
				"idpergunta":5,
				"pergunta":"Pretende fazer outro curso?",
				"controle":"BUTTON",
				"respostas":["Sim","Não","Talvez"]
			}
		]
	}

	Observações sobre alguns parâmetros:

	- idEvento .....: EVENTO_ID (id do evento) ao qual pertence a janela modal; 

	- idJanelaModal : o nome (id) que receberá a janela modal para ser chamada 
					  através da função que irá acioná-la;

	- blockModal ...: informa se a janela modal deve ter a tecla ESC e o click externo bloqueados.

	- idElement ....: o id do elemento HTML que receberá a janela modal 
				  	  (de preferência uma <div>);

	- insertionMode : o modo que a função deverá se comportar no momento da inserção.
					  os parâmetros são: 
					  - 'ADD' (se o elemento já contém janelas modais,
					  irá adicionar a nova janela preservando as já existentes);
					  - 'CLEAN' (eleimina todo bloco de código HTML do elemento
					  e insere a nova janela modal);
					  Por padrão, o comportamento é 'ADD'.
					  Se nada for informado ou a informação difere dos parâmetros
					  citados, o comportamento da função será o padrão 'ADD'.

	- gatilho ......: objeto JSON que define o elemento HTML que acionará a janela modal. 
					  Esse objeto deverá conter respectivamente:
					  
					  1) "id": id do elemento HTML que receberá o evento e a função de chamada da janela modal;
					  2) "event": nome do evento que acionará a função de chamada da janela modal (se não for especificado, o padrão será "onclick");

	- titulo .......: título da janela modal;

	- mensagem .....: mensagem principal (opcional) a ser exibida antes das perguntas (se houver).
					  Pode ser uma pergunta que poderá respondida através do acionamento do(s)
					  botão(ões);

	- botoes .......: array de objetos JSON que determinam as configurações dos botões da janela.
			  		  Nessas configurações deverão conter respectivamente:
						
					  1) "label": rótulo do botão;
			  		  2) "type": o tipo de botão (padrão do Bootstrap: primary, secondary, success, danger, warning, info, light, dark, link)
					  3) "fn": a função JavaScript que deverá ser chamada pelo evento onclick do botão.
			  		  Não há quantidade mínima de botões a serem exibidos porém, verifique se a janela não
						ficará visualmente poluída com uma grande quantidade de botões.
					  4) "preserveOldFunction": se definido como "true", mantém as funções já existentes colocando
					  as funções definidas em "fn" primeiro e depois as funções já existentes no elemento que
					  acionou a janela modal.

	- perguntas ....: array de objetos JSON contendo as informações e configurações de cada questão.
				 	  Nessas configurações deverão conter respectivamente:
					   
						1) "idpergunta"	: identificador numérico da pergunta;
						2) "pergunta"  	: texto da pergunta;
						3) "obrigatorio": se marcado como "true" torna a resposta obrigatória
						4) "controle"	: tipo de controle ("radio", "checkbox", "combobox", "text", "longtext");
						5) "execute"	: executa uma função agregada ao principal evento do controle. 
						6) "respostas"	: array de respostas. Serão apresentadas na tela na ordem do array.
									   	  Válido somente para os tipos "radio", "checkbox" e "combobox",
									   	  para os tipos "text" e "longtext", informar o tamanho máximo de
									   	  caracteres para resposta. Ex: "respostas":150 (define que o texto
									   	  deverá conter, no máximo, 150 caracteres).
======================================================================================================*/
// Objeto global que recebe o parse da string JSON do BD
var objJSONRetorno = new Object();

// Objeto global contendo o registro das respostas para ficar disponível para outras implementações
var objListaDeRespostas = new Object();

function runModalCreate(idEvento){
	execRequestAjx('../public/resource/res_ajx_modalwindows.php', 'idevento='+idEvento+'&action=getPerguntas', '', 'returnJSON', msgModalCreate, '', '');
}

function msgModalCreate(jsonData){
	
	// Verifica se o objeto JSON tem algum erro antes de liberar a função.
	let arrayRetorno = jsonData.split("|");
	let libera = false;
	try {
		//objJSONRetorno = JSON.parse(JSON.parse(jsonData));
		objJSONRetorno = JSON.parse(arrayRetorno[0]);
		objJSONRetorno.mensagem = arrayRetorno[1];
		var obj = objJSONRetorno.perguntas;
		if (obj.hasOwnProperty("idEvento")) {
			libera = true;
		}else{
			console.log("INFO: NAO EXISTEM AVISOS PERSONALIZADOS CADASTRADOS PARA O EVENTO.");
			libera = false;
		}
	} catch (error) {
		console.log("ERRO: ERRO NA CONVERSÃO DO OBJETO JSON (MODAL) OU JSON VAZIO. OPERACAO CANCELADA.");
		libera = false;
	}

	if (libera) {
		
		let bts = "";
		// Se o gatilho informado não tiver a propriedade "event", assumirá por padrão o evento "onclick"
		if ((!obj.gatilho.hasOwnProperty('event'))||((obj.gatilho.event == "")&&(obj.gatilho.event == null))){
			obj.gatilho.event = "onclick";
		};
		
		// Verifica se o elemento que receberá o gatilho já possui uma função atribuída e a armazena.
		let oldFunctionGatilho = "";
		if (document.getElementById(obj.gatilho.id).getAttribute(obj.gatilho.event)) {
			oldFunctionGatilho = document.getElementById(obj.gatilho.id).getAttribute(obj.gatilho.event);
		};
		
		// Cria os botões. 
		// Para cada botão criado, verifica se deve preservar a antiga função atribuída anteriormente
		// A função antiga será inserida após a função do evento do botão.
		obj.botoes.forEach((bt)=>{
			if (bt.preserveOldFunction == true) {
				bts += `<button type="button" class="btn btn-`+bt.type+`" onclick="`+bt.fn+`;`+oldFunctionGatilho+`">`+bt.label+`</button>`;
			}else{
				bts += `<button type="button" class="btn btn-`+bt.type+`" onclick="`+bt.fn+`">`+bt.label+`</button>`;
			}
		});


		let perguntas = ``;
		let respostas = ``;
		let id = "";
		let nome = "";
		obj.perguntas.forEach((pergunta)=>{
			
			respostas = ``;
			switch (pergunta.controle) {
				
				case 'radio':
					if (respostaObrigatoria(pergunta)) {
						respostas = `<div class="form-group pergunta pergunta-radio obrigatorio" id="idpergunta`+pergunta.idpergunta+`">`;
					}else{
						respostas = `<div class="form-group pergunta pergunta-radio" id="idpergunta`+pergunta.idpergunta+`">`;
					}
					pergunta.respostas.forEach((resposta,i)=>{
						id = "idpergunta"+pergunta.idpergunta+"iresposta"+i;
						nome = "idpergunta"+pergunta.idpergunta;
						respostas += `
							<div class="form-check idpergunta`+pergunta.idpergunta+`">
							<input class="form-check-input" type="radio" name="`+nome+`" id="`+id+`" value="`+resposta+`" onchange="`+pergunta.execute[i]+`">
							<label style="margin-top: -15px;" class="form-check-label" for="`+id+`">
								`+resposta+`
							</label>
							</div>
						`;
					});
					respostas += `</div>`;
					break;
				
				case 'checkbox':
					if (respostaObrigatoria(pergunta)) {
						respostas = `<div class="form-group pergunta pergunta-checkbox obrigatorio" id="idpergunta`+pergunta.idpergunta+`">`;
					}else{
						respostas = `<div class="form-group pergunta pergunta-checkbox" id="idpergunta`+pergunta.idpergunta+`">`;
					}
					pergunta.respostas.forEach((resposta,i)=>{
						id = "idpergunta"+pergunta.idpergunta+"iresposta"+i;
						nome = "idpergunta"+pergunta.idpergunta+"iresposta"+i;
						respostas += `
							<div class="form-check idpergunta`+pergunta.idpergunta+`">
							<input class="form-check-input" type="checkbox" name="`+nome+`" id="`+id+`" value="`+resposta+`">
							<label class="form-check-label" for="`+id+`">
								`+resposta+`
							</label>
							</div>
						`;
					});
					respostas += `</div>`;
					break;

				case 'combobox':
					if (respostaObrigatoria(pergunta)) {
						respostas = `
						<div class="form-group pergunta pergunta-combobox obrigatorio" id="idpergunta`+pergunta.idpergunta+`">
							<select id="idpergunta`+pergunta.idpergunta+`" name="idpergunta`+pergunta.idpergunta+`" class="form-control">`;
					}else{
						respostas = `
						<div class="form-group pergunta pergunta-combobox" id="idpergunta`+pergunta.idpergunta+`">
							<select id="idpergunta`+pergunta.idpergunta+`" name="idpergunta`+pergunta.idpergunta+`" class="form-control">`;
					}
					respostas += `<option value="" selected>Escolha uma opção...</option>`;
					pergunta.respostas.forEach((resposta)=>{
						respostas += `<option value="`+resposta+`">`+resposta+`</option>`;
					});
					respostas += `</select></div>`;
					break;
				
				case 'text':
					if (respostaObrigatoria(pergunta)) {
						respostas = `<div class="form-group pergunta pergunta-text obrigatorio" id="idpergunta`+pergunta.idpergunta+`">`;
					}else{
						respostas = `<div class="form-group pergunta pergunta-text" id="idpergunta`+pergunta.idpergunta+`">`;
					}
					respostas += `
							<input type="text" class="form-control" id="idpergunta`+pergunta.idpergunta+`" name="idpergunta`+pergunta.idpergunta+`" maxlength="`+pergunta.respostas[0]+`" placeholder="Digite sua resposta até `+pergunta.respostas[0]+` caracteres...">
						</div>`;
					break;

				case 'longtext':
					if (respostaObrigatoria(pergunta)) {
						respostas = `<div class="form-group pergunta pergunta-longtext obrigatorio" id="idpergunta`+pergunta.idpergunta+`">`;
					}else{
						respostas = `<div class="form-group pergunta pergunta-longtext" id="idpergunta`+pergunta.idpergunta+`">`;
					}
					respostas += `
							<textarea class="form-control" id="idpergunta`+pergunta.idpergunta+`" name="idpergunta`+pergunta.idpergunta+`" rows="5" maxlength="`+pergunta.respostas[0]+`" placeholder="Digite sua resposta até `+pergunta.respostas[0]+` caracteres..."></textarea>
						</div>`;
					break;

				default:
					console.log('[ERRO: ALGUMA(S) PERGUNTA(S) NAO TEM TIPO DE CONTROLE DEFINIDO]');
			}

			perguntas += `<div class="linha-divisa" style="height: 1px; margin: 15px 0px 15px 0px;	border-top: 1px dashed #CCC;"></div><p><b>`+(pergunta.idpergunta+1)+". "+`</b>`+pergunta.pergunta+`</p>`;
			perguntas += respostas;
		});


		// Verifica se a janela modal é para ter a tecla ESC e o click externo bloqueados
		let blockModal = ``;
		let buttonX = ``;
		if (obj.blockModal) {
			blockModal = `data-backdrop="static" data-keyboard="false"`;
			buttonX = ``;
		}else{
			blockModal = ``;
			buttonX = `
				<button type="button" class="close" data-dismiss="modal" aria-label="Fechar" style="color: red; font-size: 1.2em;" hidden>
					<span aria-hidden="true">x</span>
				</button>
			`;
		}


		// Cria a janela modal em "modal"
		let modal = `
			<div class="modal fade" id="`+obj.idJanelaModal+`" tabindex="-1" role="dialog" aria-labelledby="TituloModal" aria-hidden="true" `+blockModal+` data-idevento="`+objJSONRetorno.idevento+`" data-idpergunta="`+objJSONRetorno.idpergunta+`">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
					
						<div class="modal-header" style="background-color: rgba(240, 240, 240, 1); font-size: 1.2em; color: rgba(5, 56, 112, 1); border-bottom: 3px solid rgba(255, 215, 0, 1);">
							<h5 class="modal-title" id="TituloModalCentralizado"><strong>`+obj.titulo+`</strong></h5>
							`+buttonX+`
						</div>

						<div class="modal-body">
							<p>`+objJSONRetorno.mensagem+`</p>
							`+perguntas+`
						</div>

						<div class="modal-footer" style="background-color: rgba(240, 240, 240, 1); border-top: 3px solid rgba(255, 215, 0, 1);">
						`+bts+`
						<button type="button" class="btn btn-info" onclick="teste()" hidden>Info</button>
						</div>
					
					</div>
				</div>
			</div>
		`;

		// Pega o código HTML de possíveis outras janelas existentes   
		let modais = document.getElementById(obj.idElement).innerHTML;

		if (obj.insertionMode == 'ADD'){
			document.getElementById(obj.idElement).innerHTML = modais + modal;
		}else if (obj.insertionMode == 'CLEAN'){
			document.getElementById(obj.idElement).innerHTML = modal;
		}else{
			document.getElementById(obj.idElement).innerHTML = modais + modal;
		}

		// Insere a função de acionamento da janela modal Bootstrap no elemento que funcionará como gatilho
		// Se o evento for omitido, por padrão será especificado "onclick"
		if ((obj.gatilho.hasOwnProperty("event"))&&(obj.gatilho.event !== "")&&(obj.gatilho.event !== null)) {
			if((!obj.hasOwnProperty("gatilho.id"))&&(obj.gatilho.id !== '')&&(obj.gatilho.id !== null)){
				document.getElementById(obj.gatilho.id).setAttribute(obj.gatilho.event,'showModal('+obj.idJanelaModal+')');
			}
		}else{
			if((!obj.hasOwnProperty("gatilho.id"))&&(obj.gatilho.id !== '')&&(obj.gatilho.id !== null)){
				document.getElementById(obj.gatilho.id).setAttribute('onclick','showModal('+obj.idJanelaModal+')');
			}
		};

	};

};

// Aciona a janela modal
// Requer: JQuery
function showModal(id){
	$(id).modal('show');
};

// Fecha a janela modal
// Requer: JQuery
function hideModal(id){
	$('#'+id).modal('hide');
}

// Resgata as respostas e cria um array de respostas das questões.
function saveDataModal(){
	// Pega o id do servidor. Verifica se existe a variável idServidor e pega seu valor caso
	// este não seja 0 ou null. Caso contrário, verifica se existe um elemento HTML com id="idservidor"
	// e pega o valor deste.
	let idServidorForSave = 0;
	if ((typeof idServidor === 'number')&&(idServidor > 0)) {
		idServidorForSave = idServidor;
	}else{
		idServidorForSave = document.querySelector('#idservidor');
		if (document.querySelector('#idservidor') === null) {
			idServidorForSave = 0;
			console.log('[ERRO: NAO FOI ENCONTRADA A IDENTIFICACAO DO SERVIDOR PARA REGISTRO DA RESPOSTA DE UMA JANELA MODAL. O REGISTRO DA RESPOSTA FOI SALVO COM IDENTIFICADOR = 0]');
		}else{
			idServidorForSave = document.querySelector('#idservidor').value;
		}
	}
	if (idServidorForSave ==  0) {
		console.log('[ERRO: IDENTIFICADOR DO SERVIDOR ENCONTRADO. POREM O VALOR == 0]');
	}
	

	// Cada janela modal possui perguntas com a classe "pergunta". A seguir, selecionamos todas as perguntas
	// para identificá-las por seu tipo e gerar o JSON delas.
	let iPerguntas = document.querySelectorAll('.pergunta');

	let classesPergunta = new Object;
	let tipoPergunta = "";
	let listaRespostas = [{"idevento":objJSONRetorno.idevento,"idpergunta":objJSONRetorno.idpergunta,"idservidor":idServidorForSave}];
	
	for (let index = 0; index < iPerguntas.length; index++) {
		classesPergunta = iPerguntas[index].getAttribute("class");

		if (classesPergunta.indexOf("pergunta-radio") > 0) {
			tipoPergunta = 'radio';
		}else if (classesPergunta.indexOf("pergunta-checkbox") > 0) {
			tipoPergunta = 'checkbox';
		}else if (classesPergunta.indexOf("pergunta-combobox") > 0) {
			tipoPergunta = 'combobox';
		}else if (classesPergunta.indexOf("pergunta-text") > 0) {
			tipoPergunta = 'text';
		}else if (classesPergunta.indexOf("pergunta-longtext") > 0) {
			tipoPergunta = 'longtext';
		}

		perguntaObrigatoria = (classesPergunta.indexOf("obrigatorio") > 0);
	
		switch (tipoPergunta) {
			
			case 'radio':
				listaRespostas.push(addRadio(iPerguntas[index].getAttribute("id"), iPerguntas[index].querySelectorAll('input[type=radio]')));
				break;
		
			case 'checkbox':
				listaRespostas.push(addCheckBox(iPerguntas[index].getAttribute("id"), iPerguntas[index].querySelectorAll('input[type=checkbox]')));
				break;

			case 'combobox':
				listaRespostas.push(addComboBoxTextLongtext(iPerguntas[index].getAttribute("id"), "combobox", iPerguntas[index].querySelector('select').value));
				break;
		
			case 'text':
				listaRespostas.push(addComboBoxTextLongtext(iPerguntas[index].getAttribute("id"), "text", iPerguntas[index].querySelector('input[type=text]').value));
				break;
			
			case 'longtext':
				listaRespostas.push(addComboBoxTextLongtext(iPerguntas[index].getAttribute("id"), "longtext", iPerguntas[index].querySelector('textarea').value));
				break;
			
			default:
				break;
		
		}

	}

	// Atualiza o objeto contendo o registro das respostas para ficar disponível para outras implementações
	objListaDeRespostas = listaRespostas;

	// Se todas as respostas obrigatórias forem validadas, registra as respostas
	// e fecha a janela Modal.
	if (validateResponses()) {
		hideModal(objJSONRetorno.perguntas.idJanelaModal);
		postDataModal(listaRespostas, objJSONRetorno.idevento, objJSONRetorno.idpergunta, idServidorForSave);
	}

};

// Grava o array de respostas das questões no BD.
// Requer: "mod_execRequestAjx.js"
function postDataModal(objJSON, idEvento, idPergunta, idServidor){
	stringJSON = JSON.stringify(objJSON);
	execRequestAjx('../public/resource/res_ajx_modalwindows.php', 'action=postResposta&idevento='+idEvento+'&idpergunta='+idPergunta+'&idservidor='+idServidor+'&data='+stringJSON, '', 'returnJSON', feedbackPostDataResult, '', '');
};

// Apenas "posta" no console um feedback da ação executada.
function feedbackPostDataResult(returnJSON){
	//let objReturn = JSON.parse(JSON.parse(returnJSON));
	//console.log(objReturn);
	//console.log(returnJSON);
}

// Verifica se a opção "obrigatorio" para respostas obrigatórias foi informada.
// Caso não tenha, assume o padrão "false".
function respostaObrigatoria(objPergunta){
		if ((!objPergunta.hasOwnProperty("obrigatorio"))||(objPergunta.obrigatorio === null)||(objPergunta.obrigatorio === '')||(objPergunta.obrigatorio === undefined)||(objPergunta.obrigatorio === false)||(objPergunta.obrigatorio === 'false')){
			return false;
		}else{
			return true;
		}
}

// Funções de resgate das respostas para cada tipo de pergunta
function addRadio(idPergunta, iRespostas){
	let iResposta = new Object();
	for (let i = 0; i < iRespostas.length; i++) {
		if (iRespostas[i].checked) {
			iResposta.pergunta = idPergunta;
			iResposta.tipo = "radio";
			iResposta.resposta = iRespostas[i].value;
		}
	}
	return iResposta;
}

function addCheckBox(idPergunta, iRespostas){
	let iResposta = new Object();
	let respostasTemp = [];
	for (let i = 0; i < iRespostas.length; i++) {
		if(iRespostas[i].checked){
			respostasTemp.push(iRespostas[i].value);
		}
	}
	iResposta.pergunta = idPergunta;
	iResposta.tipo = "checkbox";
	iResposta.resposta = respostasTemp;
	return iResposta;
}

function addComboBoxTextLongtext(idPergunta, tipo, iRespostas){
	let iResposta = new Object();
	iResposta.pergunta = idPergunta;
	iResposta.tipo = tipo;
	iResposta.resposta = iRespostas;
	return iResposta;
}
// =================================================================


// Verifica a validação de cada pergunta/resposta.
// Retorna "true" caso todas as respostas obrigatórias tenham sido preenchidas
// ou "false" quando haja alguma obrigatória sem responder, sinalizando o campo de vermelho.
function validateResponses(){
	let iPerguntas = document.querySelectorAll('.pergunta');
	let allowModal = true;
	let classesPergunta = new Object;
	let tipoPergunta = "";
	let listaValidade = [];
	
	for (let index = 0; index < iPerguntas.length; index++) {
		classesPergunta = iPerguntas[index].getAttribute("class");

		if (classesPergunta.indexOf("obrigatorio") > 0) {

			if (classesPergunta.indexOf("pergunta-radio") > 0) {
				tipoPergunta = 'radio';
			}else if (classesPergunta.indexOf("pergunta-checkbox") > 0) {
				tipoPergunta = 'checkbox';
			}else if (classesPergunta.indexOf("pergunta-combobox") > 0) {
				tipoPergunta = 'combobox';
			}else if (classesPergunta.indexOf("pergunta-text") > 0) {
				tipoPergunta = 'text';
			}else if (classesPergunta.indexOf("pergunta-longtext") > 0) {
				tipoPergunta = 'longtext';
			}
		
			switch (tipoPergunta) {
				
				case 'radio':
					listaValidade.push(checkResponseRadio(iPerguntas[index]));
					break;
			
				case 'checkbox':
					listaValidade.push(checkResponseCheckBox(iPerguntas[index]));
					break;

				case 'combobox':
					listaValidade.push(checkResponseComboBox(iPerguntas[index]));
					break;
			
				case 'text':
					listaValidade.push(checkResponseText(iPerguntas[index]));
					break;
				
				case 'longtext':
					listaValidade.push(checkResponseLongtext(iPerguntas[index]));
					break;
				
				default:
					break;
			
			}

		}

	}

	listaValidade.forEach((item)=>{
		if (item.value) {
			uncheckRequiredFields(item.id);
		}else{
			checkRequiredFields(item.id);
			allowModal = false;
		}
	});

	return allowModal;

}

// Funções para verificação das respostas obrigatórias
function checkResponseRadio(iRespostas){
	let resp = iRespostas.querySelectorAll('input[type=radio]');
	let okResponse = new Object();
	let ok = false;
	for (let i = 0; i < resp.length; i++) {
		if (resp[i].checked) {
			ok = true;
		}
	}
	okResponse.id = iRespostas.id;
	okResponse.control = "radio";
	okResponse.value = ok;
	return okResponse;
}

function checkResponseCheckBox(iRespostas){
	let resp = iRespostas.querySelectorAll('input[type=checkbox]');
	let okResponse = new Object();
	let ok = false;
	okResponse.id = iRespostas.id;
	okResponse.control = "checkbox";
	for (let i = 0; i < resp.length; i++) {
		if(resp[i].checked){
			ok = true;
		}
	}
	okResponse.value = ok;
	return okResponse;
}

function checkResponseComboBox(iRespostas){
	let resp = iRespostas.querySelector('select');
	let okResponse = new Object();
	okResponse.id = iRespostas.id;
	okResponse.control = "combobox";
	if (resp.options[resp.selectedIndex].value == "") {
		okResponse.value = false;
	}else{
		okResponse.value = true;
	}
	return okResponse;
}

function checkResponseText(iRespostas){
	let resp = iRespostas.querySelector('input[type=text]').value;
	let okResponse = new Object();
	okResponse.id = iRespostas.id;
	okResponse.control = "text";
	if (resp.trim() == "") {
		okResponse.value = false;
	}else{
		okResponse.value = true;
	}
	return okResponse;
}

function checkResponseLongtext(iRespostas){
	let resp = iRespostas.querySelector('textarea').value
	let okResponse = new Object();
	okResponse.id = iRespostas.id;
	okResponse.control = "longtext";
	if (resp.trim() == "") {
		okResponse.value = false;
	}else{
		okResponse.value = true;
	}
	return okResponse;
}
// =================================================================


// Marca os campos de resposta obrigatória que não foram respondidos
// Requer: "show_hidden_items.js"
function checkRequiredFields(idField){
	addClass(idField,'preenchim-obrig');
}

// Desmarca os campos de resposta obrigatória que foram respondidos
// Requer: "show_hidden_items.js"
function uncheckRequiredFields(idField){
	removeClass(idField,'preenchim-obrig');
}


// Utilize para testar feedback de outras funções no evento onclick
// do botão "info" normalmente oculto na janela modal.
function teste(){
}