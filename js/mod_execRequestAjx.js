// Executa as funções de requisição via Ajax
// opcao: string que define o arquivo que será chamado na função "urlOpcaoMenu()";
// params: string com os parâmetros a serem passados via GET;
// idElement: id do elemento que receberá o retorno AJAX;
// typeAction define que tipo de ação tomar sendo:
// 'returnHtml'  : retorna um Html que será inserido em algum local definido em 'idElement';
// 'returnValue' : retorna um valor ou conjnto de dados a ser trabalhado em um módulo;
// 'returnJSON'  : retorna um objeto JSON.
// execFunction define qual função executar após o retorno Ajax;
// 'paramFunction' : define os parâmetros a serem passados com a função informada em execFunction;
// 'idLoading' : informe o id do elemento responsável por exibir a animação de aguardando
function execRequestAjx(urlPhpFile, params, idElement='', typeAction = 'returnHtml', execFunction = insertHTMLContainer, paramFunction = '', idLoading = ''){
    var url = urlPhpFile + '?' + params;

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

                }else if (typeAction == 'returnJSON'){

                    if (paramFunction == '') {
                        execFunction(data);
                    }else{
                        execFunction(data, paramFunction);
                    }

                }else if (typeAction == 'executeOnly') {

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

// Chamada pela função "execRequestAjx" quando o parâmetro "typeAction" está setado com 
// o valor "returnHtml", insere o retorno no container informado no parâmetro "idElement"
function insertHTMLContainer(idContainer, htmlAcoes){
    document.getElementById(idContainer).innerHTML = htmlAcoes;
    reloadBasicFunctions();
}