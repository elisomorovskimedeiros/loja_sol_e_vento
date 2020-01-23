const     express = require("express");  
              ejs = require("ejs");
       bodyParser = require("body-parser"),
   methodOverride = require("method-override"),
       nodemailer = require('nodemailer'),
        Principal = require("./controller/principal"),
        Produto = require("./model/Produto");

const app = express();
const principal = new Principal();
const produto = new Produto(null, null, null, null, null, null, null);
let resposta = {
    resposta: ""};

app.set("view engine", ejs);

app.use(bodyParser.urlencoded({extended: true}));
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
    produto.select().then(function(resultado){
        let produtos = resultado.resultado;
        res.render("index.ejs", {produtos});
    });
    
});
app.get("/como_funciona", function(req, res){
    res.render("construcao.ejs");
});
app.get("/quem_somos", function(req, res){
    res.render("sobre_nos.ejs");
});
app.get("/contato", function(req, res){
    res.render("contato.ejs", {resposta});
});
app.get("/iluminacao", function(req, res){
    res.render("iluminacao.ejs");
});
app.get("/solar", function(req, res){
    res.render("solar.ejs"); 
});

//Inserção de produto na loja
app.post("/inserirProduto", function(req, res){
    principal.inserirProduto(req, res);    
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
                res.render("contato.ejs",{resposta});
            }
            else{
                resposta.resposta = 'true';
                res.render("contato.ejs",{resposta});
                console.log(info.response);                
            }   
            resposta.resposta = '';
        });    
    }else if(mensagem.whats && mensagem.whats != ''){
        mensagem.whats = "55" + apenasNumeros(mensagem.whats);
        let alvoWhats = 'https://api.whatsapp.com/send?phone='+mensagem.whats+'&text='+mensagem.conteudo;
    }else{
        console.log("email e whats vieram vazios");
    }   
    //mensagem de envio ok: 250 2.0.0 OK  1551923466 o2sm2274213qtf.46 - gsmtp
});




app.listen("21080", function(){
    console.log("Queimando pneu na porta 21080");
});