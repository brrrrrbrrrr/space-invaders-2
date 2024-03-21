import { GameEngine } from './GameEngine.js';
const button = document.getElementById('startBtn');
const audio = document.getElementById('audio');

const game = new GameEngine();
button.onclick = () => {
  if (button.textContent === 'Niveau suivant') {
    document.getElementById('menu').style = 'display: none';
    game.init();
  } else {
    console.log('button innerText = ', button.textContent);
    document.getElementById('menu').style = 'display: none';
    game.run();
    audio.play();
  }
};
