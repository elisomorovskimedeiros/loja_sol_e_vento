class ArtigoBlog{
    constructor(titulo,conteudo,imagem){
        this.titulo = titulo,
        this.conteudo = conteudo,
        this.imagem = imagem
    }

    get titulo(){
        return this.titulo;
    }
    get conteudo(){
        return this.conteudo;
    }
    get imagem(){
        return this.imagem;
    }
    set titulo(titulo){
        this.titulo = titulo;
    }
    set conteudo(conteudo){
        this.conteudo = conteudo;
    }
    set imagem(imagem){
        this.imagem;
    }
}