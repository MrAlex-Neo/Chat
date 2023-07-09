VANTA.WAVES({
    el: ".your-element-selector",
    color: 0x40404,
    waveHeight: 4.50,
    waveSpeed: 0.65
})


const windowsBox = document.querySelectorAll('.contentBlock .box')
const authorizationWindow = document.getElementById('authorizationDiv')
const registrationWindow = document.getElementById('registrationDiv')
const userWindow = document.getElementById('userPersonDiv')
const friendsWindow = document.getElementById('friendsBox')
const chatWindow = document.getElementById('chatBox')

const registrationBtn = document.getElementById('registration')
const getHome = document.querySelectorAll('.getUserProfile')
const friendsBtn = document.getElementById('friendsListBtn')
const friendsList = document.querySelectorAll('.friends .friend')


// litseners
friendsBtn.onclick = function () {
    userWindow.classList.add('none')
    friendsWindow.classList.remove('none')
}
registrationBtn.onclick = function () {
    authorizationWindow.classList.add('none')
    registrationWindow.classList.remove('none')
}
getHome.forEach (btn => {
    btn.addEventListener('click', openProfile)
})
friendsList.forEach (btn => {
    btn.addEventListener('click', function () {
        friendsWindow.classList.add('none')
        chatWindow.classList.remove('none')
    })
})


// functions
function openProfile() {
    for (i = 0; i < windowsBox.length; i++){
        windowsBox[i].classList.add('none')
    }
    for (i = 0; i < friendsList.length; i++){
        friendsList[i].classList.remove('none')
    }
    userWindow.classList.remove('none')
}



