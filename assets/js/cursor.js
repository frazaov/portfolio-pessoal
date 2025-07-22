const cursor = document.querySelector(".cursor");
const cursorText = document.querySelector(".cursor-text"); // Novo: Seleciona o elemento de texto

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!isTouchDevice && !prefersReducedMotion && cursor) {
  // Show our custom cursor
  cursor.style.display = "flex"; // Mude para 'flex' para que o conteúdo seja centralizado

  // Inject CSS to hide the default cursor
  const style = document.createElement("style");
  style.textContent = `
    * {
      cursor: none;
    }
  `;
  document.head.appendChild(style);

  // Position cursor div to cursor position
  document.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
  });

  // Add 'click' class to cursor on mousedown and remove on mouseup
  document.addEventListener("mousedown", (e) => cursor.classList.add("click"));
  document.addEventListener("mouseup", (e) => cursor.classList.remove("click"));

  // Add 'pressable' class to cursor when hovering certain elements
  // E AGORA, DEFINIR O TEXTO DO CURSOR
  const items = document.querySelectorAll("#click"); // Adicione outras classes de elementos que você quer que ativem o cursor
  items.forEach((item) => {
    item.addEventListener("mouseover", () => {
      cursor.classList.add("pressable");
      if (cursorText) { // Verifica se o elemento de texto existe
        cursorText.textContent = "VEJA O PROJETO"; // Define o texto
      }
    });

    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("pressable");
      if (cursorText) { // Verifica se o elemento de texto existe
        cursorText.textContent = ""; // Limpa o texto ao sair
      }
    });
  });
}