'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0'); // . is for class
const player1El = document.querySelector('.player--1'); //
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0'); // # is for id
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const overlay = document.querySelector('.overlay');
const winMessage = document.querySelector('.win-message');

let scores, currentScore, activePlayer, playing; // global variables

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; // state variable

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  overlay.setAttribute('id', 'hidden');
};
init();

const SwitchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); // toggle adds class if it's not there, and removes it if it is
  player1El.classList.toggle('player--active');
};

const displayWinMessage = function (player) {
  winMessage.textContent = `Player ${player + 1} wins!`;
  overlay.removeAttribute('id');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing === true) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      SwitchPlayer();
    }
  }
});

// Holding score functionality
btnHold.addEventListener('click', function () {
  if (playing === true) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      displayWinMessage(activePlayer);
      // Finish the game
      playing = false;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      SwitchPlayer();
    }
  }
});

// Resetting the game
btnNew.addEventListener('click', function () {
  console.log('New game button clicked');
  overlay.setAttribute('id', 'hidden'); // Hide the overlay
  init(); // Reset the game
});

overlay.addEventListener('click', function () {
  overlay.setAttribute('id', 'hidden'); // Hide the overlay
  init();
});
