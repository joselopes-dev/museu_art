let currentPhase = 1;
let maxPhases = 5; // Agora temos 5 fases
let playerPositionLeft = 50;
const player = document.getElementById('player');
const gameWonMessage = document.getElementById('gameWonMessage');
const restartButton = document.getElementById('restartButton');
let gameWidth = window.innerWidth;
let playerWidth = 50;
let moveInterval = null; // Variável para armazenar o intervalo de movimento

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', stopMovement);

// Suporte para dispositivos com toque
document.getElementById('leftButton').addEventListener('mousedown', startMovingLeft);
document.getElementById('leftButton').addEventListener('mouseup', stopMovement);
document.getElementById('leftButton').addEventListener('touchstart', startMovingLeft);  // Suporte para toque
document.getElementById('leftButton').addEventListener('touchend', stopMovement);       // Suporte para toque

document.getElementById('rightButton').addEventListener('mousedown', startMovingRight);
document.getElementById('rightButton').addEventListener('mouseup', stopMovement);
document.getElementById('rightButton').addEventListener('touchstart', startMovingRight); // Suporte para toque
document.getElementById('rightButton').addEventListener('touchend', stopMovement);       // Suporte para toque

// Função para lidar com o pressionamento das teclas
function handleKeyDown(event) {
    if (event.key === "ArrowRight" || event.key === "d") {
        startMoving("right");
    } else if (event.key === "ArrowLeft" || event.key === "a") {
        startMoving("left");
    }
}

// Função para iniciar o movimento
function startMoving(direction) {
    // Impede que mais de um intervalo de movimento seja criado
    if (moveInterval) return;

    moveInterval = setInterval(() => {
        if (direction === "right") {
            moveRight();
        } else if (direction === "left") {
            moveLeft();
        }
    }, 50); // Move o jogador a cada 50ms enquanto a tecla estiver pressionada
}

// Funções para iniciar o movimento ao clicar ou tocar nos botões
function startMovingLeft() {
    startMoving("left");
}

function startMovingRight() {
    startMoving("right");
}

// Função para parar o movimento
function stopMovement() {
    clearInterval(moveInterval);
    moveInterval = null; // Reseta o intervalo para permitir novos movimentos
}

// Função para mover o jogador para a direita
function moveRight() {
    if (playerPositionLeft + playerWidth < gameWidth) {
        playerPositionLeft += 0.5;
        player.style.left = playerPositionLeft + 'px';
    }
    checkPhaseProgress();
}

// Função para mover o jogador para a esquerda
function moveLeft() {
    if (playerPositionLeft > 0) {
        playerPositionLeft -= 0.5;
        player.style.left = playerPositionLeft + 'px';
    }
}

// Verifica o progresso da fase
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
    document.getElementById(`fase${currentPhase}`).style.display = 'grid';
}

// Mostra a mensagem de vitória
function showGameWonMessage() {
    gameWonMessage.style.display = 'block';
    restartButton.style.display = 'block'; // Exibir o botão de reiniciar
    launchConfetti(); // Lançar confetes
}

// Função para lançar confetes
function launchConfetti() {
    let duration = 5 * 100;
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

// Atualiza a largura do jogo quando a janela é redimensionada
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
