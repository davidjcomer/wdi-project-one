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
let crateX;
let crateY;
// let speedyBootsX;
// let speedyBootsY;
const $clock = $('.clock');
const $start = $('.start');
const $reset = $('.reset');
let time = 60.00;
let intervalId;

const $gridSpace = $('#container');
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

function setPlayerOneTimer() {
  playerOneMoveInterval = setInterval(movePlayerOne, 750);
  //clearInterval(playerOneMoveInterval);
  //   if (playerTwo.hasClass('speedyBoots')) {
  //     setInterval(movePlayerTwo, 500);
  //   } else {
}

function setPlayerTwoTimer() {
  playerTwoMoveInterval = setInterval(movePlayerTwo, 750);
}
function setPlayerThreeTimer() {
  playerThreeMoveInterval = setInterval(moveplayerThree, 750);
}
function setPlayerFourTimer() {
  playerFourMoveInterval = setInterval(moveplayerFour, 750);
}

//****************************//
//     Loading the Grid       //
//****************************//
function loadGrid() {
  for (let rows = 0; rows < 10; rows++) {
    for (let columns = 0; columns < 10; columns++) {
      const emptyTile = document.createElement('div');
      emptyTile.addClass('playableSquare');
      emptyTile.addClass('empty');
      if (columns === (playerOneX - 1) && rows === (playerOneY - 1)) {
        emptyTile.addClass('playerOneCurrent');
      }
      if (columns === (playerTwoX - 1) && rows === (playerTwoY - 1)) {
        emptyTile.addClass('playerTwoCurrent');
      }
      if (columns === (playerThreeX - 1) && rows === (playerThreeY - 1)) {
        emptyTile.addClass('playerThreeCurrent');
      }
      if (columns === (playerFourX - 1) && rows === (playerFourY - 1)) {
        emptyTile.addClass('playerFourCurrent');
      }
      $gridSpace.append(emptyTile);
      emptyTile.setAttribute('rowid', rows + 1);
      emptyTile.setAttribute('columnid', columns + 1);
    }
  }
}
loadGrid();
const $playableSquares = $('.playableSquare');

//****************************//
//     Start Button Logic     //
//****************************//
$start.click(function startGame(){
  time = 60;
  setPlayerOneTimer();
  setPlayerTwoTimer();
  setPlayerThreeTimer();
  setPlayerFourTimer();
  setCrateSpawnTimer();
  spawnCrate();
  intervalId = setInterval(function () {
    time = time - 1;
    $clock.html(`${time}`);
    if (time === 0) {
      clearInterval(intervalId);
      $('div').removeClass('playerOne ');
      $('div').removeClass('playerTwo ');
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
});

//****************************//
//      Reset Button Logic    //
//****************************//
const $playerOnePosition = $(`div[rowid="${playerOneY}"][columnid="${playerOneX}"]`);
const $playerTwoPosition = $(`div[rowid="${playerTwoY}"][columnid="${playerTwoX}"]`);
const $playerThreePosition = $(`div[rowid="${playerThreeY}"][columnid="${playerThreeX}"]`);
const $playerFourPosition = $(`div[rowid="${playerFourY}"][columnid="${playerFourX}"]`);

$reset.click(function resetGame(){
  $('div').removeClass('playerOne playerTwo playerThree playerFour playerOneCurrent playerTwoCurrent playerThreeCurrent playerFourCurrent crate');
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
  $playerOnePosition.addClass('playerOneCurrent');
  playerTwoX = 10;
  playerTwoY = 10;
  $playerTwoPosition.addClass('playerTwoCurrent');
  playerThreeX = 1;
  playerThreeY = 10;
  $playerThreePosition.addClass('playerThreeCurrent');
  playerFourX = 10;
  playerFourY = 1;
  $playerFourPosition.addClass('playerFourCurrent');
});


//****************************//
//       Spawning Crate       //
//****************************//

function spawnCrate() {
  $playableSquares.forEach(square => {
    if (square.hasClass('crate')) {
      square.removeClass('crate');
    }
  });
  crateX = Math.ceil((Math.random() * 10));
  crateY = Math.ceil((Math.random() * 10));
  const $cratePosition = $(`div[rowid="${crateY}"][columnid="${crateX}"]`);
  if ($cratePosition.hasClass('playerOne')) {
    $cratePosition.removeClass('playerOne');
  } else if ($cratePosition.hasClass('playerTwo')) {
    $cratePosition.removeClass('playerTwo');
  }
  $cratePosition.addClass('crate');
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
//   speedyBootsPosition.addClass('crate');
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
// const $playerOnePosition = document.querySelector(`div[rowid="${playerOneY}"][columnid="${playerOneX}"]`);

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
  const $playerOnePosition = $(`div[rowid="${playerOneY}"][columnid="${playerOneX}"]`);
  $playableSquares.forEach(playableSquare => {
    if (playableSquare.hasClass('playerOneCurrent')) {
      playableSquare.removeClass('playerOneCurrent');
    }
  });
  $playerOnePosition.addClass('playerOneCurrent');
  $playerOnePosition.addClass('playerOne');
  $playerOnePosition.removeClass('playerTwo');
  $playerOnePosition.removeClass('playerThree');
  $playerOnePosition.removeClass('playerFour');
  $playerOnePosition.removeClass('empty');
  playerOneCurrentScore++;


  //    Crate Collision Logic   //
  if (playerOneX === crateX && playerOneY === crateY) {
    const $squaresToRemove = document.querySelectorAll('.playerOne');
    $squaresToRemove.forEach(square => square.removeClass('playerOne'));
    $playerOnePosition.removeClass('crate');
    playerOneBankedScore = playerOneBankedScore + playerOneCurrentScore;
    playerOneCurrentScore = 0;
    const $playerOneScore = $('.playerOneScorecard');
    $playerOneScore.html(`${playerOneBankedScore}`);
    $playerOnePosition.addClass('playerOne');
  }
}

//      Set playerOne Timer     //
// function setPlayerOneTimer() {
//   playerOneMoveInterval = setInterval(movePlayerOne, 750);
//   //clearInterval(playerOneMoveInterval);
// }
// setPlayerOneTimer();


//****************************//
// playerTwo Movement Logic   //
//****************************//
function movePlayerTwo() {
  const $potentialNewTileLeft = $(`div[rowid="${playerTwoY}"][columnid="${playerTwoX - 1}"]`);
  const $potentialNewTileUp = $(`div[rowid="${playerTwoY + 1}"][columnid="${playerTwoX}"]`);
  const $potentialNewTileRight = $(`div[rowid="${playerTwoY}"][columnid="${playerTwoX + 1}"]`);
  const $potentialNewTileDown = $(`div[rowid="${playerTwoY - 1}"][columnid="${playerTwoX}"]`);
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


  } else if (($potentialNewTileUp.hasClass('playerOne') || $potentialNewTileUp.hasClass('playerThree') || $potentialNewTileUp.hasClass('playerFour') || $potentialNewTileLeft.hasClass('empty')) && playerTwoX > 1) {
    playerTwoX--;
  } else if (playerTwoX === 1) {
    playerTwoX++;
  } else if (($potentialNewTileUp.hasClass('playerOne') || $potentialNewTileUp.hasClass('playerThree') || $potentialNewTileUp.hasClass('playerFour') || $potentialNewTileUp.hasClass('empty')) && playerTwoY < 10) {
    playerTwoY++;
  } else if (playerTwoY === 10) {
    playerTwoY--;
  } else if (($potentialNewTileUp.hasClass('playerOne') || $potentialNewTileUp.hasClass('playerThree') || $potentialNewTileUp.hasClass('playerFour') || $potentialNewTileRight.hasClass('empty')) && playerTwoX < 10) {
    playerTwoX++;
  } else if (playerTwoX === 10) {
    playerTwoX--;
  } else if (($potentialNewTileUp.hasClass('playerOne') || $potentialNewTileUp.hasClass('playerThree') || $potentialNewTileUp.hasClass('playerFour') || $potentialNewTileDown.hasClass('empty')) && playerTwoY > 1) {
    playerTwoY--;
  } else if (playerTwoY === 1) {
    playerTwoY++;
  } else if ($potentialNewTileLeft.hasClass('playerTwo') && $potentialNewTileUp.hasClass('playerTwo') && $potentialNewTileRight.hasClass('playerTwo')) {
    playerTwoY--;
  } else if ($potentialNewTileLeft.hasClass('playerTwo') && $potentialNewTileUp.hasClass('playerTwo') && $potentialNewTileDown.hasClass('playerTwo')) {
    playerTwoX++;
  } else if ($potentialNewTileLeft.hasClass('playerTwo') && $potentialNewTileRight.hasClass('playerTwo') && $potentialNewTileDown.hasClass('playerTwo')) {
    playerTwoY++;
  } else if ($potentialNewTileUp.hasClass('playerTwo') && $potentialNewTileRight.hasClass('playerTwo') && $potentialNewTileDown.hasClass('playerTwo')) {
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
  const $playerTwoPosition = $(`div[rowid="${playerTwoY}"][columnid="${playerTwoX}"]`);
  $playableSquares.forEach(playableSquare => {
    if (playableSquare.hasClass('playerTwoCurrent')) {
      playableSquare.removeClass('playerTwoCurrent');
    }
  });
  $playerTwoPosition.addClass('playerTwoCurrent');
  $playerTwoPosition.addClass('playerTwo');
  $playerTwoPosition.removeClass('playerOne');
  $playerTwoPosition.removeClass('playerThree');
  $playerTwoPosition.removeClass('playerFour');
  $playerTwoPosition.removeClass('empty');
  playerTwoCurrentScore++;

  if (playerTwoX === crateX && playerTwoY === crateY) {
    const $squaresToRemove = document.querySelectorAll('.playerTwo');
    $squaresToRemove.forEach(square => square.removeClass('playerTwo'));
    $playerTwoPosition.removeClass('crate');
    $playerTwoPosition.addClass('playerTwo');
    playerTwoBankedScore = playerTwoBankedScore + playerTwoCurrentScore;
    playerTwoCurrentScore = 0;
    const $playerTwoScore = $('.playerTwoScorecard');
    $playerTwoScore.html(`${playerTwoBankedScore}`);
  }
}

// function setPlayerTwoTimer() {
// //   if (playerTwo.hasClass('speedyBoots')) {
// //     setInterval(movePlayerTwo, 500);
// //   } else {
//   playerTwoMoveInterval = setInterval(movePlayerTwo, 750);
// }
//
// setPlayerTwoTimer();


//****************************//
// playerThree Movement Logic   //
//****************************//
function moveplayerThree() {
  const $potentialNewTileLeft = $(`div[rowid="${playerThreeY}"][columnid="${playerThreeX - 1}"]`);
  const $potentialNewTileUp = $(`div[rowid="${playerThreeY + 1}"][columnid="${playerThreeX}"]`);
  const $potentialNewTileRight = $(`div[rowid="${playerThreeY}"][columnid="${playerThreeX + 1}"]`);
  const $potentialNewTileDown = $(`div[rowid="${playerThreeY - 1}"][columnid="${playerThreeX}"]`);
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
  } else if (($potentialNewTileLeft.hasClass('playerOne') || $potentialNewTileLeft.hasClass('empty')) && playerThreeX > 1) {
    playerThreeX--;
  } else if (playerThreeX === 1) {
    playerThreeX++;
  } else if ($potentialNewTileUp.hasClass('playerOne') || $potentialNewTileUp.hasClass('empty')) {
    playerThreeY++;
  } else if ($potentialNewTileRight.hasClass('playerOne') || $potentialNewTileRight.hasClass('empty')) {
    playerThreeX++;
  } else if ($potentialNewTileDown.hasClass('playerOne') || $potentialNewTileDown.hasClass('empty')) {
    playerThreeY--;
  } else if ($potentialNewTileLeft.hasClass('playerThree') && $potentialNewTileUp.hasClass('playerThree') && $potentialNewTileRight.hasClass('playerThree')) {
    playerThreeY--;
  } else if ($potentialNewTileLeft.hasClass('playerThree') && $potentialNewTileUp.hasClass('playerThree') && $potentialNewTileDown.hasClass('playerThree')) {
    playerThreeX++;
  } else if ($potentialNewTileLeft.hasClass('playerThree') && $potentialNewTileRight.hasClass('playerThree') && $potentialNewTileDown.hasClass('playerThree')) {
    playerThreeY++;
  } else if ($potentialNewTileUp.hasClass('playerThree') && $potentialNewTileRight.hasClass('playerThree') && $potentialNewTileDown.hasClass('playerThree')) {
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
    if (playableSquare.hasClass('playerThreeCurrent')) {
      playableSquare.removeClass('playerThreeCurrent');
    }
  });
  $playerThreePosition.addClass('playerThreeCurrent');
  $playerThreePosition.addClass('playerThree');
  $playerThreePosition.removeClass('playerOne');
  $playerThreePosition.removeClass('playerTwo');
  $playerThreePosition.removeClass('playerFour');
  $playerThreePosition.removeClass('empty');
  playerThreeCurrentScore++;


  if (playerThreeX === crateX && playerThreeY === crateY) {
    const $squaresToRemove = document.querySelectorAll('.playerThree');
    $squaresToRemove.forEach(square => square.removeClass('playerThree'));
    $playerThreePosition.removeClass('crate');
    $playerThreePosition.addClass('playerThree');
    playerThreeBankedScore = playerThreeBankedScore + playerThreeCurrentScore;
    console.log(playerThreeCurrentScore);
    playerThreeCurrentScore = 0;
    const $playerThreeScore = $('.playerThreeScorecard');
    $playerThreeScore.html(`${playerThreeBankedScore}`);
  }
}


// function setPlayerThreeTimer() {
// //   if (playerThree.hasClass('speedyBoots')) {
// //     setInterval(moveplayerThree, 500);
// //   } else {
//   playerThreeMoveInterval = setInterval(moveplayerThree, 750);
// }
//
// setPlayerThreeTimer();


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
    const $potentialNewTile = $(`div[rowid="${playerFourY}"][columnid="${playerFourX - 1}"]`);
    // console.log(potentialNewTile);
    if ($potentialNewTile.hasClass('playerFour')) {
      // console.log('i am moving up');
      playerFourY++;
    } else {
      playerFourX--;
    }

  } else if (move === 1) {
    // console.log('up');
    const $potentialNewTile = $(`div[rowid="${playerFourY + 1}"][columnid="${playerFourX}"]`);
    if ($potentialNewTile.classList.hasClass('playerFour')) {
      // console.log('i am moving right');
      playerFourX++;
    } else {
      playerFourY++;
    }

  } else if (move === 2) {
    // console.log('right');
    const $potentialNewTile = $(`div[rowid="${playerFourY}"][columnid="${playerFourX + 1}"]`);
    if ($potentialNewTile.hasClass('playerFour')) {
      playerFourY--;
    } else {
      playerFourX++;
    }

  } else if (move === 3) {
    const $potentialNewTile = $(`div[rowid="${playerFourY - 1}"][columnid="${playerFourX}"]`);
    if ($potentialNewTile.hasClass('playerFour')) {
      playerFourX--;
    }
  } else {
    playerFourY--;
  }
  const $playerFourPosition = $(`div[rowid="${playerFourY}"][columnid="${playerFourX}"]`);
  $playableSquares.forEach(playableSquare => {
    if (playableSquare.hasClass('playerFourCurrent')) {
      playableSquare.removeClass('playerFourCurrent');
    }
  });
  $playerFourPosition.addClass('playerFourCurrent');
  $playerFourPosition.addClass('playerFour');
  $playerFourPosition.removeClass('playerOne');
  $playerFourPosition.removeClass('playerTwo');
  $playerFourPosition.removeClass('playerThree');
  $playerFourPosition.removeClass('empty');
  playerFourCurrentScore++;

  if (playerFourX === crateX && playerFourY === crateY) {
    const $squaresToRemove = $('.playerFour');
    $squaresToRemove.forEach(square => square.removeClass('playerFour'));
    $playerFourPosition.removeClass('crate');
    $playerFourPosition.addClass('playerFour');
    playerFourBankedScore = playerFourBankedScore + playerFourCurrentScore;
    playerFourCurrentScore = 0;
    const $playerFourScore = $('.playerFourScorecard');
    $playerFourScore.html(`${playerFourBankedScore}`);
  }
}


// function setPlayerFourTimer() {
// //   if (playerFour.hasClass('speedyBoots')) {
// //     setInterval(moveplayerFour, 500);
// //   } else {
//   playerFourMoveInterval = setInterval(moveplayerFour, 750);
// }
//
// setPlayerFourTimer();
