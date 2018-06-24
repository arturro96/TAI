function loadEvents(type) {
    getJSON("/api/events", function(err, events) {
        if (err) throw Error(err);
        var len = events.length;
        console.log(len);
        for (var i=0; i<len; i++){
            var obj = events[i];
            var title = obj.title;
            for (var j=0; j<obj['blocks'].length; j++){
                var date = obj['blocks'][j].begin.toString().split("T")[0];
                addElement(title, date, obj.eventId, j, obj['blocks'][j].blockId, type);
            }
            console.log(obj.title);
        }
    });
}

var slots = [];
var counter = 0;
var eventID = 0;
var divList = [];

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
    newForm.setAttribute("action", "javascript:alert('Dodano event');");
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

function httpGet(theUrl) {
    getJSON(theUrl,
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                return data;
            }
        });
}

function parseEvent(data) {
    var obj = JSON.parse(data);
    eventID = obj.eventId;
    console.log(eventID);
}

//POST

function postEvent() {
    var name = document.getElementById("event_name").value;
    var xhr = new XMLHttpRequest();
    var url = "api/addEvent";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Posted");
            parseEvent(xhr.responseText);
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
    console.log(eventID);
    var data = JSON.stringify({"eventID": eventID, "eventBlocks": slots});
    xhr.send(data);
    alert(data);
    slots = [];
    window.location.reload();
}

//GET


function addElement(eventName, date, id, blockID, bId, type)
{
    var blockAndEventId = String(id + blockID);
    addModal(blockAndEventId);
    getJSON("/api/eventById/" + id.toString(), function(err, event) {
        if (err) throw Error(err);

        console.log(event.title);
        var block_obj = event['blocks'][blockID];
        var reservations = block_obj['reservations'];
        console.log(block_obj.begin);
        var beginObj = block_obj.begin;
        var startDate = new Date(beginObj);

        var minPerSlot = Number(block_obj.minPerSlot);
        var endObj = block_obj.end;
        var endDate = new Date(endObj);
        var offset = 0;
        console.log(endObj);
        while (startDate.getTime() < endDate.getTime()){
            var tempDate = new Date();
            tempDate.setTime(startDate.getTime() + minPerSlot * 60 * 1000);
            console.log(tempDate);
            addTimeToTable(blockAndEventId, startDate, tempDate, bId, offset, type);
            startDate.setTime(tempDate.getTime());
            offset++;
        }

    });
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "w3-third w3-margin-bottom");
    //newDiv.setAttribute("id", blockId);

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
        document.getElementById(blockAndEventId).style.display='block'
    }

    document.getElementById("events").appendChild(newDiv);
}

function addTimeToTable(id, startTime, endTime, blockID, offset, type){
    var timeSlot;
    if (startTime.getMinutes() == 0)
        timeSlot = startTime.getHours() +":00" + " - " + endTime.getHours() +":" + endTime.getMinutes();
    else if (endTime.getMinutes() == 0)
        timeSlot = startTime.getHours() +":" + startTime.getMinutes() + " - " + endTime.getHours() +":00";
    else
        timeSlot = startTime.getHours() +":" + startTime.getMinutes() + " - " + endTime.getHours() + ":" + endTime.getMinutes();
    var newTr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(timeSlot));
    newTr.appendChild(td1);

    var td2, td3, tdButton, button;
    if (type == 'teacher'){
        td2 = document.createElement("td");
        td1.appendChild(document.createTextNode(""));
        td3 = document.createElement("td");
        td1.appendChild(document.createTextNode(""));
        newTr.appendChild(td2);
        newTr.appendChild(td3);
    } else if (type == 'student'){
        tdButton = document.createElement("td");
        tdButton.setAttribute("colspan", "2");
        tdButton.setAttribute("align", "center");

        button = document.createElement("button");
        button.setAttribute("class", "w3-button w3-green");
        button.setAttribute("style", "width: 100%");
        button.appendChild(document.createTextNode("Zapisz się"));
        button.addEventListener("click", enrollHandler);
        tdButton.appendChild(button);
        newTr.appendChild(tdButton);
    }

    document.getElementById("table"+id).appendChild(newTr);

    function enrollHandler(event) {
        console.log("halo");
        var xhr = new XMLHttpRequest();
        var url = "api/reserveSlot";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("Posted");
                parseEvent(xhr.responseText);
            }
        };

        var id = 20;
        var data = JSON.stringify({"userId": id, "blockId": blockID, "offset": offset});
        console.log(data);
        console.log(data);
        xhr.send(data);
    }
    //console.log(startTime.getHours() +":" + startTime.getMinutes() + " - " + endTime.getHours() +":" + endTime.getMinutes());
}

function addModal(id) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", id);
    newDiv.setAttribute("class", "modal");
    var newSpan = document.createElement("span");
    newSpan.addEventListener("onclick", spanHandler);
    newSpan.setAttribute("class", "close");
    newSpan.appendChild(document.createTextNode("x"));

    var div2 = document.createElement("div");
    div2.setAttribute("class", "w3-container modal-content animate");
    var table = document.createElement("table");
    table.setAttribute("id", "table" + id);
    table.setAttribute("class", "w3-table w3-center w3-striped w3-bordered w3-border w3-white");
    table.setAttribute("style", "margin: 30px; width: auto");
    var col1 = document.createElement("col");
    col1.setAttribute("width", "250");
    var col2 = document.createElement("col");
    col2.setAttribute("width", "350");
    var col3 = document.createElement("col");
    col3.setAttribute("width", "450");

    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    th1.appendChild(document.createTextNode("Ramy czasowe"));
    var th2 = document.createElement("th");
    th2.appendChild(document.createTextNode("Student"));
    var th3 = document.createElement("th");
    th3.appendChild(document.createTextNode("E-mail"));
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    table.appendChild(col1);
    table.appendChild(col2);
    table.appendChild(col3);
    table.appendChild(tr);
    div2.appendChild(table);
    newDiv.appendChild(newSpan);
    newDiv.appendChild(div2);

    document.getElementById("id1").appendChild(newDiv);

    divList.push(newDiv);


    function spanHandler() {
        document.getElementById(id).style.display='none';
    }

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    for (var i=0; i<divList.length; i++) {
        if (event.target == divList[i]) {
            divList[i].style.display = "none";
        }
    }
}
