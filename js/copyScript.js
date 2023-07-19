VANTA.WAVES({
	el: ".your-element-selector",
	color: 0x40404,
	waveHeight: 2.5,
	waveSpeed: 0.65,
});

function scrollToAction() {
	document.querySelector('.friends').scrollTop = activeTop - 100;
}


//Windows
const windowsBox = document.querySelectorAll(".contentBlock .box");
const authorizationWindow = document.getElementById("authorizationDiv");
const registrationWindow = document.getElementById("registrationDiv");
const userWindow = document.getElementById("userPersonDiv");
const friendsWindow = document.getElementById("friendsBox");
const chatWindow = document.getElementById("chatBox");
const inputChat = document.getElementById("inputChat");
const userForChat = document.getElementById("anotherUserForChat");

//btns
const registrationBtn = document.getElementById("registration");
const getHome = document.querySelectorAll(".getUserProfile");
const friendsBtn = document.getElementById("friendsListBtn");
const backBtn = document.getElementById('backBtn')

//objects
const friendsPerson = document.querySelectorAll(".friends .friend");
const friendsList = document.getElementById("friendsList");

//inputs
const userFirstNameRegistration = document.getElementById("userFirstNameRegistration");
const userEmailRegistration = document.getElementById("userEmailRegistration");
const userPasswordRegistration = document.getElementById("userPasswordRegistration");
const userEmailAutorization = document.getElementById("userEmailAutorization");
const userPasswordAutorization = document.getElementById("userPasswordAutorization");


// Check Form
function isValidLogin(login) {
	// Проверка имени регулярным выражением
	const pattern = /^[a-zA-Z0-9]+$/;
	return pattern.test(login);
}
function isValidPassword(password) {
	// Проверка пароля регулярным выражением
	const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/;
  	return pattern.test(password);
}
function isValidEmail(email) {
	// Проверка пароля регулярным выражением
	const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  	return EMAIL_REGEXP.test(email);
}
function isEmailValid(value) {
	// Проверка email регулярным выражением
	const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
 	return EMAIL_REGEXP.test(value);
}

const formReg = document.querySelector('.reg-form');
const loginInput = formReg.querySelector('.username');
const passwordInput = formReg.querySelector('.password');
const confirmPasswordInput = formReg.querySelector('.confirm-password');
const email = document.getElementById('userEmailRegistration');

// const formAut = document.querySelector('.aut-form');
// const loginAut = formAut.querySelector('.userEmailAutorization');
// const passwordAut = formAut.querySelector('.userPasswordAutorization');

formReg.addEventListener('submit', (evt) => {
	// Отменяем действие по умолчанию
	evt.preventDefault();
	// Получаем значения полей формы
	const confirmPassword = confirmPasswordInput.value;
	const login = loginInput.value;
	const password = passwordInput.value;
	const emailUser = email.value
	// Проверяем, что поля заполнены
  if (!login || !password || !confirmPassword || !emailUser) {
    alert('Пожалуйста, заполните все поля');
    return;
  }
  // Проверяем, что имя пользователя содержит только буквы и цифры
  if (!isValidLogin(login)) {
    alert('Логин может содержать только буквы на латинице и цифры');
    return;
  }
  if (!isValidEmail(emailUser)) {
    alert('Укажите корректный адрес электронной почты');
    return;
  }
  
  // Проверяем, что пароль содержит хотя бы одну заглавную букву, одну строчную букву и одну цифру
  if (!isValidPassword(password)) {
    alert('Пароль должен содержать как минимум одну заглавную букву, одну строчную букву и одну цифру');
    return;
  }
  // Проверяем, что пароли совпадают
  if (password !== confirmPassword) {
    alert('Пароли не совпадают');
    return;
  }
  // Если всё в порядке, отправляем форму
  formReg.submit();
});
// formAut.addEventListener('submit', (evt) => {
// 	evt.preventDefault();
// 	const password = passwordAut.value;
// 	const login = loginAut.value;
// 	if (!login || !password) {
// 		alert('Пожалуйста, заполните все поля');
// 		return;
// 	  }
// 	 formAut.submit();
// 	});

// listeners
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
backBtn.onclick = function () {
	registrationWindow.classList.add("none");
	authorizationWindow.classList.remove("none");
};
// friendsPerson.forEach((btn) => {
// 	btn.addEventListener("click", function () {
// 		let elem = event.target;
// 		userForChat.innerHTML = elem.innerText;
// 		friendsWindow.classList.add("none");
// 		chatWindow.classList.remove("none");
// 	});
// });




//functions
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
function authorizationCheckUser() {
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
function friendId (nameFriend, id) {
	return `
	<div class="friend">
		<img src="./img/user.svg" alt="" />
		<span data-index="${id}">${nameFriend}</span>
	</div>`
}

//API
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
async function regUser(userInfo) {
	let response = await sendRequest("register/", "POST", userInfo);
	console.log(response)
    if (response !== ''){
        registrationWindow.classList.add('none')
        authorizationWindow.classList.remove('none')
    }else {
        alert('Ошибка, бро!')
    }
}
async function getUser(username) {
	let response = await sendRequest("auth", "GET", username);
    let personInfo = await sendRequest("user", "GET", {'id': response.id});
    let peopleAll = await sendRequest("user", "GET", {'id': 'all'});
	
	// render()
	peopleAll.map((pers) => {
		friendsList.insertAdjacentHTML("beforeend", friendId (pers.first_name, pers.id))
	})
	if (personInfo && response) {
		// нет ошибки
		document.getElementById("userName").innerHTML = `${personInfo.first_name}`
		openProfile();

	} else {
		// есть ошибка
		alert("Такого пользователя не существует!");
	}
}






// function render() {
//     friendsList.innerHTML = ''
//     if (personList.length === 0) {
//         friendsList.innerHTML = '<h5 class="text-light">Список пуст</h5>'
//     }
//     for(let i = 0; i < personList.length; i++) {
//         friendsList.insertAdjacentHTML("beforeend", friendId (personList[i].first_name, personList.id))
//         console.log(personList[i])
//     }
// }


