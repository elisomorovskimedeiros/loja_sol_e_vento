var Db = require("./controller/Db.js");


var db = new Db();
//var refletor = new Produto("Refletor","Led", 20, 20);

var produto;
/*
async function lerDb(){
    produtoDb = db.getConnection();
    produto = await db.listarTodosProdutos(produtoDb);
    //console.log(produto);
    return produto;
}

let produtos = lerDb();
produtos.then(function(valor){
    console.log("linha 138 "+valor);
});
*/
produtoDb = db.getConnection();
let produtos = db.listarTodosProdutos(produtoDb);
produtos.then(function(retornoDB){
    /*var produto = db.listarUmProduto(retornoDB[0]._id);
    produto.then(function(retornoDB){
        retornoDB.preco = 56;
        var resposta = db.updateProduto(retornoDB);
        resposta.then(function(respostaDB){
            console.log("linha 146 "+respostaDB);
            var respDelecao = db.removerProduto(retornoDB._id);
            respDelecao.then(function(respostaDB){
                console.log("linha 150 "+respostaDB);
            });
        });        
    });*/
    console.log(retornoDB);
});





/*produtos.forEach(function(produto){
    console.log(listarUmProduto(produto.id));
});*/

//console.log(db.listarUmProduto(produtos[1]._id));




/*

var lampada = new Produto("Lâmpada","Led", 10, 10);
var loja = new Loja(lampada);
console.log(loja.Produto.nome);*/
