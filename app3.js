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
let playerThreeX = 1;
let playerThreeY = 10;
let playerThreeBankedScore = 0;
let playerThreeCurrentScore = 0;
let playerFourX = 10;
let playerFourY = 1;
let playerFourBankedScore = 0;
let playerFourCurrentScore = 0;
let crateX;
let crateY;
// let speedyBootsX;
// let speedyBootsY;
const $clock = $('.clock');
const $start = $('.start');
const $reset = $('.reset');
let time = 60.00;
let intervalId;

const gridSpace = document.getElementById('container');
let playerOneMoveInterval;
let playerTwoMoveInterval;
let playerThreeMoveInterval;
let playerFourMoveInterval;
let spawnCrateInterval;

// const noLeftMove = [Y++, X++, Y--];
// const noUpMove = [X--, X++, Y--];
// const noRightMove = ['X--', 'Y++', 'Y--'];
// const noDownMove = [X--, Y++, X++];
// const leftUpMoves = [X--, Y++];
// const UpRightMoves= [Y++, X++];
// const RightDownMoves = [X++, Y--];
// const DownLeftMoves = [Y--, X--];
// const LeftRightMoves = [X--, X++];
// const UpDownMoves = [Y++,Y--];

//****************************//
//          Game Menu         //
//****************************//
// gameScreen.style.display = 'none';
//
// function switchScreen() {
//   loadingSpan.addEventListener('click', function() {
//     gameScreen.style.display = '';
//   });
// }
// switchScreen();

window.addEventListener('keydown', handleKeyDownPlayer1, false);

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
      if (columns === (playerThreeX - 1) && rows === (playerThreeY - 1)) {
        emptyTile.classList.add('playerThree');
      }
      if (columns === (playerFourX - 1) && rows === (playerFourY - 1)) {
        emptyTile.classList.add('playerFour');
      }
      gridSpace.appendChild(emptyTile);
      emptyTile.setAttribute('rowid', rows + 1);
      emptyTile.setAttribute('columnid', columns + 1);
    }
  }
}
loadGrid();
const playerTiles = document.querySelectorAll('.playableSquare');

//****************************//
//          Reset Logic       //
//****************************//
const playerOnePosition = document.querySelector(`div[rowid="${playerOneY}"][columnid="${playerOneX}"]`);
const playerTwoPosition = document.querySelector(`div[rowid="${playerTwoY}"][columnid="${playerTwoX}"]`);
const playerThreePosition = document.querySelector(`div[rowid="${playerThreeY}"][columnid="${playerThreeX}"]`);
const playerFourPosition = document.querySelector(`div[rowid="${playerFourY}"][columnid="${playerFourX}"]`);

$reset.click(function resetGame(){
  $('div').removeClass('playerOne');
  $('div').removeClass('playerTwo');
  $('div').removeClass('playerThree');
  $('div').removeClass('playerFour');
  $('div').removeClass('crate');
  $('div').addClass('empty');
  clearInterval(playerOneMoveInterval);
  clearInterval(playerTwoMoveInterval);
  clearInterval(playerThreeMoveInterval);
  clearInterval(playerFourMoveInterval);
  clearInterval(spawnCrateInterval);
  clearInterval(intervalId);
  playerOneBankedScore = 0;
  playerTwoBankedScore = 0;
  playerThreeBankedScore = 0;
  playerFourBankedScore = 0;
  time = 60;
  $clock.html(time);
  playerOneX = 1;
  playerOneY = 1;
  playerOnePosition.classList.add('playerOneCurrent');
  playerTwoX = 10;
  playerTwoY = 10;
  playerTwoPosition.classList.add('playerTwoCurrent');
  playerThreeX = 1;
  playerThreeY = 10;
  playerThreePosition.classList.add('playerThreeCurrent');
  playerFourX = 10;
  playerFourY = 1;
  playerFourPosition.classList.add('playerFourCurrent');
});

//****************************//
//     Starting the Game      //
//****************************//
$start.click(function startGame(){
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
      clearInterval(playerOneMoveInterval);
      clearInterval(playerTwoMoveInterval);
      clearInterval(playerThreeMoveInterval);
      clearInterval(playerFourMoveInterval);
      clearInterval(spawnCrateInterval);
      checkForWin();
    }
  }, 1000);
  setPlayerTwoTimer();
  setPlayerThreeTimer();
  setPlayerFourTimer();
  setCrateSpawnTimer();
});

//****************************//
//       Spawning Crate       //
//****************************//

function spawnCrate() {
  playerTiles.forEach(square => {
    if (square.classList.contains('crate')) {
      square.classList.remove('crate');
    }
  });
  crateX = Math.ceil((Math.random() * 10));
  crateY = Math.ceil((Math.random() * 10));
  const cratePosition = document.querySelector(`div[rowid="${crateY}"][columnid="${crateX}"]`);
  if (cratePosition.classList.contains('playerOne')) {
    cratePosition.classList.remove('playerOne');
  } else if (cratePosition.classList.contains('playerTwo')) {
    cratePosition.classList.remove('playerTwo');
  }
  cratePosition.classList.add('crate');
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
// const playerOnePosition = document.querySelector(`div[rowid="${playerOneY}"][columnid="${playerOneX}"]`);

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
  console.log(playerTiles);
  playerTiles.forEach(playableSquare => {
    console.log('i am playable: ', playableSquare);
    if (playableSquare.classList.contains('playerOneCurrent')) {
      playableSquare.classList.remove('playerOneCurrent');
    }
  });

  playerOnePosition.classList.add('playerOneCurrent');
  playerOnePosition.classList.add('playerOne');
  playerOnePosition.classList.remove('playerTwo');
  playerOnePosition.classList.remove('playerThree');
  playerOnePosition.classList.remove('playerFour');
  playerOnePosition.classList.remove('empty');
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
  playerOneMoveInterval = setInterval(movePlayerOne, 750);
  //clearInterval(playerOneMoveInterval);
}
setPlayerOneTimer();


//****************************//
// playerTwo Movement Logic   //
//****************************//

function movePlayerTwo() {
  const potentialNewTileLeft = document.querySelector(`div[rowid="${playerTwoY}"][columnid="${playerTwoX - 1}"]`);
  const potentialNewTileUp = document.querySelector(`div[rowid="${playerTwoY + 1}"][columnid="${playerTwoX}"]`);
  const potentialNewTileRight = document.querySelector(`div[rowid="${playerTwoY}"][columnid="${playerTwoX + 1}"]`);
  const potentialNewTileDown = document.querySelector(`div[rowid="${playerTwoY - 1}"][columnid="${playerTwoX}"]`);
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


    //***WHAT HAVE I DONE:
    //the computer is encouraged to occupy squares with the class empty and player One
    //then we say, if the squares immeditately to the left, right, and upside of you are coloured playerTwo, go down. etc. etc.
    // Preventative movement logic //

    //if all 4 have class player 1 or empty, generate randomly from fullMoveset Array
    //if L/U/R have class player 1 or empty, but Down has class player two, generate from noDownMove Array
    //if U/R/D have class player 1 or empty, but Left has class player two, generate from noLeftMove Array
    //if R/D/L have class player 1 or empty, but Up has class playerTwo, genenrate from noUpMove Array
    //if D/L/U have class player 1 or empty, but Right has class playerTwo, genenrate from noRightMove Array
    //if L/U have class player 1 or empty, but R/D has class playerTwo, genenrate from L/U Array
    //if U/R have class player 1 or empty, but D/L has class playerTwo, genenrate from U/R Array
    //if R/D have class player 1 or empty, but L/U has class playerTwo, genenrate from R/D Array
    //if D/L have class player 1 or empty, but U/R has class playerTwo, genenrate from U/R Array
    //if L/R have class player 1 or empty, but U/D has class playerTwo, genenrate from l/R Array
    //if U/D have class player 1 or empty, but L/R has class playerTwo, genenrate from U/D Array


  // if ((PNTL contains pO || e) && (PNTU contains pO || e)
  } else if ((potentialNewTileLeft.classList.contains('playerOne') || potentialNewTileLeft.classList.contains('empty')) && playerTwoX > 1) {
    // console.log('i am moving to', potentialNewTileLeft, 'any my column id is', potentialNewTileLeft.columnid);
    playerTwoX--;
  } else if (playerTwoX === 1) {
    playerTwoX++;
  } else if (potentialNewTileUp.classList.contains('playerOne') || potentialNewTileUp.classList.contains('empty')) {
    playerTwoY++;
  } else if (potentialNewTileRight.classList.contains('playerOne') || potentialNewTileRight.classList.contains('empty')) {
    playerTwoX++;
  } else if (potentialNewTileDown.classList.contains('playerOne') || potentialNewTileDown.classList.contains('empty')) {
    playerTwoY--;
  } else if (potentialNewTileLeft.classList.contains('playerTwo') && potentialNewTileUp.classList.contains('playerTwo') && potentialNewTileRight.classList.contains('playerTwo')) {
    playerTwoY--;
  } else if (potentialNewTileLeft.classList.contains('playerTwo') && potentialNewTileUp.classList.contains('playerTwo') && potentialNewTileDown.classList.contains('playerTwo')) {
    playerTwoX++;
  } else if (potentialNewTileLeft.classList.contains('playerTwo') && potentialNewTileRight.classList.contains('playerTwo') && potentialNewTileDown.classList.contains('playerTwo')) {
    playerTwoY++;
  } else if (potentialNewTileUp.classList.contains('playerTwo') && potentialNewTileRight.classList.contains('playerTwo') && potentialNewTileDown.classList.contains('playerTwo')) {
    playerTwoX--;
  } else if (move === 0 && playerTwoX !== 1) {
    playerTwoX--;
  } else if (move === 1 && playerTwoY !== 10) {
    playerTwoY++;
  } else if (move === 2 && playerTwoY !== 1) {
    playerTwoY--;
  } else if (move === 3 && playerTwoX !== 10){
    playerTwoX++;
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
  }
}

function setPlayerTwoTimer() {
//   if (playerTwo.hasClass('speedyBoots')) {
//     setInterval(movePlayerTwo, 500);
//   } else {
  playerTwoMoveInterval = setInterval(movePlayerTwo, 750);
}

setPlayerTwoTimer();


//****************************//
// playerThree Movement Logic   //
//****************************//



function moveplayerThree() {
  const move = Math.floor((Math.random() * 4));

  // Rudimentary Barrier logic //
  if (playerThreeX === 10) {
    playerThreeX--;
  } else if (playerThreeX === 1) {
    playerThreeX++;
  } else if (playerThreeY === 10) {
    playerThreeY--;
  } else if (playerThreeY === 1) {
    playerThreeY++;

  // Preventative movement logic //
  } else if (move === 0) {
    // console.log('left');
    const potentialNewTile = document.querySelector(`div[rowid="${playerThreeY}"][columnid="${playerThreeX - 1}"]`);
    // console.log(potentialNewTile);
    if (potentialNewTile.classList.contains('playerThree')) {
      // console.log('i am moving up');
      playerThreeY++;
    } else {
      playerThreeX--;
    }

  } else if (move === 1) {
    // console.log('up');
    const potentialNewTile = document.querySelector(`div[rowid="${playerThreeY + 1}"][columnid="${playerThreeX}"]`);
    if (potentialNewTile.classList.contains('playerThree')) {
      // console.log('i am moving right');
      playerThreeX++;
    } else {
      playerThreeY++;
    }

  } else if (move === 2) {
    // console.log('right');
    const potentialNewTile = document.querySelector(`div[rowid="${playerThreeY}"][columnid="${playerThreeX + 1}"]`);
    if (potentialNewTile.classList.contains('playerThree')) {
      // console.log('i am moving down');
      playerThreeY--;
    } else {
      playerThreeX++;
    }

  } else if (move === 3) {
    // console.log('down');
    const potentialNewTile = document.querySelector(`div[rowid="${playerThreeY - 1}"][columnid="${playerThreeX}"]`);
    if (potentialNewTile.classList.contains('playerThree')) {
      // console.log('i am moving left');
      playerThreeX--;
    }
  } else {
    playerThreeY--;
  }
  const playerThreePosition = document.querySelector(`div[rowid="${playerThreeY}"][columnid="${playerThreeX}"]`);
  playerThreePosition.classList.remove('playerOne');
  playerThreePosition.classList.remove('playerThree');
  playerThreePosition.classList.remove('playerFour');
  playerThreePosition.classList.add('playerThree');
  playerThreeCurrentScore++;

  if (playerThreeX === crateX && playerThreeY === crateY) {
    const squaresToRemove = document.querySelectorAll('.playerThree');
    squaresToRemove.forEach(square => square.classList.remove('playerThree'));
    playerThreePosition.classList.remove('crate');
    playerThreePosition.classList.add('playerThree');
    playerThreeBankedScore = playerThreeBankedScore + playerThreeCurrentScore;
    console.log(playerThreeCurrentScore);
    playerThreeCurrentScore = 0;
    const $playerThreeScore = $('.playerThreeScorecard');
    $playerThreeScore.html(`${playerThreeBankedScore}`);
  }
}


function setPlayerThreeTimer() {
//   if (playerThree.hasClass('speedyBoots')) {
//     setInterval(moveplayerThree, 500);
//   } else {
  playerThreeMoveInterval = setInterval(moveplayerThree, 750);
}

setPlayerThreeTimer();


//****************************//
// playerFour Movement Logic   //
//****************************//



function moveplayerFour() {
  const move = Math.floor((Math.random() * 4));

  // Rudimentary Barrier logic //
  if (playerFourX === 10) {
    playerFourX--;
  } else if (playerFourX === 1) {
    playerFourX++;
  } else if (playerFourY === 10) {
    playerFourY--;
  } else if (playerFourY === 1) {
    playerFourY++;

  // Preventative movement logic //
  } else if (move === 0) {
    // console.log('left');
    const potentialNewTile = document.querySelector(`div[rowid="${playerFourY}"][columnid="${playerFourX - 1}"]`);
    // console.log(potentialNewTile);
    if (potentialNewTile.classList.contains('playerFour')) {
      // console.log('i am moving up');
      playerFourY++;
    } else {
      playerFourX--;
    }

  } else if (move === 1) {
    // console.log('up');
    const potentialNewTile = document.querySelector(`div[rowid="${playerFourY + 1}"][columnid="${playerFourX}"]`);
    if (potentialNewTile.classList.contains('playerFour')) {
      // console.log('i am moving right');
      playerFourX++;
    } else {
      playerFourY++;
    }

  } else if (move === 2) {
    // console.log('right');
    const potentialNewTile = document.querySelector(`div[rowid="${playerFourY}"][columnid="${playerFourX + 1}"]`);
    if (potentialNewTile.classList.contains('playerFour')) {
      // console.log('i am moving down');
      playerFourY--;
    } else {
      playerFourX++;
    }

  } else if (move === 3) {
    // console.log('down');
    const potentialNewTile = document.querySelector(`div[rowid="${playerFourY - 1}"][columnid="${playerFourX}"]`);
    if (potentialNewTile.classList.contains('playerFour')) {
      // console.log('i am moving left');
      playerFourX--;
    }
  } else {
    playerFourY--;
  }
  const playerFourPosition = document.querySelector(`div[rowid="${playerFourY}"][columnid="${playerFourX}"]`);
  playerFourPosition.classList.remove('playerOne');
  playerFourPosition.classList.remove('playerFour');
  playerFourPosition.classList.remove('playerFour');
  playerFourPosition.classList.add('playerFour');
  playerFourCurrentScore++;

  if (playerFourX === crateX && playerFourY === crateY) {
    const squaresToRemove = document.querySelectorAll('.playerFour');
    squaresToRemove.forEach(square => square.classList.remove('playerFour'));
    playerFourPosition.classList.remove('crate');
    playerFourPosition.classList.add('playerFour');
    playerFourBankedScore = playerFourBankedScore + playerFourCurrentScore;
    playerFourCurrentScore = 0;
    const $playerFourScore = $('.playerFourScorecard');
    $playerFourScore.html(`${playerFourBankedScore}`);
  }
}


function setPlayerFourTimer() {
//   if (playerFour.hasClass('speedyBoots')) {
//     setInterval(moveplayerFour, 500);
//   } else {
  playerFourMoveInterval = setInterval(moveplayerFour, 750);
}

setPlayerFourTimer();
