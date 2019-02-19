class Cabecalho{
    constructor(logotipoSite, tituloSite, linkCabecalhoEsquerda, linkCabecalhoDireita ){
        this.logotipoSite = logotipoSite,
        this.tituloSite = tituloSite,
        this.linkCabecalhoEsquerda = linkCabecalhoEsquerda,
        this.linkCabecalhoDireita = linkCabecalhoDireita
    }

    get logotipoSite(){
        return this.logotipoSite;
    }
    get tituloSite(){
        return this.logotipoSite;
    }
    get linkCabecalhoDireita(){
        return this.linkCabecalhoDireita;
    }
    get linkCabecalhoEsquerda(){
        return this.linkCabecalhoEsquerda;
    }
    set logotipoSite(logotipoSite){
        this.logotipoSite = logotipoSite;
    }
    set tituloSite(){
        this.tituloSite = tituloSite;
    }
    set linkCabecalhoDireita(){
        this.linkCabecalhoDireita = linkCabecalhoDireita;
    }
    set linkCabecalhoEsquerda(){
        this.linkCabecalhoEsquerda = linkCabecalhoEsquerda;
    }
}