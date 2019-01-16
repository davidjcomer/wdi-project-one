//****************************//
//     Global Variables       //
//****************************//
// const loadingScreen = document.getElementById('loadingScreen');
// const loadingSpan = document.getElementById('loadingSpan');
// const gameScreen = document.getElementById('gameScreen');

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
let cherryX;
let cherryY;
let turboStrawberryX;
let turboStrawberryY;
const $clock = $('.clock');
const $start = $('.start');
const $reset = $('.reset');
let time = 90.00;
let intervalId;
const turboTimeout = 5000;

const $gridSpace = $('#container');
let playerOneMoveInterval;
let playerTwoMoveInterval;
let playerThreeMoveInterval;
let playerFourMoveInterval;
let spawnCherryInterval;
let spawnTurboStrawberryInterval;

// const audioButton = document.querySelector('.music');
const audio = document.querySelector('audio');
const spawnCherryAudio = document.getElementById('spawnCherry');
const spawnTurboStrawberryAudio = document.getElementById('spawnTurboStrawberry');
const eatFruitAudio = document.getElementById('eatFruit');

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

function setPlayerOneTimer() {
  playerOneMoveInterval = setInterval(movePlayerOne, 750);
}
function setPlayerTwoTimer() {
  playerTwoMoveInterval = setInterval(movePlayerTwo, 750);
}
function setPlayerThreeTimer() {
  playerThreeMoveInterval = setInterval(movePlayerThree, 750);
}
function setPlayerFourTimer() {
  playerFourMoveInterval = setInterval(movePlayerFour, 750);
}

function playerOneTurbo() {
  clearInterval(playerOneMoveInterval);
  const playerOneTurboInterval = setInterval(movePlayerOne, 325);
  setTimeout(() => {
    clearInterval(playerOneTurboInterval);
    setPlayerOneTimer();
  }, turboTimeout);
  clearInterval(playerOneTurboInterval);
  setPlayerOneTimer();
}

function playerTwoTurbo() {
  clearInterval(playerTwoMoveInterval);
  const playerTwoTurboInterval = setInterval(movePlayerTwo, 325);
  setTimeout(() => {
    clearInterval(playerTwoTurboInterval);
    setPlayerTwoTimer();
  }, turboTimeout);
}

function playerThreeTurbo() {
  clearInterval(playerThreeMoveInterval);
  const playerThreeTurboInterval = setInterval(movePlayerThree, 325);
  setTimeout(() => {
    clearInterval(playerThreeTurboInterval);
    setPlayerThreeTimer();
  }, turboTimeout);
}
function playerFourTurbo() {
  clearInterval(playerFourMoveInterval);
  const playerFourTurboInterval = setInterval(movePlayerFour, 325);
  setTimeout(() => {
    clearInterval(playerFourTurboInterval);
    setPlayerFourTimer();
  }, turboTimeout);
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
        emptyTile.classList.add('playerOneCurrent');
      }
      if (columns === (playerTwoX - 1) && rows === (playerTwoY - 1)) {
        emptyTile.classList.add('playerTwoCurrent');
      }
      if (columns === (playerThreeX - 1) && rows === (playerThreeY - 1)) {
        emptyTile.classList.add('playerThreeCurrent');
      }
      if (columns === (playerFourX - 1) && rows === (playerFourY - 1)) {
        emptyTile.classList.add('playerFourCurrent');
      }
      $gridSpace.append(emptyTile);
      emptyTile.setAttribute('rowid', rows + 1);
      emptyTile.setAttribute('columnid', columns + 1);
    }
  }
}
loadGrid();
const $playableSquares = document.querySelectorAll('.playableSquare');

//****************************//
//     Start Button Logic     //
//****************************//
$start.click(function startGame(){
  audio.play();
  time = 90;
  setPlayerOneTimer();
  setPlayerTwoTimer();
  setPlayerThreeTimer();
  setPlayerFourTimer();
  setCherrySpawnTimer();
  spawnCherry();
  setTurboStrawberrySpawnTimer();
  intervalId = setInterval(function () {
    time = time - 1;
    $clock.html(`${time}`);
    if (time === 0) {
      clearInterval(intervalId);
      clearInterval(playerOneMoveInterval);
      clearInterval(playerTwoMoveInterval);
      clearInterval(playerThreeMoveInterval);
      clearInterval(playerFourMoveInterval);
      clearInterval(spawnCherryInterval);
      clearInterval(spawnTurboStrawberryInterval);
      checkForWin();
    }
  }, 1000);
});

//****************************//
//      Reset Button Logic    //
//****************************//
const $playerOnePosition = document.querySelector(`div[rowid="${playerOneY}"][columnid="${playerOneX}"]`);
const $playerTwoPosition = document.querySelector(`div[rowid="${playerTwoY}"][columnid="${playerTwoX}"]`);
const $playerThreePosition = document.querySelector(`div[rowid="${playerThreeY}"][columnid="${playerThreeX}"]`);
const $playerFourPosition = document.querySelector(`div[rowid="${playerFourY}"][columnid="${playerFourX}"]`);

$reset.click(function resetGame(){
  $('div').removeClass('playerOne playerTwo playerThree playerFour playerOneCurrent playerTwoCurrent playerThreeCurrent playerFourCurrent cherry turboStrawberry');
  $('div').addClass('empty');
  clearInterval(playerOneMoveInterval);
  clearInterval(playerTwoMoveInterval);
  clearInterval(playerThreeMoveInterval);
  clearInterval(playerFourMoveInterval);
  clearInterval(spawnCherryInterval);
  clearInterval(spawnTurboStrawberryInterval);
  clearInterval(intervalId);
  playerOneBankedScore = 0;
  playerTwoBankedScore = 0;
  playerThreeBankedScore = 0;
  playerFourBankedScore = 0;
  time = 90;
  $clock.html(time);
  playerOneX = 1;
  playerOneY = 1;
  $playerOnePosition.classList.add('playerOneCurrent');
  playerTwoX = 10;
  playerTwoY = 10;
  $playerTwoPosition.classList.add('playerTwoCurrent');
  playerThreeX = 1;
  playerThreeY = 10;
  $playerThreePosition.classList.add('playerThreeCurrent');
  playerFourX = 10;
  playerFourY = 1;
  $playerFourPosition.classList.add('playerFourCurrent');
});


//****************************//
//       Spawning Cherry       //
//****************************//

function spawnCherry() {
  $playableSquares.forEach(square => {
    if (square.classList.contains('cherry')) {
      square.classList.remove('cherry');
    }
  });
  cherryX = Math.ceil((Math.random() * 10));
  cherryY = Math.ceil((Math.random() * 10));
  const cherryPosition = document.querySelector(`div[rowid="${cherryY}"][columnid="${cherryX}"]`);
  // if (cherryPosition.classList.contains('playerOne')) {
  //   cherryPosition.classList.remove('playerOne');
  // } else if (cherryPosition.classList.contains('playerTwo')) {
  //   cherryPosition.classList.remove('playerTwo');
  // }
  cherryPosition.classList.add('cherry');
  spawnCherryAudio.play();
}
spawnCherry();

function setCherrySpawnTimer() {
  spawnCherryInterval = setInterval(spawnCherry, 10000);
}
setCherrySpawnTimer();


//****************************//
//  Spawning turboStrawberry  //
//****************************//

function spawnTurboStrawberry() {
  $playableSquares.forEach(square => {
    square.classList.remove('turboStrawberry');
  });
  turboStrawberryX = Math.ceil((Math.random() * 10));
  turboStrawberryY = Math.ceil((Math.random() * 10));
  const turboStrawberryPosition = document.querySelector(`div[rowid="${turboStrawberryY}"][columnid="${turboStrawberryX}"]`);
  turboStrawberryPosition.classList.add('turboStrawberry');
  spawnTurboStrawberryAudio.play();
}


function setTurboStrawberrySpawnTimer() {
  spawnTurboStrawberryInterval = setInterval(spawnTurboStrawberry, 7500);
}

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

  //       playerOne Score/Class Logic      //
  const $playerOnePosition = document.querySelector(`div[rowid="${playerOneY}"][columnid="${playerOneX}"]`);
  $playableSquares.forEach(playableSquare => {
    if (playableSquare.classList.contains('playerOneCurrent')) {
      playableSquare.classList.remove('playerOneCurrent');
    }
  });
  $playerOnePosition.classList.add('playerOneCurrent');
  $playerOnePosition.classList.add('playerOne');
  $playerOnePosition.classList.remove('playerTwo');
  $playerOnePosition.classList.remove('playerThree');
  $playerOnePosition.classList.remove('playerFour');
  $playerOnePosition.classList.remove('empty');
  playerOneCurrentScore++;


  //    cherry Collision Logic   //
  if (playerOneX === cherryX && playerOneY === cherryY) {
    const squaresToRemove = document.querySelectorAll('.playerOne');
    squaresToRemove.forEach(square => square.classList.remove('playerOne'));
    $playerOnePosition.classList.remove('cherry');
    playerOneBankedScore = playerOneBankedScore + playerOneCurrentScore;
    playerOneCurrentScore = 0;
    const $playerOneScore = $('.playerOneScorecard');
    $playerOneScore.html(`${playerOneBankedScore}`);
    $playerOnePosition.classList.add('playerOne');
    eatFruitAudio.play();
  }

  //    Strawberry Collision Logic   //
  console.log('checking for strawberry', playerOneX, playerOneY, turboStrawberryX, turboStrawberryY);
  if (playerOneX === turboStrawberryX && playerOneY === turboStrawberryY) {
    $playerOnePosition.classList.remove('turboStrawberry');
    playerOneTurbo();
    eatFruitAudio.play();
  }
}

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

  } else if ((potentialNewTileUp.classList.contains('playerOne') || potentialNewTileUp.classList.contains('playerThree') || potentialNewTileUp.classList.contains('playerFour') || potentialNewTileLeft.classList.contains('empty')) && playerTwoX > 1) {
    playerTwoX--;
  } else if (playerTwoX === 1) {
    playerTwoX++;
  } else if ((potentialNewTileUp.classList.contains('playerOne') || potentialNewTileUp.classList.contains('playerThree') || potentialNewTileUp.classList.contains('playerFour') || potentialNewTileUp.classList.contains('empty')) && playerTwoY < 10) {
    playerTwoY++;
  } else if (playerTwoY === 10) {
    playerTwoY--;
  } else if ((potentialNewTileUp.classList.contains('playerOne') || potentialNewTileUp.classList.contains('playerThree') || potentialNewTileUp.classList.contains('playerFour') || potentialNewTileRight.classList.contains('empty')) && playerTwoX < 10) {
    playerTwoX++;
  } else if (playerTwoX === 10) {
    playerTwoX--;
  } else if ((potentialNewTileUp.classList.contains('playerOne') || potentialNewTileUp.classList.contains('playerThree') || potentialNewTileUp.classList.contains('playerFour') || potentialNewTileDown.classList.contains('empty')) && playerTwoY > 1) {
    playerTwoY--;
  } else if (playerTwoY === 1) {
    playerTwoY++;
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

  //       playerTwo Score/Class Logic      //
  const $playerTwoPosition = document.querySelector(`div[rowid="${playerTwoY}"][columnid="${playerTwoX}"]`);
  $playableSquares.forEach(playableSquare => {
    if (playableSquare.classList.contains('playerTwoCurrent')) {
      playableSquare.classList.remove('playerTwoCurrent');
    }
  });
  $playerTwoPosition.classList.add('playerTwoCurrent');
  $playerTwoPosition.classList.add('playerTwo');
  $playerTwoPosition.classList.remove('playerOne');
  $playerTwoPosition.classList.remove('playerThree');
  $playerTwoPosition.classList.remove('playerFour');
  $playerTwoPosition.classList.remove('empty');
  playerTwoCurrentScore++;

  //    Cherry Collision Logic   //
  if (playerTwoX === cherryX && playerTwoY === cherryY) {
    const squaresToRemove = document.querySelectorAll('.playerTwo');
    squaresToRemove.forEach(square => square.classList.remove('playerTwo'));
    $playerTwoPosition.classList.remove('cherry');
    $playerTwoPosition.classList.add('playerTwo');
    playerTwoBankedScore = playerTwoBankedScore + playerTwoCurrentScore;
    playerTwoCurrentScore = 0;
    const $playerTwoScore = $('.playerTwoScorecard');
    $playerTwoScore.html(`${playerTwoBankedScore}`);
    eatFruitAudio.play();
  }

  //    Strawberry Collision Logic   //
  if (playerTwoX === turboStrawberryX && playerTwoY === turboStrawberryY) {
    console.log('player two has eaten the turbo strawberry');
    $playerTwoPosition.classList.remove('turboStrawberry');
    $playerTwoPosition.classList.add('playerTwo');
    playerTwoTurbo();
    eatFruitAudio.play();
  }
}

//****************************//
// playerThree Movement Logic   //
//****************************//
function movePlayerThree() {
  const potentialNewTileLeft = document.querySelector(`div[rowid="${playerThreeY}"][columnid="${playerThreeX - 1}"]`);
  const potentialNewTileUp = document.querySelector(`div[rowid="${playerThreeY + 1}"][columnid="${playerThreeX}"]`);
  const potentialNewTileRight = document.querySelector(`div[rowid="${playerThreeY}"][columnid="${playerThreeX + 1}"]`);
  const potentialNewTileDown = document.querySelector(`div[rowid="${playerThreeY - 1}"][columnid="${playerThreeX}"]`);
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
  } else if ((potentialNewTileLeft.classList.contains('playerOne') || potentialNewTileLeft.classList.contains('empty')) && playerThreeX > 1) {
    playerThreeX--;
  } else if (playerThreeX === 1) {
    playerThreeX++;
  } else if (potentialNewTileUp.classList.contains('playerOne') || potentialNewTileUp.classList.contains('empty')) {
    playerThreeY++;
  } else if (potentialNewTileRight.classList.contains('playerOne') || potentialNewTileRight.classList.contains('empty')) {
    playerThreeX++;
  } else if (potentialNewTileDown.classList.contains('playerOne') || potentialNewTileDown.classList.contains('empty')) {
    playerThreeY--;
  } else if (potentialNewTileLeft.classList.contains('playerThree') && potentialNewTileUp.classList.contains('playerThree') && potentialNewTileRight.classList.contains('playerThree')) {
    playerThreeY--;
  } else if (potentialNewTileLeft.classList.contains('playerThree') && potentialNewTileUp.classList.contains('playerThree') && potentialNewTileDown.classList.contains('playerThree')) {
    playerThreeX++;
  } else if (potentialNewTileLeft.classList.contains('playerThree') && potentialNewTileRight.classList.contains('playerThree') && potentialNewTileDown.classList.contains('playerThree')) {
    playerThreeY++;
  } else if (potentialNewTileUp.classList.contains('playerThree') && potentialNewTileRight.classList.contains('playerThree') && potentialNewTileDown.classList.contains('playerThree')) {
    playerThreeX--;
  } else if (move === 0 && playerThreeX !== 1) {
    playerThreeX--;
  } else if (move === 1 && playerThreeY !== 10) {
    playerThreeY++;
  } else if (move === 2 && playerThreeY !== 1) {
    playerThreeY--;
  } else if (move === 3 && playerThreeX !== 10){
    playerThreeX++;
  }

  const $playerThreePosition = document.querySelector(`div[rowid="${playerThreeY}"][columnid="${playerThreeX}"]`);
  $playableSquares.forEach(playableSquare => {
    if (playableSquare.classList.contains('playerThreeCurrent')) {
      playableSquare.classList.remove('playerThreeCurrent');
    }
  });
  $playerThreePosition.classList.add('playerThreeCurrent');
  $playerThreePosition.classList.add('playerThree');
  $playerThreePosition.classList.remove('playerOne');
  $playerThreePosition.classList.remove('playerTwo');
  $playerThreePosition.classList.remove('playerFour');
  $playerThreePosition.classList.remove('empty');
  playerThreeCurrentScore++;


  if (playerThreeX === cherryX && playerThreeY === cherryY) {
    const squaresToRemove = document.querySelectorAll('.playerThree');
    squaresToRemove.forEach(square => square.classList.remove('playerThree'));
    $playerThreePosition.classList.remove('cherry');
    $playerThreePosition.classList.add('playerThree');
    playerThreeBankedScore = playerThreeBankedScore + playerThreeCurrentScore;
    console.log(playerThreeCurrentScore);
    playerThreeCurrentScore = 0;
    const $playerThreeScore = $('.playerThreeScorecard');
    $playerThreeScore.html(`${playerThreeBankedScore}`);
    eatFruitAudio.play();
  }

  //    Strawberry Collision Logic   //
  if (playerThreeX === turboStrawberryX && playerThreeY === turboStrawberryY) {
    console.log('player three has eaten the turbo strawberry');
    $playerThreePosition.classList.remove('turboStrawberry');
    $playerThreePosition.classList.add('playerThree');
    playerThreeTurbo();
    eatFruitAudio.play();
  }
}

//****************************//
// playerFour Movement Logic   //
//****************************//
function movePlayerFour() {
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
    if (potentialNewTile.classList.contains('playerFour')) {
      playerFourY++;
    } else {
      playerFourX--;
    }

  } else if (move === 1) {
    // console.log('up');
    const potentialNewTile = document.querySelector(`div[rowid="${playerFourY + 1}"][columnid="${playerFourX}"]`);
    if (potentialNewTile.classList.contains('playerFour')) {
      playerFourX++;
    } else {
      playerFourY++;
    }

  } else if (move === 2) {
    // console.log('right');
    const potentialNewTile = document.querySelector(`div[rowid="${playerFourY}"][columnid="${playerFourX + 1}"]`);
    if (potentialNewTile.classList.contains('playerFour')) {
      playerFourY--;
    } else {
      playerFourX++;
    }

  } else if (move === 3) {
    // console.log('down');
    const potentialNewTile = document.querySelector(`div[rowid="${playerFourY - 1}"][columnid="${playerFourX}"]`);
    if (potentialNewTile.classList.contains('playerFour')) {
      playerFourX--;
    }
  } else {
    playerFourY--;
  }
  const $playerFourPosition = document.querySelector(`div[rowid="${playerFourY}"][columnid="${playerFourX}"]`);
  $playableSquares.forEach(playableSquare => {
    if (playableSquare.classList.contains('playerFourCurrent')) {
      playableSquare.classList.remove('playerFourCurrent');
    }
  });
  $playerFourPosition.classList.add('playerFourCurrent');
  $playerFourPosition.classList.add('playerFour');
  $playerFourPosition.classList.remove('playerOne');
  $playerFourPosition.classList.remove('playerTwo');
  $playerFourPosition.classList.remove('playerThree');
  $playerFourPosition.classList.remove('empty');
  playerFourCurrentScore++;

  if (playerFourX === cherryX && playerFourY === cherryY) {
    const squaresToRemove = document.querySelectorAll('.playerFour');
    squaresToRemove.forEach(square => square.classList.remove('playerFour'));
    $playerFourPosition.classList.remove('cherry');
    $playerFourPosition.classList.add('playerFour');
    playerFourBankedScore = playerFourBankedScore + playerFourCurrentScore;
    playerFourCurrentScore = 0;
    const $playerFourScore = $('.playerFourScorecard');
    $playerFourScore.html(`${playerFourBankedScore}`);
    eatFruitAudio.play();
  }

  //    Strawberry Collision Logic   //
  if (playerFourX === turboStrawberryX && playerFourY === turboStrawberryY) {
    console.log('player four has eaten the turbo strawberry');
    $playerFourPosition.classList.remove('turboStrawberry');
    $playerFourPosition.classList.add('playerFour');
    playerFourTurbo();
    eatFruitAudio.play();
  }
}
