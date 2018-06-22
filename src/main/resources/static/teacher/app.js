var slots = [];

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

function addEventDetails()
{
    var newForm = document.createElement("form");
    newForm.setAttribute("class", "w3-container");
    newForm.setAttribute("action", "javascript:alert('Dodano event');")
    newForm.setAttribute("target", "_blank")
    newForm.innerHTML = "<div class=\"w3-section\">\n" +
        "    <label>Data rozpoczęcia</label>\n" +
        "    <input class=\"w3-input w3-border w3-hover-border-black\" style=\"width:50%;\" type=\"datetime-local\" name=\"Date\" required>\n" +
        "    </div>\n" +
        "<div class=\"w3-section\">\n" +
        "    <label>Data zakończenia</label>\n" +
        "    <input class=\"w3-input w3-border w3-hover-border-black\" style=\"width:50%;\" type=\"datetime-local\" name=\"Date\" required>\n" +
        "    </div>\n" +
        "<div class=\"w3-section\">\n" +
        "    <label>Liczba minut na zespół</label>\n" +
        "    <input class=\"w3-input w3-border w3-hover-border-black\" style=\"width:50%;\" type=\"number\" name=\"quantity\" min=\"5\" max=\"60\"  required>\n" +
        "    </div>\n" +
        "<button type=\"submit\" onclick=\"addOneBlock(newFrom)\" class=\"w3-button w3-block w3-black\" style=\"width:50%;\">Dodaj</button>" +
        "<p> </p>";

    //document.getElementById("addEvent").appendChild(newForm);
    document.getElementById("parent").insertBefore(newForm, document.getElementById("events"))
}

function addDayInfo() {
    postEvent()
    var days = document.getElementById("days_count").value;
    var stop = parseInt(days)
    var i;
    for (i = 1; i <= stop; i++) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "w3-padding-16")
        newDiv.innerHTML = "<h3>Dzień "+ i + "</h3>"
        document.getElementById("parent").insertBefore(newDiv, document.getElementById("events"))
        addEventDetails()
    }
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
    var data = JSON.stringify({"ownerId": 5, "eventTitle": name});
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
    var data = JSON.stringify({"begin": startDate, "end": endDate, "minPerSlot": slotTime});
    slots.push(data);
    alert("Dodano blok")
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
    slots = [];
}