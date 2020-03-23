$(document).ready(function(){ 
    //emite o status da edição, inserção ou exclusão dos produtos
    if($("#resposta_insercao_produto").length && $("#resposta_insercao_produto").val() != ''){
        emitirAviso($("#resposta_insercao_produto").val(), "snackbar", 3000);
    }
    if($("#resposta_email").length && $("#resposta_email").val() != ''){
        emitirAviso($("#resposta_email").val(), "snackbar", 3000);
        setTimeout(function(){window.location = "/"; }, 3100);
    }
    
    //abre o modal de edição do produto
    $(".container-produto, .container-produto-editar").click(function(e){
        let foto_produto = $(e.currentTarget).find($(".foto-produto")).attr("src");
        produto.foto_produto = foto_produto.slice(foto_produto.lastIndexOf("miniatura")+9, foto_produto.length);
        produto.nome_produto = $(e.currentTarget).find($(".nome-produto")).html();
        produto.codigo_produto = $(e.currentTarget).find($(".pn-produto")).html();
        produto.qtd_estoque = $(e.currentTarget).find($(".qtd-produto")).html();
        produto.preco_produto = $(e.currentTarget).find($(".preco-produto")).html();
        produto.descricao_produto = $(e.currentTarget).find($(".descricao-produto")).html();
        produto.id_produto = $(e.currentTarget).find($(".id-produto")).html();
        if($(e.currentTarget).parent().attr("id") == "mostruario"){ //true caso seja aberto em detalhes de produto no mostruario
            $("#nome_produto_mostruario").html(produto.nome_produto);
            $("#imagem_produto_mostruario").attr("src", "imagens/produtos/"+produto.nome_produto+"/"+produto.foto_produto);
            $("#pn_produto_mostruario").html(produto.codigo_produto);
            $("#preco_produto_mostruario").html(produto.preco_produto);
            $("#descricao_produto_mostruario").html(produto.descricao_produto);
            $("#qtd_produto_mostruario").html(produto.qtd_estoque);
            $("#id_produto_mostruario").html(produto.id_produto);
        }else{ //true caso seja utilizada para edição do produto em controle de produtos
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
        //laço que pesquisa se o produto já existe no carrinho
        let ja_existe_no_carrinho = false;
        produtos.forEach(produto_do_carrinho => {
            if (produto_em_compra.id_produto == produto_do_carrinho.id_produto){
                produto_do_carrinho.quantidade_produto = Number(produto_em_compra.quantidade_produto) + Number(produto_do_carrinho.quantidade_produto);
                ja_existe_no_carrinho = true;
            }
        });
        //caso ainda não esteja no carrinho, o produto é adicionado
        if(!ja_existe_no_carrinho){
            produtos.push(produto_em_compra);
        }
        $("#janela_de_detalhes_do_produto").modal("hide");
        $("#carrinho_de_compras").modal("show");
    });

    $("#carrinho_de_compras").on("show.bs.modal", function(){
        setTimeout(function() {
            $("body").addClass("modal-open");
        }, 500);  
        if(produtos.length == 0){
            console.log("Produtos dentro do if do show modal");
            console.log(produtos);
            $("#conteudo_carrinho").html("<h1>Carrinho de compras vazio</h1>");
            /*
            $("#dados_cliente").hide();
            $("#btn_finalizar_compra").hide();
            */
        }else{
            //$("#dados_cliente").show();
            $("#btn_finalizar_compra").show();
            preencherConteudoCarrinho();
        }
    });

    $("#carrinho_de_compras").on("hide.bs.modal", function(){
        $("#conteudo_carrinho").html("");
        $("#dados_cliente").html("");
        $("#btn_finalizar_compra").css("display", "initial");
        $("#btn_enviar_compra").css("display", "none");
    });


    $(document).on("click",".lixeira", function(e){
        produtos.pop($(e.currentTarget).attr("indice"));
        $("#conteudo_carrinho").html("");
        if(produtos.length == 0){
            $("#conteudo_carrinho").html("<h1>Carrinho de compras vazio</h1>");
            $("#dados_cliente").hide();
            $("#btn_finalizar_compra").hide();
            $("#campo_valor_total").html("0");
            $("#numero_de_produtos").html("");
        }else{
            preencherConteudoCarrinho();
        }
    });

    //pedido de produto
    $("#btn_comprar").click(function(e){ 
        cliente.nome = $("#nome_cliente").val();
        cliente.telefone = $("#telefone_cliente").val();
        cliente.endereco = $("#endereco_cliente").val();
        enviarEmail(produto, cliente);       
    });

    //recalcula o valor total de cada produto no caso do cliente pedir mais um no carrinho
    $(document).on("change", ".quantidade_produto_carrinho", function(e){
        let div_produto_acrescentado = $(e.currentTarget).parent().parent().parent();
        let produto_acrescentado = produtos[div_produto_acrescentado[0].id];
        let preco_produto = Number(produto_acrescentado.preco_produto);
        let quantidade_produto = Number($(e.currentTarget).val());
        let total_do_item = preco_produto * quantidade_produto;
        produto_acrescentado.total_do_item = total_do_item;
        produto_acrescentado.quantidade_produto = quantidade_produto;
        //let total_do_item = Number($($(produto_acrescentado).find(".preco_produto_carrinho")[0]).html()) * Number($(e.currentTarget).val());
        $(div_produto_acrescentado).find(".total_do_item").html(total_do_item);
        //produtos[].quantidade_produto = total_do_item; 
        calculo_do_total_da_compra();
    });
    
    //exibir carrinho
    $("#link_carrinho").click(function(){
        $("#carrinho_de_compras").modal("show");
    })

    //finalizar pedido e inserir dados do cliente
    $("#btn_finalizar_compra").click(function(){
        $("#conteudo_carrinho").html("");
        let bloco_dados_cliente = $(".bloco_dados_cliente").clone().appendTo("#dados_cliente");
        bloco_dados_cliente.find(".div_nome_cliente").attr("id", "nome_cliente");
        bloco_dados_cliente.find(".div_telefone_cliente").attr("id", "telefone_cliente");
        bloco_dados_cliente.find(".div_endereco_cliente").attr("id", "endereco_cliente");
        bloco_dados_cliente.find(".div_cpf_cliente").attr("id", "cpf_cliente");
        bloco_dados_cliente.find(".div_email_cliente").attr("id", "email_cliente");
        bloco_dados_cliente.find(".div_numero_casa_cliente").attr("id", "numero_casa_cliente");
        bloco_dados_cliente.find(".div_bairro_cliente").attr("id", "bairro_cliente");
        bloco_dados_cliente.find(".div_cidade_cliente").attr("id", "cidade_cliente");

        $("#btn_finalizar_compra").css("display", "none");
        $("#btn_enviar_compra").css("display", "initial");
    });

    //envio da compra para o servidor
    $("#btn_enviar_compra").click(function(){
        teste_de_nome($("#nome_cliente"));
        teste_cpf($("#cpf_cliente"));
        teste_telefone($("#telefone_cliente"));
        teste_email($("#email_cliente"));
        teste_endereco($("#endereco_cliente"));
        teste_numero_casa($("#numero_casa_cliente"));
        teste_bairro($("#bairro_cliente"));
        teste_cidade($("#cidade_cliente"));
        console.log($("#dados_cliente").find(".is-invalid"));
        if($("#dados_cliente").find(".is-invalid").length > 0){
            console.log("não deu");
        }else{
            let cliente = {
                nome: $("#nome_cliente").val(),
                cpf: $("#cpf_cliente").val(),
                telefone: $("#telefone_cliente").val(),
                email: $("#email_cliente").val(),
                endereco: $("#endereco_cliente").val(),
                numero_casa: $("#numero_casa_cliente").val(),
                bairro: $("#bairro_cliente").val(),
                cidade: $("#cidade_cliente").val(),
            }
            venda = {
                'produtos': produtos,
                'cliente': cliente,
                'valor_total': $("#campo_valor_total").html()
            }
            
            produtos = [];
            $("#btn_enviar_compra").css("display", "none");
            
            $("#carrinho_de_compras").modal("hide");
            $("body").css("cursor","progress");

            let url = "/venda";
            $.post( url, 
                venda,
                function(resposta, status){
                    emitirAviso(resposta, "snackbar", 10000);
                    $("body").css("cursor","default");
                },                                
            );
        }
    });

    $("#link_energia_solar").click(function(){
        $("#navbarResponsive").collapse("toggle");
    });
});