function loadEvents() {
    addElement("Kompilatory", "Majew");
    addElement("Kompilatory1", "Majew1");
    addElement("Kompilatory2", "Majew2");
    addElement("Kompilatory3", "Majew3");
}

function addElement(eventName, teacher)
{
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "w3-third w3-margin-bottom");

    var ul = document.createElement("ul");
    ul.setAttribute("class", "w3-ul w3-border w3-center w3-hover-shadow");
    var li1 = document.createElement("li");
    li1.setAttribute("class", "w3-black w3-large w3-padding-16");
    li1.appendChild(document.createTextNode(eventName));
    var li2 = document.createElement("li");
    li2.setAttribute("class", "w3-padding-16");
    li2.appendChild(document.createTextNode(teacher));
    var li3 = document.createElement("li");
    li3.setAttribute("class", "w3-light-grey w3-padding-24");
    var button = document.createElement("button");
    button.setAttribute("class", "w3-button w3-green w3-padding-large");
    button.appendChild(document.createTextNode("Zapisz się"));
    button.addEventListener("click", showEventHandler);
    li3.appendChild(button);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    newDiv.appendChild(ul);

    function showEventHandler(event) {
        document.getElementById('id01').style.display='block'
    }
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

