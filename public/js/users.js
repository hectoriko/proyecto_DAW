export async function getUsers() {
  await fetch(`/auth/getUsers/`)
    .then(response => response.json())
    .then(data => {
      populateUsers(data);
      return data;
    })
    .catch(e => console.error(e));
}

function populateUsers(users) {
  const usersWrapper = document.querySelector(".sudo-users");
  if (!usersWrapper) return;

  // const rankingLength = 3;
  let template = "";

  usersWrapper.innerHTML = "";
  users.forEach((user, i) => {
    // if (i >= rankingLength) return;
    template += /*html*/ `
      <li>
        <span>👤</span><span class="nombre">${user.username}</span>
      </li>`;
  });
  usersWrapper.innerHTML = template;
}