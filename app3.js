//****************************//
//     Global Variables       //
//****************************//
// const loadingScreen = document.getElementById('loadingScreen');
// const loadingSpan = document.getElementById('loadingSpan');
// const gameScreen = document.getElementById('gameScreen');

const playableSquares = document.querySelectorAll('#container div');

let playerOneX = 1;
let playerOneY = 1;
let playerOneBankedScore = 0;
let playerOneCurrentScore = 0;
let playerTwoX = 10;
let playerTwoY = 10;
let playerTwoBankedScore = 0;
let playerTwoCurrentScore = 0;
// let playerThreeX = 1;
// let playerThreeY = 1;
// let playerThreeBankedScore = 0;
// let playerThreeCurrentScore = 0;
// let playerFourX = 10;
// let playerFourY = 10;
// let playerFourBankedScore;
// let playerFourCurrentScore;
let crateX;
let crateY;
// let speedyBootsX;
// let speedyBootsY;
let potentialNewTile;
const $clock = $('.clock');
const $start = $('.start');
const $reset = $('.reset');
let time = 60.00;
let intervalId;
// const gridSquares = document.querySelectorAll('.playableSquare');
const gridSpace = document.getElementById('container');
let player1MoveInterval;
let player2MoveInterval;
let spawnCrateInterval;

// gameScreen.style.display = 'none';

//****************************//
//          Win Logic         //
//****************************//

//
// function switchScreen() {
//   loadingSpan.addEventListener('click', function() {
//     gameScreen.style.display = '';
//   });
// }
// switchScreen();


window.addEventListener('keydown', handleKeyDownPlayer1, false);
// window.addEventListener('keydown', handleKeyDownPlayer2, false);
// window.addEventListener('keydown', handleKeyDownPlayer3, false);
// window.addEventListener('keydown', handleKeyDownPlayer4, false);

// window.addEventListener("keypress", dealWithKeyboard, false);
// window.addEventListener("keyup", dealWithKeyboard, false);

//****************************//
//          Win Logic         //
//****************************//
function checkForWin() {
  if (playerOneBankedScore > playerTwoBankedScore) {
    alert('Player One wins');
  } else if (playerOneBankedScore < playerTwoBankedScore) {
    alert('Player Two wins');
  } else if (playerOneBankedScore === playerTwoBankedScore) {
    alert('draw');
  }
}

//****************************//
//          Reset Logic       //
//****************************//
console.log('lets', $reset);

$reset.click(function resetGame(){
  $('div').removeClass('playerOne');
  $('div').removeClass('playerTwo');
  $('div').removeClass('playerThree');
  $('div').removeClass('playerFour');
  $('div').removeClass('crate');
  $('div').addClass('empty');
  clearInterval(player1MoveInterval);
  clearInterval(player2MoveInterval);
  clearInterval(spawnCrateInterval);
  clearInterval(intervalId);
  playerOneBankedScore = 0;
  playerTwoBankedScore = 0;
  time = 60;
  $clock.html(time);
});
//****************************//
//     Loading the Grid       //
//****************************//

function loadGrid() {
  for (let rows = 0; rows < 10; rows++) {
    for (let columns = 0; columns < 10; columns++) {
      const emptyTile = document.createElement('div');
      emptyTile.classList.add('playableSquare');
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
  intervalId = setInterval(function () {
    time = time - 1;
    $clock.html(`${time}`);
    if (time === 0) {
      clearInterval(intervalId);
      $('div').removeClass('playerOne');
      $('div').removeClass('playerTwo');
      $('div').removeClass('playerThree');
      $('div').removeClass('playerFour');
      $('div').removeClass('crate');
      $('div').addClass('empty');
      clearInterval(player1MoveInterval);
      clearInterval(player2MoveInterval);
      clearInterval(spawnCrateInterval);
      checkForWin();
    }
  }, 1000);
}
loadGrid();


$start.click(function startGame(){
  setPlayerTwoTimer();
});
//****************************//
//       Spawning Crate       //
//****************************//

function spawnCrate() {
  const playerTiles = document.querySelectorAll('.playableSquare');
  playerTiles.forEach(square => {
    if (square.classList.contains('crate')) {
      square.classList.remove('crate');
    }
  });
  crateX = Math.ceil((Math.random() * 10));
  crateY = Math.ceil((Math.random() * 10));
  const cratePosition = document.querySelector(`div[rowid="${crateY}"][columnid="${crateX}"]`);
  console.log('here is the crate Position:', cratePosition);
  if (cratePosition.classList.contains('playerOne')) {
    cratePosition.classList.remove('playerOne');
  } else if (cratePosition.classList.contains('playerTwo')) {
    cratePosition.classList.remove('playerTwo');
  }
  cratePosition.classList.add('crate');
  console.log('crate is located at:', cratePosition);
}
spawnCrate();

function setCrateSpawnTimer() {
  spawnCrateInterval = setInterval(spawnCrate, 5000);
}
setCrateSpawnTimer();


//****************************//
//   Spawning Speedy Boots    //
//****************************//

// function spawnSpeedyBoots() {
//   crateX = Math.ceil((Math.random() * 10));
//   crateY = Math.ceil((Math.random() * 10));
//   const speedyBootsPosition = document.querySelector(`div[rowid="${speedyBootsY}"][columnid="${speedyBootsX}"]`);
//   speedyBootsPosition.classList.add('crate');
//   console.log(speedyBootsPosition);
// }
// spawnSpeedyBoots();
// function setSpeedyBootsSpawnTimer() {
//   setInterval(spawnSpeedyBoots, 10000);
// }
// setSpeedyBootsSpawnTimer();



//****************************//
// playerOne Movement Logic   //
//****************************//

//      Key Handler Logic     //
let PlayerOneKeydown;
function handleKeyDownPlayer1(event) {
  PlayerOneKeydown = event.key;
}

// Preventative movement logic //
function movePlayerOne() {
  switch(PlayerOneKeydown) {
    case 'ArrowLeft':
      if (playerOneX === 1) {
        break;
      } else {
        playerOneX--;
      }
      break;

    case 'ArrowUp':
      if (playerOneY === 10) {
        break;
      } else {
        playerOneY++;
      }
      break;

    case 'ArrowRight':
      if (playerOneX === 10) {
        break;
      } else {
        playerOneX++;
      }
      break;
    case 'ArrowDown':
      if (playerOneY === 1) {
        break;
      } else {
        playerOneY--;
      }
      break;
  }
  PlayerOneKeydown = null;

  //       Set Score/Class      //
  const playerOnePosition = document.querySelector(`div[rowid="${playerOneY}"][columnid="${playerOneX}"]`);
  playerOnePosition.classList.remove('playerTwo');
  playerOnePosition.classList.remove('playerThree');
  playerOnePosition.classList.remove('playerFour');
  playerOnePosition.classList.add('playerOne');
  playerOneCurrentScore++;

  //    Crate Collision Logic   //
  if (playerOneX === crateX && playerOneY === crateY) {
    const squaresToRemove = document.querySelectorAll('.playerOne');
    squaresToRemove.forEach(square => square.classList.remove('playerOne'));
    playerOnePosition.classList.remove('crate');
    playerOneBankedScore = playerOneBankedScore + playerOneCurrentScore;
    playerOneCurrentScore = 0;
    const $playerOneScore = $('.playerOneScorecard');
    $playerOneScore.html(`${playerOneBankedScore}`);
    playerOnePosition.classList.add('playerOne');
  }
}

//      Set playerOne Timer     //
function setPlayerOneTimer() {
  player1MoveInterval = setInterval(movePlayerOne, 750);
  //clearInterval(player1MoveInterval);
}
setPlayerOneTimer();


//****************************//
// playerTwo Movement Logic   //
//****************************//

function movePlayerTwo() {
  const move = Math.floor((Math.random() * 4));

  // Rudimentary Barrier logic //
  if (playerTwoX === 10) {
    playerTwoX--;
  } else if (playerTwoX === 1) {
    playerTwoX++;
  } else if (playerTwoY === 10) {
    playerTwoY--;
  } else if (playerTwoY === 1) {
    playerTwoY++;

  // Preventative movement logic //
  } else if (move === 0) {
    // console.log('left');
    potentialNewTile = document.querySelector(`div[rowid="${playerTwoY}"][columnid="${playerTwoX - 1}"]`);
    console.log(potentialNewTile);
    if (potentialNewTile.classList.contains('playerTwo')) {
      // console.log('i am moving up');
      playerTwoY++;
    } else {
      playerTwoX--;
    }

  } else if (move === 1) {
    // console.log('up');
    potentialNewTile = document.querySelector(`div[rowid="${playerTwoY + 1}"][columnid="${playerTwoX}"]`);
    if (potentialNewTile.classList.contains('playerTwo')) {
      // console.log('i am moving right');
      playerTwoX++;
    } else {
      playerTwoY++;
    }

  } else if (move === 2) {
    // console.log('right');
    potentialNewTile = document.querySelector(`div[rowid="${playerTwoY}"][columnid="${playerTwoX + 1}"]`);
    if (potentialNewTile.classList.contains('playerTwo')) {
      // console.log('i am moving down');
      playerTwoY--;
    } else {
      playerTwoX++;
    }

  } else if (move === 3) {
    // console.log('down');
    potentialNewTile = document.querySelector(`div[rowid="${playerTwoY - 1}"][columnid="${playerTwoX}"]`);
    if (potentialNewTile.classList.contains('playerTwo')) {
      // console.log('i am moving left');
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
    console.log(playerTwoCurrentScore);
    playerTwoCurrentScore = 0;
    const $playerTwoScore = $('.playerTwoScorecard');
    $playerTwoScore.html(`${playerTwoBankedScore}`);
  }
}


function setPlayerTwoTimer() {
//   if (playerTwo.hasClass('speedyBoots')) {
//     setInterval(movePlayerTwo, 500);
//   } else {
  player2MoveInterval = setInterval(movePlayerTwo, 750);
}

setPlayerTwoTimer();
