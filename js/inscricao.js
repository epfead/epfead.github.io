//=========================
// *** Requisições Ajax ***
//=========================

// Variáveis de ambiente global
var valueIdEvento;

// Seta o id do evento
function setIdEvento(idEvento) {
  valueIdEvento = idEvento;
  document.getElementById('idevento').value = idEvento;
}

// Função de chamada
// Faz uma chamada através do arquivo de recurso res_inscricao.php
// que redireciona ao objeto instanciado da classe "Inscricao.php"
function ajxCallFunction(fn){
    
    // Define o qrquivo de recursos que fará as chamadas de funções da classe "Inscricao.php"
    var urlResourceFile = 'resource/res_inscricao.php';
    
    // Variável que recebe e define os parâmetros da função a ser chamada
    var params = 'call='+fn+'&idevento='+valueIdEvento;
    
    // Recebe a função JS local que será chamada após a conclusão da chamada Ajax
    var callJsFunction = '';
    
    // Recebe o id do elemento que receberá as informações do retorno da chamada Ajax
    var idElement = '';

    // Recebe o id da animação de "loading" a ser executada durante a chamada Ajax
    var idLoading = '';

    switch(fn){
        case 'getInfoUsuarioJaInscrito':
            params += '&fn=getInfoUsuarioJaInscrito('+valueIdEvento+',"'+document.getElementById('matricula').value+'")';
            callJsFunction = carregaCamposUsuario;
            idLoading = 'loading-matricula';
            execRequestAjaxFunction(urlResourceFile, params, callJsFunction, idElement, idLoading);
            break;
  
        case 'getOptionsLotacoes':
            params += '&fn=getOptionsLotacoes('+document.getElementById('idregiao-lotacao').value+')';
            callJsFunction = carregaContainerSelectDesignacao;
            idElement = 'iddesignacao-lotacao';
            idLoading = 'loading-idregiao-lotacao';
            execRequestAjaxFunction(urlResourceFile, params, callJsFunction, idElement, idLoading);
            break;

        case 'getOptionsRegioesDoEvento':
            params += '&fn=getOptionsRegioesDoEvento('+document.getElementById('tipolocal').value+')';
            callJsFunction = carregaContainerSelectRegiao;
            idElement = 'regiao';
            idLoading = 'loading-tipolocal';
            execRequestAjaxFunction(urlResourceFile, params, callJsFunction, idElement, idLoading);
            break;

        case 'getOptionsLocaisDoEvento':
            params += '&fn=getOptionsLocaisDoEvento('+document.getElementById('regiao').value+','+document.getElementById('tipolocal').value+')';
            callJsFunction = carregaContainerSelectLocal;
            idElement = 'local';
            idLoading = 'loading-tipolocal';
            execRequestAjaxFunction(urlResourceFile, params, callJsFunction, idElement, idLoading);
            break;

        case 'getAcoesDoEvento':
            params += '&fn=getAcoesDoEvento('+document.getElementById('local').value+')';
            callJsFunction = carregaContainerAcoes;
            idElement = 'acoes';
            idLoading = 'loading-acoes';
            execRequestAjaxFunction(urlResourceFile, params, callJsFunction, idElement, idLoading);
            break;

        case '':
            break;

        default:
            alert('Desculpe, algo saiu errado!');
    }

}


// Executa requisições Ajax
function execRequestAjaxFunction(urlResourceFile, params, callJsFunction, idElement='', idLoading=''){
    $(document).ready( function(){

        $.ajax({

            url: urlResourceFile + '?' + params,

            success: function(data){
                if (idElement == '') {
                    callJsFunction(data);
                }else{
                    callJsFunction(idElement, data);
                }
            },

            beforeSend: function(){
                if (idLoading != '') { showItem(idLoading) };
            },

            complete: function(){
                if (idLoading != '') { hideItem(idLoading) };
            }

        });

    });
};


// Recebe as informações de Designações para o select
function carregaContainerSelectDesignacao(idElement, data){
    var element = document.getElementById(idElement);
    element.innerHTML = data;
    unblockItem('iddesignacao-lotacao');
}


// Recebe as informações das regiões do evento para o select
function carregaContainerSelectRegiao(idElement, data){
    var element = document.getElementById(idElement);
    element.innerHTML = data;
    unblockItem('regiao');
    blockItem('local');
    hideItem('formulario-parte2-oculta');
    hideItem('formulario-parte3-oculta');
}


// Recebe as informações dos locais do evento para o select
function carregaContainerSelectLocal(idElement, data){
    var element = document.getElementById(idElement);
    element.innerHTML = data;
    unblockItem('local');
    hideItem('formulario-parte2-oculta');
    hideItem('formulario-parte3-oculta');
}


// Recebe as informações das ações do evento
function carregaContainerAcoes(idElement, data){
    var element = document.getElementById(idElement);
    element.innerHTML = data;
    showItem('formulario-parte2-oculta');
    showItem('formulario-parte3-oculta');
}


// Recebe as informações do usuário via Ajax e adiciona no formulário
function carregaCamposUsuario(dataJson){

    var objJson = JSON.parse(dataJson);
    var valueIdUsuario = objJson.SERVIDOR.SERVIDOR_ID;
    var modoFormulario = 'ADD';

    if (objJson.SERVIDOR.SERVIDOR_ID == -1){

          hideItem('formulario-parte1-oculta'); 
          blockItem('local'); 
          blockItem('regiao');
          alert('A matrícula informada não foi encontrada.');
          document.getElementById('matricula').focus();
    
    }else{

        if (objJson.SERVIDOR.MODO == 'ADD') {

            document.getElementById('idservidor').value = objJson.SERVIDOR.SERVIDOR_ID;
            document.getElementById('nomeservidor').value = objJson.SERVIDOR.NOME_SERVIDOR;
            document.getElementById('email').value = objJson.SERVIDOR.EMAIL;
            document.getElementById('telcontato').value = objJson.SERVIDOR.TEL_CONTATO;
            
            if (document.getElementById('matricula').value == objJson.SERVIDOR.MATRICULA1) {
                document.getElementById('cargo').value = objJson.SERVIDOR.CARGO_MAT1;   
                document.getElementById('funcao').value = objJson.SERVIDOR.FUNCAO_MAT1; 
            }else{
                document.getElementById('cargo').value = objJson.SERVIDOR.CARGO_MAT2;   
                document.getElementById('funcao').value = objJson.SERVIDOR.FUNCAO_MAT2; 
            }
            
            showItem('formulario-parte1-oculta'); 
            document.getElementById('funcao').focus(); 
            blockItem('local'); 
            blockItem('regiao');
            blockItem('nomeservidor');
            blockItem('cargo');
            blockItem('matricula');
            blockItem('iddesignacao-lotacao');

            modoFormulario = 'ADD';

        }else{

            hideItem('formulario-parte1-oculta'); 
            blockItem('local'); 
            blockItem('regiao');
            $('#modalAviso').modal();
            document.getElementById('matricula').focus();

        }

    }

}




//============================
// *** Ações do formulário ***
//============================

// Ações do botão de confirmação para editar inscrição
function btnConfirmaEditarInscricao(){
    document.querySelector('#matriculaedit').value = document.getElementById('matricula').value;
    document.querySelector('#ideventoedit').value = document.getElementById('idevento').value;
    document.querySelector('#form-editar').submit();
}

// Cancela inscrição e retorna para a home
function cancelAndReturnToHome(){
    window.location.href = 'redireciona.php';
}

// Confirma envio de formulário
function submitAndReturnToHome(){
    if (validaFormulario()) {
        document.querySelector('#form-inscricao').submit();
    }
}

// Valida se os campos do formulário foram preenchidos e retorna
// true ou false para liberar ou não o submit do form.
function validaFormulario(){
    // inputs
    var p_matricula = document.getElementById('matricula').value;
    var p_nomeservidor = document.getElementById('nomeservidor').value;
    var p_cargo = document.getElementById('cargo').value;
    var p_funcao = document.getElementById('funcao').value;
    var p_email = document.getElementById('email').value;
    var p_telcontato = document.getElementById('telcontato').value;

    // selects
    var p_regiao_lotacao = document.getElementById('idregiao-lotacao').value;
    var p_designacao_lotacao = document.getElementById('iddesignacao-lotacao').value;
    var p_tipolocal = document.getElementById('tipolocal').value;
    var p_regiao = document.getElementById('regiao').value;
    var p_local = document.getElementById('local').value;

    // apoio
    var validateInputs = false;
    var validatePersonalSelects = false;
    var validateEventOptionsSelects = false;
    var validateActions = false;


    if ((p_matricula == '')||(p_nomeservidor == '')||(p_cargo == '')||
        (p_funcao == '')||(p_email == '')||(p_telcontato == '')) {
        validateInputs = false;
    }else{
        validateInputs = true;
    }

    if ((p_regiao_lotacao == 0)||(p_designacao_lotacao == 0)) {
        validatePersonalSelects = false;
    }else{
        validatePersonalSelects = true;
    }

    if ((p_tipolocal == "")||(p_regiao == 0)||(p_local == 0)) {
        validateEventOptionsSelects = false;
    }else{
        validateEventOptionsSelects = true;
    }


    var actionsList = document.body.querySelectorAll(".idacao");
    for (let i = 0; i < actionsList.length; i++) {
        action = document.getElementById(actionsList[i].id);
        if (action.checked == true) {validateActions = true;}
    }

    
    if (!validateInputs) {
        alert('Verifique se sua função, e-mail e telefone estão corretos antes de continuar.');
    }else if (!validatePersonalSelects) {
        alert('Verifique se sua CRE e designação de lotação foram selecionados.');
    }else if (!validateEventOptionsSelects) {
        alert('Verifique se o "ambiente", a "região" e o "local" escolhidos correspondem com sua preferência antes de continuar.');
    }else if (!validateActions) {
        alert('É necessário selecionar pelo menos uma ação para continuar.');
    }


    var retorno = validateInputs && validatePersonalSelects && validateEventOptionsSelects && validateActions;

    if (retorno == true) {
        unblockItem('matricula');
        unblockItem('nomeservidor');
    }

    return retorno;

}


