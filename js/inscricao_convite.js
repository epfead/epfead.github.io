//=========================
// *** Requisições Ajax ***
//=========================


// Variáveis globais
var idEvento = 0;


// Função auxiliar que deverá ser executada ao carregar a página
function initInscricao(){
    document.getElementById('idservidor').value = -2;
    document.getElementById('nome-localizado').innerHTML = 'MATRÍCULA NÃO ENCONTRADA';
    hideItem('formulario-nome-inscrito'); 
    hideItem('formulario-botoes-confirmacao'); 
    blockItem('bt-ok'); 
    blockItem('bt-no');
    execRequestAjax('op0', 'acao=dados-evento'+'&idevento='+document.getElementById('idevento').value, '', '', setVariaveisGlobais, '', '');
}


// Função para setar as variáveis globais
function setVariaveisGlobais(dataJson){
    var objJson = JSON.parse(dataJson);
    idEvento = objJson.EVENTO_ID;
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
            return 'resource/res_inscricao_convite_acao.php';
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
  execRequestAjax('op0', 'acao=verif-usuario-confirmou-presenca'+'&idevento='+document.getElementById('idevento').value+'&idacao='+document.getElementById('idacao').value+'&idlocal='+document.getElementById('idlocal').value+'&matricula='+document.getElementById('matricula').value, '', '', carregaCamposUsuario, '', 'loading-matricula');
}


// Recebe as informações do usuário via Ajax e adiciona no formulário
function carregaCamposUsuario(dataJson){

    var objJson = JSON.parse(dataJson);

    if (objJson.SERVIDOR.SERVIDOR_ID == -1){

        // Matrícula não encontrada ou matrícula inativa
        document.getElementById('idservidor').value = -2;
        document.getElementById('nome-localizado').innerHTML = 'MATRÍCULA NÃO ENCONTRADA';
        hideItem('formulario-nome-inscrito'); 
        hideItem('formulario-botoes-confirmacao'); 
        blockItem('bt-ok'); 
        blockItem('bt-no');
        $('#modalMatriculaNaoEncontrada').modal();
        document.getElementById('matricula').focus();
    
    }else{

        // Verifica se o servidor está inscrito
        if (objJson.SERVIDOR_INSCRITO === 'N') {

            document.getElementById('idservidor').value = -1;
            document.getElementById('nome-localizado').innerHTML = 'NÃO INSCRITO';
            showItem('formulario-nome-inscrito'); 
            hideItem('formulario-botoes-confirmacao'); 
            blockItem('bt-ok'); 
            blockItem('bt-no');
            $('#modalAvisoNaoInscrito').modal();
            document.getElementById('matricula').focus();

        }else{

            // Verifica se o servidor já confirmou inscrição
            if (objJson.CONFIRMOU_PRESENCA === 'S') {
            
                // O servidor já confirmou inscrição:
                document.getElementById('idservidor').value = 0;
                document.getElementById('nome-localizado').innerHTML = objJson.SERVIDOR.NOME_SERVIDOR;
                showItem('formulario-nome-inscrito'); 
                hideItem('formulario-botoes-confirmacao'); 
                blockItem('bt-ok'); 
                blockItem('bt-no');
                $('#modalTentativaInscricao').modal();
                document.getElementById('matricula').focus();

            }else if (objJson.CONFIRMOU_PRESENCA === 'N'){

                // O servidor ainda não confirmou inscrição:
                document.getElementById('idservidor').value = objJson.SERVIDOR.SERVIDOR_ID;
                document.getElementById('nome-localizado').innerHTML = objJson.SERVIDOR.NOME_SERVIDOR;
                showItem('formulario-nome-inscrito'); 
                showItem('formulario-botoes-confirmacao'); 
                unblockItem('bt-ok'); 
                unblockItem('bt-no');

            }else{

                // O servidor ainda não confirmou inscrição:
                document.getElementById('idservidor').value = objJson.SERVIDOR.SERVIDOR_ID;
                document.getElementById('nome-localizado').innerHTML = objJson.SERVIDOR.NOME_SERVIDOR;
                showItem('formulario-nome-inscrito'); 
                showItem('formulario-botoes-confirmacao'); 
                unblockItem('bt-ok'); 
                unblockItem('bt-no');

            }

        }

    }

    objJson = '';

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
    var p_nomeservidor = document.getElementById('nome-localizado').innerHTML;
    var p_idservidor = document.getElementById('idservidor').value;
    var p_idevento = document.getElementById('idevento').value;

    // apoio
    var validateInputs = false;
    var validateIds = false;

    if ((p_matricula == '')||(p_nomeservidor == '')) {
        validateInputs = false;
    }else{
        validateInputs = true;
    }

    if ((p_idservidor > 0)&&(p_idevento > 0)) {
        validateIds = true;
    }else{
        validateIds = false;
    }

    var retorno = validateInputs && validateIds;

    if (!retorno) {

        // Matrícula não encontrada ou matrícula inativa
        document.getElementById('idservidor').value = -2;
        document.getElementById('nome-localizado').innerHTML = 'MATRÍCULA NÃO ENCONTRADA';
        hideItem('formulario-nome-inscrito'); 
        hideItem('formulario-botoes-confirmacao'); 
        blockItem('bt-ok'); 
        blockItem('bt-no');
        $('#modalMatriculaNaoEncontrada').modal();
        document.getElementById('matricula').focus();

    }else{

        unblockItem('matricula');

    }

    return retorno;

}

