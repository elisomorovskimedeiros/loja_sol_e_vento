const nodemailer = require("nodemailer");

//Serviço de envio de email

class Email{
    constructor(){
        this.transporter = nodemailer.createTransport({
            pool: true,
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "contato.solevento@gmail.com",
                pass: "medeiros11"
            }
        });
        this.mailOptions = {
            from: "contato.solevento@gmail.com",
            to: "",
            subject: "",
            text: ""
        }; 
    }
    enviar(){
        let msg = this;
        return new Promise(function(resolve){
            msg.transporter.sendMail(msg.mailOptions, function(error, info){
                if (error){
                    console.log(error);
                    return resolve({status: false,
                            detalhes: error});
                }
                return resolve({status: true,
                        detalhes: info})
            });
        });        
    }

    async enviarEmailDeVenda(produtos, dadosCliente, valor_total){
        let email = this;
        let mensagem = "Nova venda pelo site!\n" +
                        "Venda para: " +
                        dadosCliente.nome +", "+
                        "telefone: " + dadosCliente.telefone +",\n"+
                        "CPF: " + dadosCliente.cpf +",\n" +
                        "email: " + dadosCliente.email +",\n" +
                        "endereço: " + dadosCliente.endereco +
                        ", " + dadosCliente.numero_casa + ",\n"+
                        "bairro: " + dadosCliente.bairro + ",\n"+
                        "cidade: " + dadosCliente.cidade + ".\n"
                        "Produtos: \n";
        produtos.forEach(function(produto){
            mensagem += produto.nome_produto +
                        " - quantidade: " + produto.quantidade_produto + "\n" +
                        " - total do item: " + produto.total_do_item + "\n";
        });
        mensagem += "Valor da venda: R$" + valor_total;


        email.mailOptions.to = 'contato.solevento@gmail.com';
        email.mailOptions.subject = "Nova venda pelo site!";
        email.mailOptions.text = mensagem;                          
        return email.enviar().then(function(retorno){
            if(retorno.status){
                return true;
            }else{
                return false;
            }
        });
        
       return true;
        
    
    }

}
module.exports = Email;

                                                        