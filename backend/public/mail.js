document.getElementById("Paymentmail").addEventListener("click", myFunction);

function myFunction(){
  window.location = '/api/mail'
  console.log("clicked")
}