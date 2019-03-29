var CrudProdutos = require("../controller/CrudProdutos");
var Produto = require("../model/Produto");
var fs = require("fs");

class Principal{

    //Inserção de produtos no banco de dados e upload da foto
    inserirProduto(req, res){        
        var formidable = require("formidable");
        var form = formidable.IncomingForm();
        //no form do arquivo inserir_produtos foi utilizada a tag enctype="multipart/form-data" para permitir o envio da foto do produto, 
        //por isso foi necessário esse callback para realizar o cast do "req" recebido em formato binário para um objeto contendo o arquivo
        //enviado no objeto "file" e as informações dos campos no objeto "fields".
        form.parse(req, function(err, fields, files){
            if (err) throw(err);
            else{
                var oldpath = files.foto.path;
                var newpath = '/media/eli/Arquivos/Sol_e_Vento/Site/public/imagens/' + files.foto.name;
                fs.copyFile(oldpath, newpath, function (err) {
                    if (err) throw err;                                       
                });
                var produto = new Produto(fields.tipo, fields.nome, files.foto.name, fields.quantidade, fields.preco, '');
                var crudProdutos = new CrudProdutos();
                var retorno = crudProdutos.inserirProduto(produto);
                retorno.then(function(resultado){
                    console.log("linha 24 "+ resultado);
                });                 
                res.redirect("/");     
            }                  
        });                
    }
}

module.exports = Principal;


//var db = new CrudProdutos();
//var refletor = new Produto("Refletor","Led", 20, 20);
//db.inserirProduto(refletor);
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
//produtoDb = db.getConnection();
//let produtos = db.listarTodosProdutos(produtoDb);
//produtos.then(function(retornoDB){
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
   // console.log(retornoDB);
//});





/*produtos.forEach(function(produto){
    console.log(listarUmProduto(produto.id));
});*/

//console.log(db.listarUmProduto(produtos[1]._id));




/*

var lampada = new Produto("Lâmpada","Led", 10, 10);
var loja = new Loja(lampada);
console.log(loja.Produto.nome);*/
