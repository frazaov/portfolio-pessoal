document.addEventListener('DOMContentLoaded', () => {
    const frase1Element = document.getElementById('frase1');
    const frase2Element = document.getElementById('frase2');
    const marcaFontElement = document.getElementById('marca'); // A div da sua marca

    
     const frase1Texto = "Da criação à concretização, design digital e gráfico com propósito";
    const frase2Texto = "Mais que estética, soluções que comunicam e conectam";

    // Função para simular a digitação palavra por palavra
    function typeWriter(element, text, delay = 50, callback) {
        const words = text.split(' ');
        let i = 0;
        element.style.opacity = 1;
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
        }, 500);
    });

    // Função para verificar sobreposição
    function isOverlapping(rect1, rect2) {
        // Verifica se os retângulos se interceptam
        return !(rect1.right < rect2.left ||
                 rect1.left > rect2.right ||
                 rect1.bottom < rect2.top ||
                 rect1.top > rect2.bottom);
    }

    // Monitora a posição da marca e das frases em intervalos ou em eventos de scroll/resize
    // Para uma marca fixa, podemos fazer essa checagem de forma periódica ou em eventos relevantes
    function checkOverlapAndHidePhrases() {
        const marcaRect = marcaFontElement.getBoundingClientRect();
        const frase1Rect = frase1Element.getBoundingClientRect();
        const frase2Rect = frase2Element.getBoundingClientRect();

        // Verifica a sobreposição com a primeira frase
        if (isOverlapping(marcaRect, frase1Rect)) {
            frase1Element.style.opacity = 0;
        } else {
            frase1Element.style.opacity = 1;
        }

        // Verifica a sobreposição com a segunda frase
        if (isOverlapping(marcaRect, frase2Rect)) {
            frase2Element.style.opacity = 0;
        } else {
            frase2Element.style.opacity = 1;
        }
    }

    // Onde e como chamar checkOverlapAndHidePhrases():
    // Se a marca é fixa, mas a página pode rolar ou redimensionar,
    // precisamos chamar a função nesses eventos.
    window.addEventListener('scroll', checkOverlapAndHidePhrases);
    window.addEventListener('resize', checkOverlapAndHidePhrases);

    // E também é bom chamar uma vez no carregamento inicial para o estado correto
    checkOverlapAndHidePhrases();

    // Se a marca pode se mover (o que não é o caso de uma "fixed" normal),
    // ou se você quer uma checagem contínua, você pode usar um setInterval.
    // Mas para uma marca fixa, eventos de scroll/resize são mais eficientes.
    // Exemplo de setInterval (use com cautela, pode consumir recursos):
    // setInterval(checkOverlapAndHidePhrases, 200); // Checa a cada 200ms
});

