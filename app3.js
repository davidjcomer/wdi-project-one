let playerOneX = 1;
let playerOneY = 1;
let playerOneBankedScore = 0;
let playerOneCurrentScore = 0;
let playerTwoX = 10;
let playerTwoY = 10;
let playerTwoBankedScore;
let playerTwoCurrentScore;
// let playerThreeX = 1;
// let playerThreeY = 10;
// let playerFourX = 10;
// let playerFourY = 1;
let crateX;
let crateY;
// let speedyBootsX;
// let speedyBootsY;
const $currentDisplayTime = $('.currentDisplayTime');
const $start = $('.start');
const $reset = $('.reset');
let time = 5;
let intervalId;

const gridSpace = document.getElementById('container');

window.addEventListener('keydown', movePlayerOne, false);
window.addEventListener('keydown', movePlayerTwo, false);

// window.addEventListener("keypress", dealWithKeyboard, false);
// window.addEventListener("keyup", dealWithKeyboard, false);

function loadGrid() {
  for (let rows = 0; rows < 10; rows++) {
    for (let columns = 0; columns < 10; columns++) {
      const emptyTile = document.createElement('div');
      emptyTile.classList.add('empty');
      if (columns === (playerOneX - 1) && rows === (playerOneY - 1)) {
        emptyTile.classList.add('playerOne');
        // scoreboard.classList.add('playerOneActive')
      }
      if (columns === (playerTwoX - 1) && rows === (playerTwoY - 1)) {
        emptyTile.classList.add('playerTwo');
      }
      // if (columns === (playerThreeX - 1) && rows === (playerThreeY - 1)) {
      //   emptyTile.classList.add('playerThree');
      // }
      // if (columns === (playerFourX - 1) && rows === (playerFourY - 1)) {
      //   emptyTile.classList.add('playerFour');
      // }
      gridSpace.appendChild(emptyTile);
      emptyTile.setAttribute('rowid', rows + 1);
      emptyTile.setAttribute('columnid', columns + 1);
    }
  }
}
loadGrid();

function spawnCrate() {
  crateX = Math.ceil((Math.random() * 10));
  crateY = Math.ceil((Math.random() * 10));
  const cratePosition = document.querySelector(`div[rowid="${crateY}"][columnid="${crateX}"]`);
  cratePosition.classList.add('crate');
  console.log(cratePosition);
}
spawnCrate();


// playerOne Movement
function movePlayerOne(e) {
  switch(e.keyCode) {
    case 37:
      if (playerOneX === 1) {
        break;
      } else {
        playerOneX--;
      }
      break;

    case 38:
      if (playerOneY === 10) {
        break;
      } else {
        playerOneY++;
      }
      break;

    case 39:
      if (playerOneX === 10) {
        break;
      } else {
        playerOneX++;
      }
      break;
    case 40:
      playerOneY--;
      break;
  }

  const playerOnePosition = document.querySelector(`div[rowid="${playerOneY}"][columnid="${playerOneX}"]`);
  playerOnePosition.classList.remove('playerTwo');
  playerOnePosition.classList.remove('playerThree');
  playerOnePosition.classList.remove('playerFour');
  playerOnePosition.classList.add('playerOne');
  playerOneCurrentScore++;


  if (playerOneX === crateX && playerOneY === crateY) {
    const squaresToRemove = document.querySelectorAll('.playerOne');
    squaresToRemove.forEach(square => square.classList.remove('playerOne'));

    playerOnePosition.classList.remove('crate');
    gridSpace.classList.remove('playerOne'); //ALL DIVS
    playerOnePosition.classList.add('playerOne');
    playerOneBankedScore = playerOneBankedScore + playerOneCurrentScore;
    playerOneCurrentScore = 0;
    const $playerOneScore = $('.playerOneScorecard');
    $playerOneScore.html(`${playerOneBankedScore}`);
    spawnCrate();
  }
}
// function setPlayerOneTimer() {
//   setInterval(movePlayerOne, 1000);
// }
// setPlayerOneTimer();


// playerTwo Movement
let potentialNewTile;

function movePlayerTwo() {
  const move = Math.floor((Math.random() * 4));

  if (playerTwoX === 10) {
    playerTwoX--;
  } else if (playerTwoX === 1) {
    playerTwoX++;
  } else if (playerTwoY === 10) {
    playerTwoY--;
  } else if (playerTwoY === 1) {
    playerTwoY++;


    //prevent playerTwo from moving into squares already coloured with playerTwo
  } else if (move === 0) {
    console.log('left');
    potentialNewTile = document.querySelector(`div[rowid="${playerTwoY}"][columnid="${playerTwoX - 1}"]`);
    console.log(potentialNewTile);
    if (potentialNewTile.classList.contains('playerTwo')) {
      console.log('i am moving up');
      playerTwoY++;
    } else {
      playerTwoX--;
    }

  } else if (move === 1) {
    console.log('up');
    potentialNewTile = document.querySelector(`div[rowid="${playerTwoY + 1}"][columnid="${playerTwoX}"]`);
    if (potentialNewTile.classList.contains('playerTwo')) {
      console.log('i am moving right');
      playerTwoX++;
    } else {
      playerTwoY++;
    }

  } else if (move === 2) {
    console.log('right');
    potentialNewTile = document.querySelector(`div[rowid="${playerTwoY}"][columnid="${playerTwoX + 1}"]`);
    if (potentialNewTile.classList.contains('playerTwo')) {
      console.log('i am moving down');
      playerTwoY--;
    } else {
      playerTwoX++;
    }

  } else if (move === 3) {
    console.log('down');
    potentialNewTile = document.querySelector(`div[rowid="${playerTwoY - 1}"][columnid="${playerTwoX}"]`);
    if (potentialNewTile.classList.contains('playerTwo')) {
      console.log('i am moving left');
      playerTwoX--;
    }
  } else {
    playerTwoY--;
  }
  const playerTwoPosition = document.querySelector(`div[rowid="${playerTwoY}"][columnid="${playerTwoX}"]`);
  playerTwoPosition.classList.remove('playerOne');
  playerTwoPosition.classList.remove('playerThree');
  playerTwoPosition.classList.remove('playerFour');
  playerTwoPosition.classList.add('playerTwo');
  playerTwoCurrentScore++;

  if (playerTwoX === crateX && playerTwoY === crateY) {
    const squaresToRemove = document.querySelectorAll('.playerTwo');
    squaresToRemove.forEach(square => square.classList.remove('playerTwo'));
    playerTwoPosition.classList.remove('crate');
    playerTwoPosition.classList.add('playerTwo');
    playerTwoBankedScore = playerTwoBankedScore + playerTwoCurrentScore;
    playerTwoCurrentScore = 0;
    const $playerTwoScore = $('.playerTwoScorecard');
    $playerTwoScore.html(`${playerTwoBankedScore}`);
    spawnCrate();
  }
}

function setPlayerTwoTimer() {
//   if (playerTwo.hasClass('speedyBoots')) {
//     setInterval(movePlayerTwo, 500);
//   } else {
  setInterval(movePlayerTwo, 1000);
}

setPlayerTwoTimer();
