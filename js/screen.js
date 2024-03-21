function screen(playerLives) {
    const lives = document.getElementById('lives');
    lives.innerText = `Vies: ${playerLives}`;
}

export {screen};