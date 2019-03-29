var Db = require("../controller/Db.js");

class CrudProdutos extends Db{
     //Inserção no banco
    //Retorno: status: Boolean 
    //         mensagem: String
    async inserirProduto(produto){
        var produtoDB = this.getConnection();
        var resultado = await produtoDB.create(produto, function(err,produto){
            if(err){
                console.log("Deu Creps");
                console.log(err);
                return ({status: false,
                         mensagem: err});
            }else{
                //console.log("Adicionou beleza!");
                //console.log(produto);
                return (produto);
            }
        });

        console.log("linha 23 do crudProdutos "+ resultado);
        return resultado;
    }

    //Listar todos os produtos
    //Retorno: status: Boolean 
    //         conteudo: Produtos[]
    async listarTodosProdutos(ProdutoDB){
        var produtos = await ProdutoDB.find({}, function(err, produtos){
                if(err){
                    console.log("Deu Creps");
                    console.log(err);
                    return(err);
                }else{
                    //console.log("Conectou beleza!");
                    //console.log(produtos);
                    return(produtos);
                }
            });
        return produtos;            
    }

    //Listar um os produtos pelo Id
    //Retorno: status: Boolean 
    //         conteudo: Produto
    async listarUmProduto(id){
        var produto = await produtoDb.findById(id, function(err, produto){
            if(err){
                console.log("Deu Creps");
                console.log(err);
                return({status: false,
                        conteudo: err});
            }else{
                console.log("Conectou beleza!");
                return({status: true,
                        conteudo: produto});
            }
        });
        return produto;
    }

    //Update no Produto
    //Retorno: status: Boolean 
    //         mensagem: String
    async updateProduto(produto){
        var resposta = await produtoDb.findByIdAndUpdate(produto.id, produto, function(err, produto){
            if(err){
                console.log("Deu Creps");
                console.log(err);
                return({status: false,
                        mensagem: err});
            }else{
                console.log("Conectou beleza!");
                //console.log(produto);
                //return({status: true,
                        //mensagem: "Update ok!"});
            }
        });
        return resposta;
    }


    //Remover Produto
    //Retorno: status: Boolean 
    //         mensagem: String
    async removerProduto(id){
        var resposta = await produtoDb.findByIdAndRemove(id, function(err){
            if (err){
                console.log(err);
            }else{
                return({status: true,
                        mensagem: "Update ok!"});
            }
        });
        return resposta;
    }
}
module.exports = CrudProdutos;

