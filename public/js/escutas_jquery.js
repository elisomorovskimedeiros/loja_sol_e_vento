$(document).ready(function(){ 
    //emite o status da edição, inserção ou exclusão dos produtos
    if($("#resposta_insercao_produto").length && $("#resposta_insercao_produto").val() != ''){
        emitirAviso($("#resposta_insercao_produto").val(), "snackbar", 3000);
    }

    //abre o modal de edição do produto
    $(".container-produto").click(function(e){
        
        let nome_produto = $(e.currentTarget).find($(".nome-produto")).html();
        let foto_produto = $(e.currentTarget).find($(".foto-produto")).attr("src");
        let codigo_produto = $(e.currentTarget).find($(".pn-produto")).html();
        let qtd_estoque = $(e.currentTarget).find($(".qtd-produto")).html();
        let preco_produto = $(e.currentTarget).find($(".preco-produto")).html();
        let descricao_produto = $(e.currentTarget).find($(".descricao-produto")).html();
        let id_produto = $(e.currentTarget).find($(".id-produto")).html();

        if($(e.currentTarget).parent().attr("id") == "mostruario"){ //true caso seja aberto em detalhes de produto no mostruario
            console.log("Mostruário de produtos");
            $("#nome_produto_mostruario").html(nome_produto);
            $("#imagem_produto_mostruario").attr("src", foto_produto);
            $("#pn_produto_mostruario").html(codigo_produto);
            $("#preco_produto_mostruario").html(preco_produto);
            $("#descricao_produto_mostruario").html(descricao_produto);
            $("#qtd_produto_mostruario").html(qtd_estoque);
            $("#id_produto_mostruario").html(id_produto);
        }else{ //true caso seja utilizada para edição do produto em controle de produtos
            console.log("edição de produtos");
            console.log(nome_produto);
            $("#nome_produto_edicao").val(nome_produto);
            //$("#imagem_produto_edicao").val(foto_produto);
            $("#pn_produto_edicao").val(codigo_produto);
            $("#preco_produto_edicao").val(preco_produto);
            $("#descricao_produto_edicao").val(descricao_produto);
            $("#qtd_produto_edicao").val(qtd_estoque);
            $("#id_produto_edicao").val(id_produto);
            produto.url_action = "produto/"+id_produto+"?_method=PUT";
            $("#form_editar_produto").attr("action", produto.url_action);
            $("#form_exclusao_produto").attr("action", "produto/"+id_produto+"?_method=DELETE");
            produto.id_produto = id_produto;
        }
       
    });
    
    //zera a variável global produtos quando o modal de edição é fechado
    $("#janela_de_edicao_de_produto").on("hide.bs.modal", function(){
        produto = {};
    });


    $("#form_exclusao_produto").on("submit", function(){
        var dados = $( this ).serialize();
        $.ajax({
            type: "POST",
            url: "produto/"+produto.id_produto+"?_method=DELETE",
            data: dados,
            success: function( data )
            {
                $("#fecharModal").trigger("click");
                emitirAviso(data, "snackbar", 2000);
                setTimeout(function() {
                    window.location.href="/controle_produtos"
                }, 2050);         
            }
        });

        return false;
    });
    //document.getElementById('form_editar_produto').submit()
    $("#form_editar_produto").on("submit", function(){
        
        var dados = new FormData(this);
        $.ajax({
            type: "POST",
            url: "produto/"+produto.id_produto+"?_method=PUT",
            data: dados,
            success: function( data )
            {
                $("#fecharModal").trigger("click");
                emitirAviso(data, "snackbar", 2000);
                setTimeout(function() {
                    window.location.href="/controle_produtos"
                }, 2050);         
            },
            cache: false,
            contentType: false,
            processData: false,            
        });
        return false;
        
    });
});