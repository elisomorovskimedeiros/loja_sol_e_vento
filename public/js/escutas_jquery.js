$(document).ready(function(){ 
    //emite o status da edição, inserção ou exclusão dos produtos
    if($("#resposta_insercao_produto").length && $("#resposta_insercao_produto").val() != ''){
        emitirAviso($("#resposta_insercao_produto").val(), "snackbar", 3000);
    }
    //abre o modal de edição do produto
    $(".container-produto").click(function(e){
        
        produto.nome_produto = $(e.currentTarget).find($(".nome-produto")).html();
        produto.foto_produto = $(e.currentTarget).find($(".foto-produto")).attr("src");
        produto.codigo_produto = $(e.currentTarget).find($(".pn-produto")).html();
        produto.qtd_estoque = $(e.currentTarget).find($(".qtd-produto")).html();
        produto.preco_produto = $(e.currentTarget).find($(".preco-produto")).html();
        produto.descricao_produto = $(e.currentTarget).find($(".descricao-produto")).html();
        produto.id_produto = $(e.currentTarget).find($(".id-produto")).html();

        if($(e.currentTarget).parent().attr("id") == "mostruario"){ //true caso seja aberto em detalhes de produto no mostruario
            $("#nome_produto_mostruario").html(produto.nome_produto);
            $("#imagem_produto_mostruario").attr("src", produto.foto_produto);
            $("#pn_produto_mostruario").html(produto.codigo_produto);
            $("#preco_produto_mostruario").html(produto.preco_produto);
            $("#descricao_produto_mostruario").html(produto.descricao_produto);
            $("#qtd_produto_mostruario").html(produto.qtd_estoque);
            $("#id_produto_mostruario").html(produto.id_produto);
        }else{ //true caso seja utilizada para edição do produto em controle de produtos
            console.log("edição de produtos");
            console.log(produto.nome_produto);
            $("#nome_produto_edicao").val(produto.nome_produto);
            //$("#imagem_produto_edicao").val(foto_produto);
            $("#pn_produto_edicao").val(produto.codigo_produto);
            $("#preco_produto_edicao").val(produto.preco_produto);
            $("#descricao_produto_edicao").val(produto.descricao_produto);
            $("#qtd_produto_edicao").val(produto.qtd_estoque);
            $("#id_produto_edicao").val(produto.id_produto);
            produto.url_action = "produto/"+id_produto+"?_method=PUT";
            $("#form_editar_produto").attr("action", produto.url_action);
            $("#form_exclusao_produto").attr("action", "produto/"+produto.id_produto+"?_method=DELETE");
        }
       
    });
    //zera a variável global produtos quando o modal que destacou o produto é fechado
    $("#janela_de_detalhes_do_produto, #janela_de_edicao_de_produto").on("hide.bs.modal", function(){
        produto = {};
        $("#quantidade_produto").val("1");
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

    $("#btn_enviar_carrinho").click(function(e){
        let produto_em_compra = $.extend(true, {}, produto);
        produto_em_compra.quantidade_produto = $("#quantidade_produto").val();
        console.log("quantidade produtos:");
        console.log($("#quantidade_produto").val());
        console.log("produtos:");
        console.log(produtos);
        produtos.push(produto_em_compra);
        $("#janela_de_detalhes_do_produto").modal("hide");
        $("#carrinho_de_compras").modal("show");
    });

    $("#carrinho_de_compras").on("show.bs.modal", function(){
        if(produtos.length == 0){
            console.log("Produtos dentro do if do show modal");
            console.log(produtos);
            $("#conteudo_carrinho").html("<h1>Carrinho de compras vazio</h1>");
            $("#dados_cliente").hide();
            $("#btn_finalizar_compra").hide();
        }else{
            $("#dados_cliente").show();
            $("#btn_finalizar_compra").show();
            preencherConteudoCarrinho();
        }
    });

    $(document).on("click",".lixeira", function(e){
        produtos.pop($(e.currentTarget).attr("indice"));
        $("#conteudo_carrinho").html("");
        if(produtos.length == 0){
            $("#conteudo_carrinho").html("<h1>Carrinho de compras vazio</h1>");
            $("#dados_cliente").hide();
            $("#btn_finalizar_compra").hide();
        }else{
            preencherConteudoCarrinho();
        }
    });
/*
    $("#carrinho_de_compras").on("hide.bs.modal", function(){
        $("#conteudo_carrinho").html("");
    });
*/
    //pedido de produto
    $("#btn_comprar").click(function(e){ 
        cliente.nome = $("#nome_cliente").val();
        cliente.telefone = $("#telefone_cliente").val();
        cliente.endereco = $("#endereco_cliente").val();
        enviarEmail(produto, cliente);       
    });

    //recalcula o valor total de cada produto noso do cliente pedir mais um no carrinho
    $(document).on("change", ".quantidade_produto_carrinho", function(e){
        let produto_acrescentado = $(e.currentTarget).parent().parent();
        $(produto_acrescentado).find(".total_do_item").html(Number($($(produto_acrescentado).find(".preco_produto_carrinho")[0]).html()) * Number($(e.currentTarget).val()))
    });
    
    //exibir carrinho
    $("#link_carrinho").click(function(){
        $("#carrinho_de_compras").modal("show");
    })
});