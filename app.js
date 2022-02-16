// X = playerX since X goes first. 
let whoTurn;
const playerX = "grid EX";
let playerXArray = [];
const playerO = "grid O";
let playerOArray = [];

// All possible win options
const toWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

createGrid()

//grab all elements needed and assign to variables, add event listener to button
const alertMessage = document.getElementById('messageAlert');
const grids = document.querySelectorAll('.grid')
const playButton = document.getElementById('play');
playButton.addEventListener('click', playGame);

// Create grid generate gird ID numbers 
function createGrid() {
    for (i = 0; i < 9; i++){
        var div = document.createElement("div");
        div.className = "grid";
        div.id = `${i}`
        document.getElementById("main").appendChild(div);
    }
}

// adds event listeners, starts and restarts game, resets all grids for replay.
playGame()


function playGame() {
    whoTurn = false;
    alertMessage.innerText = "X goes first click a space to start!"
    playButton.style.visibility = "hidden"
    grids.forEach(grid => {
        grid.classList = "grid"
        grid.innerText = ""
        playerXArray = [];
        playerOArray = [];
        grid.removeEventListener('click', myClick)
        grid.addEventListener('click', myClick, { once: true })

    })
}

// records clicks, pushes ids generated by createGrid() to player array, calls filterWin(), sets inner text above play area.  
function myClick(event){
   let clickId = event.target.id
    if (!whoTurn) {
        event.target.className = playerX
        playerXArray.push(parseInt(clickId))
        alertMessage.innerText = "O turn!"
        whoTurn = true;
        filterWin();
    } else {
        event.target.className = playerO
        playerOArray.push(parseInt(clickId))
        event.target.innerText = "O"
        alertMessage.innerText = "X turn!"
        whoTurn = false;
        filterWin()
    }
    tie()
    }
    
//Checks player array length, if length greater than 3 iterates toWin and sends to checkWin for comparison. 

function filterWin() {
    if (playerXArray.length >= 3 || playerOArray.length >= 3){
        for (i = 0; i < toWin.length; i++ ) {
            checkWin(toWin[i])
    }
//Checks player array vs winning arrays, if elements in player array match winner declared. 
    function checkWin(array) {
        let checkX =  array.every(elem => playerXArray.includes(elem));
        let checkO =  array.every(elem => playerOArray.includes(elem));
        if (checkX == true && whoTurn == true) {
            playButton.style.visibility = "visible"
            alertMessage.innerText ='X wins!!!'
            grids.forEach( grid => grid.removeEventListener('click', myClick))
        } else if (checkO == true && whoTurn == false){
            playButton.style.visibility = "visible"
            alertMessage.innerText = 'O wins!!!'
            grids.forEach( grid => grid.removeEventListener('click', myClick))
        }
    }   
   }
}

// Checks if there is a tie 
function tie() {
    let allArray = playerXArray.length + playerOArray.length 
   if (allArray === 9 && alertMessage.innerText != 'X wins!!!' ||alertMessage.innerText != 'O wins!!!' ) {
    alertMessage.innerText = "We have a TIE!!!"
    alertMessage.style.visibility = "visible"
    playButton.style.visibility = "visible"
   }   
}

