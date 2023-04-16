// setTimeout(() => {
export function showModal(modal) {
  // console.log("Show modal");
  // const modal = document.querySelector(".js-modal-login")
  modal.classList.add("sudo-modal--active");

  const body = document.querySelector("body");
  body.classList.add("modal-open");
}

export function hideModal(modal) {
  // console.log("Close modal");
  // const modal = document.querySelector(".js-modal-login")
  modal.classList.remove("sudo-modal--active");

  const body = document.querySelector("body");
  body.classList.remove("modal-open");
}
// }, 2000);
