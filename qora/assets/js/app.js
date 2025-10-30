document.addEventListener("DOMContentLoaded", function() {
  const secaoAlvo = document.querySelector(".secoes.sexto");
  const paragrafos = secaoAlvo.querySelectorAll("p");
  
  const textosComBr = Array.from(paragrafos).map(p => p.innerHTML.replace(/<br>/g, "[br]"));
  const textoCompleto = textosComBr.join("[p]");
  const textoLength = textoCompleto.length;
  
  paragrafos.forEach(p => p.innerHTML = "");

  // =========================================================
  // === NOVO CÓDIGO MAIS SIMPLES PARA A SENSIBILIDADE ===
  // =========================================================
  
  // Ajuste este valor. Menor = mais sensível, Maior = menos sensível.
  // Um valor entre 0.5 e 2.0 geralmente funciona bem.
  const sensibilidade = 0.1; 

  window.addEventListener("scroll", function() {
    const rect = secaoAlvo.getBoundingClientRect();
    const alturaJanela = window.innerHeight;
    
    // Calcula o ponto de início da animação, que é quando a seção entra na tela.
    const startPoint = rect.top - alturaJanela + 800;
    
    // A animação termina quando a seção rolou a distância de 'sensibilidade' * 'altura da janela'
    const offsetFim = 1000; // Por exemplo, 200px
const endPoint = rect.top + rect.height - offsetFim;
    
    // A nova lógica de cálculo de progresso
    let progresso = 1 - (endPoint + startPoint) / (alturaJanela + rect.height);
    
    // Garante que o progresso fique entre 0 e 1
    progresso = Math.min(1, Math.max(0, progresso));

    // Mapeia o progresso para o número de caracteres visíveis
    const caracteresVisiveis = Math.round(progresso * textoLength);
    
    const textoExibido = textoCompleto.substring(0, caracteresVisiveis);
    const paragrafosExibidos = textoExibido.split("[p]");
    
    for (let i = 0; i < paragrafos.length; i++) {
      if (paragrafosExibidos[i]) {
        paragrafos[i].innerHTML = paragrafosExibidos[i].replace(/\[br\]/g, "<br>");
      } else {
        paragrafos[i].innerHTML = "";
      }
    }
  });




// 1. Encontra o elemento de vídeo no HTML
const video = document.getElementById('motion');

// 2. Define as opções do observador
const options = {
  root: null, // Define a viewport como o root (área de observação)
  rootMargin: '0px', // Nenhuma margem extra
  // threshold: Define que o callback deve ser executado quando 50% (0.5)
  // ou 100% (1.0) do elemento estiver visível.
  // Vamos usar 0.8 (80%) como um bom ponto de partida.
  threshold: 0.8 
};

// 3. Cria a função de callback (o que deve acontecer quando o elemento entra/sai)
const callback = (entries, observer) => {
  entries.forEach(entry => {
    // entry.isIntersecting será true se o vídeo estiver visível (na intersecção)
    if (entry.isIntersecting) {
      // O vídeo está na tela (80% ou mais), então inicie a reprodução
      video.play().catch(error => {
        // Captura possíveis erros, como a política do navegador.
        // Se o vídeo estiver 'muted', isso geralmente funciona.
        console.log('Erro ao iniciar a reprodução automática:', error);
      });
    } else {
      // O vídeo saiu da tela, então pause
      video.pause();
    }
  });
};

// 4. Cria a instância do Intersection Observer
const observer = new IntersectionObserver(callback, options);

// 5. Começa a observar o seu vídeo
if (video) {
  observer.observe(video);
}


});