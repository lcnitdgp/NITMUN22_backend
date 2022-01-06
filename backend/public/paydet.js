document.getElementById("myButton").addEventListener("click", payFunction);

function payFunction(){
  window.location = '/api/payments'
  console.log("clicked")
}
