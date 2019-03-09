//CÓDIGOS DO SLIDE SHOW:

var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 3000);    
}

function diminuiSombra(elemento){
    elemento.style.boxShadow = "5px 5px 5px #888";
}
function aumentaSombra(elemento){
    elemento.style.boxShadow = "10px 10px 10px #888";
}