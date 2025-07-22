window.addEventListener('scroll', function() {
    const logo = document.getElementById('marca');
    const proximaSecao = document.getElementById('subcapa');
    const textosEscondiveis = document.querySelectorAll('.texto-escondivel');

    // --- Lógica existente para mudar o tamanho da logo (mantém como está) ---
    const proximaSecaoTop = proximaSecao.getBoundingClientRect().top;
    const triggerPoint = 300; 

    if (proximaSecaoTop <= triggerPoint) {
        logo.classList.add('marca-font-pequena');
    } else {
        logo.classList.remove('marca-font-pequena');
    }

    // --- Nova lógica para iterar sobre cada elemento 'texto-escondivel' ---
    if (logo && textosEscondiveis.length > 0) {
        const logoRect = logo.getBoundingClientRect();

        // Defina a margem de "antecipação" em pixels
        // Aumente este valor para o texto desaparecer ainda mais cedo
        const margin = 80; // Por exemplo, 50 pixels

        textosEscondiveis.forEach(function(textoEscondivel) {
            const textoRect = textoEscondivel.getBoundingClientRect();

            // Ajustando a lógica de sobreposição com a margem
            const isOverlapping = !(
                // Verifica se a logo está acima do texto + margem
                logoRect.bottom < (textoRect.top - margin) ||
                // Verifica se a logo está abaixo do texto - margem
                logoRect.top > (textoRect.bottom + margin) ||
                // Verifica se a logo está à direita do texto + margem
                logoRect.right < (textoRect.left - margin) ||
                // Verifica se a logo está à esquerda do texto - margem
                logoRect.left > (textoRect.right + margin)
            );

            if (isOverlapping) {
                textoEscondivel.classList.add('escondido');
            } else {
                textoEscondivel.classList.remove('escondido');
            }
        });
    }
});