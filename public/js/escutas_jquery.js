$(document).ready(function(){ 
    if($("#resposta_insercao_produto").length && $("#resposta_insercao_produto").val() != ''){

        console.log("carregou");
        emitirAviso($("#resposta_insercao_produto").val(), "snackbar", 3000);
    }
});