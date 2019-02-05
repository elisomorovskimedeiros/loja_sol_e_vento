const     express = require("express");  
              ejs = require("ejs");
       bodyParser = require("body-parser"),
   methodOverride = require("method-override");

const app = express();

app.set("view engine", ejs);

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));

//rota principal
app.get("/", function(req, res){
    res.render("index.ejs");
});

app.get("/sobre_nos", function(req, res){
    res.render("sobre_nos.ejs");
});

app.get("/novo", function(req, res){
    res.render("novo_site.ejs");
});

app.get("*", function(req, res){
    res.render("construcao.ejs");
});

app.listen("21080", function(){
    console.log("Queimando pneu na porta 21080");
});