
y = document.querySelectorAll("#Paymentmail")
console.log(y)
for(let i=0;i<8;i++){
y[i].addEventListener("click", checkFunction);
}
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("myModal");
console.log(modal);
function checkFunction(){
  // window.location = '/api/payments'
  modal.style.display = "block";
  console.log("clicked")
}
span.onclick = function() {
    modal.style.display = "none";
}