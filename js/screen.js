function screen(playerLives, invadersObj, currentLevel, currentBonus) {
  // Display lives in bottom container screen
  const lives = document.getElementById('lives');
  lives.innerText = `Vies : ${playerLives}`;

  // Display count of invaders to kill in bottom container screen
  const toKill = document.getElementById('toKill');
  toKill.innerText = `À tuer : ${invadersObj.length}`;

  // TODO: Display level count in bottom container screen
  const level = document.getElementById('level');
  level.innerText = `Niveau : ${currentLevel}`;

  const bonus = document.getElementById('bonus');
  bonus.innerText = `Bonus : ${currentBonus}`;
}

export { screen };
