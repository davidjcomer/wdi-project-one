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
    potentialNewTile = document.querySelector(`div[rowid="${playerThreeY}"][columnid="${playerThreeX - 1}"]`);
    console.log(potentialNewTile);
    if (potentialNewTile.classList.contains('playerThree')) {
      // console.log('i am moving up');
      playerThreeY++;
    } else {
      playerThreeX--;
    }

  } else if (move === 1) {
    // console.log('up');
    potentialNewTile = document.querySelector(`div[rowid="${playerThreeY + 1}"][columnid="${playerThreeX}"]`);
    if (potentialNewTile.classList.contains('playerThree')) {
      // console.log('i am moving right');
      playerThreeX++;
    } else {
      playerThreeY++;
    }

  } else if (move === 2) {
    // console.log('right');
    potentialNewTile = document.querySelector(`div[rowid="${playerThreeY}"][columnid="${playerThreeX + 1}"]`);
    if (potentialNewTile.classList.contains('playerThree')) {
      // console.log('i am moving down');
      playerThreeY--;
    } else {
      playerThreeX++;
    }

  } else if (move === 3) {
    // console.log('down');
    potentialNewTile = document.querySelector(`div[rowid="${playerThreeY - 1}"][columnid="${playerThreeX}"]`);
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


function setplayerThreeTimer() {
//   if (playerThree.hasClass('speedyBoots')) {
//     setInterval(moveplayerThree, 500);
//   } else {
  player3MoveInterval = setInterval(moveplayerThree, 750);
}

setplayerThreeTimer();
