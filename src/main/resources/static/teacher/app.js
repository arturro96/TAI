function loadEvents() {
    addElement("TAI - projekt", "30.06.2018");
    addElement("TAI - projekt", "1.07.2018");
    addElement("TAI - projekt", "2.07.2018");
    addElement("TAI - poprawa", "10.07.2018");
}

var slots = [];
var counter = 0;

function addDiv(text, type){
    var div = document.createElement("div");
    div.setAttribute("class", "w3-section");
    var label = document.createElement("label");
    label.appendChild(document.createTextNode(text));
    var input = document.createElement("input");
    input.setAttribute("class", "w3-input w3-border w3-hover-border-black");
    input.setAttribute("style", "width:50%;");
    input.setAttribute("type", type);
    input.required = true;
    if (type == "number") {
        input.setAttribute("min", "5");
    }
    div.appendChild(label);
    div.appendChild(input);
    return div;
}


function addEventDetails(stop)
{
    counter++;
    var newForm = document.createElement("form");
    newForm.setAttribute("class", "w3-container");
    newForm.setAttribute("target", "_blank");
    newForm.appendChild(addDiv("Data rozpoczęcia", "datetime-local"));
    newForm.appendChild(addDiv("Data zakończenia", "datetime-local"));
    newForm.appendChild(addDiv("Liczba minut na zespół", "number"));
    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("class", "w3-button w3-block w3-black");
    button.setAttribute("style", "width:50%;");
    //button.setAttribute("onClick", "addOneBlock(\""+newForm+"\")");
    button.appendChild(document.createTextNode("Dodaj"));
    button.addEventListener("click", addOneBlockHandler);
    newForm.appendChild(button);

    document.getElementById("parent").insertBefore(newForm, document.getElementById("events"));
    if (counter == stop) {
        var newButton = document.createElement("div");
        newButton.setAttribute("class", "w3-padding-32");
        newButton.innerHTML = "<button onclick=\"addBlock();\" class=\"w3-button w3-green w3-padding-large\" style=\"width:100%;\">Dodaj sloty</button>";
        document.getElementById("parent").insertBefore(newButton, document.getElementById("events"));
    }

    function addOneBlockHandler(event) {
        addOneBlock(newForm);
    }
}

function addDayInfo() {
    postEvent();
    var days = document.getElementById("days_count").value;
    var stop = parseInt(days);
    var i;
    for (i = 1; i <= stop; i++) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "w3-padding-16");
        newDiv.innerHTML = "<p></p>";
        newDiv.innerHTML = "<h3>Dzień "+ i + "</h3>";
        document.getElementById("parent").insertBefore(newDiv, document.getElementById("events"));
        addEventDetails(stop)
    }
    counter = 0;
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function myFunction() {
    getJSON('http://localhost:8080/greeting',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                //alert('Your query count: ' + data.query.count);
                document.getElementById("demo").innerHTML = data.content
            }
        });
}

function postEvent() {
    var name = document.getElementById("event_name").value;
    var xhr = new XMLHttpRequest();
    var url = "api/addEvent";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Posted");
        }
    };
    var id = 5;
    var data = JSON.stringify({"ownerId": id, "eventTitle": name});
    xhr.send(data);
}

function addUser() {
    var nick = document.getElementById("nick").value;
    var mail = document.getElementById("mail").value;
    //var data = '{ "nick":"' + nick +'", "mail":"' + mail +'" }';
    //var obj = JSON.parse(data);
    var xhr = new XMLHttpRequest();
    var url = "api/addUser";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Posted");
        }
    };
    var data = JSON.stringify({"nick": nick, "mail": mail});
    xhr.send(data);
}

function addOneBlock(newForm) {
    var startDate = newForm.getElementsByTagName("input")[0].value;
    var endDate = newForm.getElementsByTagName("input")[1].value;
    var slotTime = newForm.getElementsByTagName("input")[2].value;
    var data = {
        "begin": startDate,
        "end": endDate,
        "minPerSlot": slotTime
    };
    slots.push(data);
    alert(data);
}

function addBlock() {
    var xhr = new XMLHttpRequest();
    var url = "api/addBlock";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Posted");
        }
    };
    var data = JSON.stringify({"eventID": 1, "eventblocks": slots});
    xhr.send(data);
    alert(data);
    slots = [];
}

function addElement(eventName, date)
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
    li2.appendChild(document.createTextNode(date));
    var li3 = document.createElement("li");
    li3.setAttribute("class", "w3-light-grey w3-padding-24");
    var button = document.createElement("button");
    button.setAttribute("class", "w3-button w3-green w3-padding-large");
    button.appendChild(document.createTextNode("Pokaż"));
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