import { showModal, hideModal } from "./modal.js";

export async function isLoggedIn() {
  await fetch(`/auth/user/`)
    .then(response => response.json())
    .then(result => handleLoginOK(result))
    .catch(e => console.error(e));
}


export async function handleRegister() {
  const username = document.querySelector(".js-modal-register .js-user").value;
  const password = document.querySelector(
    ".js-modal-register .js-password",
  ).value;
  const email = document.querySelector(".js-modal-register .js-email").value;
  const points = 0;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ username, password, email, points }),
    redirect: "follow",
  };

  await fetch("/auth/register", requestOptions)
    .then(response => response.text())
    .then(result => {
      const loginRegistroOk = document.querySelector(".js-modal-register-ok");
      const registerModal = document.querySelector(".js-modal-register");

      hideModal(registerModal);

      setTimeout(() => {
        showModal(loginRegistroOk);
      }, 1000);
      setTimeout(() => {
        hideModal(loginRegistroOk);
      }, 4000);
    })
    .catch(error => console.log("error", error));
}

function handleLoginOK(result) {
  const userinfo = document.querySelector(".user-info");
  if (!userinfo) return

  userinfo.classList.add("user-info--show");
  // const user = JSON.parse(result)
  let user;
  try {
    user = JSON.parse(result);
  } catch (e) {
    user = result;
  }
  // console.log("🚀 ~ user", user)

  // const username = document.querySelector(".js-modal-login .js-user").value;
  // const username = user.username

  // if (username !== '') {
  if (user) {
    document.querySelector(".username").textContent = user.username;
    document.querySelector(".username").setAttribute("data-userId", user.id);
    document.querySelector(
      ".userpoints",
    ).textContent = `Tus puntos: ${user.userpoints} pts`;

    document.querySelector(".js-login").classList.add("hidden");
    document.querySelector(".js-login").classList.remove("shown");

    document.querySelector(".js-logout").classList.add("shown");
    document.querySelector(".js-logout").classList.remove("hidden");

    document.querySelector(".ranking").classList.remove("ranking--full");
  }

  setTimeout(() => {
    const loginModal = document.querySelector(".js-modal-login");
    hideModal(loginModal);
  }, 1500);
}

export function callLogin() {
  const username = document.querySelector(".js-modal-login .js-user").value;
  const password = document.querySelector(".js-modal-login .js-password").value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ username, password }),
    redirect: "follow",
  };

  fetch("/auth/login", requestOptions)
    .then(response => response.text())
    .then(result => handleLoginOK(result))
    .catch(error => console.log("error", error));
}

export function handleLogout() {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  fetch("/auth/logout", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);

      document.querySelector(".js-logout").classList.add("hidden");
      document.querySelector(".js-logout").classList.remove("shown");

      document.querySelector(".js-login").classList.add("shown");
      document.querySelector(".js-login").classList.remove("hidden");

      document.querySelector(".username").textContent = "";
      document.querySelector(".username").removeAttribute("data-userId");
      document.querySelector(".userpoints").textContent = "";
      document.querySelector(".user-info").classList.remove("user-info--show");

      document.querySelector(".ranking").classList.add("ranking--full");
    })
    .catch(error => console.error(error));
}

setTimeout(() => {
  // LOGIN
  const openLoginModal = document.querySelector(".js-open-login-modal");
  openLoginModal.addEventListener("click", function () {
    const loginModal = document.querySelector(".js-modal-login");
    showModal(loginModal);
  });

  const closeLoginModal = document.querySelector(".js-modal-login .js-close-modal");
  if (closeLoginModal) {
    closeLoginModal.addEventListener("click", function () {
      const loginModal = document.querySelector(".js-modal-login");
      hideModal(loginModal);
    });
  }

  const sendLogin = document.querySelector(".js-send-login");
  if (sendLogin) {
    sendLogin.addEventListener("click", function (e) {
      e.preventDefault();
      callLogin();
    });
  }

  // REGISTER
  const openRegisterModal = document.querySelector(".js-open-register-modal");
  if (openRegisterModal) {
    openRegisterModal.addEventListener("click", function () {
      const registerModal = document.querySelector(".js-modal-register");
      showModal(registerModal);
    });
  }

  const closeRegisterModal = document.querySelector(".js-modal-register .js-close-modal");
  if (closeRegisterModal) {
    closeRegisterModal.addEventListener("click", function () {
      const registerModal = document.querySelector(".js-modal-register");
      hideModal(registerModal);
    });
  }

  const sendRegister = document.querySelector(".js-send-register");
  if (sendRegister) {
    sendRegister.addEventListener("click", function (e) {
      e.preventDefault();
      handleRegister();
    });
  }

  // LOGOUT
  const logout = document.querySelector(".js-logout");
  logout.addEventListener("click", function (e) {
    e.preventDefault();
    handleLogout();
  });
}, 2000);
