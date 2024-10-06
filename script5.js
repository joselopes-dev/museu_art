let currentPhase = 1;
let maxPhases = 5;
let playerPositionLeft = 50;
const player = document.getElementById('player');
const gameWonMessage = document.getElementById('gameWonMessage');
const restartButton = document.getElementById('restartButton');
let gameWidth = window.innerWidth;
let playerWidth = 50;
let moveInterval;

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', stopMovement);

function handleKeyDown(event) {
    if (event.key === "ArrowRight" || event.key === "d") {
        startMoving("right");
    } else if (event.key === "ArrowLeft" || event.key === "a") {
        startMoving("left");
    }
}

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

function stopMovement() {
    clearInterval(moveInterval);
    moveInterval = null; // Reseta o intervalo para permitir novos movimentos
}

function moveRight() {
    if (playerPositionLeft + playerWidth < gameWidth) {
        playerPositionLeft += 10;
        player.style.left = playerPositionLeft + 'px';
    }
    checkPhaseProgress();
}

function moveLeft() {
    if (playerPositionLeft > 0) {
        playerPositionLeft -= 10;
        player.style.left = playerPositionLeft + 'px';
    }
}

function checkPhaseProgress() {
    if (playerPositionLeft + playerWidth >= gameWidth && currentPhase < maxPhases) {
        advanceToNextPhase();
    } else if (playerPositionLeft + playerWidth >= gameWidth && currentPhase === maxPhases) {
        showGameWonMessage();
    }
}

function advanceToNextPhase() {
    currentPhase++;
    playerPositionLeft = 50;
    player.style.left = playerPositionLeft + 'px';
    
    // Ocultar a fase anterior e exibir a próxima
    document.getElementById(`fase${currentPhase - 1}`).style.display = 'none';
    document.getElementById(`fase${currentPhase}`).style.display = 'grid'; // Certifique-se de que o próximo "display" seja "grid"
}

function showGameWonMessage() {
    gameWonMessage.style.display = 'block';
    restartButton.style.display = 'block'; // Exibir o botão de reiniciar
    launchConfetti(); // Lançar confetes
}

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
