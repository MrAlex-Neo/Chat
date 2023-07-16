VANTA.WAVES({
	el: ".your-element-selector",
	color: 0x40404,
	waveHeight: 4.5,
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
const friendsList = document.querySelectorAll(".friends .friend");

const userEmailAutorization = document.getElementById("userEmailAutorization");
const userPasswordAutorization = document.getElementById(
	"userPasswordAutorization"
);

const userFirstNameRegistration = document.getElementById(
	"userFirstNameRegistration"
);
const userEmailRegistration = document.getElementById("userEmailRegistration");
const userPasswordRegistration = document.getElementById(
	"userPasswordRegistration"
);

// async function authorizationCheckUser() {
//     username = document.getElementById("myinput").value
//     // document.querySelector('.registration').classList.add('none')
//     // отправить запрос на проверку пользователя
//     await sendRequest('user', 'POST', {username})
//     getUser(username)
// }

// litseners

document
	.getElementById("authorizationClick")
	.addEventListener("click", authorizationCheckUser);
document
	.getElementById("registrationClick")
	.addEventListener("click", registrationCheckUser);

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
friendsList.forEach((btn) => {
	btn.addEventListener("click", function () {
		let elem = event.target;
		userForChat.innerHTML = elem.innerText;
		friendsWindow.classList.add("none");
		chatWindow.classList.remove("none");
	});
});
// inputChat.addEventListener('input', autoresize);

// functions
// function autoresize() {
//     let size = input.scrollHeight
//     input.style.height = size + 'px';
//     input.style.transition = "none";
//   }
function openProfile() {
	for (i = 0; i < windowsBox.length; i++) {
		windowsBox[i].classList.add("none");
	}
	for (i = 0; i < friendsList.length; i++) {
		friendsList[i].classList.remove("none");
	}
	userWindow.classList.remove("none");
}
async function sendRequest(url, method, data, e) {
	e.preventDefault();
	url = `http://nurbek.lol:8000/api/${url}`;

	if (method == "POST") {
		let response = await fetch(url, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		response = await response.json();
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
    

    let userInfo = {
        email: userEmailAutorization.value,
        password: userPasswordAutorization.value
    }
    getUser(userInfo)
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
	// setCookie('username', username)
	// document.querySelector('.registration').classList.add('none')
	// отправить запрос на регистрацию пользователя
	await sendRequest("user", "POST", { userInfo });
	getUser(userInfo); //???
}

async function getUser(username) {
    // let response = await sendRequest(`auth/?email=${username.email}&password=${username.password}`, 'GET')
	let response = await sendRequest("auth", "GET", username);
	// console.log(response);

	if (response) {
		// нет ошибки
		let userInfo = document.getElementById("userName");
		userInfo.innerHTML = `${response.id}`;
		openProfile();

		// if (){
		// }
	} else {
		// есть ошибка
		alert("Такого пользователя не судествует!");
	}
}

// async function getUser(username) {
//     let response = await sendRequest('auth', 'GET', {
//         username
//     })
//     // console.log(response)
//     if (response) {
//         // нет ошибки
//         let userInfo = document.getElementById('userName')
//         userInfo.innerHTML = `${response.id}`
//         openProfile()

//         // if (username != ''){
//         // }
//     } else {
//         // есть ошибка
//         alert('Такого пользователя не судествует!')

//     }
// }
