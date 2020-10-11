/*========================================*/
/* Função de inicialização                */
/*========================================*/

//document.onload = initializePainel();

var session;
var iacao = 0;

function initializePainel(){
	openCloseMenuSideBar();
	execRequestAjax(session['opcao'], '', 'conteudo', 'returnHtml', carregaContainerAcoes, '', 'loading-painel');
	initEventsPainel();
	showMsgAlerta(session['alerta']);
}

function openCloseMenuSideBar(){
	document.querySelector("#menu-toggle").addEventListener('click', ()=>{
		document.querySelector("#wrapper").classList.toggle("toggled");
	});
}

function setSession(jsonSession){
	session = jsonSession;
}




/*========================================*/
/* Funções de "elementos rastreados"      */
/*========================================*/

function initEventsPainel() {

    // Lista de elementos e eventos a serem rastreados (informar no objeto JSON abaixo)
    eventsElements = {
        "#btm0101":"click",
        "#btm0102":"click",
        "#btm0103":"click",
        "#btm0201":"click",
        "#btm0202":"click",
        "#btm0203":"click",
        "#btm0204":"click",
        "#btm0205":"click",
        "#btm0301":"click",
        "#btm0302":"click",
        "#btm0303":"click",
        "#btm0304":"click",
        "#btm0305":"click",
        "#btm0401":"click",
        "#btm0402":"click",
        "#btm0501":"click",
        "#btm0502":"click",
        "#btm0503":"click",
        "#btm0504":"click",
        "#btm0505":"click",
        "#btm0506":"click",
        "#btm0507":"click"
    };

    // Pega todas as chaves do objeto JSON que são os nomes dos elementos a serem rastreados.
    // O valor de cada chave é o evento a ser rastreado do elemento.
    Object.keys(eventsElements).forEach((elementId)=>{

        elementSelected = document.querySelector(elementId);

        if (elementSelected != null) {

	        elementSelected.addEventListener(eventsElements[elementId], ()=>{
	            
	            switch (elementId) {

	              case "#btm0101":
	              	// Informações: Números
					session['opcao'] = 'op0';
					session['opcao-navbar'] = 'informacoes';
					session['alerta'] = 0;
	                execRequestAjax('op0', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0102":
	              	// Informações: Simplificado
					session['opcao'] = 'op1';
					session['opcao-navbar'] = 'informacoes';
					session['alerta'] = 0;
	                execRequestAjax('op1', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0103":
	              	// Informações: Detalhado
					session['opcao'] = 'op2';
					session['opcao-navbar'] = 'informacoes';
					session['alerta'] = 0;
	                execRequestAjax('op2', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0201":
	              	// Eventos: Criar evento
					session['opcao'] = 'op11';
					session['opcao-navbar'] = 'eventos';
					session['alerta'] = 0;
					execRequestAjax('op11', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0202":
	              	// Eventos: Editar evento (PÁGINA EM BRANCO: EM CONSTRUÇÃO!)
					session['opcao'] = 'op4';
					session['opcao-navbar'] = 'eventos';
					session['alerta'] = 0;
					execRequestAjax('op4', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0203":
	              	// Eventos: Excluir evento (PÁGINA EM BRANCO: EM CONSTRUÇÃO!)
					session['opcao'] = 'op4';
					session['opcao-navbar'] = 'eventos';
					session['alerta'] = 0;
					execRequestAjax('op4', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0204":
	              	// Eventos: Confirmar frequência
					session['opcao'] = 'op6';
					session['opcao-navbar'] = 'eventos';
					session['alerta'] = 0;
					execRequestAjax('op6', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0205":
	              	// Eventos: Inscrição
					session['opcao'] = 'op33';
					session['opcao-navbar'] = 'eventos';
					session['alerta'] = 0;
					execRequestAjax('op33', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0301":
	              	// Relatórios: Lista de frequência
					session['opcao'] = 'op15';
					session['opcao-navbar'] = 'relatorios';
					session['alerta'] = 0;
	              	execRequestAjax('op15', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0302":
	              	// Relatórios: Exportação para o Fênix
					session['opcao'] = 'op23';
					session['opcao-navbar'] = 'relatorios';
					session['alerta'] = 0;
					execRequestAjax('op23', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0303":
	              	// Relatórios: Relatório final
					session['opcao'] = 'op24';
					session['opcao-navbar'] = 'relatorios';
					session['alerta'] = 0;
					execRequestAjax('op24', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0304":
	              	// Relatórios: Certificados
					session['opcao'] = 'op25';
					session['opcao-navbar'] = 'relatorios';
					session['alerta'] = 0;
					execRequestAjax('op25', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0305":
	              	// Relatórios: Avaliações
					session['opcao'] = 'op26';
					session['opcao-navbar'] = 'relatorios';
					session['alerta'] = 0;
					execRequestAjax('op26', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0401":
	              	// Usuários: Manutenção de usuários
					session['opcao'] = 'op12';
					session['opcao-navbar'] = 'usuarios';
					session['alerta'] = 0;
	              	execRequestAjax('op12', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0402":
	              	// Usuários: Cadastro de servidores
					session['opcao'] = 'op37';
					session['opcao-navbar'] = 'usuarios';
					session['alerta'] = 0;
	              	execRequestAjax('op37', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0501":
	              	// Ferramentas: Atualizar base de dados
					session['opcao'] = 'op13';
					session['opcao-navbar'] = 'ferramentas';
					session['alerta'] = 0;
	              	execRequestAjax('op13', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0502":
	              	// Ferramentas: Permissões de acesso
					session['opcao'] = 'op14';
					session['opcao-navbar'] = 'ferramentas';
					session['alerta'] = 0;
	              	execRequestAjax('op14', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0503":
	              	// Ferramentas: Regiões
					session['opcao'] = 'op18';
					session['opcao-navbar'] = 'ferramentas';
					session['alerta'] = 0;
	              	execRequestAjax('op18', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0504":
	              	// Ferramentas: Unidades
					session['opcao'] = 'op19';
					session['opcao-navbar'] = 'ferramentas';
					session['alerta'] = 0;
	              	execRequestAjax('op19', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0505":
	              	// Ferramentas: Tipos de ação
					session['opcao'] = 'op20';
					session['opcao-navbar'] = 'ferramentas';
					session['alerta'] = 0;
	              	execRequestAjax('op20', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0506":
	              	// Ferramentas: Tipos de Locais
					session['opcao'] = 'op21';
					session['opcao-navbar'] = 'ferramentas';
					session['alerta'] = 0;
	              	execRequestAjax('op21', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              case "#btm0507":
	              	// Ferramentas: Cadastro de locais
					session['opcao'] = 'op22';
					session['opcao-navbar'] = 'ferramentas';
					session['alerta'] = 0;
	              	execRequestAjax('op22', '', 'conteudo');
					setTituloNavbar(session['opcao-navbar']);
	              	break;

	              default:
	                console.log(eventsElements);

	            }

	        })

    	}
        
    })

}




/*========================================*/
/* Funções de "Callback"                  */
/*========================================*/

function opcaoSelecionada(idElement){
	return document.getElementById(idElement).value;
}

// Executa as funções de requisição via Ajax
// typeAction define que tipo de ação tomar sendo:
// 'returnHtml'  : retorna um Html que será inserido em algum local definido em 'idElement';
// 'returnValue' : retorna um valor ou conjnto de dados a ser trabalhado em um módulo.
// execFunction define qual função executar após o retorno Ajax.
function execRequestAjax(opcao, params, idElement, typeAction = 'returnHtml', execFunction = carregaContainerAcoes, paramFunction = '', idLoading = ''){
	
	var url = urlOpcaoMenu(opcao) + '?' + params;

	$(document).ready(function(){

		$.ajax({

			url: url,

			success: function(data){
				if (typeAction == 'returnHtml') {
					if (paramFunction == '') {
						execFunction(idElement, data);
					}else{
						execFunction(idElement, data, paramFunction);
					}
				}else{
					execFunction(data);
				}
			},

			beforeSend: function(){
				if (idLoading != '') {
					showItem(idLoading);
				}
			},

			complete: function(){
				if (idLoading != '') {
					hideItem(idLoading);
				}
			}

		});

	});

};

// Chamada pela função "execRequestAjax" quando o parâmetro "typeAction" está setado com 
// o valor "returnHtml", insere o retorno no container informado no parâmetro "idElement"
function carregaContainerAcoes(idContainer, htmlAcoes){
	document.getElementById(idContainer).innerHTML = htmlAcoes;
}

// Define o título no "Navbar" de acordo com a chamada
function setTituloNavbar(opcaoNavbar){
	switch (opcaoNavbar) {
		case 'branco':
			document.querySelector('#titulo-navbar').innerHTML = '';
			break;

		case 'informacoes':
			document.querySelector('#titulo-navbar').innerHTML = 'Informações';
			break;

		case 'eventos':
			document.querySelector('#titulo-navbar').innerHTML = 'Eventos';
			break;

		case 'relatorios':
			document.querySelector('#titulo-navbar').innerHTML = 'Relatórios';
			break;

		case 'usuarios':
			document.querySelector('#titulo-navbar').innerHTML = 'Usuários';
			break;

		case 'ferramentas':
			document.querySelector('#titulo-navbar').innerHTML = 'Ferramentas';
			break;
		
		default:
			document.querySelector('#titulo-navbar').innerHTML = '';
			break;
	}
}

// Define a URL de chamada pela função "execRequestAjax" definido no parâmetro "opcao"
function urlOpcaoMenu(opcao){
	switch (opcao) {
		case 'op0':
			// Lista números do evento resumidamente
			return 'resource/res_pc_informacoes_numeros.php';
			break;

		case 'op1':
			// Lista números do evento por região(CREs, NC, EPF)
			return 'resource/res_pc_informacoes_simplificado.php';
			break;

		case 'op2':
			// Lista números do evento detalhadamente
			return 'resource/res_pc_informacoes_detalhado.php';
			break;

		case 'op3':
			break;
		
		case 'op4':
			// Carrega uma página em branco
			return 'resource/res_pc_pagina_em_branco.php';
			break;
		
		case 'op5':
			// Lista de frequência (em .PDF)
			return '****app/view/reports/rep_lista_inscritos.php';
			break;
	  
		case 'op6':
			// Confirma frequência (cabeçalho)
			return 'resource/res_pc_eventos_confirma_presenca.php';
			break;
		
		case 'op7':
			// Retorna a lista para confirmar frequência
			return 'resource/res_pc_eventos_confirma_presenca_lista.php';
			break;
		
		case 'op8':
			// Retorna uma lista de ações em "<option>"" para um "<select>" de ações
			return 'resource/res_pc_items_select_acoes.php';
			break;
		
		case 'op9':
			// Retorna uma lista de locais em "<option>"" para um "<select>" de locais
			return 'resource/res_pc_items_select_locais.php';
			break;
	  
		case 'op10':
			// Busca as informações de um servidor pela matrícula
			return 'resource/res_pc_info_usuario.php';
			break;

		case 'op11':
			// Criar um evento, formação ou inscrição
			return 'resource/res_pc_eventos_crud.php';
			break;

		case 'op12':
			// CRUD de usuários do sistema
			return 'resource/res_pc_usuarios.php';
			break;

		case 'op13':
			// Opção "Atualizar a base de dados" do menu "ferramentas"
			return 'resource/res_pc_ferramentas_atualizabd.php';
			break;

		case 'op14':
			// Opção "Permissões de acesso" do menu "ferramentas"
			return 'resource/res_pc_ferramentas_permissoes.php';
			break;

		case 'op15':
			// Lista de frequência do menu "Relatórios"
			return 'resource/res_pc_relatorios_listafrequencia.php';
			break;

		case 'op16':
			// Busca os dados da permissão de acesso selecionada
			return 'resource/res_pc_ferramentas_permissoes_acao.php';
			break;

		case 'op17':
			// Gera a tabela de listagem de usuários para o CRUD de usuários do sistema
			return 'resource/res_pc_usuarios_lista.php';
			break;

		case 'op18':
			// Regiões
			return 'resource/res_pc_ferramentas_regioes.php';
			break;

		case 'op19':
			// Unidades
			return 'resource/res_pc_ferramentas_unidades.php';
			break;

		case 'op20':
			// Tipos de ação
			return 'resource/res_pc_ferramentas_tiposacoes.php';
			break;

		case 'op21':
			// Tipos de locais
			return 'resource/res_pc_ferramentas_tiposlocais.php';
			break;

		case 'op22':
			// Cadastro de locais
			return 'resource/res_pc_ferramentas_cadlocais.php';
			break;

		case 'op23':
			// Exportação para o Fênix do menu "Relatórios"
			return 'resource/res_pc_relatorios_exportafenix.php';
			break;

		case 'op24':
			// Relatório final do menu "Relatórios"
			return 'resource/res_pc_relatorios_relatoriofinal.php';
			break;

		case 'op25':
			// Certificados do menu "Relatórios"
			return 'resource/res_pc_relatorios_certificados.php';
			break;

		case 'op26':
			// Avaliações do menu "Relatórios"
			return 'resource/res_pc_relatorios_avaliacoes.php';
			break;

		case 'op27':
			// Retorna a lista para confirmar frequência
			return 'resource/res_pc_relatorios_listafrequencia_lista.php';
			break;
		
		case 'op28':
			// Retorna a lista DE UA e/ou UE (Órgãos cadastrados)
			return 'resource/res_pc_ferramentas_unidades_lista.php';
			break;
		
		case 'op29':
			// Lista o resumo do evento em números de forma resumida
			return 'resource/res_pc_informacoes_numeros_lista.php';
			break;

		case 'op30':
			// Lista números do evento por região(CREs, NC, EPF)
			return 'resource/res_pc_informacoes_simplificado_lista.php';
			break;

		case 'op31':
			// Lista números do evento por região(CREs, NC, EPF) Detalhado
			return 'resource/res_pc_informacoes_detalhado_lista.php';
			break;

		case 'op32':
			// Retorna valores diversos para o CRUD de criação de eventos.
			return 'resource/res_pc_eventos_crud_acao.php';
			break;

		case 'op33':
			// Abre a tela de inscrição manual
			return 'resource/res_pc_eventos_inscricaointerna.php';
			break;

		case 'op34':
			// Executa ações para a "inscrição manual"
			return 'resource/res_pc_eventos_inscricaointerna_acoes.php';
			break;

		case 'op35':
			// Executa a inscrição para o evento, região, local e ação escolhidos
			return 'resource/res_pc_eventos_inscricaointerna_inscricao.php';
			break;

		case 'op36':
			// Lista detalhada das inscrições
			return 'resource/res_pc_informacoes_detalhado_lista.php';
			break;

		case 'op37':
			// Cadastro de servidores
			return 'resource/res_pc_usuarios_cadservidores.php';
			break;

		case 'op38':
			// Executa ações para o cadastro de servidores
			return 'resource/res_pc_usuarios_cadservidores_acao.php';
			break;

		case 'op39':
			// Executa ações para a "informações detalhado"
			return 'resource/res_pc_informacoes_acoes.php';
			break;

		case 'op40':
			// Retorna a lista de Locais Cadastrados
			return 'resource/res_pc_ferramentas_cadlocais_lista.php';
			break;
		
		default:
			return 'resource/res_pc_pagina_em_branco.php';
			break;
	}
}




/*========================================*/
/* Outras funções                         */
/*========================================*/

function showMsgAlerta(opAlerta='0') {
  switch (opAlerta) {
    case 0:
      break;

    case 1:
      break;

    case 6:
      alert('Todas as frequências informadas foram confirmadas!');
      session['alerta'] = 0;
      break;

    default:
      break;
  }
}




/*========================================*/
/* Área dos JS's específicos dos módulos  */
/*========================================*/

/* res_pc_eventos_confirma_presenca_lista.php */
function validaLista(){
	var checkbox = document.getElementById('check-orientacao');
	var valor = document.getElementById('nome');
	var texto = valor.innerHTML;
	texto = texto.substring(0,9);
	if (checkbox.checked) {
		if (texto == "Conferido") {
			return true;
		}else if (texto == "Matrícula") {
		    alert('Para continuar, é necessário informar uma matrícula válida.');
			return false;
		}else{
		    alert('Para continuar, é necessário informar uma matrícula válida.');
			return false;
		}
	}else{
		alert('É necessário marcar a caixa de confirmação da lista para continuar!');
		return false;
	}
}

function validaListaComFuncao(){
	var checkbox = document.getElementById('check-orientacao');
	var valor = document.getElementById('nome');
	var funcao = document.getElementById('funcao').value;
	var texto = valor.innerHTML;
	texto = texto.substring(0,9);
	if (checkbox.checked) {
		if (texto == "Conferido") {
			if (funcao == 0) {
			    alert('Para continuar, é necessário informar a função do servidor.');
				return false;
			}else{
				return true;
			}
		}else if (texto == "Matrícula") {
		    alert('Para continuar, é necessário informar uma matrícula válida.');
			return false;
		}else{
		    alert('Para continuar, é necessário informar uma matrícula válida.');
			return false;
		}
	}else{
		alert('É necessário marcar a caixa de confirmação da lista para continuar!');
		return false;
	}
}

function validaMatricula(){
	var valor = document.getElementById('nome');
	var texto = valor.innerHTML;
	texto = texto.substring(0,9);
	if (texto == "Conferido") {
		document.getElementById("matricula").disabled = true;
	}else if (texto == "Matrícula") {
		document.getElementById("matricula").disabled = false;
	}else{
		document.getElementById("matricula").disabled = false;
	}
}

function cancelarMatricula(){
	document.getElementById("matricula").disabled = false;
	document.getElementById("matricula").value = '';
	document.getElementById('nome').innerHTML = 'Matrícula não informada.'
}



/* res_pc_eventos_crud.php */
function scrollToIdOnClick(element){
	const el = document.querySelector(element);
	const to = el.offsetTop;
	window.scroll(0, to);
	el.focus();
}

function previewImagem(){
	var imagem = document.querySelector('input[name=imagem]').files[0];

	var previewG = document.querySelector('#arte-g');
	var previewM = document.querySelector('#arte-m');
	var previewP = document.querySelector('#arte-p');

	var reader = new FileReader();

	reader.onloadend = function () {
		previewG.src = reader.result;
		previewM.src = reader.result;
		previewP.src = reader.result;
	}

	if(imagem){
		reader.readAsDataURL(imagem);
	}else{
		previewG.src = "";
		previewM.src = "";
		previewP.src = "";
	}
}

function addRegiaoAbrangencia(){
	var idRegiao = document.getElementById('idregiao-abrangencia').value;
	var nomeRegiao = document.getElementById('idregiao-abrangencia').options[document.getElementById('idregiao-abrangencia').selectedIndex].text;
	if (idRegiao == 0) {
		deleteRegiaoAbrangencia(document.querySelectorAll('.regiaoabrangencia'),true);
		var allOptions = document.querySelectorAll(".opt-regiaoabrangencia");
		allOptions.forEach((option)=>{
			if (option.value != 0) {
				if (verifRegioesAbrangenciaSelecionadas("regiaoabrangencia-"+option.value) == false) {
					var items = document.getElementById('listaregioesabrangencia').innerHTML;
					var item = defineItemAddRegiaoAbrangencia(option.value,option.innerHTML);
					document.getElementById('listaregioesabrangencia').innerHTML = items + item;
				}
			}
		});
	}else{
		if (verifRegioesAbrangenciaSelecionadas("regiaoabrangencia-"+idRegiao) == false) {
			var items = document.getElementById('listaregioesabrangencia').innerHTML;
			var item = defineItemAddRegiaoAbrangencia(idRegiao,nomeRegiao);
			document.getElementById('listaregioesabrangencia').innerHTML = items + item;
		}
	}
}

function verifRegioesAbrangenciaSelecionadas(id){
	var regioes = document.querySelectorAll(".regiaoabrangencia");
	r = false;
	regioes.forEach((item)=>{
		if (item.id == id) {r = true;};
	});
	return r;
}

function defineItemAddRegiaoAbrangencia(idRegiao,nomeRegiao){
	var item = `
      <div class="regiaoabrangencia" id="regiaoabrangencia-`+idRegiao+`">
        <input class="form-control" type="number" value="`+idRegiao+`" name="idregiaoabrangencia[`+idRegiao+`]" id="idregiaoabrangencia[`+idRegiao+`]" hidden>
        <span>`+nomeRegiao+`</span>
        <span class="xbotao" onclick="deleteRegiaoAbrangencia(this.parentNode)">X</span>
      </div>
	`;
	return item;
}

function deleteRegiaoAbrangencia(itemsRegiao,deleteAll=false){
	if (deleteAll == false) {
		itemsRegiao.remove();
	}else{
		itemsRegiao.forEach((item)=>{
			item.remove();
		});
	}
}

function defineItemAddLocalRealizacao(){
	var regiaoSelecionada = document.querySelector('#idregiaolocal');
	var idRegiao = regiaoSelecionada.value;
	var nomeRegiao = regiaoSelecionada.options[regiaoSelecionada.selectedIndex].text;

	var tipoLocalSelecionado = document.querySelector('#tipolocalrealizacao');
	var tipoLocal = tipoLocalSelecionado.value;
	var descricaoTipoLocal = tipoLocalSelecionado.options[tipoLocalSelecionado.selectedIndex].text;

	var localSelecionado = document.querySelector('#idlocalrealizacao');
	var quantVagas = localSelecionado.options[localSelecionado.selectedIndex].attributes['data-vagas'].value;
	var limitarVagas = localSelecionado.options[localSelecionado.selectedIndex].attributes['data-limitarvagas'].value;
	var idCadLocal = localSelecionado.options[localSelecionado.selectedIndex].value;
	var nomeLocal = localSelecionado.options[localSelecionado.selectedIndex].text;

	var email = '';
	var matriculaResp = session['MATRICULA'];

	var checkVagas = '';
	var inputVagas = '';
	if (limitarVagas == 'S') {
		checkVagas = '<input type="checkbox" name="local-cb-limitar['+idCadLocal+']" id="local-cb-limitar['+idCadLocal+']" onchange="ativaVagasLocalViaCheckbox(this)" checked>';
		inputVagas = '<input class="tablocal-vagas" type="number" name="local-vagas['+idCadLocal+']" id="local-vagas['+idCadLocal+']" value="'+quantVagas+'">';
	}else{
		checkVagas = '<input type="checkbox" name="local-cb-limitar['+idCadLocal+']" id="local-cb-limitar['+idCadLocal+']" onchange="ativaVagasLocalViaCheckbox(this)">';
		inputVagas = '<input class="tablocal-vagas" type="number" name="local-vagas['+idCadLocal+']" id="local-vagas['+idCadLocal+']" value="'+quantVagas+'" disabled>';
	};

	var item = `
      <tr class="table-light" id="cel[`+idCadLocal+`]">
      	<td hidden>
      		<input type="number" name="local-idcadlocal[`+idCadLocal+`]" id="local-idcadlocal[`+idCadLocal+`]" value="`+idCadLocal+`" hidden>
      		<input type="text" name="local-limitar[`+idCadLocal+`]" id="local-limitar[`+idCadLocal+`]" value="`+limitarVagas+`" hidden>
      		<input type="text" name="local-tipolocal[`+idCadLocal+`]" id="local-tipolocal[`+idCadLocal+`]" value="`+tipoLocal+`" hidden>
      		<input type="text" name="local-idregiao[`+idCadLocal+`]" id="local-idregiao[`+idCadLocal+`]" value="`+idRegiao+`" hidden>
      		<input type="text" name="local-regiao[`+idCadLocal+`]" id="local-regiao[`+idCadLocal+`]" value="`+nomeRegiao+`" hidden>
      		<input type="text" name="local-denominacao[`+idCadLocal+`]" id="local-denominacao[`+idCadLocal+`]" value="`+nomeLocal+`" hidden>

      		<input type="text" name="local-cre[`+idCadLocal+`]" id="local-cre[`+idCadLocal+`]" value="`+idRegiao+`" hidden>
      		<input type="text" name="local-email[`+idCadLocal+`]" id="local-email[`+idCadLocal+`]" value="`+email+`" hidden>

      		<input type="text" name="local-descricaotipolocal[`+idCadLocal+`]" id="local-descricaotipolocal[`+idCadLocal+`]" value="`+descricaoTipoLocal+`" hidden>
      		<input type="text" name="local-matricularesp[`+idCadLocal+`]" id="local-matricularesp[`+idCadLocal+`]" value="`+matriculaResp+`" hidden>
      	</td>
        <td class="tablocal tablocal-regiao">`+nomeRegiao+`</td>
        <td class="tablocal tablocal-tipo">`+tipoLocal+`</td>
        <td class="tablocal tablocal-local">`+nomeLocal+`</td>
        <td class="tablocal tablocal-vagas">`+inputVagas+`</td>
        <td class="tablocal tablocal-limitar">`+checkVagas+`</td>
        <td class="tablocal tablocal-remover"><span class="oi oi-trash deletar" onclick="document.getElementById('cel[`+idCadLocal+`]').remove();"></span></td>
      </tr>
	`;
	var items = document.getElementById('corpo-tabela-locais').innerHTML + item;
	document.getElementById('corpo-tabela-locais').innerHTML = items;
}

function ativaVagasLocalViaCheckbox(checkBox){
	var idInputVagas = checkBox.id.replace("local-cb-limitar", "local-vagas");
	var limitarVagas = checkBox.id.replace("local-cb-limitar", "local-limitar");
	if (checkBox.checked) {
		unblockItem(idInputVagas);
		document.getElementById(limitarVagas).value = 'S';
	}else{
		blockItem(idInputVagas);
		document.getElementById(limitarVagas).value = 'N';
	}
}

function deleteLocalRealizacao(itemsLocais, deleteAll=false){
	if (deleteAll == false) {
		itemsLocais.remove();
	}else{
		document.querySelector(itemsLocais).innerHTML = ' ';
	}
}

function selecionaTipoLocal(){
	if (document.querySelector('#tipolocalrealizacao').value == 0) {
		blockItem('botao-add-local');
		blockItem('idlocalrealizacao');
		document.querySelector('#idlocalrealizacao').innerHTML = '';
	}else{
		execRequestAjax('op32', 'idregiao='+document.getElementById('idregiaolocal').value+'&tipolocal='+document.getElementById('tipolocalrealizacao').value+'&acao=lista-locais-cadastrados', 'idlocalrealizacao');
		unblockItem('botao-add-local');
		unblockItem('idlocalrealizacao');
	}
}

function selecionaRegiao(elementRegiao){
	if (elementRegiao.id == 'ev-idregiao') {
		if (elementRegiao.value == 0) {
			document.querySelector('#ev-idorgao').innerHTML = '';
			blockItem('ev-idorgao');
		}else{
			execRequestAjax('op32', 'idregiao='+elementRegiao.value+'&acao=lista-orgaos-cadastrados', 'ev-idorgao');
			unblockItem('ev-idorgao');
		}
	}else{
		if (document.querySelector('#idregiaolocal').value == 0) {
			document.querySelector('#tipolocalrealizacao').innerHTML = '';
			document.querySelector('#idlocalrealizacao').innerHTML = '';
			blockItem('botao-add-local');
			blockItem('tipolocalrealizacao');
			blockItem('idlocalrealizacao');
		}else{
			execRequestAjax('op32', 'idregiao='+document.getElementById('idregiaolocal').value+'&acao=lista-tiposlocaisregiao', 'tipolocalrealizacao');
			blockItem('botao-add-local');
			unblockItem('tipolocalrealizacao');
			blockItem('idlocalrealizacao');
		}
	}
}

function defineCaracteristicaEvento(opcao){
	
	switch (opcao.value) {
		case "1":
			showItem('ev-area-acoes');
			break;

		case "2":
			hideItem('ev-area-acoes');
			break;

		case "3":
			showItem('ev-area-acoes');
			break;

		case "4":
			hideItem('ev-area-acoes');
			break;

		default:
			break;
	}

}

function liberacaoAutomAvaliacao(valueBoolean){
	showHideItem('liberacao-autom',!valueBoolean);
	showHideItem('bloqueio-autom',!valueBoolean);
	showHideItem('liberacao-manual',valueBoolean);
	if (!valueBoolean) {document.querySelector('#acao-avliberada').selectedIndex = 1;};
}

function infoCampo(elemento){
	var texto = '';
	switch (elemento.id) {
		
		case "ev-caracteristica":
			texto = `<span class="oi oi-info" style="padding-right: 10px;"></span>`;
			if (elemento.value == 1) {
				texto += `<span>Destinado a eventos que possui uma ou mais ações exclusivas ou complementares com datas, horários e locais definidos. É o formato mais comum.</span>`;
			}else if (elemento.value == 2) {
				texto += `<span></span>`;
			}else if (elemento.value == 3) {
				texto += `<span></span>`;
			}else if (elemento.value == 4) {
				texto += `<span></span>`;
			}
			document.querySelector('#help-ev-caracteristica').innerHTML = texto;
			break;

		case "ev-situacao":
			texto = `<span class="oi oi-info" style="padding-right: 10px;"></span>`;
			if (elemento.value == 'AGUARDANDO') {
				texto += `<span>Aguarda a liberação do evento (não exibe o "card" do evento na página principal).</span>`;
			}else if (elemento.value == 'ATIVO') {
				texto += `<span>Exibe imediatamente o "card" do evento na página principal ativando todos os recursos.</span>`;
			}else if (elemento.value == 'FECHADO') {
				texto += `<span>Utilize caso tenha a necessidade de interromper as inscrições antes da data informada.</span>`;
			}else if (elemento.value == 'ENCERRADO') {
				texto += `<span>Encerra todas as atividades do evento.</span>`;
			}else if (elemento.value == 'CANCELADO') {
				texto += `<span>Utilize caso tenha a necessidade de cancelar o evento.</span>`;
			}else if (elemento.value == 'ARQUIVADO') {
				texto += `<span>Encerra todas as atividades do evento e remove o "card" da página principal.</span>`;
			}
			document.querySelector('#help-ev-situacao').innerHTML = texto;
			break;

		case "ev-tipo-inscricao":
			texto = `<span class="oi oi-info" style="padding-right: 10px;"></span>`;
			if (elemento.value == 1) {
				texto += `<span>Libera inscrição para todos os servidores.</span>`;
			}else if (elemento.value == 2) {
				texto += `<span>As inscrições serão permitidas somente nos locais designados mediante login no sistema.</span>`;
			}
			document.querySelector('#help-ev-tipo-inscricao').innerHTML = texto;
			break;

		default:
			break;
	}

}

function addAcao(){

	if (validaCamposAcao()) {
		iacao++;
		var acaoGuidAcao = document.querySelector('#ev-guid').value + '-' + iacao;
		var acaoTema = document.querySelector('#acao-tema').value;
		var acaoPalestrante = document.querySelector('#acao-palestrante').value;
		var acaoData = document.querySelector('#acao-data').value;
		var acaoHoraIni = document.querySelector('#acao-horaini').value;
		var acaoHoraFim = document.querySelector('#acao-horafim').value;
		//var acaoPermiteInscLocal = document.querySelector('#acao-permiteinsclocal').value;
		var acaoPermiteInscLocal = 'S';
		var acaoTipoAcao = document.querySelector('#acao-tipoacao').value;
		var acaoCargaHoraria = document.querySelector('#acao-cargahoraria').value;
		var acaoDataIniInsc = document.querySelector('#acao-datainiinsc').value;
		var acaoDataFimInsc = document.querySelector('#acao-datafiminsc').value;
		var acaoHoraIniInsc = document.querySelector('#acao-horainiinsc').value;
		var acaoHoraFimInsc = document.querySelector('#acao-horafiminsc').value;
		var acaoOutrasInfo = document.querySelector('#acao-outrasinfo').value;
		var acaoLiberaAvAutom = 'N';

		if (document.querySelector('#acao-liberaavautom').checked) {
			acaoLiberaAvAutom = 'S';
		}else{
			acaoLiberaAvAutom = 'N';
		}

		if (acaoLiberaAvAutom == 'S') {
			var acaoDataLiberaAv = document.querySelector('#acao-dataliberaav').value;
			var acaoDataEncerraAv = document.querySelector('#acao-dataencerraav').value;
			var acaoHoraLiberaAv = document.querySelector('#acao-horaliberaav').value;
			var acaoHoraEncerraAv = document.querySelector('#acao-horaencerraav').value;
			var acaoAvLiberada = 'N';
		}else{
			var acaoDataLiberaAv = acaoData;
			var acaoDataEncerraAv = acaoData;
			var acaoHoraLiberaAv = acaoHoraIni;
			var acaoHoraEncerraAv = '23:59';
			var acaoAvLiberada = document.querySelector('#acao-avliberada').value;
		}

		var item = `
	      <tr class="table-light" id="cel[`+iacao+`]">
	      	<td hidden>
	      		<input type="text" name="acao-num[`+iacao+`]" id="acao-num[`+iacao+`]" value="`+iacao+`" hidden>
	      		<input type="text" name="acao-guidacao[`+iacao+`]" id="acao-guidacao[`+iacao+`]" value="`+acaoGuidAcao+`" hidden>
	      		<input type="text" name="acao-tema[`+iacao+`]" id="acao-tema[`+iacao+`]" value="`+acaoTema+`" hidden>
	      		<input type="text" name="acao-palestrante[`+iacao+`]" id="acao-palestrante[`+iacao+`]" value="`+acaoPalestrante+`" hidden>
	      		<input type="text" name="acao-data[`+iacao+`]" id="acao-data[`+iacao+`]" value="`+acaoData+`" hidden>
	      		<input type="text" name="acao-horaini[`+iacao+`]" id="acao-horaini[`+iacao+`]" value="`+acaoHoraIni+`" hidden>
	      		<input type="text" name="acao-horafim[`+iacao+`]" id="acao-horafim[`+iacao+`]" value="`+acaoHoraFim+`" hidden>
	      		<input type="text" name="acao-permiteinsclocal[`+iacao+`]" id="acao-permiteinsclocal[`+iacao+`]" value="`+acaoPermiteInscLocal+`" hidden>
	      		<input type="text" name="acao-tipoacao[`+iacao+`]" id="acao-tipoacao[`+iacao+`]" value="`+acaoTipoAcao+`" hidden>
	      		<input type="text" name="acao-cargahoraria[`+iacao+`]" id="acao-cargahoraria[`+iacao+`]" value="`+acaoCargaHoraria+`" hidden>
	      		<input type="text" name="acao-datainiinsc[`+iacao+`]" id="acao-datainiinsc[`+iacao+`]" value="`+acaoDataIniInsc+`" hidden>
	      		<input type="text" name="acao-datafiminsc[`+iacao+`]" id="acao-datafiminsc[`+iacao+`]" value="`+acaoDataFimInsc+`" hidden>
	      		<input type="text" name="acao-horainiinsc[`+iacao+`]" id="acao-horainiinsc[`+iacao+`]" value="`+acaoHoraIniInsc+`" hidden>
	      		<input type="text" name="acao-horafiminsc[`+iacao+`]" id="acao-horafiminsc[`+iacao+`]" value="`+acaoHoraFimInsc+`" hidden>
	      		<input type="text" name="acao-outrasinfo[`+iacao+`]" id="acao-outrasinfo[`+iacao+`]" value="`+acaoOutrasInfo+`" hidden>
	      		<input type="text" name="acao-liberaavautom[`+iacao+`]" id="acao-liberaavautom[`+iacao+`]" value="`+acaoLiberaAvAutom+`" hidden>
	      		<input type="text" name="acao-dataliberaav[`+iacao+`]" id="acao-dataliberaav[`+iacao+`]" value="`+acaoDataLiberaAv+`" hidden>
	      		<input type="text" name="acao-dataencerraav[`+iacao+`]" id="acao-dataencerraav[`+iacao+`]" value="`+acaoDataEncerraAv+`" hidden>
	      		<input type="text" name="acao-horaliberaav[`+iacao+`]" id="acao-horaliberaav[`+iacao+`]" value="`+acaoHoraLiberaAv+`" hidden>
	      		<input type="text" name="acao-horaencerraav[`+iacao+`]" id="acao-horaencerraav[`+iacao+`]" value="`+acaoHoraEncerraAv+`" hidden>
	      		<input type="text" name="acao-avliberada[`+iacao+`]" id="acao-avliberada[`+iacao+`]" value="`+acaoAvLiberada+`" hidden>

	      		<input type="text" name="acao-bio-guidacao[`+iacao+`]" id="acao-bio-guidacao[`+iacao+`]" value="`+acaoGuidAcao+`" hidden>
	      		<input type="text" name="acao-bio-palestrante[`+iacao+`]" id="acao-bio-palestrante[`+iacao+`]" value="" hidden>
	      		<input type="textarea" name="acao-bio-texto[`+iacao+`]" id="acao-bio-texto[`+iacao+`]" value="" hidden>
	      	</td>
	        <td class="tabacao tabacao-tema">`+acaoTema+`</td>
	        <td class="tabacao tabacao-palestrante">`+acaoPalestrante+`</td>
	        <td class="tabacao tabacao-data">`+acaoData+`</td>
	        <td class="tabacao tabacao-horario">`+acaoHoraIni+` às `+acaoHoraFim+`</td>
	        <td class="bio"><a href="" data-toggle="modal" data-target="#modalBios"><span class="oi oi-x bio-no"></span></a></td>
	        <td class="edit"><span class="oi oi-pencil editar"></span></td>
	        <td class="tabacao tabacao-del"><span class="oi oi-trash deletar" onclick="document.getElementById('cel[`+iacao+`]').remove();"></span></td>
	      </tr>
		`;
	// '<td class="bio"><a href="" data-toggle="modal" data-target="#modalBios"><span class="oi oi-check bio-yes"></span></a></td>'
		var items = document.getElementById('corpo-tabela-acoes').innerHTML + item;
		document.getElementById('corpo-tabela-acoes').innerHTML = items;
		limpaCamposAcao();
		fechaJanelaModal('modalAcao');
	}else{
		alert('Verifique a informação de cada campo detacado em vermelho. É obrigatório o preenchimento correto dessas informações.');
	}
}

function validaCamposAcao(){
	var valida = true;
	if (document.querySelector('#acao-tema').value.trim() == '') {
		addClass('acao-tema', 'campo-erro');
		valida = false;
	}else{
		removeClass('acao-tema', 'campo-erro')
	}

	if (document.querySelector('#acao-cargahoraria').value.trim() == '') {
		addClass('acao-cargahoraria', 'campo-erro');
		valida = false;
	}else{
		removeClass('acao-cargahoraria', 'campo-erro')
	}

	if ((document.querySelector('#acao-data').value.trim() == '')||
		(validaData(document.querySelector('#acao-data').value) == false)) {
		addClass('acao-data', 'campo-erro');
		valida = false;
	}else{
		removeClass('acao-data', 'campo-erro')
	}

	if ((document.querySelector('#acao-datainiinsc').value.trim() == '')||
		(validaData(document.querySelector('#acao-datainiinsc').value) == false)) {
		addClass('acao-datainiinsc', 'campo-erro');
		valida = false;
	}else{
		removeClass('acao-datainiinsc', 'campo-erro')
	}

	if ((document.querySelector('#acao-datafiminsc').value.trim() == '')||
		(validaData(document.querySelector('#acao-datafiminsc').value) == false)) {
		addClass('acao-datafiminsc', 'campo-erro');
		valida = false;
	}else{
		removeClass('acao-datafiminsc', 'campo-erro')
	}

	if ((document.querySelector('#acao-horaini').value.trim() == '')||
		(validaHora(document.querySelector('#acao-horaini').value) == false)) {
		addClass('acao-horaini', 'campo-erro');
		valida = false;
	}else{
		removeClass('acao-horaini', 'campo-erro')
	}

	if ((document.querySelector('#acao-horafim').value.trim() == '')||
		(validaHora(document.querySelector('#acao-horafim').value) == false)) {
		addClass('acao-horafim', 'campo-erro');
		valida = false;
	}else{
		removeClass('acao-horafim', 'campo-erro')
	}

	if ((document.querySelector('#acao-horainiinsc').value.trim() == '')||
		(validaHora(document.querySelector('#acao-horainiinsc').value) == false)) {
		addClass('acao-horainiinsc', 'campo-erro');
		valida = false;
	}else{
		removeClass('acao-horainiinsc', 'campo-erro')
	}

	if ((document.querySelector('#acao-horafiminsc').value.trim() == '')||
		(validaHora(document.querySelector('#acao-horafiminsc').value) == false)) {
		addClass('acao-horafiminsc', 'campo-erro');
		valida = false;
	}else{
		removeClass('acao-horafiminsc', 'campo-erro')
	}


	// Se a liberação de avaliação automática for solicitada...
	if (document.querySelector('#acao-liberaavautom').checked) {

		if ((document.querySelector('#acao-dataliberaav').value.trim() == '')||
			(validaData(document.querySelector('#acao-dataliberaav').value) == false)) {
			addClass('acao-dataliberaav', 'campo-erro');
			valida = false;
		}else{
			removeClass('acao-dataliberaav', 'campo-erro')
		}

		if ((document.querySelector('#acao-dataencerraav').value.trim() == '')||
			(validaData(document.querySelector('#acao-dataencerraav').value) == false)) {
			addClass('acao-dataencerraav', 'campo-erro');
			valida = false;
		}else{
			removeClass('acao-dataencerraav', 'campo-erro')
		}

		if ((document.querySelector('#acao-horaliberaav').value.trim() == '')||
			(validaHora(document.querySelector('#acao-horaliberaav').value) == false)) {
			addClass('acao-horaliberaav', 'campo-erro');
			valida = false;
		}else{
			removeClass('acao-horaliberaav', 'campo-erro')
		}

		if ((document.querySelector('#acao-horaencerraav').value.trim() == '')||
			(validaHora(document.querySelector('#acao-horaencerraav').value) == false)) {
			addClass('acao-horaencerraav', 'campo-erro');
			valida = false;
		}else{
			removeClass('acao-horaencerraav', 'campo-erro')
		}

	}else{

		document.querySelector('#acao-dataliberaav').value = document.querySelector('#acao-data').value;
		document.querySelector('#acao-dataencerraav').value = document.querySelector('#acao-data').value;
		document.querySelector('#acao-horaliberaav').value = document.querySelector('#acao-horaini').value;
		document.querySelector('#acao-horaencerraav').value = '23:59';

	}

	return valida;
}

function limpaCamposAcao(){
	document.querySelector('#acao-tema').value = '';
	document.querySelector('#acao-palestrante').value = '';
	document.querySelector('#acao-data').value = '';
	document.querySelector('#acao-horaini').value = '';
	document.querySelector('#acao-horafim').value = '';
	document.querySelector('#acao-permiteinsclocal').selectedIndex = 0;
	document.querySelector('#acao-tipoacao').selectedIndex = 0;
	document.querySelector('#acao-cargahoraria').value = '';
	document.querySelector('#acao-datainiinsc').value = '';
	document.querySelector('#acao-datafiminsc').value = '';
	document.querySelector('#acao-horainiinsc').value = '';
	document.querySelector('#acao-horafiminsc').value = '';
	document.querySelector('#acao-outrasinfo').value = '';
	document.querySelector('#acao-liberaavautom').checked = true;
	liberacaoAutomAvaliacao(true);
	document.querySelector('#acao-dataliberaav').value = '';
	document.querySelector('#acao-dataencerraav').value = '';
	document.querySelector('#acao-horaliberaav').value = '';
	document.querySelector('#acao-horaencerraav').value = '';
	document.querySelector('#acao-avliberada').selectedIndex = 1;

	removeClass('acao-tema', 'campo-erro')
	removeClass('acao-cargahoraria', 'campo-erro')
	removeClass('acao-data', 'campo-erro')
	removeClass('acao-datainiinsc', 'campo-erro')
	removeClass('acao-datafiminsc', 'campo-erro')
	removeClass('acao-horaini', 'campo-erro')
	removeClass('acao-horafim', 'campo-erro')
	removeClass('acao-horainiinsc', 'campo-erro')
	removeClass('acao-horafiminsc', 'campo-erro')
}

function editAcao(){

}

function deleteAcao(item, deleteAll = false){
	if (deleteAll == false) {
		item.remove();
	}else{
		document.querySelector(item).innerHTML = ``;
		iacao = 0;
	}
}



/* res_pc_ferramentas_permissoes.php */
function getPermissao(id){
	clearPainelPermissao();
	idpermissao = id.replace("btedit-","");
	execRequestAjax('op16', 'idpermissao='+idpermissao+'&acao=edit', '', 'returnValue', setPermissao);
}

function setPermissao(jsonData){
	permissao = JSON.parse(jsonData);
	opcoes = JSON.parse(permissao['ITENS']);
	showItem("painel-permissoes");

	document.querySelector(".cabecalho-opcoes").innerHTML = document.querySelector("#descpermissao-"+permissao['PERMISSOES_ID']).innerHTML;
    document.querySelector("#idpermissao").value = permissao['PERMISSOES_ID'];
    document.querySelector("#permissao").value = permissao['PERMISSAO'];

    Object.keys(opcoes).forEach((opcao)=>{
        opcaoSelected = document.querySelector("#"+opcao);
        if (opcaoSelected !== null) {
        	if (opcoes[opcao] == 1) {
	        	opcaoSelected.checked = true;
	        	if (opcaoSelected.classList.contains("pai")) {
	        		desbloqueiaOpcoesFilhas(opcaoSelected.id);
	        	}
        	}else{
	        	opcaoSelected.checked = false;
	        	if (opcaoSelected.classList.contains("pai")) {
	        		bloqueiaOpcoesFilhas(opcaoSelected.id);
	        	}
        	}
        }
    });
}

function deletePermissao(id){
	ok = confirm("Atenção:\nAo excluir uma permissão, todos os usuários que a utilizam ficarão impossibilitados de acessar o sistema.\n\nDeseja continuar?")
	if (ok) {
		idpermissao = id.replace("btdelete-","");
		execRequestAjax('op16', 'idpermissao='+idpermissao+'&acao=delete', '', 'returnValue', concluirDeletePermissao);
	}else{
		alert('Ação cancelada!');
	}
}

function concluirDeletePermissao(jsonData){
   	execRequestAjax('op14', '', 'conteudo');
	retorno = JSON.parse(jsonData);
	if (retorno["COD_ERRO"] == 200) {
		alert('Opção removida! Todos os usuários que tinham a permissão ficarão bloqueados ao acessar o sistema!');
	}else{
		alert(retorno["TEXTO_MSG"]);
	}
	clearPainelPermissao();
}

function clearPainelPermissao(){
	opcoes = document.querySelectorAll(".opcao");
	opcoes.forEach((opcao)=>{
		opcao.checked = false;
	});
}

function cancelEdicaoPermissao(){
	clearPainelPermissao();
	hideItem("painel-permissoes");
}

function savePermissao(){
	var idpermissao = document.querySelector("#idpermissao").value;
	var permissao = document.querySelector("#permissao").value;
	var itensJson = '{';
	var inicio = true;
	opcoes = document.querySelectorAll(".opcao");
	opcoes.forEach((opcao)=>{
		if (inicio) {
			if ((opcao.checked)||(idpermissao == 1)) {
				itensJson += '"' + opcao.id + '":1';
			}else{
				itensJson += '"' + opcao.id + '":0';
			}
		}else{
			if ((opcao.checked)||(idpermissao == 1)) {
				itensJson += ',"' + opcao.id + '":1';
			}else{
				itensJson += ',"' + opcao.id + '":0';
			}
		}
		inicio = false;
	});
	itensJson += '}';
	execRequestAjax('op16', 'idpermissao='+idpermissao+'&acao=save&permissao='+permissao+'&itens='+itensJson, '', 'returnValue', concluirSavePermissao);
}

function concluirSavePermissao(jsonData){
   	execRequestAjax('op14', '', 'conteudo');
	retorno = JSON.parse(jsonData);
	if (retorno["COD_ERRO"] == 200) {
		alert('Opção alterada com sucesso!');
	}else{
		alert(retorno["TEXTO_MSG"]);
	}
	clearPainelPermissao();
}

function addPermissao(){
	permissao = document.querySelector("#permissaoadd").value;
	permissao = permissao.trim();
	if (permissao !== '') {
		var itensJson = '{';
		var inicio = true;
		opcoes = document.querySelectorAll(".opcao");
		opcoes.forEach((opcao)=>{
			if (inicio) {
				itensJson += '"' + opcao.id + '":0';
			}else{
				itensJson += ',"' + opcao.id + '":0';
			}
			inicio = false;
		});
		itensJson += '}';
		execRequestAjax('op16', 'idpermissao=0&acao=add&permissao='+permissao+'&itens='+itensJson, '', 'returnValue', concluirAddPermissao);
	}else{
		alert('Para concluir é necessário informar um nome para a permissão.');
	}
}

function concluirAddPermissao(jsonData){
   	execRequestAjax('op14', '', 'conteudo');
	retorno = JSON.parse(jsonData);
	if (retorno["COD_ERRO"] == 200) {
		alert('Opção adicionada com sucesso!');
	}else{
		alert(retorno["TEXTO_MSG"]);
	}
	clearPainelPermissao();
	$("#modalPermissao").modal('hide');
}

function desmarcaPermissoesFilhas(opcaoPai){
	opcoesFilho = document.querySelectorAll(".filho");
	if (opcaoPai.checked) {
		opcoesFilho.forEach((opcaoFilho)=>{
			//item = opcaoFilho.id.substring(5,0);
			op = opcaoFilho.id.substring(5,0);
			item = op.replace("f","p")
			if (item == opcaoPai.id) {
				unblockItem(opcaoFilho.id);
			}
		});
	}else{
		opcoesFilho.forEach((opcaoFilho)=>{
			//item = opcaoFilho.id.substring(5,0);
			op = opcaoFilho.id.substring(5,0);
			item = op.replace("f","p")
			if (item == opcaoPai.id) {
				opcaoFilho.checked = false;
				blockItem(opcaoFilho.id);
			}
		});
	}
}

function desbloqueiaOpcoesFilhas(idOpcaoPai){
	opcoesFilho = document.querySelectorAll(".filho");
	opcoesFilho.forEach((opcaoFilho)=>{
		op = opcaoFilho.id.substring(5,0);
		item = op.replace("f","p")
		if (item == idOpcaoPai) {
			unblockItem(opcaoFilho.id);
		}
	});
}

function bloqueiaOpcoesFilhas(idOpcaoPai){
	opcoesFilho = document.querySelectorAll(".filho");
	opcoesFilho.forEach((opcaoFilho)=>{
		op = opcaoFilho.id.substring(5,0);
		item = op.replace("f","p")
		if (item == idOpcaoPai) {
			blockItem(opcaoFilho.id);
		}
	});
}



/* res_pc_informacoes_detalhado.php */
/* res_pc_informacoes_simplificado.php */
/* res_pc_informacoes_numeros.php */
function cbListaInfoDetalhado(chamada='informacoes-detalhado'){

    switch (chamada) {

      case "informacoes-detalhado":
		execRequestAjax('op36','idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('idregiao').value, 'container-requisicao', 'returnHtml', carregaContainerAcoes, '', 'loading-local');
		break;

      case "informacoes-simplificado":
		execRequestAjax('op30','idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('idregiao').value, 'container-requisicao', 'returnHtml', carregaContainerAcoes, '', 'loading-local');
		break;

      case "informacoes-numeros":
		execRequestAjax('op29','idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('idregiao').value, 'container-requisicao', 'returnHtml', carregaContainerAcoes, '', 'loading-local');
		break;

      default:
		alert('Erro na seleção!');

    }

}



/* res_pc_eventos_inscricaointerna.php */
/* res_pc_informacoes_detalhado.php */
/* res_pc_informacoes_simplificado.php */
/* res_pc_informacoes_numeros.php */
function cbLocalizaEventosInfoAno(chamada='eventos-inscricaointerna'){
    
    switch (chamada) {

      case "eventos-inscricaointerna":
		execRequestAjax('op34','acaoInscricaoInterna=lista-eventos-ano&ano='+document.getElementById('ano').value,'idevento');
		execRequestAjax('op4','','container-requisicao');
		document.getElementById('idevento').innerHTML='';
		document.getElementById('idregiao').innerHTML='';
		document.getElementById('idlocal').innerHTML='';
		document.getElementById('idacao').innerHTML='';
      	break;

      case "informacoes-detalhado":
		if (document.getElementById('idregiao').value > 0) {
			execRequestAjax('op39','acaoExec=lista-eventos-ano&ano='+document.getElementById('ano').value+'&idregiao='+document.getElementById('idregiao').value,'idevento');
			execRequestAjax('op4','','container-requisicao');
		}else{
			document.getElementById('idevento').innerHTML='';
		}
      	break;

      case "informacoes-simplificado":
		if (document.getElementById('idregiao').value > 0) {
			execRequestAjax('op39','acaoExec=lista-eventos-ano&ano='+document.getElementById('ano').value+'&idregiao='+document.getElementById('idregiao').value,'idevento');
			execRequestAjax('op4','','container-requisicao');
		}else{
			document.getElementById('idevento').innerHTML='';
		}
      	break;

      case "informacoes-numeros":
		if (document.getElementById('idregiao').value > 0) {
			execRequestAjax('op39','acaoExec=lista-eventos-ano&ano='+document.getElementById('ano').value+'&idregiao='+document.getElementById('idregiao').value,'idevento');
			execRequestAjax('op4','','container-requisicao');
		}else{
			document.getElementById('idevento').innerHTML='';
		}
      	break;

      default:
		alert('Erro na seleção!');

    }
	
}

function cbLocalizaRegioesInfoEvento(chamada='eventos-inscricaointerna'){
	
	switch (chamada){

		case "eventos-inscricaointerna":
			execRequestAjax('op34','acaoInscricaoInterna=lista-regioes-evento&idevento='+document.getElementById('idevento').value,'idregiao');
			execRequestAjax('op4','','container-requisicao');
			document.getElementById('idregiao').innerHTML='';
			document.getElementById('idlocal').innerHTML='';
			document.getElementById('idacao').innerHTML='';
			break;

		default:
			alert('Erro na seleção!');

	}

}

function cbLocalizaRegioesInfoEventoRestrito(chamada='eventos-inscricaointerna'){

	switch (chamada) {

		case "eventos-inscricaointerna":
			execRequestAjax('op34','acaoInscricaoInterna=lista-regioes-evento-restrito&idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('idregiao-restrito').value,'idregiao');
			execRequestAjax('op34','acaoInscricaoInterna=lista-locais-evento-restrito&idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('idregiao-restrito').value+'&idorgao='+document.getElementById('idorgao-restrito').value, 'idlocal', 'returnHtml', cbLocalizaAcoesInfoLocalRestrito);
			execRequestAjax('op4','','container-requisicao');
			break;

		case "eventos-confirmarfrequencia":
			execRequestAjax('op34','acaoInscricaoInterna=lista-regioes-evento-restrito&idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('idregiao-restrito').value,'idregiao');
			execRequestAjax('op34','acaoInscricaoInterna=lista-locais-evento-restrito&idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('idregiao-restrito').value+'&idorgao='+document.getElementById('idorgao-restrito').value, 'idlocal', 'returnHtml', cbLocalizaAcoesInfoLocalRestrito, 'eventos-confirmarfrequencia');
			execRequestAjax('op4','','container-requisicao');
			break;

	}
			
}

function cbLocalizaRegioesInfoEventoRestritoRegiao(chamada='eventos-inscricaointerna'){

	switch (chamada) {

		case "eventos-inscricaointerna":
			execRequestAjax('op34','acaoInscricaoInterna=lista-regioes-evento-restrito&idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('idregiao-restrito').value,'idregiao');
			execRequestAjax('op34','acaoInscricaoInterna=lista-locais-evento&idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('idregiao-restrito').value+'&idorgao='+document.getElementById('idorgao-restrito').value, 'idlocal', 'returnHtml', cbLocalizaAcoesInfoLocalRestrito);
			execRequestAjax('op4','','container-requisicao');
			break;

		default:
			alert('Erro na seleção!');

	}

}

function cbLocalizaAcoesInfoLocalRestrito(idlocal='',value='',chamada='eventos-inscricaointerna'){

	switch (chamada) {

		case "eventos-inscricaointerna":
			document.getElementById(idlocal).innerHTML=value;
			execRequestAjax('op34','acaoInscricaoInterna=lista-acoes-evento&idevento='+document.getElementById('idevento').value+'&idlocal='+document.getElementById('idlocal').value,'idacao');
			execRequestAjax('op4','','container-requisicao');
			break;

		case "eventos-confirmarfrequencia":
			document.getElementById(idlocal).innerHTML=value;
			execRequestAjax('op34','acaoInscricaoInterna=lista-acoes-confirmarfrequencia&idevento='+document.getElementById('idevento').value+'&idlocal='+document.getElementById('idlocal').value,'idacao');
			execRequestAjax('op4','','container-requisicao');
			break;
	
	}

}

function cbLocalizaLocaisInfoRegiao(chamada='eventos-inscricaointerna'){
	
	switch (chamada) {

		case "eventos-inscricaointerna":
			execRequestAjax('op34','acaoInscricaoInterna=lista-locais-evento&idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('idregiao').value, 'idlocal');
			execRequestAjax('op4','','container-requisicao');
			document.getElementById('idlocal').innerHTML='';
			document.getElementById('idacao').innerHTML='';
			break;

		case "informacoes-detalhado":
			execRequestAjax('op36','idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('idregiao').value, 'container-requisicao');
			break;

		default:
			alert('Erro na seleção!');

	}

}

function cbLocalizaAcoesInfoLocal(chamada='eventos-inscricaointerna'){

	switch (chamada) {

		case "eventos-inscricaointerna":
			execRequestAjax('op34','acaoInscricaoInterna=lista-acoes-evento&idevento='+document.getElementById('idevento').value+'&idlocal='+document.getElementById('idlocal').value,'idacao');
			execRequestAjax('op4','','container-requisicao');
			document.getElementById('idacao').innerHTML='';
			break;

		case "eventos-confirmarfrequencia":
			execRequestAjax('op34','acaoInscricaoInterna=lista-acoes-confirmarfrequencia&idevento='+document.getElementById('idevento').value+'&idlocal='+document.getElementById('idlocal').value,'idacao');
			execRequestAjax('op4','','container-requisicao');
			document.getElementById('idacao').innerHTML='';
			break;
	
	}

}

function cbIniciaInscricaoInfoAcao(){
	execRequestAjax('op35','idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('idregiao').value+'&idlocal='+document.getElementById('idlocal').value+'&idacao='+document.getElementById('idacao').value+'&temaacao='+document.querySelector('#idacao').options[document.querySelector('#idacao').selectedIndex].text, 'container-requisicao');
}



/* res_pc_eventos_inscricaointerna_inscricao.php */
function deleteInscrito(idInscrito,idEvento,idLocal,idAcao){
	execRequestAjax('op34','acaoInscricaoInterna=delete-inscrito&idevento='+idEvento+'&idlocal='+idLocal+'&idacao='+idAcao+'&idinscrito='+idInscrito,'corpo-inscritos-acao');
	document.querySelector('#insc-add-matricula').value = '';
	document.querySelector('#insc-add-matricula').focus();
}

function cancelarInscricoesDaAcao(){
	execRequestAjax('op34','acaoInscricaoInterna=delete-todos-inscritos&idevento='+document.querySelector('#idevento').value+'&idregiao='+document.querySelector('#idregiao').value+'&idlocal='+document.querySelector('#idlocal').value+'&idacao='+document.querySelector('#idacao').value,'corpo-inscritos-acao');
	document.querySelector('#insc-add-matricula').value = '';
	document.querySelector('#insc-add-matricula').focus();
}

function atualizaDadosInscritos(){
	var inscritos = document.querySelectorAll('.inscrito');
	var items = '';
	inscritos.forEach((inscrito)=>{
		var email = document.getElementById('insc-email['+inscrito.value+']').value;
		var telcontato = document.getElementById('insc-telcontato['+inscrito.value+']').value;
		var idservidor = document.getElementById('insc-idservidor['+inscrito.value+']').value;
		var item = '{"idinscrito":'+inscrito.value+',"idservidor":'+idservidor+',"email":"'+email+'","telcontato":"'+telcontato+'"}';
		if (items == '') {
			items = '[' + item;
		}else{
			items += ',' + item;
		}
	});
	items += ']';

	execRequestAjax('op34','acaoInscricaoInterna=atualiza-dados-inscritos&idevento='+document.querySelector('#idevento').value+'&idlocal='+document.querySelector('#idlocal').value+'&idacao='+document.querySelector('#idacao').value+'&items='+items,'corpo-inscritos-acao');
	document.querySelector('#insc-add-matricula').value = '';
	document.querySelector('#insc-add-matricula').focus();
	alert('Mudanças confirmadas!');
}

function validarEmailsTelsImprimeLista(chamada = 'inscricao-interna'){
	
	switch (chamada) {

		case "inscricao-interna":
			var inscritos = document.querySelectorAll('.inscrito');
			var ok = true;
			inscritos.forEach((element)=>{
				elEmailAntigo = document.getElementById(element.id.replace("insc-id","insc-email-antigo"));
				elTelAntigo = document.getElementById(element.id.replace("insc-id","insc-telcontato-antigo"));
				elEmail = document.getElementById(element.id.replace("insc-id","insc-email"));
				elTel = document.getElementById(element.id.replace("insc-id","insc-telcontato"));
				if ((elEmailAntigo.value !== elEmail.value)||(elTelAntigo.value !== elTel.value)) {ok = false;};
			});

			if (ok) {
				abreLinkNovaAba('impressao.php?chamada=3');
			}else{
				atualizaDadosInscritos();
				abreLinkNovaAba('impressao.php?chamada=3');
			};
			break;

		case "confirmar-presenca":
			abreLinkNovaAba('impressao.php?chamada=3');
			break;
	
	}

}

function verifMudanca(element){
	if (element.id.substring(6,0) == 'insc-e') {
		elEmailAntigo = document.getElementById(element.id.replace("insc-email","insc-email-antigo"));
		elTelAntigo = document.getElementById(element.id.replace("insc-email","insc-telcontato-antigo"));
		elEmail = element;
		elTel = document.getElementById(element.id.replace("insc-email","insc-telcontato"));
		modifIdElemento = element.id.replace("insc-email","insc-confirmado");
	}else{
		elEmailAntigo = document.getElementById(element.id.replace("insc-telcontato","insc-email-antigo"));
		elTelAntigo = document.getElementById(element.id.replace("insc-telcontato","insc-telcontato-antigo"));
		elEmail = document.getElementById(element.id.replace("insc-telcontato","insc-email"));
		elTel = element;
		modifIdElemento = element.id.replace("insc-telcontato","insc-confirmado");
	}

	if ((elEmailAntigo.value === elEmail.value)&&(elTelAntigo.value === elTel.value)) {
		document.getElementById(modifIdElemento).innerHTML = '<span class="oi oi-check ativo-yes"></span>';
	}else{
		document.getElementById(modifIdElemento).innerHTML = '<span class="oi oi-x ativo-no"></span>'
	}
}

function execInscricao(){
	if (document.querySelector('#insc-add-dataescolhida').value == '') {
		alert('Informe a data definida pela unidade para execução desta ação!');
		document.querySelector('#insc-add-dataescolhida').focus();
	}else if (document.querySelector('#insc-add-matricula').value == '') {
		alert('Informe a matrícula do servidor!');
		document.querySelector('#insc-add-matricula').focus();
	}else{
		execRequestAjax('op34','acaoInscricaoInterna=inscricao-servidor'+getDadosInscreverServidor(),'corpo-inscritos-acao','',concluirInscricaoServidor);
	}
}

function getDadosInscreverServidor(){
	var dados = '&idlocal='+document.querySelector('#idlocal').value;
	dados += '&idregiao='+document.querySelector('#idregiao').value;
	var tip = document.getElementById("idlocal");
	dados += '&tipolocal='+tip.options[tip.options.selectedIndex].getAttribute('data-tipolocal');
	dados += '&idevento='+document.querySelector('#idevento').value;
	dados += '&idacao='+document.querySelector('#idacao').value;
	dados += '&matricula='+document.querySelector('#insc-add-matricula').value;
	dados += '&dataescolhida='+document.querySelector('#insc-add-dataescolhida').value;
	return dados;
}

function concluirInscricaoServidor(ret){

    retorno = ret.trim();

    switch (retorno) {

      case "matricula":
		alert('Matrícula não encontrada!');
		document.querySelector('#insc-add-matricula').focus();
      	break;

      case "data":
		alert('A data definida para a execução da ação é inválida!');
		document.querySelector('#insc-add-dataescolhida').focus();
      	break;

      case "periodo":
		alert('A data definida para a execução da ação está fora do período determinado!');
		document.querySelector('#insc-add-dataescolhida').focus();
      	break;

      case "inscrito":
		alert('O servidor informado já está inscrito nesta ação!');
		document.querySelector('#insc-add-matricula').focus();
      	break;

      default:
		document.querySelector('#corpo-inscritos-acao').innerHTML = ret;

    }

}



/* res_pc_usuarios_cadservidores.php */
// Seleciona os órgãos para lotação de servidores de acordo com a região
// "numCadastro pode ser 1 ou 2 (direciona para o cadastro da matrícula que pode ser 1 ou 2)"
function cbLocalizaListaOrgaosInfoRegiao(numCadastro){
	execRequestAjax('op38','acaoCadServidores=lista-orgaos&idregiao='+document.getElementById('idregiao'+numCadastro).value,'idorgao'+numCadastro);
}

function validaCadUsuario(){
	var valida = true;
	if (document.querySelector('#nomeservidor').value.trim() == '') {
		addClass('nomeservidor', 'campo-erro');
		valida = false;
	}else{
		removeClass('nomeservidor', 'campo-erro')
	}

	if (document.querySelector('#cpf').value.trim() == '') {
		addClass('cpf', 'campo-erro');
		valida = false;
	}else{
		removeClass('cpf', 'campo-erro')
	}

	if (document.querySelector('#matricula1').value.trim() == '') {
		addClass('matricula1', 'campo-erro');
		valida = false;
	}else{
		removeClass('matricula1', 'campo-erro')
	}


	return valida;
}

function limpaCadUsuario(){
	document.querySelector('#nomeservidor').value = '';
	document.querySelector('#cpf').value = '';
	document.querySelector('#matricula1').value = '';
	document.querySelector('#cargo1').selectedIndex = 0;
	document.querySelector('#funcao1').value = '';
	document.querySelector('#idregiao1').selectedIndex = 0;
	document.querySelector('#idorgao1').innerHTML = '';
	document.querySelector('#ativamat1').checked = false;
	document.querySelector('#matricula2').value = '';
	document.querySelector('#cargo2').selectedIndex = 0;
	document.querySelector('#funcao2').value = '';
	document.querySelector('#idregiao2').selectedIndex = 0;
	document.querySelector('#idorgao2').innerHTML = '';
	document.querySelector('#ativamat2').checked = false;

	removeClass('nomeservidor', 'campo-erro')
	removeClass('cpf', 'campo-erro')
	removeClass('matricula1', 'campo-erro')
	removeClass('cargo1', 'campo-erro')
	removeClass('funcao1', 'campo-erro')
	removeClass('idregiao1', 'campo-erro')
	removeClass('idorgao1', 'campo-erro')
	removeClass('matricula2', 'campo-erro')
	removeClass('cargo2', 'campo-erro')
	removeClass('funcao2', 'campo-erro')
	removeClass('idregiao2', 'campo-erro')
	removeClass('idorgao2', 'campo-erro')
}

function localizaServidor(){
	var matricula = document.querySelector('#matricula').value;
	var cpf = document.querySelector('#cpf').value;
	var nome = document.querySelector('#nome-servidor').value;
	if ((matricula.length < 3)&&(matricula.length > 0)) {
		alert('Informe pelo menos 3 dígitos da matrícula do servidor para continuar!');
	}else if ((cpf.length < 3)&&(cpf.length > 0)) {
		alert('Informe pelo menos 3 dígitos do CPF do servidor para continuar!');
	}else if ((nome.length < 3)&&(nome.length > 0)) {
		alert('Informe pelo menos 3 caracteres do nome do servidor para continuar!');
	}else{
		execRequestAjax('op38','acaoCadServidores=busca-servidor&matricula='+matricula+'&cpf='+cpf+'&nomeservidor='+nome, 'corpo-tabela-servidores');
	}
}

function limpaDemaisCampos(campoInformado){
	if (campoInformado.id == 'matricula') {
		document.querySelector('#cpf').value = '';
		document.querySelector('#nome-servidor').value = '';
	}else if (campoInformado.id == 'cpf') {
		document.querySelector('#matricula').value = '';
		document.querySelector('#nome-servidor').value = '';
	}else if (campoInformado.id == 'nome-servidor') {
		document.querySelector('#cpf').value = '';
		document.querySelector('#matricula').value = '';
	}
}


/* res_pc_ferramentas_unidades.php */
function execListaUnidades(){
	execRequestAjax('op28', 'idregiao='+document.getElementById('idregiao').value+'&tipo='+document.getElementById('tipo-unidade').value+'&ordem='+document.getElementById('ordem').value, 'container-requisicao', 'returnHtml', carregaContainerAcoes, '', 'loading-local');
}


/* res_pc_ferramentas_cadlocais.php */
function execListaCadLocais(){
	execRequestAjax('op40', 'idregiao='+document.getElementById('idregiao').value+'&tipo='+document.getElementById('tipo-unidade').value+'&ordem='+document.getElementById('ordem').value, 'container-requisicao');
}