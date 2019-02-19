class Empresa{
    constructor(logotipo, nome, slogan, endereco, contato, textoLivre){
        this.logotipo = logotipo,
        this.nome = nome,
        this.slogan = slogan,
        this.endereco = endereco,
        this.contato = contato,
        this.textoLivre = textoLivre
    }

    get logotipo(){
        return this.logotipo;
    }
    get nome(){
        return this.nome;
    }
    get slogan(){
        return this.slogan;
    }
    get endereco(){
        return this.endereco;
    }
    get contato(){
        return this.contato;
    }
    get textoLivre(){
        return this.textoLivre;
    }
    set logotipo(logotipo){
        this.logotipo = logotipo;
    }
    set logotipo(nome){
        this.nome = nome;
    }
    set logotipo(slogan){
        this.slogan = slogan;
    }
    set logotipo(endereco){
        this.endereco = endereco;
    }
    set logotipo(contato){
        this.contato = contato;
    }
    set logotipo(textoLivre){
        this.textoLivre = textoLivre;
    }
}