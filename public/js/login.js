import { showModal, hideModal } from "./modal.js";

export function handleLogin() {
  const user = document.querySelector(".js-user").value;
  const password = document.querySelector(".js-password").value;
  console.log({ user, password });

  // TODO: This part needs backend
  fetch(`/api/login/user=${user}&password=${password}`);
  fetch(`/login/user=${user}`)
    .then(response => response.json())
    .then(data => {
      console.log("🚀 - data:", data);
    })
    .catch(e => console.error(e));
}

setTimeout(() => {
  const openLoginModal = document.querySelector(".js-open-login-modal");
  openLoginModal.addEventListener("click", function () {
    const loginModal = document.querySelector(".js-modal-sudoku-ok");
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
}, 2000);
