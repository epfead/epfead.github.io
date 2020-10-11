//=========================
// *** Requisições Ajax ***
//=========================

// Variáveis globais
var idEvento = 0;
var idServidor = 0;
var caracteristicaInscricao = 0;
var formaInscricao = 'ABERTA';
var idRegiaoAbrangencia = 0;
var limitaRegiaoAbrangencia = 'N';
var emailServer = '';
var arrayAbrangencia = [];
var arrayCargos = [];
var arrayFuncoes = [];
var arrayEventos = [];
var limitarCargo = 'N';
var limitarFuncao = 'N';
var bloqueiaSeInscritoEmOutroEvento = 'N';

// Função auxiliar que deverá ser executada ao carregar a página
function initInscricao(){
  execRequestAjax('op0', 'acao=dados-evento'+'&idevento='+document.getElementById('idevento').value, '', '', setVariaveisGlobais, '', '');
}

// Função para setar as variáveis globais
function setVariaveisGlobais(dataJson){
    var objJson = JSON.parse(dataJson);

    idEvento = objJson.EVENTO_ID;
    caracteristicaInscricao = objJson.CARACTERISTICA;
    formaInscricao = objJson.FORMA_INSCRICAO;
    emailServer = objJson.EMAIL_SERVER;

    limitarCargo = objJson.LIMITAR_CARGO;
    arrayCargos = JSON.parse(objJson.FILTRO_CARGO_ID);
    if (arrayCargos == null) {arrayCargos = []};
    
    limitarFuncao = objJson.LIMITAR_FUNCAO;
    arrayFuncoes = JSON.parse(objJson.FILTRO_FUNCAO_ID);
    if (arrayFuncoes == null) {arrayFuncoes = []};
    
    limitarLotacao = objJson.LIMITAR_LOTACAO;
    arrayLotacoes = JSON.parse(objJson.FILTRO_ORGAO_ID);
    if (arrayLotacoes == null) {arrayLotacoes = []};

    bloqueiaSeInscritoEmOutroEvento = objJson.BLOQ_SE_INSCRITO_OUTRO_EVENTO;
    arrayEventos = JSON.parse(objJson.FILTRO_EVENTO_ID);
    if (arrayEventos == null) {arrayEventos = []};

    limitaRegiaoAbrangencia = objJson.LIMITA_INSC_REGIAO_ABRANG;
    arrayAbrangencia = JSON.parse(objJson.ABRANGENCIA);
    if (arrayAbrangencia == null) {arrayAbrangencia = []};

    if (limitaRegiaoAbrangencia == 'S') {
        idRegiaoAbrangencia = document.querySelector('#idregiao-abrangencia').value;
    }else{
        idRegiaoAbrangencia = 0;
    }

}


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
    var modoFormulario = 'ADD';
    
    var idCargo;
    var idFuncao;
    var idLotacao;

    var liberaInscricao = true;
    var inscrito = false;
    var msgErro = '';
    var eventosInscrito = [];
    
    var cargoEncontrado = false;
    var funcaoEncontrada = false;
    var lotacaoEncontrada = false;

    var okEventoAnterior = false;
    var restricaoOk = false;
    var ok = [];

    var inscritoEventoAnterior = false;
    var nomeEvento = '';

    if (objJson.SERVIDOR.SERVIDOR_ID == -1){

          hideItem('formulario-parte1-oculta'); 
          blockItem('local'); 
          blockItem('regiao');
          $('#modalMatriculaNaoEncontrada').modal();
          document.getElementById('matricula').focus();
    
    }else{

        if (document.getElementById('matricula').value == objJson.SERVIDOR.MATRICULA1) {
            idCargo = objJson.SERVIDOR.CARGO_ID_MAT1;
            idFuncao = objJson.SERVIDOR.FUNCAO_ID_MAT1;
            idLotacao = objJson.SERVIDOR.LOTACAO_ID_MAT1;
        }else{
            idCargo = objJson.SERVIDOR.CARGO_ID_MAT2;
            idFuncao = objJson.SERVIDOR.FUNCAO_ID_MAT2;
            idLotacao = objJson.SERVIDOR.LOTACAO_ID_MAT2;
        }
        
                
        // Trecho que verifica as restrições definidas para a formação: Cargo, Função, Lotação, Inscrição em evento anterior
        if ((limitarCargo === 'S')||(limitarFuncao === 'S')||(limitarLotacao === 'S')||(bloqueiaSeInscritoEmOutroEvento === 'S')) {
            
            cargoEncontrado = false;
            arrayCargos.forEach((icargo)=>{
                if (icargo == idCargo) {cargoEncontrado = true}
            });

            funcaoEncontrada = false;
            arrayFuncoes.forEach((ifuncao)=>{
                if (ifuncao == idFuncao) {funcaoEncontrada = true}
            });

            lotacaoEncontrada = false;
            arrayLotacoes.forEach((ilotacao)=>{
                if (ilotacao == idLotacao) {lotacaoEncontrada = true}
            });


            if (limitarCargo === 'S'){
                ok.push(cargoEncontrado);
            }
            if (limitarFuncao === 'S'){
                ok.push(funcaoEncontrada);
            }
            if (limitarLotacao === 'S'){
                ok.push(lotacaoEncontrada);
            }

            restricaoOk = false;
            ok.forEach((iok)=>{
                if (iok) {restricaoOk = true};
            });


            inscritoEventoAnterior = false;
            eventosInscrito = objJson.EVENTOS_INSCRITO;
            if (eventosInscrito == null) {eventosInscrito = []}
            eventosInscrito.forEach((ieventoinsc)=>{
                arrayEventos.forEach((ievento)=>{
                    if (ieventoinsc.EVENTO_ID == ievento) {
                        inscritoEventoAnterior = true
                        nomeEvento = ieventoinsc.TITULO;
                    }
                });    
            });
            if ((bloqueiaSeInscritoEmOutroEvento === 'S')&&(inscritoEventoAnterior == true)) {
                msgErro = 'Prezado servidor, você já se inscreveu em um evento anterior semelhante a este.\n\n'+'Nome do evento:\n'+nomeEvento;
                okEventoAnterior = false;
            }else{
                okEventoAnterior = true;
            }


            if ((restricaoOk)&&(okEventoAnterior)){
                liberaInscricao = true;
            }else{
                liberaInscricao = false;
            }

        }else{
            
            liberaInscricao = true;
        
        }
        // Fim do trecho que verifica limitação de inscrição =====================
        
        
        if (liberaInscricao === false) {

            hideItem('formulario-parte1-oculta'); 
            blockItem('local'); 
            blockItem('regiao');
            if ((bloqueiaSeInscritoEmOutroEvento === 'S')&&(okEventoAnterior === false)) {
                $('#modalTentativaInscricaoVinculado').modal();
            }else{
                $('#modalAvisoRestricao').modal();
            }
            document.getElementById('matricula').focus();

        }else{

            if (objJson.SERVIDOR.MODO == 'ADD') {

                idServidor = objJson.SERVIDOR.SERVIDOR_ID;
                document.getElementById('idservidor').value = objJson.SERVIDOR.SERVIDOR_ID;
                document.getElementById('nomeservidor').value = objJson.SERVIDOR.NOME_SERVIDOR;
                document.getElementById('email').value = objJson.SERVIDOR.EMAIL;
                document.getElementById('email-inst').value = objJson.SERVIDOR.EMAIL_INST;
                document.getElementById('telcontato').value = objJson.SERVIDOR.TEL_CONTATO;
                document.getElementById('designacao-regiao').value = objJson.SERVIDOR.REGIAO;
                document.getElementById('designacao-lotacao').value = objJson.SERVIDOR.DENOMINACAO_ABREVIADA;

                if (document.getElementById('matricula').value == objJson.SERVIDOR.MATRICULA1) {
                    document.getElementById('cargo').value = objJson.SERVIDOR.CARGO_MAT1;   
                    document.getElementById('funcao').value = objJson.SERVIDOR.FUNCAO_MAT1; 
                    document.getElementById('idregiao-lotacao').value = objJson.SERVIDOR.REGIAO_ID_MAT1;
                    document.getElementById('iddesignacao-lotacao').value = objJson.SERVIDOR.LOTACAO_ID_MAT1;
                    document.getElementById('estagio-prob').value = objJson.SERVIDOR.ESTAGIO_PROB_MAT1;
                }else{
                    document.getElementById('cargo').value = objJson.SERVIDOR.CARGO_MAT2;   
                    document.getElementById('funcao').value = objJson.SERVIDOR.FUNCAO_MAT2; 
                    document.getElementById('idregiao-lotacao').value = objJson.SERVIDOR.REGIAO_ID_MAT2;
                    document.getElementById('iddesignacao-lotacao').value = objJson.SERVIDOR.LOTACAO_ID_MAT2;
                    document.getElementById('estagio-prob').value = objJson.SERVIDOR.ESTAGIO_PROB_MAT2;
                }
                
                showItem('formulario-parte1-oculta'); 
                showItem('formulario-parte2-oculta');
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
                blockItem('designacao-regiao');
                blockItem('designacao-lotacao');
                hideItem('iddesignacao-lotacao');
                hideItem('idregiao-lotacao');

                if ((caracteristicaInscricao == 2)||(caracteristicaInscricao == 3)) {
                    liberaEscolhaLocal(2,idRegiaoAbrangencia);
                    console.log(idRegiaoAbrangencia);
                }

                // Se foi associado uma janela modal, aciona o botão oculto "gatilho-modal"
                document.querySelector('#gatilho-modal').click();

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
// idRegiaoAbrangencia = 0 : lista todas as opções de "turma, grupo, equipe, etc" sem limitação de região.
// idRegiaoAbrangencia > 0 : lista todas as opções de "turma, grupo, equipe, etc" somente da região.
// Obs.: a limitação da região está definida no campo "REGIAO_ID_DESTINO" da tabela "eventos_locais_acoes"
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
        }else if((caracteristica == 2)||(caracteristica == 3)) {
            listaRegioesInfoTipoLocal(idRegiaoAbrangencia);
            //document.getElementById('regiao').focus();
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
        //document.getElementById('regiao').focus();
    }
}

// Busca a lista de locais do evento para o select
// Se um "LOCAL_ID" for atribuído a "valuePreSelect", o local será selecionado por padrão após 
// os locais serem carregados pela função "carregaContainerSelectLocal"
function listaLocaisInfoRegiao(idRegiaoAbrangencia=0, valuePreSelect=""){
  execRequestAjax('op0', 'acao=lista-locais-do-evento'+'&idevento='+document.getElementById('idevento').value+'&idregiao='+document.getElementById('regiao').value+'&tipolocal='+document.getElementById('tipolocal').value+'&idregiao-abrangencia='+idRegiaoAbrangencia, 'local', 'returnHtml', carregaContainerSelectLocal, valuePreSelect,'loading-regiao');
}

// Recebe as informações dos locais do evento para o select
function carregaContainerSelectLocal(idElement, data, preSelect=""){
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

    // Se um valor estiver definido para o "preSelect" a opção será selecionada como padrão
    if (preSelect != '') {
        let valueSelect = parseInt(preSelect);
        let selLocal = document.getElementById('local');
        for (let i = 0; i < selLocal.length; i = i + 1) {
            if (selLocal.options[i].value == valueSelect) {
                selLocal.selectedIndex = i;
                // Adiciona o texto para ser exibdo caso o select do local seja oculto
                document.getElementById('local-texto').innerHTML = selLocal.options[selLocal.selectedIndex].innerHTML;
        
                listaAcoesInfoLocal();
            }
        }
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
    var validateEventOptionsSelects = false;
    var validateActions = false;
    var validateEmail = validaEmail(document.querySelector('#email'),false);

    if ((p_matricula == '')||(p_nomeservidor == '')||(p_email == '')||(p_telcontato == '')) {
        validateInputs = false;
    }else{
        validateInputs = true;
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
        alert('Verifique se seu e-mail e telefone estão corretos antes de continuar.');
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


    var retorno = validateInputs && validateEventOptionsSelects && validateActions && validateEmail;

    if (retorno == true) {
        unblockItem('matricula');
        unblockItem('nomeservidor');
    }

    return retorno;

}


// Valida se os campos do formulário foram preenchidos e retorna
// true ou false para liberar ou não o submit do form.
function validaFormularioANTIGO(){
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

function atualizaEstagioProbElemento(){
    if (objListaDeRespostas[1]["resposta"] == 'Sim') {
        document.querySelector('#estagio-prob').value = 'S';
    }else{
        document.querySelector('#estagio-prob').value = 'N';
    }
}

// Seleciona automaticamente uma "Região" e uma "turma, grupo ou equipe"
function selecionaTurma(idRegiao, idLocal, blockSelect=true){
    let idRegiaoInt = parseInt(idRegiao);
    let idLocalInt = parseInt(idLocal);

    // Seleciona a região definida em idRegiao
    let selRegiao = document.getElementById('regiao');
    for (let i = 0; i < selRegiao.length; i = i + 1) {
        if (selRegiao.options[i].value == idRegiaoInt) {
            selRegiao.selectedIndex = i;
        }
    }
    // Adiciona o texto para exibir a região selecionada caso o select seja escondido
    document.getElementById('regiao-texto').innerHTML = selRegiao.options[selRegiao.selectedIndex].innerHTML;

    // Seleciona o local definido em idLocal
    listaLocaisInfoRegiao(idRegiaoAbrangencia, idLocalInt);

    // Bloqueia a seleção da região e local caso blockSelect = true
    if (blockSelect) {
        hideItem('regiao');
        hideItem('local');
        showItem('regiao-texto');
        showItem('local-texto');
    }else{
        hideItem('regiao-texto');
        hideItem('local-texto');
        showItem('regiao');
        showItem('local');
    }

}


