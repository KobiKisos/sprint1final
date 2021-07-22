//display/UI of game

// import { TILE_STATUS, buildBoard, markTile, revealTile ,checkWin, checkLose } from '/JS/minesweeper.js';
import {
    TILE_STATUS,
    buildBoard,
    markTile,
    revealTile,
    checkWin,
    checkLose,
  } from "./minesweeper.js"

// const img = document.createElement("img");
// img.src = "https://picsum.photos/200/301";
// document.body.appendChild(img);


//default values for level1 (4*4,2 mines)
const BOARD_SIZE = 4;
const NUMBER_OF_MINES = 2;
//getting the board from html(has a class of board (index.html))
const boardElement = document.querySelector(".board");
//store number of mines in variable that user will see on webpage
var MinesleftText = document.querySelector('[data-mine-count]');
//display text after win/lose game(appears in subtext class)
const textMsg = document.querySelector('.subtext');

var MinesleftText = document.querySelector('[data-mine-count]');

//setting board from minesweeper.js in variable
const board = buildBoard(4,2);

//adding each board element to the board
board.forEach(row =>{
    row.forEach(tile => {
        boardElement.append(tile.element);       
    //handling left/right click on tiles
    tile.element.addEventListener('click',()=> {
    //calling reveakTile from minesweeper.js to handle click event and reveal tiles clicked
        revealTile(board, tile);
        //each time a tile is revealed check win,lose condition
        checkGameEnd()
    //**added*** --- makking sure that on right click the menu wont pop up(not neccessary for code to run)  
    tile.element.addEventListener("contextmenu",e => {
        e.preventDefault();
        // calling tile function(from minesweeper.js), and pass the tile that needs to be marked to the function
        markTile(tile);
        //updating 'mines left' var that appears in index.html -- 
        // if a tile is marked then there is a mine at that location, and count must be updated.
        listMinesLeft()
    })
    })
    }) 
}
    )

//set size property to BOARD_SIZE const(determine grid size)
boardElement.style.setProperty("--size", BOARD_SIZE)

//updating the ammount of mines left
MinesleftText.textContent = NUMBER_OF_MINES;

//function that will update mine count for game
//takes the board and counts up all tiles that are 'marked'
function  listMinesLeft(){        //reducing board to a single variable(count)
    const markedTilesCount = board.reduce((count,row)=> {
        return count + row.filter(tile => tile.status ===  TILE_STATUS.MARKED).length;
    // default at 0 (count starts at 0 for each game)
    },0)

    //substract number of mines marked by the number of mines that were started with will equal 
    //the current mine count
    MinesleftOutput.textContent = NUMBER_OF_MINES - markedTilesCount;
            
}
//~~~mark tiles
//call function inside of contextmenu eventListener, that will mark tiles.
//defining this function on minesweeper object(logic)


//checking board state to see if game is won/lost
function checkGameEnd(){
    const win = checkWin(board);
    const lose = checkLose(board);
//if win or loss is true stop user from being able to click on more tiles.
//tried to stop the eventListener unssuccessfully, instead using 'stopProp' method
    if(win||lose){
        //this click event occurs first, before the other eventListeners
        //stop left click
        boardElement.addEventListener('click',stopProp, {capture: true})
         //stop right click
        boardElement.addEventListener('contextmenu',stopProp, {capture: true})
    }
    //set text variable if game is won(appears in subtext class)
    if (win){
        textMsg.textContent = 'CONGRADULATIONS!!! YOU WIN!!!!';
        document.getElementById('IMG/letsPlayPepe.png').src="IMG/WinnerPepe.png";
    }
    //set text variable if game is lost(appears in subtext class)
    if (lose){
        textMsg.textContent = 'YOU LOST!!!';
        document.getElementById('IMG/letsPlayPepe.src').src="IMG/losingPepe.png";
    //if game is lost, reveals all the tiles that are mines
        board.forEach(row =>{
            row.forEach(board => {
                //if tile is marked will call the markTile function which will unmark them
                if (tile.TILE_STATUS ===TILE_STATUS.MARKED) markTile(tile)
                if(tile.mine) revealTile(board,tile);

            })
        })
    }
}
//stops the event from going further down, (wont call events on individual tiles)
function stopProp(e) {
//call as function
    e.stopImmediatePropagation()
}