document.addEventListener('DOMContentLoaded', () => {
    const frase1Element = document.getElementById('frase1');
    const frase2Element = document.getElementById('frase2');
    const marcaFontElement = document.getElementById('marca'); // A div da sua marca

    const frase1Texto = "Da criação à concretização, design digital e gráfico com propósito";
    const frase2Texto = "Mais que estética, soluções que comunicam e conectam";

    // Garante que a frase2 comece invisível
    frase2Element.style.opacity = 0; // <--- Adicione esta linha

    // Função para simular a digitação palavra por palavra
    function typeWriter(element, text, delay = 50, callback) {
        const words = text.split(' ');
        let i = 0;
        element.style.opacity = 1; // Garante que o elemento esteja visível ao iniciar a digitação
        element.textContent = '';

        function typeWord() {
            if (i < words.length) {
                element.textContent += words[i] + ' ';
                i++;
                setTimeout(typeWord, delay);
            } else if (callback) {
                callback();
            }
        }
        typeWord();
    }

    // Inicia a digitação das frases
    typeWriter(frase1Element, frase1Texto, 100, () => {
        setTimeout(() => {
            typeWriter(frase2Element, frase2Texto, 100);
        }, 500); // Pequeno atraso entre a primeira e a segunda frase
    });

    // Função para verificar sobreposição
    function isOverlapping(rect1, rect2) {
        return !(rect1.right < rect2.left ||
                 rect1.left > rect2.right ||
                 rect1.bottom < rect2.top ||
                 rect1.top > rect2.bottom);
    }

    // Monitora a posição da marca e das frases em intervalos ou em eventos de scroll/resize
    function checkOverlapAndHidePhrases() {
        const marcaRect = marcaFontElement.getBoundingClientRect();
        const frase1Rect = frase1Element.getBoundingClientRect();
        const frase2Rect = frase2Element.getBoundingClientRect();

        // Verifica a sobreposição com a primeira frase
        if (isOverlapping(marcaRect, frase1Rect)) {
            frase1Element.style.opacity = 0;
        } else {
            // Só redefine a opacidade para 1 se a digitação já tiver terminado
            if (frase1Element.textContent === frase1Texto + ' ') { // Adiciona um espaço para considerar o último espaço
                frase1Element.style.opacity = 1;
            }
        }

        // Verifica a sobreposição com a segunda frase
        if (isOverlapping(marcaRect, frase2Rect)) {
            frase2Element.style.opacity = 0;
        } else {
            // Só redefine a opacidade para 1 se a digitação já tiver terminado
            if (frase2Element.textContent === frase2Texto + ' ') { // Adiciona um espaço para considerar o último espaço
                frase2Element.style.opacity = 1;
            }
        }
    }

    window.addEventListener('scroll', checkOverlapAndHidePhrases);
    window.addEventListener('resize', checkOverlapAndHidePhrases);

    // Chame no carregamento inicial para garantir o estado correto
    checkOverlapAndHidePhrases();
});