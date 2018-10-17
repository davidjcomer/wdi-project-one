// // function generateMove(arrayMoveset) {
// //   const generatedMove = arrayMoveset[Math.floor(Math.random() * arrayMoveset.length)];
// //   console.log.playerTwo[generatedMove];
// // }
// //
// // generateMove(noRightMove);
//
// function spawnCrate() {
//   // playerTiles.forEach(square => {
//   //   if (square.classList.contains('crate')) {
//   //     square.classList.remove('crate');
//   //   }
//   // });
//   crateX = Math.ceil((Math.random() * 10));
//   crateY = Math.ceil((Math.random() * 10));
//   const cratePosition = document.querySelector(`div[rowid="${crateY}"][columnid="${crateX}"]`);
//   if (cratePosition.classList.contains('playerOne')) {
//     cratePosition.classList.remove('playerOne');
//   } else if (cratePosition.classList.contains('playerTwo')) {
//     cratePosition.classList.remove('playerTwo');
//   }
//   cratePosition.classList.add('crate');
// }
// spawnCrate();
//
//
//
//
//
// function spawnSecondCrate() {
//   playerTiles.forEach(square => {
//     if (square.classList.contains('secondCrate')) {
//       square.classList.remove('secondCrate');
//     }
//   });
//   crateX = Math.ceil((Math.random() * 10));
//   crateY = Math.ceil((Math.random() * 10));
//   const secondCratePosition = document.querySelector(`div[rowid="${secondCrateY}"][columnid="${secondCrateX}"]`);
//   secondCratePosition.classList.add('secondCrate');
// }
// spawnSecondCrate();
//
// function setSecondCrateSpawnTimer() {
//   spawnSecondCrateInterval = setInterval(spawnSecondCrate, 6500);
// }
// setSecondCrateSpawnTimer();
//
//
// const playerOnePosition = document.querySelector(`div[rowid="${playerOneY}"][columnid="${playerOneX}"]`);
// playerTiles.forEach(playableSquare => {
//   if (playableSquare.classList.contains('playerOneCurrent')) {
//     playableSquare.classList.remove('playerOneCurrent');
//   }
// });
//
//
// // ****************
// // search globally, if a square is not not playerOnePosition, remove class playerOneCurrent
// // if (playableSquare !== playerOnePosition && playableSquare.hasClass('playerOnecurrent')) {
// //   playerOnePosition.classList.add('playerOneCurrent');
// // }
//
//
//
// //****************************//
// // playerFour Movement Logic   //
// //****************************//
// function moveplayerFour() {
//   const move = Math.floor((Math.random() * 4));
//
//   // Rudimentary Barrier logic //
//   if (playerFourX === 10) {
//     playerFourX--;
//   } else if (playerFourX === 1) {
//     playerFourX++;
//   } else if (playerFourY === 10) {
//     playerFourY--;
//   } else if (playerFourY === 1) {
//     playerFourY++;
//
//   // Preventative movement logic //
//   } else if (move === 0) {
//     // console.log('left');
//     potentialNewTile = document.querySelector(`div[rowid="${playerFourY}"][columnid="${playerFourX - 1}"]`);
//     console.log(potentialNewTile);
//     if (potentialNewTile.classList.contains('playerFour')) {
//       // console.log('i am moving up');
//       playerFourY++;
//     } else {
//       playerFourX--;
//     }
//
//   } else if (move === 1) {
//     // console.log('up');
//     potentialNewTile = document.querySelector(`div[rowid="${playerFourY + 1}"][columnid="${playerFourX}"]`);
//     if (potentialNewTile.classList.contains('playerFour')) {
//       // console.log('i am moving right');
//       playerFourX++;
//     } else {
//       playerFourY++;
//     }
//
//   } else if (move === 2) {
//     // console.log('right');
//     potentialNewTile = document.querySelector(`div[rowid="${playerFourY}"][columnid="${playerFourX + 1}"]`);
//     if (potentialNewTile.classList.contains('playerFour')) {
//       // console.log('i am moving down');
//       playerFourY--;
//     } else {
//       playerFourX++;
//     }
//
//   } else if (move === 3) {
//     // console.log('down');
//     potentialNewTile = document.querySelector(`div[rowid="${playerFourY - 1}"][columnid="${playerFourX}"]`);
//     if (potentialNewTile.classList.contains('playerFour')) {
//       // console.log('i am moving left');
//       playerFourX--;
//     }
//   } else {
//     playerFourY--;
//   }
//   const playerFourPosition = document.querySelector(`div[rowid="${playerFourY}"][columnid="${playerFourX}"]`);
//   playerFourPosition.classList.remove('playerOne');
//   playerFourPosition.classList.remove('playerFour');
//   playerFourPosition.classList.remove('playerFour');
//   playerFourPosition.classList.add('playerFour');
//   playerFourCurrentScore++;
//
//   if (playerFourX === crateX && playerFourY === crateY) {
//     const squaresToRemove = document.querySelectorAll('.playerFour');
//     squaresToRemove.forEach(square => square.classList.remove('playerFour'));
//     playerFourPosition.classList.remove('crate');
//     playerFourPosition.classList.add('playerFour');
//     playerFourBankedScore = playerFourBankedScore + playerFourCurrentScore;
//     console.log(playerFourCurrentScore);
//     playerFourCurrentScore = 0;
//     const $playerFourScore = $('.playerFourScorecard');
//     $playerFourScore.html(`${playerFourBankedScore}`);
//   }
// }
//
//
// //proposed computer movement Logic
//
// //***WHAT HAVE I DONE:
// //the computer is encouraged to occupy squares with the class empty and player One/Two.Thre
// //then we say, if the squares immeditately to the left, right, and upside of you are coloured playerTwo, go down. etc. etc.
// // Preventative movement logic //
//
// //if all 4 have class player 1 or empty, generate randomly from fullMoveset Array
// //if L/U/R have class player 1 or empty, but Down has class player two, generate from noDownMove Array
// //if U/R/D have class player 1 or empty, but Left has class player two, generate from noLeftMove Array
// //if R/D/L have class player 1 or empty, but Up has class playerTwo, genenrate from noUpMove Array
// //if D/L/U have class player 1 or empty, but Right has class playerTwo, genenrate from noRightMove Array
// //if L/U have class player 1 or empty, but R/D has class playerTwo, genenrate from L/U Array
// //if U/R have class player 1 or empty, but D/L has class playerTwo, genenrate from U/R Array
// //if R/D have class player 1 or empty, but L/U has class playerTwo, genenrate from R/D Array
// //if D/L have class player 1 or empty, but U/R has class playerTwo, genenrate from U/R Array
// //if L/R have class player 1 or empty, but U/D has class playerTwo, genenrate from l/R Array
// //if U/D have class player 1 or empty, but L/R has class playerTwo, genenrate from U/D Array
//
//
// // if ((PNTL contains pO || e) && (PNTU contains pO || e)
