# wdi-project-one


## Technologies Used
* HTML5
* CSS
* JavaScript
* [Google Fonts](fonts.google.com)

## Brief
To build a multiplayer, grid-based game using HTML5, CSS & JavaScript.

<strong>The Game must:</strong>
* Render in the browser
* Include design logic for winning
* Visually display which player has won
* Use Javascript or jQuery for DOM manipulation
* Deploy online, using Github Pages.


# Approach

## Page Structure

The Game consists of 3 screens.
1. <strong>Start</strong><br> A simple, single-element screen prompting the user to click the button to begin the game.
![Game Menu](Screenshots/IntroScreen.png)

1. <strong>Menu</strong><br> A screen prompting the user to select one of four game modes.<br>
![Game Menu](Screenshots/GameMenu.png)

1. <strong>Game</strong><br> A screen that lays out the game board, 4 scorecards, a clock and two buttons to start or reset the game.<br>
![Game Menu](Screenshots/Game.png)

## Building the grid

The grid is built on the DOM using a JavaScript loop:
```JavaScript
function loadGrid() {
  for (let rows = 0; rows < 10; rows++) {
    for (let columns = 0; columns < 10; columns++) {
      const emptyTile = document.createElement('div');
      }
      $gridSpace.append(emptyTile);
      emptyTile.setAttribute('rowid', rows + 1);
      emptyTile.setAttribute('columnid', columns + 1);
    }
  }
}
  ```
Each square on the grid is assigned a `rowid` and `columnid` to simulate X and Y axis co-ordinates.<br>So the lowermost, leftmost square will have:
* rowid = 1
* columnid = 1

...and the uppermost, rightmost square will have:
* rowid = 10
* columnid = 10


## Functionality:
<strong>Keypresses</strong>

The player can move in one of four directions (up, down, left and right). To implement this, the variable `playerOneKeydown` has been created to store the identifier of the key that was pressed when a key event occurred.
```JavaScript
let playerOneKeydown;
function handleKeydownPlayerOne(event) {
  playerOneKeydown = event.key;
}
  ```

<strong>Movement</strong>

<u>Player One</u><br>
Inside of the `movePlayerOne` function, switch statements have been built to handle the key event and prevent the player moving outside of the grid boundaries. Below, the value of the keydown event is compared with the values of each case.

 If the user pushes the 'left' key, then `playerOneX`, the player's X-axis position, decreases by one, and the avatar moves left. If `playerOneX === 1` (the leftmost position on the grid), then the script breaks out of the switch block - disallowing the move.

```JavaScript
  function movePlayerOne() {
    switch(playerOneKeydown) {
      case 'ArrowLeft':
        if (playerOneX === 1) {
          break;
        } else {
          playerOneX--;
        }
        break;
      }
    }
```

<u>Players Two, Three & Four</u><br>
The remaining players in the game are run by JavaScript and have the same barrier restrictions as Player One:

```JavaScript
if (playerTwoX === 10) {
  playerTwoX--;
} else if (playerTwoX === 1) {
  playerTwoX++;
} else if (playerTwoY === 10) {
  playerTwoY--;
} else if (playerTwoY === 1) {
  playerTwoY++;
}
```


<strong>Spawning & Consuming Items</strong>

The player can consume one of 2 items.

* Cherry
* Strawberry

Wins & Blockers



# Future Revision

<strong>Refactoring</strong>
* jQuery
* functions that take players as arguments.

<strong>Levels</strong>
* make computers smarter
* integrate more complex items/weaponry...

<strong>Additional fruit items</strong>

* 🍊 <strong> The God Orange</strong><br>
Summons a huge Pacman, who appears on screen and gobbling up all painted tiles in its path for a set amount of time.
* 🍈 <strong> The Grapefruit of Permanence</strong><br>
Stops players from overwriting your tiles for a set period
* 🍎 <strong> The Pomegranate of Infinite Time</strong><br>
Freezes all other players
* 🍌 <strong>The Spacial Manipulation Banana</strong><br>
Allows players to move through walls and reappear on the other side of the grid.

<strong>Negative vegetable items</strong>

* 🍠 <strong> The Invisibility Turnip</strong><br>
Renders the player incapable of painting tiles for a set amount of time.

* 🥗 <strong> The Sloth Cabbage</strong><br>
Slows player down to half speed.

* 🍅 <strong> The Rotten Tomato</strong><br>
Freezes player for certain amount of time.

* 🥒 <strong>The Portal Zucchini</strong><br>
Respawns player in random grid location

<strong>Weapons</strong>

* 🌽 <strong> The Pea Shooter</strong><br>
Single use weapon allowing player to shoot other players and steal their tiles.

* 🥔 <strong> The Spud Gun</strong><br>
Single use weapon that launches a potato 3 tiles forward. The detonation colours the destination tile (and every tile immediately around it) your colour.

* 🍆 <strong> The Immunity Aubergine</strong><br>
Make player immune from attacks for a set amount of time
