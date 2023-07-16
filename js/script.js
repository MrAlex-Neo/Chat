VANTA.WAVES({
	el: ".your-element-selector",
	color: 0x40404,
	waveHeight: 2.5,
	waveSpeed: 0.65,
});

const windowsBox = document.querySelectorAll(".contentBlock .box");
const authorizationWindow = document.getElementById("authorizationDiv");
const registrationWindow = document.getElementById("registrationDiv");
const userWindow = document.getElementById("userPersonDiv");
const friendsWindow = document.getElementById("friendsBox");
const chatWindow = document.getElementById("chatBox");
const inputChat = document.getElementById("inputChat");
const userForChat = document.getElementById("anotherUserForChat");


const registrationBtn = document.getElementById("registration");
const getHome = document.querySelectorAll(".getUserProfile");
const friendsBtn = document.getElementById("friendsListBtn");
const friendsList = document.getElementById("friendsList");
const friendsPerson = document.querySelectorAll(".friend");


const userEmailAutorization = document.getElementById("userEmailAutorization");
const userPasswordAutorization = document.getElementById("userPasswordAutorization");
const userFirstNameRegistration = document.getElementById("userFirstNameRegistration");
const userEmailRegistration = document.getElementById("userEmailRegistration");
const userPasswordRegistration = document.getElementById("userPasswordRegistration");

// litseners

document.getElementById("authorizationClick").addEventListener("click", authorizationCheckUser);
document.getElementById("registrationClick").addEventListener("click", registrationCheckUser);

friendsBtn.onclick = function () {
	userWindow.classList.add("none");
	friendsWindow.classList.remove("none");
};
registrationBtn.onclick = function () {
	authorizationWindow.classList.add("none");
	registrationWindow.classList.remove("none");
};
getHome.forEach((btn) => {
	btn.addEventListener("click", openProfile);
});
// friendsPerson.forEach((btn) => {
// 	btn.addEventListener("click", function () {
// 		let elem = event.target;
// 		userForChat.innerHTML = elem.innerText;
// 		friendsWindow.classList.add("none");
// 		chatWindow.classList.remove("none");
// 	});
// });

function clickFriend () {
	let elem = event.target;
		userForChat.innerHTML = elem.innerText;
		friendsWindow.classList.add("none");
		chatWindow.classList.remove("none");
}
function openProfile() {
	for (i = 0; i < windowsBox.length; i++) {
		windowsBox[i].classList.add("none");
	}
	for (i = 0; i < friendsList.length; i++) {
		friendsList[i].classList.remove("none");
	}
	userWindow.classList.remove("none");
}
async function sendRequest(url, method, data) {
	// e.preventDefault();
	url = `https://nurbek.lol/api/${url}`;

	if (method == "POST") {
        console.log(data);
		let response = await fetch(url, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		response = await response.json();
        console.log(response)
		return response;
	} else if (method == "GET") {
		url = url + "?" + new URLSearchParams(data);
		let response = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		response = await response.json();
		return response;
	}
}
function authorizationCheckUser() {
	// let userInfo = new Object
	// userEmailAutorization.value == ' ' ? userEmailAutorization.style.border = '1px solid red': userPasswordAutorization.value == ' ' ? userEmailAutorization.style.border = '1px solid red' : userInfo = {email: userEmailAutorization.value, password: userPasswordAutorization.value}

	let userInfo = {
		email: userEmailAutorization.value,
		password: userPasswordAutorization.value,
	};
	getUser(userInfo);
}
function registrationCheckUser() {
	let userInfo = {
		first_name: userFirstNameRegistration.value,
		email: userEmailRegistration.value,
		password: userPasswordRegistration.value,
	};
	regUser(userInfo);
}
async function regUser(userInfo) {
	let response = await sendRequest("register/", "POST", userInfo);
    if (response !== ''){
        registrationWindow.classList.add('none')
        authorizationWindow.classList.remove('none')
    }else {
        alert('Ошибка, бро!')
    }
}

async function getUser(username) {
	// let response = await sendRequest(`auth/?email=${username.email}&password=${username.password}`, 'GET')
	let response = await sendRequest("auth", "GET", username);
    let personInfo = await sendRequest("user/", "GET", {'id': response.id});
    let peopleAll = await sendRequest("user/", "GET", {'id': 'all'});
	peopleAll.map((pers) => {
		friendsList.insertAdjacentHTML("beforeend", friendId (pers.first_name, pers.id))
	})
	// console.log(typeof friendsList)
	if (personInfo) {
		// нет ошибки
		document.getElementById("userName").innerHTML = `${personInfo.first_name}`
		openProfile();

	} else {
		// есть ошибка
		alert("Такого пользователя не судествует!");
	}
}
function friendId (nameFriend, id) {
    return `
    <div class="friend">
        <img src="./img/user.svg" alt="" />
        <span data-index="${id}">${nameFriend}</span>
    </div>`
}

