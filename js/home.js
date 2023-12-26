var user = document.querySelector('span')

var lastUser = JSON.parse(localStorage.getItem('lastUser'))

user.innerHTML = lastUser