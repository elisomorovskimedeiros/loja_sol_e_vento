class Rodape{
    constructor(textoEsquerda, textoDireita){
        this.textoEsquerda = textoEsquerda,
        this.textoDireita = textoDireita
    }
    
    get textoEsquerda(){
        return textoEsquerda;
    }
    get textoDireita(){
        return textoDireita;
    }
    set textoEsquerda(textoEsquerda){
        this.textoEsquerda = textoEsquerda;
    }
    set textoDireita(textoDireita){
        this.textoDireita = textoDireita;
    }
}