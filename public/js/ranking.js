export async function getRanking() {
  await fetch(`/auth/getRanking/`)
    .then(response => response.json())
    .then(data => {
      populateRanking(data);
      return data;
    })
    .catch(e => console.error(e));
}

function populateRanking(ranking) {
  const rankingWrapper = document.querySelector(".sudo-ranking");
  if (!rankingWrapper) return;

  const rankingLength = 3;
  let template = "";

  rankingWrapper.innerHTML = "";
  ranking.forEach((user, i) => {
    if (i >= rankingLength) return;
    template += /*html*/ `
    <li class="sudo-ranking__user" data-userId='${user._id}'>
      <span class="sudo-ranking__posicion">${++i}</span>
      <span class="sudo-ranking__nombre">${user.username}</span>
      <span class="sudo-ranking__puntos">${user.points} pts</span>
    </li>`;
  });
  rankingWrapper.innerHTML = template;
}