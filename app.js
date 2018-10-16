const $grid = $('.container');
const $anywhere = $('body');
// let $gridSquares;
// let $startButton;
// let timerDisplay;
// let score;


// const gridHeight = 10;
// const gridWidth = 10;
// const columns =[];
// const rows = [];
// const playerStartPosition = ;
// const computerStartPosition = ;

const playerOne = {
  name: 'Player One',
  position: '1'
};

//when  player one moves into a square
//if the current square has the textcontent equal to that of the position of player1,
//add class occupied by player one
function generateSimpleGrid() {
  for(let i = 0; i < 100; i++) {
    const newDiv = $('<div></div>').attr('class', i+1);
    newDiv.html(i+1);
    $grid.append(newDiv);
  }
}
generateSimpleGrid();

// const $gridSquare = $('div');
const $gridSquare = $('div').eq(0);

if ($gridSquare.hasClass(playerOne.position)) {
  console.log('im running');
  $gridSquare.addClass('PlayerOne');
}

console.log($gridSquare.hasClass());

//add a keydown event listener to a body and console log what key is being pressed
$anywhere.on('keydown', function(e) {
  console.log(e.which);
  if (e.which === 38) {
    alert('Player 1 moved up');
    //toggle class? /change coordinate
  } else if (e.which === 40) {
    alert('Player 1 moved down');
    //toggle class? /change coordinate
  } else if (e.which === 37) {
    alert('Player 1 moved left');
    //toggle class? /change coordinate
  } else if (e.which === 39) {
    alert('Player 1 moved right');
    //toggle class? /change coordinate
  }
});

//To think about:

// function generateUberGrid()

//Colums&Rows Method
// array of rows and an array of columm
// we sart a loop, adding 10 div elements to each row array
// first for loop creates 1 row, then 2, then 3
// secondary nested loop adds a numerical coordinate to each


// for(let y = 0; y < gridHeight; y++) {
//   const row =[];
//   for(let x = 0; x < gridWidth; x++) {
//   tile = //this is an object;
// };
// }

// spawnItems
// generateGrid()


// function moveUp()
// function moveDown()
// function moveLeft()
// function moveRight()
