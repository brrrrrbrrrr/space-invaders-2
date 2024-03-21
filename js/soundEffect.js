const soundArray = [
  {
    id: 1,
    name: 'shoot',
    src: '../assets/sounds/laser-shoot.mp3',
  },
  {
    id: 2,
    name: 'hit',
    src: '../assets/sounds/collision.mp3',
  },
  {
    id: 3,
    name: 'dead',
    src: '../assets/sounds/wilhelm.mp3',
  },
  {
    id: 4,
    name: 'invadersHit',
    src: '../assets/sounds/invaders-explosion.wav',
  },
  {
    id: 5,
    name: 'ambiance',
    src: '../assets/sounds/ambiance.mp3',
  },
];

const generateSound = (name, src) => {
  return (name = new Audio(src).play());
};

export { generateSound, soundArray };
