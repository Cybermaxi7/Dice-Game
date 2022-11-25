"use strict";
//Selecting elements
const score__0El = document.getElementById("score__0");
const score__1El = document.getElementById("score__1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn__new");
const btnRoll = document.querySelector(".btn__roll");
const btnHold = document.querySelector(".btn__hold");
const current__0El = document.getElementById("current__0");
const current__1El = document.getElementById("current__1");
const player0El = document.querySelector(".player__0");
const player1El = document.querySelector(".player__1");
const player = document.querySelectorAll(".name");
const submitBtn = document.querySelector(".submitBtn");
const overlay = document.querySelector(".overlay");
const instructions = document.querySelector(".instructions");

let name1;
let name2;
console.log(name1, name2);

console.log(player);
//Starting Conditions
let players = [];
let playerName;
let scores, currentScore, activePlayer, playing;

submitBtn.addEventListener("click", () => {
  name1 = document.querySelector(".input1").value;
  name2 = document.querySelector(".input2").value;
  if (name1 && name2) {
    players = [name1, name2];
    player[0].textContent = players[0];
    player[1].textContent = players[1];
    overlay.classList.toggle("hidden");
    instructions.classList.toggle("hidden");
  } else {
    alert("please enter the both players names");
  }
});

//initialization
const init = () => {
  //Getting names of players
  // players = [];
  // for (let i = 0; i < player.length; i++) {
  //   // playerName = prompt(`Player ${i + 1}: What's your name?...`);
  //   players.push(name1);
  // }
  // console.log(players);

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score__0El.textContent = 0;
  score__1El.textContent = 0;
  current__0El.textContent = 0;
  current__1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player__winner");
  player1El.classList.remove("player__winner");
  player0El.classList.add("player__active");
  player1El.classList.remove("player__active");
  overlay.classList.remove("hidden");
  instructions.classList.remove("hidden");
};
init();

const switchPlayer = () => {
  player0El.classList.toggle("player__active");
  player1El.classList.toggle("player__active");
  document.getElementById(`current__${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};
//Adding Winner styles

//Rolling the dice functionality
btnRoll.addEventListener("click", () => {
  if (playing) {
    //Generating a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //Displaying the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `../img/dice-${dice}.png`;
    //Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current__${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", () => {
  if (playing) {
    //Add current score to players score and display it
    scores[activePlayer] += currentScore;
    document.getElementById(`score__${activePlayer}`).textContent =
      scores[activePlayer];
    //Check if player's score > 100, then finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player__${activePlayer}`)
        .classList.add("player__winner");
      document
        .querySelector(`.player__${activePlayer}`)
        .classList.remove("player__active");
      diceEl.classList.add("hidden");
      player[activePlayer].textContent = `${players[activePlayer]} wins 🏆️🎊`;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
