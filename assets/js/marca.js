 window.addEventListener('scroll', function() {
        const logo = document.getElementById('marca');
        const proximaSecao = document.getElementById('subcapa');

        // Calcula a posição do topo da próxima seção em relação ao topo da viewport
        // getBoundingClientRect().top retorna a distância do topo do elemento até o topo da viewport
        const proximaSecaoTop = proximaSecao.getBoundingClientRect().top;

        // Define o ponto de gatilho para a mudança da logo
        // Por exemplo, quando a próxima seção estiver a 100px do topo da viewport
        const triggerPoint = 300; 

        if (proximaSecaoTop <= triggerPoint) {
            // Se a próxima seção subiu até o ponto de gatilho, diminui a logo
            logo.classList.add('marca-font-pequena');
        } else {
            // Caso contrário, a logo volta ao tamanho normal
            logo.classList.remove('marca-font-pequena');
        }
    });
