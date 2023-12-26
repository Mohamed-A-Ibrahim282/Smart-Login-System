var userName = document.querySelector('#userName');
var userEmail = document.querySelector('#userEmail');
var userPassword = document.querySelector('#userPassword');
var signUpBtn = document.querySelector('.btn');

var nameErrorMessage = document.querySelector('.nameErrorMessage');
var emailErrorMessage = document.querySelector('.emailErrorMessage');
var passwordErrorMessage = document.querySelector('.passwordErrorMessage');


var allUsers = []
var lastUser;

if (localStorage.getItem("users") != null) {
    allUsers = JSON.parse(localStorage.getItem("users"))
}

signUpBtn.addEventListener("click", function (e) {
    signUp()
})

function change_page() {
    window.location.href = "home.html";
}

function signUp() {

    var checkEmail = true;
    if (nameValidation() == true && emailValidation() == true && passwordValidation() == true) {
        var user = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value
        }

        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].email != user.email) {
                checkEmail = true;
            }
            else {
                checkEmail = false;
                break;
            }
        }

        if (checkEmail == true) {
            allUsers.push(user)
            localStorage.setItem("users", JSON.stringify(allUsers))
            lastUser = user.name;
            localStorage.setItem("lastUser", JSON.stringify(lastUser));
            clearForm()
            change_page()
        }
        else {
            userEmail.classList.add('is-invalid')
            emailErrorMessage.classList.add('d-block')
            userEmail.classList.remove('is-valid')
            emailErrorMessage.classList.remove('d-none')
            emailErrorMessage.innerHTML = "This email is used"
        }
    }

}

userName.addEventListener("input", nameValidation)
userEmail.addEventListener("input", emailValidation)
userPassword.addEventListener("input", passwordValidation)


function nameValidation() {
    var nameRegex = /^([A-Z][a-z]{2,7} ?)+$/

    if (nameRegex.test(userName.value) == true) {
        userName.classList.add('is-valid')
        nameErrorMessage.classList.add('d-none')
        userName.classList.remove('is-invalid')
        nameErrorMessage.classList.remove('d-block')
        return true
    }
    else {
        userName.classList.add('is-invalid')
        nameErrorMessage.classList.add('d-block')
        userName.classList.remove('is-valid')
        nameErrorMessage.classList.remove('d-none')
        return false
    }
}

function emailValidation() {
    var emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

    if (emailRegex.test(userEmail.value) == true) {
        userEmail.classList.add('is-valid')
        emailErrorMessage.classList.add('d-none')
        userEmail.classList.remove('is-invalid')
        emailErrorMessage.classList.remove('d-block')
        return true
    }
    else {
        userEmail.classList.add('is-invalid')
        emailErrorMessage.classList.add('d-block')
        userEmail.classList.remove('is-valid')
        emailErrorMessage.classList.remove('d-none')
        return false
    }
}

function passwordValidation() {
    var passwordRegex = /^[a-zA-Z0-9*_$/]{8,20}$/;

    if (passwordRegex.test(userPassword.value) == true) {
        userPassword.classList.add('is-valid')
        passwordErrorMessage.classList.add('d-none')
        userPassword.classList.remove('is-invalid')
        passwordErrorMessage.classList.remove('d-block')
        return true
    }
    else {
        userPassword.classList.add('is-invalid')
        passwordErrorMessage.classList.add('d-block')
        userPassword.classList.remove('is-valid')
        passwordErrorMessage.classList.remove('d-none')
        return false
    }
}

function clearForm() {
    userName.value = ''
    userEmail.value = ''
    userPassword.value = ''
    userName.classList.remove('is-invalid', 'is-valid')
    userEmail.classList.remove('is-invalid', 'is-valid')
    userPassword.classList.remove('is-invalid', 'is-valid')
}