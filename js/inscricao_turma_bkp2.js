//=========================
// *** Requisições Ajax ***
//=========================

// Executa as funções de requisição via Ajax
// opcao: string que define o arquivo que será chamado na função "urlOpcaoMenu()";
// params: string com os parâmetros a serem passados via GET;
// idElement: id do elemento que receberá o retorno AJAX;
// typeAction define que tipo de ação tomar sendo:
// 'returnHtml'  : retorna um Html que será inserido em algum local definido em 'idElement';
// 'returnValue' : retorna um valor ou conjnto de dados a ser trabalhado em um módulo;
// execFunction define qual função executar após o retorno Ajax;
// 'paramFunction' : define os parâmetros a serem passados com a função informada em execFunction;
// 'idLoading' : informe o id do elemento responsável por exibir a animação de aguardando
function execRequestAjax(opcao, params, idElement='', typeAction = 'returnHtml', execFunction = carregaContainerAcoes, paramFunction = '', idLoading = ''){
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
                }else if (typeAction == 'execute') {
                    execFunction();
                }else{
                    execFunction(data);
                }
            },

            beforeSend: function(){
                if (idLoading != '') { showItem(idLoading); }
            },

            complete: function(){
                if (idLoading != '') { hideItem(idLoading); }
            }

        });

    });

};

// Chamada pela função "execRequestAjax" quando o parâmetro "typeAction" está setado com 
// o valor "returnHtml", insere o retorno no container informado no parâmetro "idElement"
function carregaContainerAcoes(idContainer, htmlAcoes){
    document.getElementById(idContainer).innerHTML = htmlAcoes;
}

// Define a URL de chamada pela função "execRequestAjax" definido no parâmetro "opcao"
function urlOpcaoMenu(opcao){

    switch (opcao) {

        case 'op0':
            // Chama o arquivo de recursos para a página inscricao_turma.php
            return 'resource/res_inscricao_turma_acao.php';
            break;

        case 'op1':
            return '';
            break;

        default:
            return '';
            break;

    }

}

// Verifica se o usuário já está inscrito no evento
function infoUsuarioJaInscrito(){
  execRequestAjax('op0', 'acao=verif-usuario-inscrito'+'&idevento='+document.getElementById('idevento').value+'&matricula='+document.getElementById('matricula').value, '', '', carregaCamposUsuario, '', 'loading-matricula');
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
            document.getElementById('email-inst').value = objJson.SERVIDOR.EMAIL_INST;
            document.getElementById('telcontato').value = objJson.SERVIDOR.TEL_CONTATO;

            if (document.getElementById('matricula').value == objJson.SERVIDOR.MATRICULA1) {
                document.getElementById('cargo').value = objJson.SERVIDOR.CARGO_MAT1;   
                document.getElementById('funcao').value = objJson.SERVIDOR.FUNCAO_MAT1; 
            }else{
                document.getElementById('cargo').value = objJson.SERVIDOR.CARGO_MAT2;   
                document.getElementById('funcao').value = objJson.SERVIDOR.FUNCAO_MAT2; 
            }
            
            showItem('formulario-parte1-oculta'); 
            hideItem('formulario-parte2-oculta');
            hideItem('formulario-parte3-oculta');
            hideItem('formulario-parte4-oculta');

            document.getElementById('tipolocal').selectedIndex = 0;
            document.getElementById('iddesignacao-lotacao').innerHTML = '';
            document.getElementById('email').focus(); 
            
            blockItem('local'); 
            blockItem('regiao');
            blockItem('nomeservidor');
            blockItem('cargo');
            blockItem('funcao');
            blockItem('matricula');
            blockItem('email-inst');
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

// Busca a lista de lotações de uma região
function listaLotacoesInfoRegiao(){
  execRequestAjax('op0', 'acao=lista-lotacoes'+'&idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('idregiao-lotacao').value, 'iddesignacao-lotacao', 'returnHtml', carregaContainerSelectDesignacao, 'loading-idregiao-lotacao');
}

// Recebe as informações de Designações para o select
function carregaContainerSelectDesignacao(idElement, data){
    document.getElementById(idElement).innerHTML = data;
    hideItem('formulario-parte2-oculta');
    hideItem('formulario-parte3-oculta');
    hideItem('formulario-parte4-oculta');
    document.getElementById('tipolocal').selectedIndex = 0;
    if (document.getElementById('idregiao-lotacao').value <= 0) {
        blockItem('iddesignacao-lotacao');
    }else{
        unblockItem('iddesignacao-lotacao');
    }
}

// Libera a escolha do local
function liberaEscolhaLocal(caracteristica = 1,idRegiaoAbrangencia=0){
    hideItem('formulario-parte3-oculta');
    hideItem('formulario-parte4-oculta');
    blockItem('regiao');
    blockItem('local');
    document.getElementById('regiao').innerHTML = '';
    document.getElementById('local').innerHTML = '';
    document.getElementById('tipolocal').selectedIndex = 0;
    if (document.getElementById('iddesignacao-lotacao').value <= 0) {
        hideItem('formulario-parte2-oculta');
        blockItem('tipolocal');
    }else{
        showItem('formulario-parte2-oculta');
        unblockItem('tipolocal');
        if (caracteristica == 1) {
            document.getElementById('tipolocal').focus();
        }else if(caracteristica == 2) {
            listaRegioesInfoTipoLocal(idRegiaoAbrangencia);
            document.getElementById('regiao').focus();
        }
    }
}

// Busca a lista de regiões do evento para o select
function listaRegioesInfoTipoLocal(idRegiaoAbrangencia=0){
  execRequestAjax('op0', 'acao=lista-regioes-do-evento'+'&idevento='+document.getElementById('idevento').value+'&tipolocal='+document.getElementById('tipolocal').value+'&idregiao-abrangencia='+idRegiaoAbrangencia, 'regiao', 'returnHtml', carregaContainerSelectRegiao, 'loading-tipolocal');
}

// Recebe as informações das regiões do evento para o select
function carregaContainerSelectRegiao(idElement, data){
    document.getElementById(idElement).innerHTML = data;
    blockItem('local');
    hideItem('formulario-parte3-oculta');
    hideItem('formulario-parte4-oculta');
    if (document.getElementById('tipolocal').value <= 0) {
        blockItem('regiao');
        blockItem('local');
        document.getElementById('regiao').innerHTML = '';
        document.getElementById('local').innerHTML = '';
    }else{
        unblockItem('regiao');
        document.getElementById('regiao').focus();
    }
}

// Busca a lista de locais do evento para o select
function listaLocaisInfoRegiao(idRegiaoAbrangencia=0){
  execRequestAjax('op0', 'acao=lista-locais-do-evento'+'&idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('regiao').value+'&tipolocal='+document.getElementById('tipolocal').value+'&idregiao-abrangencia='+idRegiaoAbrangencia, 'local', 'returnHtml', carregaContainerSelectLocal, 'loading-regiao');
}

// Recebe as informações dos locais do evento para o select
function carregaContainerSelectLocal(idElement, data){
    document.getElementById(idElement).innerHTML = data;
    hideItem('formulario-parte3-oculta');
    hideItem('formulario-parte4-oculta');
    if (document.getElementById('regiao').value <= 0) {
        blockItem('local');
        document.getElementById('local').innerHTML = '';
    }else{
        unblockItem('local');
        document.getElementById('local').focus();
    }
}

// Busca a lista de ações do local escolhido
function listaAcoesInfoLocal(){
  execRequestAjax('op0', 'acao=lista-acoes-evento-turma'+'&idevento='+document.getElementById('idevento').value+'&idlocal='+document.getElementById('local').value, 'acoes', 'returnHtml', carregaContainerAcoes, 'loading-acoes');
}

// Recebe as informações das ações do evento
function carregaContainerAcoes(idElement, data){
    document.getElementById(idElement).innerHTML = data;
    showItem('formulario-parte3-oculta');
    showItem('formulario-parte4-oculta');
}



//============================
// *** Ações do formulário ***
//============================

// Manter bloqueado os checkbox das ações cuja inscrição é obrigatória
function blockCheck(element){
    element.checked = true;
}

// Cancela inscrição e retorna para a home
function cancelAndReturnToHome(){
    
    var formaInscricao = document.getElementById('formainscricao');

    if (formaInscricao) {

        switch (formaInscricao) {

            case 'ABERTA':
                if (document.getElementById('idregiao-abrangencia')) {
                    window.location.href = 'redireciona_principal.php?idregiao-abrangencia='+document.getElementById('idregiao-abrangencia').value;
                }else{
                    window.location.href = 'redireciona.php';
                }        
                break;

            case 'INTERNA':
                window.close();
                break;

            default:
                if (document.getElementById('idregiao-abrangencia')) {
                    window.location.href = 'redireciona_principal.php?idregiao-abrangencia='+document.getElementById('idregiao-abrangencia').value;
                }else{
                    window.location.href = 'redireciona.php';
                }        
                break;

        }

    }else{
        if (document.getElementById('idregiao-abrangencia')) {
            window.location.href = 'redireciona_principal.php?idregiao-abrangencia='+document.getElementById('idregiao-abrangencia').value;
        }else{
            window.location.href = 'redireciona.php';
        }        
    }

}

// Ações do botão de confirmação para EDITAR inscrição
function btnConfirmaEditarInscricao(){
    execRequestAjax('op0', 'acao=cancelar-minha-inscricao'+'&idevento='+document.getElementById('idevento').value+'&matricula='+document.getElementById('matricula').value, '', 'execute', infoUsuarioJaInscrito, '');
}

// Ações do botão de confirmação para CANCELAR inscrição
function btnCancelarMinhaInscricao(){
    execRequestAjax('op0', 'acao=cancelar-minha-inscricao'+'&idevento='+document.getElementById('idevento').value+'&matricula='+document.getElementById('matricula').value, '', 'execute', msgDeletedAndReturnToHome, '');
}

// Finaliza a mensagem de cancelamento
function msgDeletedAndReturnToHome(){
    if (document.getElementById('idregiao-abrangencia')) {
        window.location.href = 'redireciona_principal.php?idregiao-abrangencia='+document.getElementById('idregiao-abrangencia').value;
        alert('Inscrição cancelada!');
    }else{
        window.location.href = 'redireciona.php';
        alert('Inscrição cancelada!');
    }        
}

// Confirma envio de formulário
function submitAndReturnToHome(){
    if (validaFormulario()) {
        document.querySelector('#form-inscricao').submit();
    }
}

// Valida o e-mail se tiver alguma restrição definida. Ex: aceitar somente @rioeduca.net
function validaEmail(email, exibeMensagem){

    var regraValidacao = document.querySelector('#emailserver').value;

    if (email.value.length == 0) {
        if (exibeMensagem) {alert('Por favor, informe seu e-mail!');};
        return false;

    }else if ((email.value=="")||
              (email.value.indexOf('@')==-1)||
              (email.value.indexOf('.')==-1)) {
        if (exibeMensagem) {alert('Por favor, informe um e-mail válido!');};
        return false;

    }else{

        if ((regraValidacao != '')&&(email.value.indexOf(regraValidacao) == -1)) {
            if (exibeMensagem) {alert('Para esta formação, é necessário informar um e-mail "'+regraValidacao+'" válido!');};
            return false;
        }else{
            return true;
        }

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
    var validateEmail = validaEmail(document.querySelector('#email'),false);

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
    }else if (!validateEmail) {
        var regraValidacao = document.querySelector('#emailserver').value;
        if (regraValidacao == "") {
            alert('É necessário informar um e-mail válido!');
        }else{
            alert('Para esta formação, é necessário informar um e-mail "'+regraValidacao+'" válido!');
        }
    }


    var retorno = validateInputs && validatePersonalSelects && validateEventOptionsSelects && validateActions && validateEmail;

    if (retorno == true) {
        unblockItem('matricula');
        unblockItem('nomeservidor');
    }

    return retorno;

}
