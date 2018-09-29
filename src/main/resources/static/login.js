// Get the modal
var signin = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == signin) {
        signin.style.display = "none";
    }
}

// Get the modal
var signup = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == signup) {
        signup.style.display = "none";
    }
}

function goToHome(){
    location.location.href ="teacher/teacher.html";
}

function addUser() {
    var nick = document.getElementById("nick").value;
    var mail = document.getElementById("email").value;
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

function chgAction( action_name )
{
    var frm = document.getElementById('signupform');
    if( action_name=='lecturer' ) {
        frm.action = "teacher/teacher.html";
    }
    else if( action_name=='student' ) {
        frm.action = "student/student.html";
    }
}
