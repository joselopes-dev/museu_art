let currentPhase = 1;
let maxPhases = 5;
let playerPositionLeft = 50;
const player = document.getElementById('player');
const gameWonMessage = document.getElementById('gameWonMessage');
const restartButton = document.getElementById('restartButton');
let gameWidth = window.innerWidth;
let playerWidth = 50;
let moveInterval = null; // Variável para armazenar o intervalo de movimento

// Adicionando eventos de pressionar e soltar para os botões de mover
document.getElementById('leftButton').addEventListener('mousedown', startMoveLeft);
document.getElementById('leftButton').addEventListener('mouseup', stopMoving);
document.getElementById('leftButton').addEventListener('mouseleave', stopMoving);

document.getElementById('rightButton').addEventListener('mousedown', startMoveRight);
document.getElementById('rightButton').addEventListener('mouseup', stopMoving);
document.getElementById('rightButton').addEventListener('mouseleave', stopMoving);

// Função para iniciar o movimento para a direita
function startMoveRight() {
    if (moveInterval) return; // Evita múltiplos intervalos simultâneos
    moveInterval = setInterval(moveRight, 50); // Move a cada 50ms
}

// Função para iniciar o movimento para a esquerda
function startMoveLeft() {
    if (moveInterval) return;
    moveInterval = setInterval(moveLeft, 50); // Move a cada 50ms
}

// Função para parar o movimento
function stopMoving() {
    clearInterval(moveInterval);
    moveInterval = null; // Reseta a variável para permitir novo movimento
}

// Função de mover para a direita
function moveRight() {
    if (playerPositionLeft + playerWidth < gameWidth) {
        playerPositionLeft += 10;
        player.style.left = playerPositionLeft + 'px';
    }
    checkPhaseProgress();
}

// Função de mover para a esquerda
function moveLeft() {
    if (playerPositionLeft > 0) {
        playerPositionLeft -= 10;
        player.style.left = playerPositionLeft + 'px';
    }
}

// Função para verificar progresso da fase
function checkPhaseProgress() {
    if (playerPositionLeft + playerWidth >= gameWidth && currentPhase < maxPhases) {
        advanceToNextPhase();
    } else if (playerPositionLeft + playerWidth >= gameWidth && currentPhase === maxPhases) {
        showGameWonMessage();
    }
}

// Função para avançar para a próxima fase
function advanceToNextPhase() {
    currentPhase++;
    playerPositionLeft = 50; // Resetar a posição do jogador
    player.style.left = playerPositionLeft + 'px';

    // Ocultar a fase anterior e exibir a próxima
    document.getElementById(`fase${currentPhase - 1}`).style.display = 'none';
    document.getElementById(`fase${currentPhase}`).style.display = 'grid'; // Certifique-se de que o próximo "display" seja "grid"
}

// Função para mostrar mensagem de vitória
function showGameWonMessage() {
    gameWonMessage.style.display = 'block';
    restartButton.style.display = 'block'; // Exibir o botão de reiniciar
    launchConfetti(); // Lançar confetes
}

// Função para lançar confetes
function launchConfetti() {
    let duration = 5 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    let interval = setInterval(() => {
        let timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval);
        }

        let particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Função para atualizar a largura do jogo
function updateGameWidth() {
    gameWidth = window.innerWidth;
    playerWidth = player.offsetWidth;
}

window.addEventListener('resize', updateGameWidth);
updateGameWidth();

// Função para reiniciar o jogo
restartButton.addEventListener('click', function() {
    window.location.reload();
});
