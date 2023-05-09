export async function addTemplate(templateName, selector) {
  const container = document.querySelector(selector);
  if (!container) return;

  await fetch(templateName)
    .then(response => response.text())
    .then(data => (container.innerHTML = data))
    .catch(e => console.error(e));
}