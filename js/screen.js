function screen(playerLives, invadersObj) {
    // Display lives in bottom container screen
    const lives = document.getElementById('lives');
    lives.innerText = `Vies: ${playerLives}`;

    // Display count of killed invaders in bottom container screen
    const toKill = document.getElementById('toKill');
    toKill.innerText = `À tuer: ${invadersObj.length}`;
}

export {screen};