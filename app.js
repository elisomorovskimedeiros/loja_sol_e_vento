const     express = require("express");  
              ejs = require("ejs");
       bodyParser = require("body-parser"),
   methodOverride = require("method-override"),
       nodemailer = require('nodemailer'),
          Produto = require("./model/Produto"),
          multer  = require('multer'),//upload de arquivos
            Email = require("./model/Email"),//envio de emails
             Jimp = require('jimp'),//redimensionador de imagens
               fs = require("fs-extra");




//fs-extra para manipular arquivos e diretórios
function criar_diretorios_arquivos(dir){
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 0744);
    }
    if (!fs.existsSync(dir+"/miniaturas")) {
        fs.mkdirSync(dir+"/miniaturas", 0744);
    }
}

function remover_arquivo(arquivo){
    fs.remove(arquivo, (err) => {
        if (err) {
            console.error(err)
            return 
        }
    });
}

//utilizado o midlleware Multer para captura do upload do arquivo contendo a foto dos produtos
//configuração do multer
//site que ajudou: https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        //criando o diretorio do arquivo
        let dir = "public/imagens/produtos/"+req.body.nome_produto;
        criar_diretorios_arquivos(dir);
        cb(null, dir);//local de gravação do arquivo
    },
    filename: function (req, file,cb){
        cb(null, file.originalname);//nome do arquivo
    }    
});


async function redimensionar_imagem(caminho_arquivo_origem, caminho_arquivo_destino, height){
    //framework de redimensionamento de imagens
    Jimp.read(caminho_arquivo_origem)
        .then(lenna => {
            return lenna
        .resize(Jimp.AUTO, height) // resize
        .write(caminho_arquivo_destino); // save
    })
    .catch(err => {
        console.error(err);
    });

}

var upload = multer({ storage: storage});//variável que manipula o post


const app = express();
let produto = new Produto();
let resposta = {};

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));

//Serviço de envio de email

//sentando conta para envio dos emails
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'contato.solevento@gmail.com',
        pass: 'medeiros11'
    }
});

//rota principal
app.get("/", function(req, res){
    produto.select_produtos_disponiveis().then(function(resposta){
        if(!resposta.status){
            console.log(resposta.resultado);
        }else{
            let produtos = resposta.resultado;
            res.render("index", {produtos});
        }
    });
    
});

//rota da loja
app.get("/index", function(req, res){
    produto.select_produtos_disponiveis().then(function(resposta){
        if(!resposta.status){
            console.log(resposta.resultado);
        }else{
            console.log(resposta.resultado);
            let produtos = resposta.resultado;
            res.render("index", {produtos});
        }
    });
    
});

app.get("/como_funciona", function(req, res){
    res.render("construcao.ejs");
});
app.get("/quem_somos", function(req, res){
    res.render("sobre_nos.ejs");
});
app.get("/contato", function(req, res){
    console.log(resposta);
    res.render("contato.ejs", {resposta});
});
app.get("/iluminacao", function(req, res){
    res.render("iluminacao.ejs");
});
app.get("/solar", function(req, res){
    res.render("solar.ejs"); 
});

//Inserção de produto na loja
app.get("/controle_produtos", function(req, res){
    produto.select().then(function(resposta){
        if(!resposta.status){
            console.log(resposta.resultado);
        }else{
            let produtos = resposta.resultado;
            res.render("controle_produtos.ejs", {produtos});
        }
    });
});

//janela novo produto
app.get("/produtos/new", function(req, res){
    res.render("novo_produto");    
});

//recebimento do novo produto
app.post("/produtos", upload.single('imagem_produto'), function(req, res){
    const file = req.file;
    let imagem_produto = '';
    if(!file){//caso nenhuma foto tenha sido inserida
        console.log("não veio foto");
    }else{
        imagem_produto = "imagens/"+ file.originalname;        
        let caminho_arquivo_origem = "public/imagens/produtos/"+req.body.nome_produto+"/"+file.originalname;
        let caminho_arquivo_destino = "public/imagens/produtos/"+req.body.nome_produto+"/miniaturas/miniatura"+file.originalname;
        redimensionar_imagem(caminho_arquivo_origem, caminho_arquivo_destino, 200);//miniatura usada para a lista geral
        redimensionar_imagem(caminho_arquivo_origem, caminho_arquivo_origem, 400);//imagem usada para a tela de detalhes
    }
    produto.nome_produto = req.body.nome_produto;
    produto.pn_produto = req.body.pn_produto;
    produto.imagem_produto = imagem_produto; 
    produto.preco_produto = req.body.preco_produto; 
    produto.qtd_produto = req.body.qtd_produto;
    produto.descricao_produto = req.body.descricao_produto;
    
    produto.insert(produto).then(function(resposta){
        let mensagem;
        if(!resposta.status){
            console.log(resposta);
            mensagem = "Ocorreu um erro na inserção do produto";
            res.render("novo_produto", {mensagem});
            
        }else{
            mensagem = "Produto inserido com sucesso!";
            res.render("novo_produto", {mensagem});
        }
    }); 
    
});

app.put("/produto/:id", upload.single('imagem_produto'), function(req, res){
    const file = req.file;
    let imagem_produto = '';
    if(!file){//caso nenhuma foto tenha sido inserida
        console.log("não veio foto");
    }else{
        imagem_produto = file.originalname;
        let caminho_arquivo_origem = "public/imagens/produtos/"+req.body.nome_produto+"/"+file.originalname;
        let caminho_arquivo_destino = "public/imagens/produtos/"+req.body.nome_produto+"/miniaturas/miniatura"+file.originalname;
        redimensionar_imagem(caminho_arquivo_origem, caminho_arquivo_destino, 200);//miniatura usada para a lista geral
        redimensionar_imagem(caminho_arquivo_origem, caminho_arquivo_origem, 400);//imagem usada para a tela de detalhes
    }
    let produto_a_editar = req.body;
    produto_a_editar.imagem_produto = imagem_produto;
    //puxar dados do produto para remover imagens antigas
    produto.nome_e_imagens_produto(req.params.id).then(function(resposta){
        if(resposta.status){
            let produto_selecionado = resposta.resultado[0];
            let imagem  = '', miniatura = '';
            //testa para ver se vieram os dados da imagens no bd e se o arquivo não tem o mesmo nome do anterior
            if(resposta.resultado[0].imagem_produto && resposta.resultado[0].imagem_produto != '' && imagem_produto != resposta.resultado[0].imagem_produto){
                imagem = "public/imagens/produtos/"+produto_selecionado.nome_produto+"/"+produto_selecionado.imagem_produto;
                miniatura = "public/imagens/produtos/"+produto_selecionado.nome_produto+"/miniaturas/miniatura"+produto_selecionado.imagem_produto;
            }          
            if(imagem && imagem != '') remover_arquivo(imagem);
            if(miniatura != '') remover_arquivo(miniatura);
            produto.update(produto_a_editar).then(function(resposta){
                if(!resposta.status){
                    console.log(resposta);
                    res.send("Ocorreu um erro na edição do produto");
                }else{
                    res.send("Editado OK");
                }
            });            
        }else{
            console.log("Ocorreu erro no produto.nome_e_imagens_produto");
            console.log(resposta);
        }
    });
    
});

app.delete("/produto/:id", function(req, res){
    //puxar dados do produto para remover o diretório de imagens
    produto.nome_e_imagens_produto(req.params.id).then(function(resposta){
        if(resposta.status){
            if(resposta.resultado[0].nome_produto && resposta.resultado[0].nome_produto != ''){
                remover_arquivo("public/imagens/produtos/"+resposta.resultado[0].nome_produto);
            }
            produto.delete(req.params.id).then(function(resposta){
                if(!resposta.status){
                    console.log(resposta);
                    res.send("Ocorreu um erro na exclusão do produto");
                }else{
                    res.send("excluído ok");
                }
            });
        }else{
            console.log(resposta);
        }
    });    
});

app.get("/massoterapia", function(req, res){
    res.render("site_Nure/index.ejs");
});

//função que deixa o número para whatsapp apenas com números
function apenasNumeros(string) 
{
    var numsStr = string.replace(/[^0-9]/g,'');
    return numsStr;
}

//rota do contato com o cliente
app.post("/mandarMensagem", function(req, res){
    let mensagem = {
        nome: req.body.nome,
        cidade: req.body.cidade,
        email: req.body.email,
        whats: req.body.whats,
        conteudo: req.body.mensagem
    }

    mensagem.conteudo = "Mensagem recebido pelo site!\n"+
                        "Nome: "+ mensagem.nome+"\n"+
                        "Cidade: "+ mensagem.cidade+"\n"+
                        "email: "+ mensagem.email+"\n"+
                        "Mensagem: \n"+
                        mensagem.conteudo;

    
    
    if (mensagem.email && mensagem.email != ''){
        //setando opções de envio
        let mailOptions = {
            from: 'contato.solevento@gmail.com',
            to: 'contato.solevento@gmail.com',
            subject: 'Contato via site',
            text: mensagem.conteudo
        };        
        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log("Deu erro no envio");
                console.log(error);
                resposta.resposta = 'false';
                resposta.mensagem = "Ocorreu um erro no envio";
                res.render("contato.ejs",{resposta});
            }
            else{
                resposta.resposta = 'true';
                resposta.mensagem = "Mensagem Enviada"
                res.render("contato.ejs",{resposta});    
            }   
            resposta = {};
        });    
    }else if(mensagem.whats && mensagem.whats != ''){
        mensagem.whats = "55" + apenasNumeros(mensagem.whats);
        let alvoWhats = 'https://api.whatsapp.com/send?phone='+mensagem.whats+'&text='+mensagem.conteudo;
        resposta.resposta = 'true';
        resposta.mensagem = "Mensagem enviada";
        res.render("contato.ejs",{resposta});
    }else{
        resposta.resposta = false;
        resposta.mensagem = "email e whats vieram vazios";
        res.render("contato.ejs",{resposta});
    }
    resposta.resposta = {};   
    //mensagem de envio ok: 250 2.0.0 OK  1551923466 o2sm2274213qtf.46 - gsmtp
});

app.post("/venda", function(req, res){
    let email = new Email();
    email.enviarEmailDeVenda(req.body.produtos, req.body.cliente ,req.body.valor_total).then(function(retorno){
        if(retorno){
            res.send("Compra realizada!<br>Aguarde que em pouco tempo entraremos em contato para combinar a entrega");
        }else{
            res.send("Ocorreu um erro no envio da compra");
        }
    });
});

app.listen("21080", function(){
    console.log("Queimando pneu na porta 21080");
});