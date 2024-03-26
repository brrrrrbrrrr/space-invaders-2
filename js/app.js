import { GameEngine } from './GameEngine.js';
const button = document.getElementById('startBtn');
const audio = document.getElementById('audio');

const game = new GameEngine();
button.onclick = () => {
  if (game.player !== null) {
    document.getElementById('menu').style = 'display: none';
    game.init();
  } else {
    document.getElementById('menu').style = 'display: none';
    game.run();
    audio.play();
  }
};
