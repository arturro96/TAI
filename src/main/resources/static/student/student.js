function addElement()
{
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "w3-third w3-margin-bottom");
    newDiv.innerHTML = "<ul class=\"w3-ul w3-border w3-center w3-hover-shadow\">\n" +
        "    <li class=\"w3-black w3-large w3-padding-16\">TAI - oddawanie</li>\n" +
        "    <li class=\"w3-padding-16\"><b>Prowadzący: </b> X</li>\n" +
        "    <li class=\"w3-light-grey w3-padding-24\">\n" +
        "        <button class=\"w3-button w3-green w3-padding-large\">Zapisz się</button>\n" +
        "    </li>\n" +
        "</ul>";

    document.getElementById("events").appendChild(newDiv);
}

// Get the modal
var signin = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == signin) {
        signin.style.display = "none";
    }
}

function reserveSlot() {
    
}