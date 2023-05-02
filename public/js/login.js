import { showModal, hideModal } from "./modal.js";

export function handleLogin() {
  const username = document.querySelector(".js-modal-login .js-user").value;
  const password = document.querySelector(".js-modal-login .js-password").value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Cookie", "auth=eyJhbGciOiJIUzI1NiJ9.NjQzY2RmZmRmMmI5ZGE1ODEzODUzYTkw.PvZ1uMewI1NhnrU-ZZ0feuYJCYWCyUa09o-cIPBbENc");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ username, password }),
    redirect: 'follow'
  };

  fetch("/auth/login", requestOptions)
    .then(response => response.text())
    .then(result => {
      document.querySelector('.user-info').classList.add('user-info--show');
      const username = JSON.parse(result).username;
      if (username !== '') document.querySelector('.username').textContent = username;

      setTimeout(() => {
        const loginModal = document.querySelector(".js-modal-login");
        hideModal(loginModal);
      }, 1500)
    })
    .catch(error => console.log('error', error));
}

export function handleRegister() {
  const username = document.querySelector(".js-modal-register .js-user").value;
  const password = document.querySelector(".js-modal-register .js-password").value;
  const email = document.querySelector(".js-modal-register .js-email").value;
  const points = 0;
  // console.log({ username, password });

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Cookie", "auth=eyJhbGciOiJIUzI1NiJ9.NjQzY2RmZmRmMmI5ZGE1ODEzODUzYTkw.PvZ1uMewI1NhnrU-ZZ0feuYJCYWCyUa09o-cIPBbENc");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ username, password, email, points }),
    redirect: 'follow'
  };

  fetch("/auth/register", requestOptions)
    .then(response => response.text())
    .then(result => {
      const loginRegistroOk = document.querySelector(".js-modal-register-ok");
      const registerModal = document.querySelector(".js-modal-register");

      hideModal(registerModal);

      setTimeout(() => { showModal(loginRegistroOk) }, 1000)
      setTimeout(() => { hideModal(loginRegistroOk) }, 4000)
    })
    .catch(error => console.log('error', error));
}


setTimeout(() => {
  // LOGIN
  const openLoginModal = document.querySelector(".js-open-login-modal");
  openLoginModal.addEventListener("click", function () {
    const loginModal = document.querySelector(".js-modal-login");
    showModal(loginModal);
  });

  const closeLoginModal = document.querySelector(
    ".js-modal-login .js-close-modal",
  );
  closeLoginModal.addEventListener("click", function () {
    const loginModal = document.querySelector(".js-modal-login");
    hideModal(loginModal);
  });

  const sendLogin = document.querySelector(".js-send-login");
  sendLogin.addEventListener("click", function (e) {
    e.preventDefault();
    handleLogin();
  });

  // REGISTER
  const openRegisterModal = document.querySelector(".js-open-register-modal");
  openRegisterModal.addEventListener("click", function () {
    const registerModal = document.querySelector(".js-modal-register");
    showModal(registerModal);
  });

  const closeRegisterModal = document.querySelector(
    ".js-modal-register .js-close-modal",
  );
  closeRegisterModal.addEventListener("click", function () {
    const registerModal = document.querySelector(".js-modal-register");
    hideModal(registerModal);
  });

  const sendRegister = document.querySelector(".js-send-register");
  sendRegister.addEventListener("click", function (e) {
    e.preventDefault();
    handleRegister();
  });
}, 2000);
