var userEmail = document.querySelector('#userEmail');
var userPassword = document.querySelector('#userPassword');
var loginBtn = document.querySelector('.btn');

var emailErrorMessage = document.querySelector('.emailErrorMessage');
var passwordErrorMessage = document.querySelector('.passwordErrorMessage');


var allUsers = []

var lastUser;

if (localStorage.getItem("users") != null) {
    allUsers = JSON.parse(localStorage.getItem("users"))
}

loginBtn.addEventListener("click", function (e) {
    checkEmail()
    login()
})

function login() {

    if (checkEmail() == true && checkPassword() == true) {
        change_page()
        clearForm()
    }
}

function checkEmail() {

    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email == userEmail.value) {
            emailErrorMessage.classList.add('d-none');
            emailErrorMessage.classList.remove('d-block');
            lastUser = allUsers[i].name;
            localStorage.setItem("lastUser", JSON.stringify(lastUser));
            return true;
        }
        else if (i < allUsers.length - 1) {
            continue;
        }
        else {
            emailErrorMessage.classList.add('d-block')
            emailErrorMessage.classList.remove('d-none')
            emailErrorMessage.innerHTML = "This email isn't correct, try again"
            return false
        }
    }
    checkPassword()
}

function checkPassword() {

    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].password == userPassword.value) {
            passwordErrorMessage.classList.add('d-none');
            passwordErrorMessage.classList.remove('d-block');
            return true;
        }
        else if (i < allUsers.length - 1) {
            continue;
        }
        else {
            passwordErrorMessage.classList.add('d-block')
            passwordErrorMessage.classList.remove('d-none')
            passwordErrorMessage.innerHTML = "This password isn't correct, try again"
            return false
        }
    }

}

function change_page() {
    window.location.href = "home.html";
}

function clearForm() {
    userEmail.value = ''
    userPassword.value = ''
}

userEmail.addEventListener("input", function () {
    emailErrorMessage.classList.add('d-none');
})

userPassword.addEventListener("input", function () {
    passwordErrorMessage.classList.add('d-none');
})