document.addEventListener("DOMContentLoaded", function() {
  const secaoAlvo = document.querySelector(".secoes.sexto");
  const paragrafos = secaoAlvo.querySelectorAll("p");
  
  // ... (código de rolagem de texto omitido para brevidade, mas ele permanece)
  // ...

  window.addEventListener("scroll", function() {
    // ... (restante do código de rolagem)
  });

// 1. Encontra o elemento de vídeo no HTML
const video = document.getElementById('motion');

// 2. Define as opções do observador
const options = {
  root: null, // Define a viewport como o root (área de observação)
  rootMargin: '0px', // Nenhuma margem extra
  // Mantenha o threshold original (0.8) ou tente 0.9 / 1.0 se o problema persistir
  threshold: 0.8 
};

// 3. Cria a função de callback (o que deve acontecer quando o elemento entra/sai)
// =========================================================
// === NOVO CÓDIGO CORRIGIDO PARA EVITAR INTERRUPÇÕES ===
// =========================================================
const callback = (entries, observer) => {
  entries.forEach(entry => {
    // Adiciona uma verificação de segurança, embora o 'if (video)' já ajude
    if (!video) return; 

    if (entry.isIntersecting) {
      // O vídeo está na tela (80% ou mais), então inicie a reprodução
      // **SÓ DÊ PLAY SE ELE JÁ ESTIVER PAUSADO**
      if (video.paused) {
        video.play().catch(error => {
          console.warn('Erro ao tentar iniciar a reprodução:', error.name, error.message);
        });
      }
    } else {
      // O vídeo saiu da tela, então pause
      // **SÓ DÊ PAUSE SE ELE NÃO ESTIVER PAUSADO**
      if (!video.paused) {
        video.pause();
      }
    }
  });
};
// =========================================================

// 4. Cria a instância do Intersection Observer
const observer = new IntersectionObserver(callback, options);

// 5. Começa a observar o seu vídeo
if (video) {
  observer.observe(video);
}

});