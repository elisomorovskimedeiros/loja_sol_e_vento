const mysql = require("mysql");

class Db{
    constructor(){
        this.esquema_conexao = ({
            host     : 'mysql.solevento.net.br',
            user     : 'solevento03',
            password : 'medeiros11',
            database : 'solevento03', //não colocar se for criar um banco através do node
            multipleStatements: true //cuidado: deve ser falso (padrão) para evitar sql injection - com ele true testar a rota: http://localhost:3000/post/1;DROP%20TABLE%20posts
        });
        this.pool = mysql.createPool(this.esquema_conexao);
        /*
        this.pool.connect(function(err){
            if(err){
                console.log("Deu erro!");
                console.log(err);
            }else{
            }
        });*/
    }
}

module.exports = Db;