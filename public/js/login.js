

export function handleLogin() {
   const user = document.querySelector(".js-user").value;
   const password = document.querySelector(".js-password").value;
   console.log({user, password});

   // TODO: This part needs backend
   // fetch(`/api/login/user=${user}&password=${password}`)
   // fetch(`/login/user=${user}`)
   // .then((response) => response.json())
   // .then((data) => {
   //    console.log("🚀 - data:", data)
   // })
   // .catch(e => console.error(e));
}

function showLoginModal() {
   // console.log("Show modal");
   const modal = document.querySelector(".sudo-modal")
   modal.classList.add("sudo-modal--active");

   const body = document.querySelector("body")
   body.classList.add("modal-open")
}

function hideLoginModal() {
   // console.log("Close modal");
   const modal = document.querySelector(".sudo-modal")
   modal.classList.remove("sudo-modal--active")

   const body = document.querySelector("body")
   body.classList.remove("modal-open")
}


setTimeout(() => {
   
   const openLoginModal = document.querySelector(".js-open-login-modal")
   openLoginModal.addEventListener("click", function() {
      showLoginModal();
   }) 
   
   const closeLoginModal = document.querySelector(".js-close-login-modal")
   closeLoginModal.addEventListener("click", function() {
      hideLoginModal();
   }) 
   
   const sendLogin = document.querySelector(".js-send-login")
   sendLogin.addEventListener("click", function(e) {
      e.preventDefault();
      handleLogin();
   }) 
   
}, 2000);

