window.addEventListener('scroll', function() {
    const logo = document.getElementById('marca');
    const proximaSecao = document.getElementById('subcapa');
    const textosEscondiveis = document.querySelectorAll('.texto-escondivel');
    const linkFixo = document.getElementById('contato'); 
    const textoOriginal = "victorfrazão"; 
    const textoNovo = "vf"; 

    let textoMarcaAlterado = false; 

    // --- Lógica existente para mudar o tamanho da logo (mantém como está) ---
    const proximaSecaoTop = proximaSecao.getBoundingClientRect().top;
    const triggerPoint = 300; 

    if (proximaSecaoTop <= triggerPoint) {
        logo.classList.add('marca-font-pequena');
    } else {
        logo.classList.remove('marca-font-pequena');
    }

    // --- Lógica para iterar sobre cada elemento 'texto-escondivel' ---
    if (logo && textosEscondiveis.length > 0) {
        const logoRect = logo.getBoundingClientRect();
        const margin = 80; // Primeiro trigger (80) para os textos escondíveis
        let todosEscondidos = true; 

        textosEscondiveis.forEach(function(textoEscondivel) {
            const textoRect = textoEscondivel.getBoundingClientRect();

            const isOverlapping = !(
                logoRect.bottom < (textoRect.top - margin) ||
                logoRect.top > (textoRect.bottom + margin) ||
                logoRect.right < (textoRect.left - margin) ||
                logoRect.left > (textoRect.right + margin)
            );

            if (isOverlapping) {
                textoEscondivel.classList.add('escondido');
            } else {
                textoEscondivel.classList.remove('escondido');
                todosEscondidos = false; 
            }
        });

        // --- Lógica para mudar o texto da marca para 'VF' ---
        if (todosEscondidos && !textoMarcaAlterado) {
            if (logo.textContent !== textoNovo) {
                logo.classList.add('crossfade-out');
                setTimeout(() => {
                    logo.textContent = textoNovo;
                    logo.classList.remove('crossfade-out');
                    logo.classList.add('crossfade-in');
                    textoMarcaAlterado = true; 
                }, 300); 
            }
        } 
    }

    // --- Lógica para Reverter o Texto da Marca para 'Victor Frazão' ---
    if (proximaSecaoTop > triggerPoint && logo.textContent === textoNovo) {
        if (logo.textContent !== textoOriginal) {
            logo.classList.add('crossfade-out');
            setTimeout(() => {
                logo.textContent = textoOriginal;
                logo.classList.remove('crossfade-out');
                logo.classList.add('crossfade-in');
                textoMarcaAlterado = false; 
            }, 300); 
        }
    }

    // --- NOVA LÓGICA para Fixar o Link com gatilho em 100px ---
    if (linkFixo) { 
        // Define o ponto de gatilho para o link fixo
        // O link fixará quando o scroll ultrapassar 100px do topo da página.
        const triggerFixarLink = 500; 

        // Se a posição de rolagem for maior ou igual ao trigger (100px)
        // E o link ainda não tem a classe 'link-fixo-top'
        if (window.scrollY >= triggerFixarLink && !linkFixo.classList.contains('link-fixo-top')) {
            linkFixo.classList.add('link-fixo-top');
        } 
        // Se a posição de rolagem for menor que o trigger (100px)
        // E o link está com a classe 'link-fixo-top' (ou seja, está fixo)
        else if (window.scrollY < triggerFixarLink && linkFixo.classList.contains('link-fixo-top')) {
            linkFixo.classList.remove('link-fixo-top');
        }
    }
});