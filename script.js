'use strict';

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const imgDice = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
//starting condition
let scores, playerActive, currentScore, playing;
const init = function () {
  scores = [0, 0];
  playerActive = 0;
  currentScore = 0;
  playing = true;

  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  imgDice.style.display = 'none';

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${playerActive}`).textContent = 0;
  playerActive = playerActive === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    imgDice.style.display = 'block';
    console.log((imgDice.src = `dice-${diceNumber}.png`));
    imgDice.src = `dice-${diceNumber}.png`;
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${playerActive}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  scores[playerActive] += currentScore;
  document.getElementById(`score--${playerActive}`).textContent =
    scores[playerActive];
  currentScore = 0;
  document.getElementById(`current--${playerActive}`).textContent = 0;

  if (scores[playerActive] >= 100) {
    //finish the game
    playing = false;
    imgDice.style.display = 'none';
    document
      .querySelector(`.player--${playerActive}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${playerActive}`)
      .classList.remove('player--active');
    console.log(player0, player1);
    //switch player
  } else {
    switchPlayer();
  }
});

document.querySelector('.btn--new').addEventListener('click', init);
