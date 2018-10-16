function movePlayerTwo() {
  const move = Math.floor((Math.random() * 4));
  // const duration = Math.floor((Math.random() * 9));
  if (playerTwoX === 10) {
    console.log('barrier ahead, turning back');
    playerTwoX--;
  } else if (playerTwoX === 1) {
    console.log('barrier ahead, turning back');
    playerTwoX++;
  } else if (playerTwoY === 10) {
    console.log('barrier ahead, turning back');
    playerTwoY--;
  } else if (playerTwoY === 1) {
    console.log('barrier ahead, turning back');
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
}

function setPlayerTwoTimer() {
//   if (playerTwo.hasClass('speedyBoots')) {
//     setInterval(movePlayerTwo, 500);
//   } else {
  setInterval(movePlayerTwo, 1000);
}

setPlayerTwoTimer();
//







const moveset = [1, 2, 3, 4];

function randNum(moveset,bannedMove){
  var randNumber = Math.floor(Math.random()*moveset.length);
  if(moveset[randNumber]=== bannedMove){
    return randNum(moveset,bannedMove);
  }else{
    return randNumber;
  }
}
