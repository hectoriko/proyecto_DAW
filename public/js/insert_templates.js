export function addTemplate(templateName, selector) {
  const container = document.querySelector(selector);
  if (container) {
    fetch(templateName)
      .then(response => response.text())
      .then(data => (container.innerHTML = data))
      .catch(e => console.error(e));
  }
}

addTemplate("./template-header", ".sudo-header");
addTemplate("./template-footer", ".sudo-footer");
addTemplate("./template-nav", ".sudo-nav");
addTemplate("./template-sudoku", "#js-sudo-test2");
