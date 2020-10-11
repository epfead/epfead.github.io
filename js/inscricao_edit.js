
// Ações de inicialização da página
function initializeInscricaoEdit() {
    blockItem("matricula"); 
    blockItem("nomeservidor"); 
    blockItem("cargo");
    blockItem("botao-matricula");
    blockItem('botao-ini-inscricao');
    blockItem('checkBoxConfirmaOrientacoes');
    
    showItem('area-form-inscricao');
    showItem('div-botao-ini-inscricao');
    showItem('formulario-parte1-oculta');
    showItem('formulario-parte1-2-oculta');
    showItem('formulario-parte2-oculta');
    showItem('formulario-parte3-oculta');

    document.getElementById("funcao").focus();
    document.getElementById("checkBoxConfirmaOrientacoes").checked = true;

    initEvents();
    initializeMask();
}


// Elementos rastreados
function initEvents() {

    // Lista de elementos e eventos a serem rastreados (informar no objeto JSON abaixo)
    eventsElements = {
        "#botao-matricula":"click",
        "#idregiao-lotacao":"change",
        "#iddesignacao-lotacao":"change",
        "#tipolocal":"change",
        "#regiao":"change",
        "#local":"change",
        "#btn-cancelar":"click",
        "#btn-concluir":"click"
    };

    // Pega todas as chaves do objeto JSON que são os nomes dos elementos a serem rastreados.
    // O valor de cada chave é o evento a ser rastreado do elemento.
    Object.keys(eventsElements).forEach((elementId)=>{

        document.querySelector(elementId).addEventListener(eventsElements[elementId], ()=>{
            
            switch (elementId) {

              case "#botao-matricula":
                ajxCallFunction('getInfoUsuarioJaInscrito');
                break;

              case "#idregiao-lotacao":
                ajxCallFunction('getOptionsLotacoes');
                break;
              
              case "#iddesignacao-lotacao":
                showItem('formulario-parte1-2-oculta');
                document.getElementById('tipolocal').focus();
                break;
              
              case "#tipolocal":
                ajxCallFunction('getOptionsRegioesDoEvento');
                break;
              
              case "#regiao":
                ajxCallFunction('getOptionsLocaisDoEvento');
                break;
              
              case "#local":
                ajxCallFunction('getAcoesDoEvento');
                break;

              case "#btn-cancelar":
                cancelAndReturnToHome();
                break;

              case "#btn-concluir":
                submitAndReturnToHome();
                break;

              default:
                console.log(eventsElements);

            }
            
        })
        
    })

}


// Define os campos para edição da inscrição
function setDefineDadosInscricao(matricula, eventoJson, servidorJson, inscricoesJson) {

    var comboTipoLocal = document.getElementById("tipolocal");
    var comboRegiao = document.getElementById("regiao");
    var comboLocal = document.getElementById("local");

    if (matricula == servidorJson.MATRICULA1) {
        document.getElementById("funcao").value = servidorJson.FUNCAO_MAT1;
        document.getElementById("cargo").value = servidorJson.CARGO_MAT1;
        var idRegiaoLotacao = servidorJson.REGIAO_ID_MAT1;
        var idDesignacaoLotacao = servidorJson.LOTACAO_ID_MAT1;
    } else {
        document.getElementById("funcao").value = servidorJson.FUNCAO_MAT2;
        document.getElementById("cargo").value = servidorJson.CARGO_MAT2;
        var idRegiaoLotacao = servidorJson.REGIAO_ID_MAT2;
        var idDesignacaoLotacao = servidorJson.LOTACAO_ID_MAT2;
    };

    var comboRegiaoLotacao = document.getElementById("idregiao-lotacao");
    var comboDesignacaoLotacao = document.getElementById("iddesignacao-lotacao");

    document.getElementById("idevento").value = eventoJson.EVENTO_ID;
    document.getElementById("idservidor").value = servidorJson.SERVIDOR_ID;
    document.getElementById("nomeservidor").value = servidorJson.NOME_SERVIDOR;
    document.getElementById("matricula").value = matricula;
    document.getElementById("email").value = servidorJson.EMAIL;
    document.getElementById("telcontato").value = servidorJson.TEL_CONTATO;

    for (var i = 0; i < comboRegiaoLotacao.options.length; i++) {
        if (comboRegiaoLotacao.options[i].value == idRegiaoLotacao) {
          comboRegiaoLotacao.options[i].selected = "true";
          break;
        }
    }

    for (var i = 0; i < comboDesignacaoLotacao.options.length; i++) {
        if (comboDesignacaoLotacao.options[i].value == idDesignacaoLotacao) {
          comboDesignacaoLotacao.options[i].selected = "true";
          break;
        }
    }

    for (var i = 0; i < comboTipoLocal.options.length; i++) {
        if (comboTipoLocal.options[i].value == inscricoesJson.TIPO_LOCAL) {
          comboTipoLocal.options[i].selected = "true";
          break;
        }
    }

    for (var i = 0; i < comboRegiao.options.length; i++) {
        if (comboRegiao.options[i].value == inscricoesJson.REGIAO_ID) {
          comboRegiao.options[i].selected = "true";
          break;
        }
    }

    for (var i = 0; i < comboLocal.options.length; i++) {
        if (comboLocal.options[i].value == inscricoesJson.LOCAL_ID) {
          comboLocal.options[i].selected = "true";
          break;
        }
    }

    //ajxCallFunction('getAcoesDoEvento');

}
