    // // Get the modal
    // var modal = document.getElementById("myModal");

    // // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");
    
    // // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];
    // console.log(btn)
    // // When the user clicks on the button, open the modal
    // btn.onclick = function() {
    //   modal.style.display = "block";
    // }
    
    // // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //   modal.style.display = "none";
    // }
    
    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //   if (event.target == modal) {
    //     modal.style.display = "none";
    //   }
    // }


y = document.querySelectorAll("#myBtn")
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