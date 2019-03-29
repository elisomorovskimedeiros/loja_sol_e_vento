var Produto = require("./model/Produto");

class Loja{
    constructor(Produto){
        this.Produto = Produto;
    }

    getProduto(){
        return this.Produto;
    }
    
    setProduto(Produto){
        this.Produto = Produto;
    }

}
module.exports = Loja;


