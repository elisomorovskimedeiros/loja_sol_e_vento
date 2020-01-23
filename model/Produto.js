const Db = require("./Db");
const db = new Db();

class Produto{
    constructor(nome_produto, ns_produto, pn_produto, imagem_produto, preco_produto, qtd_produto, descricao_produto){

        this.nome_produto = nome_produto;
        this.ns_produto = ns_produto;
        this.pn_produto = pn_produto;
        this.imagem_produto = imagem_produto;
        this.preco_produto = preco_produto;
        this.qtd_produto = qtd_produto;
        this.descricao_produto = descricao_produto;
        this.query = function(sql, variavel){
            return new Promise(function(resolve, reject){
                db.connection.query(sql, variavel, function(err, resultado){
                    //db.connection.end();
                    if(err){
                        return resolve({status: false,
                                resultado: err});
                    }else{
                        return resolve({status: true,
                                resultado: resultado});
                    }
                });
            });
        };
    }

    select(){
        let sql = "SELECT * FROM produto;"
        return this.query(sql);
    }

    insert(produto){
        let sql = "INSERT INTO produto (nome_produto, ns_produto, pn_produto, imagem_produto, preco_produto, qtd_produto, descricao_produto) VALUES (\'" +
                                            produto.nome_produto + "\'," +
                                            produto.ns_produto +"," + 
                                            produto.pn_produto + ", \'" + 
                                            produto.imagem_produto + "\'," + 
                                            produto.preco_produto + "," + 
                                            produto.qtd_produto + ", \'" +
                                            produto.descricao_produto+"\');";

        return this.query(sql);
    }

    select_um_produto(id_produto){
        let sql = "SELECT * FROM produto WHERE id_produto = ?";
        return this.query(sql, id_produto);
    }

    update(produto){
        let sql = "UPDATE produto SET " +
                "nome_produto = \'" + produto.nome_produto + "\'," +
                "ns_produto = " + produto.pn_produto + ", " +
                "imagem_produto = \'" + produto.imagem_produto + "\'," +
                "preco_produto = " + produto.preco_produto + "," +
                "qtd_produto = " + produto.qtd_produto + ", " +
                "descricao_produto = \'"+ produto.descricao_produto +
            "\' WHERE id_produto  = ?";
        return this.query(sql, produto.id_produto);
    }

    delete(id_produto){
        let sql = "DELETE FROM produto WHERE id_produto = ?"
        return this.query(sql, id_produto);
    }
}


module.exports = Produto;