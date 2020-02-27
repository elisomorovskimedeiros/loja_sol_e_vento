
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

//Emissor de mensagems tipo "snackbar"
function emitirAviso(mensagem, id, tempo){
  let snackbar = document.getElementById(id);
  snackbar.innerHTML = mensagem;
  snackbar.className = "show";
  setTimeout(function(){snackbar.className = snackbar.className.replace("show", ""); }, tempo);
}


function editar_produto(){
  $('#form_editar_produto').submit();
}

//função de submit de exclusão do produto
function alerta_de_exclusao(){
  $("#form_exclusao_produto").attr("action", "produto/"+produto.id_produto+"?_method=DELETE");
  let confirmacao = confirm("Você deseja realmente excluir esse produto?");
  if(confirmacao){
    $('#form_exclusao_produto').submit();
  }
}

function preencherConteudoCarrinho(){
  let numero_de_produtos = 0;
  $("#conteudo_carrinho").html("");
  produtos.forEach(function(produto_em_compra, indice){
    let div_criada = ($("#bloco_produto_carrinho").clone()
                                        .appendTo("#conteudo_carrinho"))
                                        .attr("id", indice)
                                        .removeClass("invisible")
                                        .removeClass("float")[0];
    $($(div_criada).find(".imagem_produto_carrinho")[0]).attr("src", produto_em_compra.foto_produto);    
    $($(div_criada).find(".nome_produto_carrinho")[0]).html(produto_em_compra.nome_produto);
    $($(div_criada).find(".preco_produto_carrinho")[0]).html(produto_em_compra.preco_produto);   
    $($(div_criada).find(".quantidade_produto_carrinho")[0]).val(produto_em_compra.quantidade_produto);
    $($(div_criada).find(".total_do_item")[0]).html(Number(produto_em_compra.quantidade_produto)*Number(produto_em_compra.preco_produto));
    $($(div_criada).find(".lixeira")[0]).attr("indice",indice);
  });
  calculo_do_total_da_compra();
}

function calculo_do_total_da_compra(){
  let totais_dos_itens = $("#conteudo_carrinho").find(".total_do_item");
  let numero_de_itens = $("#conteudo_carrinho").find(".quantidade_produto_carrinho");
  let total_da_compra = 0;
  let  numero_total_de_itens = 0;
  for(let indice = 0; indice < totais_dos_itens.length; indice++){
    let valor_total_do_item = Number($(totais_dos_itens[indice]).html());
    total_da_compra += valor_total_do_item;
  }
  for(let indice = 0; indice < numero_de_itens.length; indice++){
    let numero = Number($(numero_de_itens[indice]).val());
    numero_total_de_itens += numero;
  }
  $("#campo_valor_total").html(total_da_compra);
  if(produtos.length > 1){
    numero_total_de_itens += " produtos, ";
  }else{
    numero_total_de_itens += " produto, ";
  }
  $("#numero_de_produtos").html(numero_total_de_itens);
}


//VALIDAÇÕES DO FORMULARIO COM INFORMAÇÕES DO CLIENTE

function inserir_feedback_no_campo(validacao){
  if(!validacao.status){
    $(validacao.campo).removeClass("is-valid");
    $(validacao.campo).addClass("is-invalid");
    $(validacao.campo).next().html(validacao.mensagem);
    window.location.href = "#"+$(validacao.campo).parent().attr("id");
  }else{
    $(validacao.campo).removeClass("is-invalid");
    $(validacao.campo).addClass("is-valid");
  }
}

function teste_de_nome(campo){
  let nome = $(campo).val();
  let temEspaco = false;
  let validacao = {};
  for(let indice = 0; indice < nome.length; indice++){
    if(nome[indice] === ' '){
      temEspaco = true;
    }
  }
  if(!temEspaco){
    validacao = {status : false,
      mensagem : "Seu nome deve estar completo com nome e sobrenome",
      campo : campo
    };
  }else if(nome.length < 3){
    validacao = {status : false,
      mensagem : "Seu nome deve estar completo e não pode ter menos de 3 caracteres",
      campo : campo
    };
  }else{
    validacao = {status : true,
      campo : campo
    };
  }
  inserir_feedback_no_campo(validacao);
}

function teste_cpf(campo){
  let validacao = {};
  let cpf = '';
  let cpf_informado = $(campo).val();
  for(let i = 0; i < cpf_informado.length; i++){
    if(cpf_informado.charCodeAt(i) >= 48 && cpf_informado.charCodeAt(i) <= 57){
      cpf += cpf_informado[i];
    }
  }
  
  if(cpf.length != 11){
    validacao = {status : false,
      mensagem : "O CPF possui 11 números!",
      campo : campo
    };
  }else{
    validacao = {status : true,
    campo : campo
    };
  }
  inserir_feedback_no_campo(validacao);
}

function teste_telefone(campo){
  let validacao = {};
  if($(campo).val() != ''){
    validacao = {status : true,
      campo : campo
    };
  }else{
    validacao = {status : false,
      mensagem : "Insira um telefone",
      campo : campo
    };
  }
  inserir_feedback_no_campo(validacao);
}

function teste_email(campo){
  let validacao = {};
  if($(campo).val() != ''){
    validacao = {status : true,
      campo : campo
    };
  }else{
    validacao = {status : false,
      mensagem : "Insira um email válido",
      campo : campo
    };
  }
  inserir_feedback_no_campo(validacao);
}

function teste_endereco(campo){
  let validacao = {};
  if($(campo).val() != ''){
    validacao = {status : true,
      campo : campo
    };
  }else{
    validacao = {status : false,
      mensagem : "Insira o nome de sua rua",
      campo : campo
    };
  }
  inserir_feedback_no_campo(validacao);
}

function teste_numero_casa(campo){
  let validacao = {};
  if($(campo).val() != ''){
    validacao = {status : true,
      campo : campo
    };
  }else{
    validacao = {status : false,
      mensagem : "Insira o número de sua casa",
      campo : campo
    };
  }
  inserir_feedback_no_campo(validacao);
}

function teste_bairro(campo){
  let validacao = {};
  if($(campo).val() != ''){
    validacao = {status : true,
      campo : campo
    };
  }else{
    validacao = {status : false,
      mensagem : "Facilite a minha vida e informe o seu bairro",
      campo : campo
    };
  }
  inserir_feedback_no_campo(validacao);
}

function teste_cidade(campo){
  let validacao = {};
  if($(campo).val() != ''){
    validacao = {status : true,
      campo : campo
    };
  }else{
    validacao = {status : false,
      mensagem : "Informe sua cidade",
      campo : campo
    };
  }
  inserir_feedback_no_campo(validacao);
}

