// Função de inicialização
// ========================

function initializeLogin(){
    document.querySelector('#login').value = '';
    document.querySelector('#password').value = '';
}


//=========================
// *** Requisições Ajax ***
//=========================

// Função de chamada
// Faz uma chamada através do arquivo de recurso res_inscricao.php
// que redireciona ao objeto instanciado da classe "Inscricao.php"
function ajxCallFunctionLogin(fn){
    
    // Define o qrquivo de recursos que fará as chamadas de funções da classe "Inscricao.php"
    var urlResourceFile = 'resource/res_concluir_login.php';
    
    // Variável que recebe e define os parâmetros da função a ser chamada
    var params = 'call='+fn;
    
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
            execRequestAjaxFunctionLogin(urlResourceFile, params, callJsFunction, idElement, idLoading);
            break;
  
        default:
            alert('Desculpe, algo saiu errado!');
    }

}


// Executa requisições Ajax
function execRequestAjaxFunctionLogin(urlResourceFile, params, callJsFunction, idElement='', idLoading=''){
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



// =================
// "callJsFunction":
// =================

// Recebe as informações de Designações para o select
function carregaContainerSelectDesignacao(idElement, data){
    var element = document.getElementById(idElement);
    element.innerHTML = data;
    unblockItem('iddesignacao-lotacao');
}



//============================
// *** Ações do formulário ***
//============================

