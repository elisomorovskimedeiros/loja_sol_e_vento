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
              document.getElementById('avisoEmail').innerHTML = ('<img src="/imagens/erro.png" height="15"> Faltou o que vem depois do ponto, ex.: \".com\", \".gov\"');
              statusFormContato.email = false;
          }
      }	
      else {
          document.getElementById('avisoEmail').innerHTML = ('<img src="/imagens/erro.png" height="15"> Você não informou o seu email corretamente');
          statusFormContato.email = false;
          }
  }
  function seleciona(botao){
    if(statusFormContato.email == false){
      botao.style = "box-shadow: 4px 3px 0 rgba(0, 0, 0, .3),0 -2px -7px rgba(0, 0, 0, 0.2)";
      statusFormContato.email == true;
      console.log(statusFormContato.email);
    }else{
      botao.setAttribute(style="box-shadow: 4px 3px 0 rgba(0, 0, 0, .3),0 2px 7px rgba(0, 0, 0, 0.2)", false);
      statusFormContato.email == false;
    }
  }


  //RETORNA A POSIÇÃO DO CURSOR NO INPUT TEXT
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

  