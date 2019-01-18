const     express = require("express"),
       bodyParser = require("body-parser"),
   methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));

//rota principal
app.get("/", function(req, res){
    res.render("index.ejs");
});

app.listen("21080", function(){
    console.log("Queimando pneu na porta 21080");
});