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
    $("#janela_de_detalhes_do_produto, #janela_de_edicao_de_produto").on("bs.modal.hide", function(){
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

    $("#btn_enviar_carrinho").click(function(e){
        produto.quantidade_produto = $("#quantidade_produto").val();
        produtos.push(produto);
        $("#janela_de_detalhes_do_produto").modal("hide");
        $("#carrinho_de_compras").modal("show");
    });

    $("#carrinho_de_compras").on("show.bs.modal", function(){
        console.log(produtos);
        if(produtos.length == 0){
            $("#corpoModalCarrinho").html("<h1>Carrinho de compras vazio</h1>");
        }else{
            produtos.forEach(function(produto, indice){
                let div_criada = ($("#bloco_produto_carrinho").clone()
                                                    .appendTo("#corpoModalCarrinho")
                                                    .attr("id", "produto"+indice)
                                                    .removeClass("invisible")
                                                    .removeClass("float"))[0];
                $(div_criada).find($(".imagem_produto_carrinho").attr("src", produto.foto_produto));
                $(div_criada).find($(".nome_produto_carrinho").html(produto.nome_produto));   
                $(div_criada).find($(".preco_produto_carrinho").html(produto.preco_produto));
                $(div_criada).find($(".quantidade_produto").html(produto.quantidade_produto));
                $(div_criada).find($(".total_do_item").html(Number(produto.quantidade_produto)*Number(produto.preco_produto)));
                $(div_criada).find($(".lixeira").attr("indice",indice));             
            });
            
        }
    });

    //pedido de produto
    $("#btn_comprar").click(function(e){ 
        cliente.nome = $("#nome_cliente").val();
        cliente.telefone = $("#telefone_cliente").val();
        cliente.endereco = $("#endereco_cliente").val();
        enviarEmail(produto, cliente);       
    });
});