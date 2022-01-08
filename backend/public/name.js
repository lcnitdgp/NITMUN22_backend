function clickEvent() {
    function checkFunction() {
        modal.style.display = "block";
        console.log("clicked")
    }
    y = document.querySelectorAll("#Paymentmail");
    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById("myModal");
    console.log(modal);
    for (let i = 0; i < y.length; i++) {
         y[i].addEventListener("click", checkFunction);
    }
    span.onclick = function () {
         modal.style.display = "none";
    }
}
module.exports = clickEvent;