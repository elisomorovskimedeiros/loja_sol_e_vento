
var statusFormContato = {
  nome: false,
  email: false,
  whats: true,
  mensagem: false
};

//JOGO DE SOMBRA NOS BOTÕES
function diminuiSombra(elemento){
  elemento.style.boxShadow = "5px 5px 5px #888";
}
function aumentaSombra(elemento){
  elemento.style.boxShadow = "10px 10px 10px #888";
}

//VERIFICAÇÃO DO CAMPO NOME NO SITE DE CONTATO
function verificarNome(nome){
  if (isNaN(nome)  && (nome.length >= 2)){
    document.getElementById("avisoNome").innerHTML = ("");
    statusFormContato.nome = true;    
  }else{
    document.getElementById("avisoNome").innerHTML = ("<img src='/imagens/erro.png' class='img-aviso' width='30px'> Nome Inválido");
    statusFormContato.nome = false;
  }
  habilitaEnvio(document.getElementById("mensagem"), "botao_email");
}

//VERIFICAÇÃO DO CAMPO EMAIL NO SITE DE CONTATO
function verificarEmail(email){
  var posicaoArroba = email.indexOf("@");
	var posicaoPonto = email.indexOf(".");
  
  //verifica se existe "." e "@" 
	if ((posicaoArroba != -1) && (posicaoPonto != -1)) {
		var ponto = email.substring(posicaoArroba);
    ponto = ponto.indexOf(".");
    //verifica se existe "." após o "@"
		if (ponto != -1) {
			document.getElementById('avisoEmail').innerHTML = ("");
      statusFormContato.email = true;
      statusFormContato.whats = false;     
    }
		else {
			document.getElementById('avisoEmail').innerHTML = ("<img src='/imagens/erro.png' class='img-aviso' width='30px'> Faltou o que vem depois do ponto, ex.: \".com\", \".gov\"");
			statusFormContato.email = false;
		}
	}	
	else {
		document.getElementById('avisoEmail').innerHTML = ("<img src='/imagens/erro.png' class='img-aviso' width='30px'> Você não informou o seu email corretamente");
		statusFormContato.email = false;
    }
    habilitaEnvio(document.getElementById("mensagem"), "botao_email");
}

function seleciona(botao){
  if(statusFormContato.email == false){
    botao.style = "box-shadow: 4px 3px 0 rgba(0, 0, 0, .3),0 -2px -7px rgba(0, 0, 0, 0.2)";
    statusFormContato.email == true;
    console.log(statusFormContato.email);
  }else{
    //botao.setAttribute(style="box-shadow: 4px 3px 0 rgba(0, 0, 0, .3),0 2px 7px rgba(0, 0, 0, 0.2)", false);
    statusFormContato.email == false;
  }
}

function completaTelefone(whats){
  numero = whats.value;
  desabilitaDiv(whats,"container-email", "email");
  tamanho = numero.length;
  if (!((event.keyCode >= 48 && event.keyCode <= 57 ) || (event.keyCode >= 96 && event.keyCode <= 105 ) || (event.keyCode >= 37 && event.keyCode <= 40) || event.keyCode == 8 || event.keyCode == 46)) {
		document.getElementById("whats").value = numero.substring(0,tamanho-1);//permite inserção de apenas números, setas, delete e backspace no teclado
	}
  //numero = numero.replace(/[^0-9]/g,'');
  if(tamanho == 1 && numero[0] == 0){ //não permite que se digite 0
    document.getElementById("whats").value = "";
  }
  if(tamanho > 14){ //limita o número de caracteres no campo
    document.getElementById("whats").value = numero.substring(0,14);
  }
  if(tamanho == 2 && numero[0] != '('){ //insere os parênteses no ddd
    
    //numero = numero.replace(/[^0-9]/g,'');
    var comParentese = '('+numero[0]+numero[1]+')';
    document.getElementById("whats").value = comParentese;
  }else if(tamanho == 9 && numero[tamanho] != '-' && event.keyCode != 8 && event.keyCode != 46){//insere o ifem no meio do número
    var comIfem = numero.slice(0,9) + '-' + numero.slice(9,tamanho);
    document.getElementById("whats").value = comIfem;
  }
  if(tamanho == 14){
    document.getElementById("avisoWhats").innerHTML = "";
  }
}

function verificaWhats(whats){
  numero = whats.value;
  numero = numero.replace(/[^0-9]/g,'');  
  tamanho = numero.length;
  if(tamanho != 11){
    document.getElementById("avisoWhats").innerHTML = ('<img src="/imagens/erro.png" height="15"> Número inválido');
  }else{
    document.getElementById("avisoWhats").innerHTML = "";
    statusFormContato.whats = true;
    statusFormContato.email = false;
  }
}

function desabilitaDiv(div, idTransparente, idDesabilitado){
  div = div.value;
  if(div.length > 0){
    document.getElementById(idDesabilitado).setAttribute('disabled', true);
    document.getElementById(idTransparente).classList.add("transparencia");
  }else {
    document.getElementById(idDesabilitado).removeAttribute('disabled');
    document.getElementById(idTransparente).classList.remove("transparencia");
  }  
}

function habilitaEnvio(campoMensagem, botao){
  botao = document.getElementById(botao);
  if(campoMensagem.value.length > 0 && statusFormContato.nome==true && (statusFormContato.email==true || statusFormContato.whats==true)){   
    botao.classList.remove("transparencia");
    botao.removeAttribute("disabled");    
  }else{
    botao.setAttribute("disabled", true);
    botao.classList.add("transparencia");
  }
}



/* Máscaras ER 
function mascara(o,f){
  v_obj=o;
  v_fun=f;
  setTimeout("execmascara()",1);
}
function execmascara(){
  v_obj.value=v_fun(v_obj.value);
  console.log(v_obj.value);
}
function mtel(v){
  v=v.replace(/D/g,"");             //Remove tudo o que não é dígito
  v=v.replace(/^(d{2})(d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
  v=v.replace(/(d)(d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
  return v;
}
function id( el ){
return document.getElementById( el );
}
window.onload = function(){
  id('whats').onkeypress = function(){
    mascara( this, mtel );
  };
}*/

function doGetCaretPosition (oField) {

  // Initialize
  var iCaretPos = 0;

  // IE Support
  if (document.selection) {

    // Set focus on the element
    oField.focus();

    // To get cursor position, get empty selection range
    var oSel = document.selection.createRange();

    // Move selection start to 0 position
    oSel.moveStart('character', -oField.value.length);

    // The caret position is selection length
    iCaretPos = oSel.text.length;
  }

  // Firefox support
  else if (oField.selectionStart || oField.selectionStart == '0')
    iCaretPos = oField.selectionStart;

  // Return results
  return iCaretPos;
}


function enviarContato(){
  if(statusFormContato.email == true){
    document.formContato.submit();
  }else if(statusFormContato.whats == true){
    /*var numero = document.getElementById("whats").value;
    numero = numero.replace(/[^0-9]/g,'');
    var texto = document.getElementById("mensagem").value;
    
    for(let i = 0; i < texto.length; i++){
      if(texto[i] == String.fromCharCode(32)){
        texto = texto.substring(0,i) + "%20" + texto.substring(i+1,texto.length);        
      }
    }*/
    
    location.href="https://api.whatsapp.com/send?phone="+"5551993101122"+"&text=";
    //https://api.whatsapp.com/send?phone=5588988459521&text=Solicite%20um%20Or%C3%A7amento!
    //console.log(texto);
    /* faltou permitir digitação do número do telefone via teclado do telefone, liberar uso do whatsapp apenas 
    via smartphone e tirar as linhas de código do whats do app.js*/
  }
}
function descerBotao(botao){
  botao.style = "box-shadow: 0px 0px 0 rgba(0, 0, 0, .3),0 -0px -0px rgba(0, 0, 0, 0.2); border-top: 3px; border-left: 3px";
}

function erguerBotao(botao){
  botao.style = "box-shadow: 4px 3px 0 rgba(0, 0, 0, .3),0 2px 7px rgba(0, 0, 0, 0.2) border-top: 1px; border-left: 1px";
  if(botao.id == "botao_whats"){
    enviarContato();
  } 
}

function statusEmail(){
  let divStatus = document.getElementById("resposta_email").innerHTML;
  //console.log("carregou");
  if(divStatus == "true"){
    document.getElementById("container-email").innerHTML = "<div class='row'><div class='col-3'><img src='certo.png'></div><div class='col-9'>Mensagem Enviada</div></div><div col-12><a href='/'>Voltar</a></div>";
  }
}
