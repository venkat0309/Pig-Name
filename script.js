'use strict';

//Selecting Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const dice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newgame = document.querySelector('.btn--new');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

let scores, currentscore, activePlayer, playing;
const init = () => {
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};
init();

diceEl.classList.add('hidden');
score0EL.textContent = 0;
score1EL.textContent = 0;

const switchplayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentscore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

dice.addEventListener('click', () => {
  if (playing) {
    //1.Generationg a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2.displaying the dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.check for rolled 1
    if (dice !== 1) {
      //Adding score to currentscore
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
      //
    } else {
      //Switching o next player
      switchplayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player's score
    //   console.log('On hold');
    scores[activePlayer] += currentscore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if the player's score is >=100
    //finish the game
    if (scores[activePlayer] >= 20) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //3.switch ot the next player
    else {
      switchplayer();
    }
  }
});

newgame.addEventListener('click', init);
