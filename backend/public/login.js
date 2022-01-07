document.getElementById("login").addEventListener("click", loginFunction);

function loginFunction(){
  window.location = '/api/dashboard'
  console.log("clicked")
}
