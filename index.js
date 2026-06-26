const buttons = document.querySelectorAll('h1');
const itens = [];

// Define a velocidade fixa de movimento (quantos pixels ele anda por frame)
const velocidade = 5; 

// 1. Inicializa a posição e a direção de cada botão de forma aleatória
buttons.forEach((botao) => {
    botao.addEventListener('click', () => {
        botao.classList.toggle('selecionado');
    });

    const item = {
        element: botao,
        x: Math.random() * (window.innerWidth - 120),
        y: Math.random() * (window.innerHeight - 60),
        // Escolhe uma direção aleatória: 1 (para a direita/baixo) ou -1 (para a esquerda/cima)
        dirX: Math.random() > 0.5 ? 1 : -1,
        dirY: Math.random() > 0.5 ? 1 : -1,
        width: botao.offsetWidth,
        height: botao.offsetHeight
    };
    
    itens.push(item);
});

// 2. Loop de movimento e colisão simples
function moverBotoes() {
    itens.forEach((item, index) => {
        // Move o botão na direção atual multiplicada pela velocidade fixa
        item.x += item.dirX * velocidade;
        item.y += item.dirY * velocidade;

        const limiteLargura = window.innerWidth - item.width;
        const limiteAltura = window.innerHeight - item.height;

        // --- CONTATO COM AS EXTREMIDADES DA TELA ---
        if (item.x <= 0) { item.x = 0; item.dirX = 1; }
        else if (item.x >= limiteLargura) { item.x = limiteLargura; item.dirX = -1; }

        if (item.y <= 0) { item.y = 0; item.dirY = 1; }
        else if (item.y >= limiteAltura) { item.y = limiteAltura; item.dirY = -1; }

        // --- CONTATO ENTRE OS BOTÕES ---
        for (let i = 0; i < itens.length; i++) {
            if (i === index) continue; // Não checa o botão contra ele mesmo
            
            const outro = itens[i];

            // Vê se a caixinha deste botão encostou na caixinha de outro botão
            if (item.x < outro.x + outro.width &&
                item.x + item.width > outro.x &&
                item.y < outro.y + outro.height &&
                item.y + item.height > outro.y) {
                
                // Se bateu de frente horizontalmente, ambos invertem a direção X
                item.dirX *= -1;
                outro.dirX *= -1;
                
                // Se bateu verticalmente, ambos invertem a direção Y
                item.dirY *= -1;
                outro.dirY *= -1;

                // Um pequeno ajuste rápido para eles não grudarem um no outro ao rebater
                item.x += item.dirX * velocidade;
                item.y += item.dirY * velocidade;
            }
        }

        // Atualiza a posição na tela
        item.element.style.left = item.x + 'px';
        item.element.style.top = item.y + 'px';
    });

    requestAnimationFrame(moverBotoes);
}

// Inicia o movimento quando a página estiver totalmente carregada
window.addEventListener('load', () => {
    itens.forEach(item => {
        item.width = item.element.offsetWidth;
        item.height = item.element.offsetHeight;
    });
    moverBotoes();
});