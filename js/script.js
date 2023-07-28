// Registration's and Autorization's variables
//Windows
const contentBlock = document.getElementById('contentBlock')
const chatContainer = document.getElementById('chatContainer')
const windowsBox = document.querySelectorAll(".contentBlock .box");
const authorizationWindow = document.getElementById("authorizationBox");
const registrationWindow = document.getElementById("registrationBox");
const userWindow = document.getElementById("userPersonBox");

const account = document.getElementById('account')
const profileSettings = document.getElementById('profileSettings')
//btns
const autorizationBtn = document.getElementById("authorizationBnt");
const getRegistrarionBox = document.getElementById('getRegistrarionBox')
const registrationBtn = document.getElementById("registrationBtn");
const getAutorizationBox = document.getElementById('getAutorizationBox')

const getSettingsBox = document.getElementById('getSettingsBox')
const getAccountBox = document.getElementById('getAccountBox')
//inputs
const userEmailAutorization = document.getElementById("userEmailAutorization");
const userPasswordAutorization = document.getElementById("userPasswordAutorization");

const userFirstNameRegistration = document.getElementById("userFirstNameRegistration");
const userEmailRegistration = document.getElementById("userEmailRegistration");
const userPasswordRegistration = document.getElementById("userPasswordRegistration");
// Registration and Autorization

// Other variables
const userName = document.getElementById('userName')
const getProfileUser = document.getElementById('getProfileUser')
const logOut = document.getElementById('logOut')
const userNameChat = document.getElementById('userNameChat')
const goToChat = document.getElementById('goToChat')
const mainProfilePageName = document.getElementById('myName')
const amountFriend = document.getElementById('amountFriend')
const chatList = document.getElementById('chatList')


//menuBtn
const menuBoxBtn = document.getElementById('menuBoxBtn')
const myNameBtn = document.getElementById('myName')
const firendsBtn = document.getElementById('firendsBtn')
const aboutMeBtn = document.getElementById('aboutMeBtn')
const statisticsBtn = document.getElementById('statisticsBtn')

// menuBoxes
const menuBoxesClass = document.querySelectorAll('.menuBoxes')
const menuBoxes = document.getElementById('menuBoxes')
const mainPageInMenu = document.getElementById('mainPageInMenu')
const friendsBox = document.getElementById('friendsBox')/*there is friendsList*/
const friendsList = document.getElementById('friendsList')
const statistics = document.getElementById('statistics')












// listeners
autorizationBtn.onclick = function () {
	let userInfo = {
		email: userEmailAutorization.value,
		password: userPasswordAutorization.value,
	};
	getUser(userInfo);
}
registrationBtn.onclick = function () {
	let userInfo = {
		first_name: userFirstNameRegistration.value,
		email: userEmailRegistration.value,
		password: userPasswordRegistration.value,
	};
	addUser(userInfo);
}
getAutorizationBox.onclick = function () {    /*перехожу из окна регистрации в окно авторизации */
	openProfile(authorizationWindow)
}
getRegistrarionBox.onclick = function () {     /*перехожу из окна авторизации в окно регистрации */
	openProfile(registrationWindow)
}
myNameBtn.onclick = function() {     /* в меню открываю свой профиль*/
	closeMenuBoxes()
	mainPageInMenu.classList.remove('none')
}
logOut.onclick = function () {     /*выъхожу из аккаунта*/
	localStorage.removeItem('user')
	userEmailAutorization.value = ''
	userPasswordAutorization.value = ''
	getUserDetail()
}
getSettingsBox.onclick = function () {
	openSettings()
}
getAccountBox.onclick = function () {
	openAccount()
	openMenuBox(mainPageInMenu)
}
goToChat.onclick = () => {
	openChat ()
}
getProfileUser.onclick = () => {
	contentBlock.classList.remove('none')
	chatContainer.classList.add('none')
	openProfile(userWindow)
}
firendsBtn.onclick = function() {
	getAllFriends()
	openMenuBox(friendsBox)
	// friendsBox.classList.remove('none')
}
statisticsBtn.onclick = () => {
	openMenuBox(statistics)
}






// functions
function openChat (name){
	contentBlock.classList.add('none')
	chatContainer.classList.remove('none')
	document.getElementById('nextPersonForChat').classList.remove('none')
	document.getElementById('friendChatName').textContent = name
}
function showMeMyFriend() {
	let elem = event.target
	openChat (elem.textContent)
	let id = 1
	document.getElementById('nextPersonForChat').classList.add('none')
	listOfCHatMessages(id)
}
function openProfile(box) {
	for (i = 0; i < windowsBox.length; i++) {
		windowsBox[i].classList.add("none");
	}
	box.classList.remove("none");
}
function openAccount() {
	profileSettings.classList.add("none");
	account.classList.remove("none");
}
function openMenuBox(box) {
	for (i = 0; i < menuBoxesClass.length; i++) {
		menuBoxesClass[i].classList.add("none");
	}
	box.classList.remove("none");
}
function openSettings() {
	account.classList.add("none");
	profileSettings.classList.remove("none");
}
function closeMenuBoxes() {
	for (i = 0; i < menuBoxesClass.length; i++) {
		menuBoxesClass[i].classList.add("none");
	}
	// menuBoxesClass.map((box) => {
	// 	box.classList.add('none')
	// })
}

// save userName in our memory
const getUserDetail = () => {
	let user = JSON.parse(localStorage.getItem('user'))
	// console.log(user)
	if (user) {
		openProfile(userWindow)
		userName.innerHTML = user.first_name
		myNameBtn.innerHTML = user.first_name
		userNameChat.innerHTML = user.first_name
	} else {
		openProfile(authorizationWindow)
	
	}
}
getUserDetail()













// API
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
async function getUser(userInfo) {
	let response = await sendRequest("auth", "GET", userInfo);
	let personInfo = await sendRequest("user", "GET", {'id': response.id});
	if (response && personInfo) {
		// userName.innerHTML = `${personInfo.first_name}`
		openProfile(userWindow);
		// console.log(personInfo);
		let user = localStorage.setItem('user', JSON.stringify(personInfo))
		getUserDetail()
	} else {
		alert("Такого пользователя не существует!");
	}
}
async function addUser (userInfo) {
	let response = await sendRequest("register/", "POST", userInfo);
	if (response) {
		openProfile(authorizationWindow)
	} else {
		alert('mistake!');
	}
}
async function getAllFriends() {
	let friends = await sendRequest("user/", "GET", "id=all");
	friendsList.innerHTML = ''
	if (friends.length === 0) {
        friendsList.innerHTML = '<p>Ты оказывается неудачник без друзей!</p>'       
    }
	friends.map((friend) => {
		friendsList.insertAdjacentHTML("beforeend", friendId (friend.first_name, friend.id))
	})
	// const userFriend = document.querySelectorAll('.userFriend')
	// console.log(userFriend)
}
async function listOfCHatMessages(id) {
	let messages = await sendRequest("chat/", "GET", {'id': id});
	console.log(messages.messages[0].sender)
	chatList.innerHTML = ''
	messages.messages.map((person) => {
		if (person.sender == userName.innerHTML) {
			chatList.insertAdjacentHTML("beforeend", myMessageOfChat(person.text, person.created))
			console.log(typeof person.created)
		} else {
			chatList.insertAdjacentHTML("beforeend", messageOfChat(person.text, person.created))
			console.log(typeof person.created)
		}
	})
}


function friendId (nameFriend, id) {
	return `
	<li>
		<a class="menu-box-tab userFriend" onclick="showMeMyFriend()" data-index="${id}"><span>${nameFriend}</span></a>
	</li> `
}
function myMessageOfChat(message, time) {
	return `
	<div class="message-wrapper reverse">
		<img class="message-pp" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" alt="profile-pic">
		<div class="message-box-wrapper">
			<div class="message-box">
			${message}
			</div>
			<span>${time}</span>
		</div>
	</div>`
}

function messageOfChat(message, time) {
	return `
	<div class="message-wrapper">
		<img class="message-pp" src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80" alt="profile-pic">
		<div class="message-box-wrapper">
			<div class="message-box">
			${message}
			</div>
			<span>${time}</span>
		</div>
	</div>`
}
 
















	
	// async function regUser(userInfo) {
	// 	let response = await sendRequest("register/", "POST", userInfo);
	// 	console.log(response)
	//     if (response !== ''){
	//         registrationWindow.classList.add('none')
	//         authorizationWindow.classList.remove('none')
	//     }else {
	//         alert('Ошибка, бро!')
	//     }
	// }
	// render()
	// peopleAll.map((pers) => {
	// 	friendsList.insertAdjacentHTML("beforeend", friendId (pers.first_name, pers.id))
	// })
	// if (personInfo && response) {
	// 	// нет ошибки
	// 	document.getElementById("userName").innerHTML = `${personInfo.first_name}`
	// 	openProfile();

	// } else {
	// 	// есть ошибка
	// 	alert("Такого пользователя не существует!");
	// }





































// VANTA.WAVES({
// 	el: ".your-element-selector",
// 	color: 0x40404,
// 	waveHeight: 2.5,
// 	waveSpeed: 0.65,
// });

// function scrollToAction() {
// 	document.querySelector('.friends').scrollTop = activeTop - 100;
// }





// // Check Form
// function isValidLogin(login) {
// 	// Проверка имени регулярным выражением
// 	const pattern = /^[a-zA-Z0-9]+$/;
// 	return pattern.test(login);
// }
// function isValidPassword(password) {
// 	// Проверка пароля регулярным выражением
// 	const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/;
//   	return pattern.test(password);
// }
// function isValidEmail(email) {
// 	// Проверка пароля регулярным выражением
// 	const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
//   	return EMAIL_REGEXP.test(email);
// }
// function isEmailValid(value) {
// 	// Проверка email регулярным выражением
// 	const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
//  	return EMAIL_REGEXP.test(value);
// }

// const formReg = document.querySelector('.reg-form');
// const loginInput = formReg.querySelector('.username');
// const passwordInput = formReg.querySelector('.password');
// const confirmPasswordInput = formReg.querySelector('.confirm-password');
// const email = document.getElementById('userEmailRegistration');

// // const formAut = document.querySelector('.aut-form');
// // const loginAut = formAut.querySelector('.userEmailAutorization');
// // const passwordAut = formAut.querySelector('.userPasswordAutorization');

// formReg.addEventListener('submit', (evt) => {
// 	// Отменяем действие по умолчанию
// 	evt.preventDefault();
// 	// Получаем значения полей формы
// 	const confirmPassword = confirmPasswordInput.value;
// 	const login = loginInput.value;
// 	const password = passwordInput.value;
// 	const emailUser = email.value
// 	// Проверяем, что поля заполнены
//   if (!login || !password || !confirmPassword || !emailUser) {
//     alert('Пожалуйста, заполните все поля');
//     return;
//   }
//   // Проверяем, что имя пользователя содержит только буквы и цифры
//   if (!isValidLogin(login)) {
//     alert('Логин может содержать только буквы на латинице и цифры');
//     return;
//   }
//   if (!isValidEmail(emailUser)) {
//     alert('Укажите корректный адрес электронной почты');
//     return;
//   }
  
//   // Проверяем, что пароль содержит хотя бы одну заглавную букву, одну строчную букву и одну цифру
//   if (!isValidPassword(password)) {
//     alert('Пароль должен содержать как минимум одну заглавную букву, одну строчную букву и одну цифру');
//     return;
//   }
//   // Проверяем, что пароли совпадают
//   if (password !== confirmPassword) {
//     alert('Пароли не совпадают');
//     return;
//   }
//   // Если всё в порядке, отправляем форму
//   formReg.submit();
// });
// // formAut.addEventListener('submit', (evt) => {
// // 	evt.preventDefault();
// // 	const password = passwordAut.value;
// // 	const login = loginAut.value;
// // 	if (!login || !password) {
// // 		alert('Пожалуйста, заполните все поля');
// // 		return;
// // 	  }
// // 	 formAut.submit();
// // 	});

// // listeners
// document.getElementById("authorizationClick").addEventListener("click", authorizationCheckUser);
// document.getElementById("registrationClick").addEventListener("click", registrationCheckUser);
// friendsBtn.onclick = function () {
// 	userWindow.classList.add("none");
// 	friendsWindow.classList.remove("none");
// };
// registrationBtn.onclick = function () {
// 	authorizationWindow.classList.add("none");
// 	registrationWindow.classList.remove("none");
// };
// getHome.forEach((btn) => {
// 	btn.addEventListener("click", openProfile);
// });
// backBtn.onclick = function () {
// 	registrationWindow.classList.add("none");
// 	authorizationWindow.classList.remove("none");
// };
// // friendsPerson.forEach((btn) => {
// // 	btn.addEventListener("click", function () {
// // 		let elem = event.target;
// // 		userForChat.innerHTML = elem.innerText;
// // 		friendsWindow.classList.add("none");
// // 		chatWindow.classList.remove("none");
// // 	});
// // });




// //functions
// function clickFriend () {
// 	let elem = event.target;
// 		userForChat.innerHTML = elem.innerText;
// 		friendsWindow.classList.add("none");
// 		chatWindow.classList.remove("none");
// }
// function openProfile() {
// 	for (i = 0; i < windowsBox.length; i++) {
// 		windowsBox[i].classList.add("none");
// 	}
// 	for (i = 0; i < friendsList.length; i++) {
// 		friendsList[i].classList.remove("none");
// 	}
// 	userWindow.classList.remove("none");
// }
// function authorizationCheckUser() {
// 	let userInfo = {
// 		email: userEmailAutorization.value,
// 		password: userPasswordAutorization.value,
// 	};
// 	getUser(userInfo);
// }
// function registrationCheckUser() {
// 	let userInfo = {
// 		first_name: userFirstNameRegistration.value,
// 		email: userEmailRegistration.value,
// 		password: userPasswordRegistration.value,
// 	};
// 	regUser(userInfo);
// }
// function friendId (nameFriend, id) {
// 	return `
// 	<div class="friend">
// 		<img src="./img/user.svg" alt="" />
// 		<span data-index="${id}">${nameFriend}</span>
// 	</div>`
// }

// //API
// async function sendRequest(url, method, data) {
// 	// e.preventDefault();
// 	url = `https://nurbek.lol/api/${url}`;

// 	if (method == "POST") {
//         console.log(data);
// 		let response = await fetch(url, {
// 			method: "POST",
// 			headers: {
// 				Accept: "application/json",
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(data),
// 		});

// 		response = await response.json();
// 		return response;
// 	} else if (method == "GET") {
// 		url = url + "?" + new URLSearchParams(data);
// 		let response = await fetch(url, {
// 			method: "GET",
// 			headers: {
// 				Accept: "application/json",
// 				"Content-Type": "application/json",
// 			},
// 		});
// 		response = await response.json();
// 		return response;
// 	}
// }
// async function regUser(userInfo) {
// 	let response = await sendRequest("register/", "POST", userInfo);
// 	console.log(response)
//     if (response !== ''){
//         registrationWindow.classList.add('none')
//         authorizationWindow.classList.remove('none')
//     }else {
//         alert('Ошибка, бро!')
//     }
// }
// async function getUser(username) {
// 	let response = await sendRequest("auth", "GET", username);
//     let personInfo = await sendRequest("user", "GET", {'id': response.id});
//     let peopleAll = await sendRequest("user", "GET", {'id': 'all'});
	
// 	// render()
// 	peopleAll.map((pers) => {
// 		friendsList.insertAdjacentHTML("beforeend", friendId (pers.first_name, pers.id))
// 	})
// 	if (personInfo && response) {
// 		// нет ошибки
// 		document.getElementById("userName").innerHTML = `${personInfo.first_name}`
// 		openProfile();

// 	} else {
// 		// есть ошибка
// 		alert("Такого пользователя не существует!");
// 	}
// }






// // function render() {
// //     friendsList.innerHTML = ''
// //     if (personList.length === 0) {
// //         friendsList.innerHTML = '<h5 class="text-light">Список пуст</h5>'
// //     }
// //     for(let i = 0; i < personList.length; i++) {
// //         friendsList.insertAdjacentHTML("beforeend", friendId (personList[i].first_name, personList.id))
// //         console.log(personList[i])
// //     }
// // }


