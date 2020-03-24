const Db = require("./Db");
var db = new Db();

class Produto{
    constructor(){

        this.nome_produto = null;
        this.ns_produto = null;
        this.pn_produto = null;
        this.imagem_produto = null;
        this.preco_produto = null;
        this.qtd_produto = null;
        this.descricao_produto = null;
        this.query = async function(sql, variavel){
            return new Promise(function(resolve, reject){
                return db.pool.getConnection(function(err, con){
                    if (err){
                        console.log("Deu error no pool.getConnection");
                        console.log(err);
                        return reject({status: false,
                            resultado: err});
                    }else{
                        con.query(sql, variavel, function(err, resultado){
                            con.release();//usado para evitar o acúmulo de conexões abertas dentro do pool, substiutiu o con.ent()
                            if(err){
                                console.log("Deu error dentro da query");
                                console.log(err);
                            return reject({status: false,
                                resultado: err});
                            }else{
                                return resolve({status: true,
                                        resultado: resultado});
                            }
                        });
                    }
                });
            });
        }
    }

    select(){
        let sql = "SELECT * FROM produto;"
        return this.query(sql);
    }

    select_produtos_disponiveis(){
        let sql = "SELECT * FROM produto WHERE produto.qtd_produto > 0";
        return this.query(sql);
    }

    insert(produto){
        let sql = "INSERT INTO produto (nome_produto, ns_produto, pn_produto, imagem_produto, preco_produto, qtd_produto, descricao_produto) VALUES (\'" +
                                            produto.nome_produto + "\'," +
                                            produto.ns_produto +",\'" + 
                                            produto.pn_produto + "\', \'" + 
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
                "pn_produto = \'" + produto.pn_produto + "\', " +                
                "preco_produto = " + produto.preco_produto + ", " +
                "qtd_produto = " + produto.qtd_produto + ", " +
                "descricao_produto = \'"+ produto.descricao_produto;
        if(produto.imagem_produto != ''){
            sql += "\', imagem_produto = \'" + produto.imagem_produto;
        }
            sql += "\' WHERE id_produto  = ?";
        return this.query(sql, produto.id_produto);
    }

    delete(id_produto){
        let sql = "DELETE FROM produto WHERE id_produto = ?"
        return this.query(sql, id_produto);
    }

    nome_e_imagens_produto(id_produto){
        let sql = "SELECT produto.nome_produto, imagem_produto FROM produto WHERE id_produto = ?";
        return this.query(sql, id_produto);
    }
}


module.exports = Produto;