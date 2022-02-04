const startGame = (function () {
    const playButton = document.querySelector('.startButton');

    const newPlayerOne = {};
    const newPlayerTwo = {};

    function creatingBoardArea() {
        const emptyBoardArea = document.createElement('div');
        emptyBoardArea.setAttribute('id', 'boardArea');
        document.body.append(emptyBoardArea);
}


    function promptPlayers() {

        const adversaryDiv = document.querySelector('#adversaryDiv');
        adversaryDiv.textContent = "";
        const containerForm = document.createElement('div');
        containerForm.setAttribute('id', 'containerForm');
        //document.body.insertBefore(containerForm, boardArea);
        //document.body.append(containerForm);
        adversaryDiv.style.gridTemplateColumns = '1fr';
        adversaryDiv.appendChild(containerForm);
        

        const form = document.createElement('form');
        form.setAttribute('id', 'playersInfo');
        containerForm.appendChild(form); 

        const containerNamePlayerOne = document.createElement('div');
        containerNamePlayerOne.setAttribute('class', 'containerInputs');
        form.appendChild(containerNamePlayerOne);

        const labelNamePlayerOne = document.createElement('label');
        labelNamePlayerOne.setAttribute('for', 'namePlayerOne');
        labelNamePlayerOne.setAttribute('class', 'labelName');
        labelNamePlayerOne.textContent = 'P1';
        containerNamePlayerOne.appendChild(labelNamePlayerOne); 

        const namePlayerOne = document.createElement('input');
        namePlayerOne.setAttribute('id', 'namePlayerOne');
        namePlayerOne.setAttribute('class', 'nameField');
        namePlayerOne.setAttribute('type', 'text');
        namePlayerOne.setAttribute('placeholder', 'ENTER PLAYER NAME')
        containerNamePlayerOne.appendChild(namePlayerOne);
        //const playerOne = namePlayerOne.value;
        //const namePlayerOne = playerOne.value;

        const containerNamePlayerTwo = document.createElement('div');
        containerNamePlayerTwo.setAttribute('class', 'containerInputs');
        form.appendChild(containerNamePlayerTwo);

        const labelNamePlayerTwo = document.createElement('label');
        labelNamePlayerTwo.setAttribute('for', 'namePlayerTwo');
        labelNamePlayerTwo.setAttribute('class', 'labelName');
        labelNamePlayerTwo.textContent = 'P2';
        containerNamePlayerTwo.appendChild(labelNamePlayerTwo); 

        const namePlayerTwo = document.createElement('input');
        namePlayerTwo.setAttribute('id', 'namePlayerTwo');
        namePlayerTwo.setAttribute('class', 'nameField');
        namePlayerTwo.setAttribute('type', 'text');
        namePlayerTwo.setAttribute('placeholder', 'ENTER PLAYER NAME')
        containerNamePlayerTwo.appendChild(namePlayerTwo);
        //const playerTwo = namePlayerTwo.value;
        //const namePlayerTwo = playerTwo.value;

        const submitButtonContainer = document.createElement('div');
        submitButtonContainer.setAttribute('class', 'submit_button');
        form.appendChild(submitButtonContainer);


        const submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('id', 'submitButton');
        submitButton.value = 'PLAY'; 
        submitButtonContainer.appendChild(submitButton);
        

        const cancelButtonArea = document.createElement('div');
        cancelButtonArea.setAttribute('id', 'cancelButtonArea');
        document.body.append(cancelButtonArea);

        const cancelButton = document.createElement('button');
        cancelButton.setAttribute('type', 'button');
        cancelButton.setAttribute('id', 'cancelButton');
        cancelButton.innerHTML = '<span class="material-icons-outlined">highlight_off</span>';
        cancelButtonArea.appendChild(cancelButton);
        cancelButton.addEventListener('click', closeAdversaryDiv);

        function closeAdversaryDiv() {
            adversaryDiv.remove();
            cancelButton.remove();
        }



        form.addEventListener('submit', submitPlayerInfo)

        function submitPlayerInfo(e) { 
            e.preventDefault();
            console.log(namePlayerOne.value);
            //const playerOne = namePlayerOne.value;
            //const playerTwo = namePlayerTwo.value;
               startGame.newPlayerOne = players(namePlayerOne.value, 'X');
               startGame.newPlayerTwo = players(namePlayerTwo.value, 'O');
               gameBoard.boardConstruction();
               gameBoard.playersPlate();
               adversaryDiv.remove();
               cancelButton.remove();
               gameFlow.playerOnePlays();
        }
}



        function iniatiateGame() {
        playButton.addEventListener('click' , chooseAdversary)
    }

        function displayBoard() {
        gameBoard.boardConstruction(); 
    }


    function chooseAdversary() { 
        const adversaryDiv = document.createElement('div');
        adversaryDiv.setAttribute('id', 'adversaryDiv');
        document.body.append(adversaryDiv);

        const vsChoise = document.createElement('button');
        vsChoise.setAttribute('class', 'choiseDiv');
        vsChoise.textContent = 'VS';
        vsChoise.addEventListener('click', promptPlayers);
        adversaryDiv.appendChild(vsChoise);
        

        const vsIa = document.createElement('button');
        vsIa.setAttribute('class', 'choiseDiv');
        vsIa.textContent = 'IA';
        adversaryDiv.appendChild(vsIa);
        
    }

    return { iniatiateGame, newPlayerOne, newPlayerTwo, creatingBoardArea  }
})();


//startGame.creatingBoardArea();

const gameBoard = (function () {
    
    const tilesContent = []; 


    /*
    function boardConstruction() {
    const boardArea = document.querySelector('#boardArea');
     for(let i = 0; i < 9; i++) {
       const board = document.createElement('div');
        boardArea.appendChild(board);
        board.setAttribute('class', 'board');
        boardArea.style.backgroundColor = 'black';
        tilesContent.push(board);
        }
    }
*/
    function boardConstruction() {
       // const boardArea = document.querySelector('#boardArea')
        const board = document.querySelectorAll('.board')
        board.forEach(tile => {
            tile.textContent = '';
            tile.style.backgroundColor = 'black';
            tilesContent.push(tile);
        });
        
    }


    function playersPlate() {
        const startButtonArea = document.querySelector('#startButtonArea');
        const startButtonDiv = document.querySelector('#startButtonDiv');

        const playerOnePlate = document.createElement('div');
        playerOnePlate.setAttribute('id', 'playerOnePlate');
        playerOnePlate.setAttribute('class', 'playerPlates');
        playerOnePlate.textContent = namePlayerOne.value;
        startButtonArea.insertBefore(playerOnePlate, startButtonDiv);
    
        const playerTwoPlate = document.createElement('div');
        playerTwoPlate.setAttribute('id', 'playerTwoPlate');
        playerTwoPlate.setAttribute('class', 'playerPlates');
        playerTwoPlate.textContent = namePlayerTwo.value;
        startButtonArea.appendChild(playerTwoPlate);
    }


    return { boardConstruction, tilesContent, playersPlate } 
    
})();





const players = function (name, symbol) {
    return {
        name,
        symbol
    }
};





const gameFlow = function () {

    const comboX = [];
    const comboO = [];

    let temporalIndex = [];

    //const winnersIndex = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8],[2,4,6], [3,4,5], [6,7,8]]
    const winnersIndex = ['012', '036', '048', '147', '258', '246', '345', '678'];
  /*
    function checkIfXOrOisWinning(arrayGameStatus, letter) { 
        let winCombo = [];
        for(let i = 0; i < arrayGameStatus.length; i++) { 
            if(letter === arrayGameStatus[i]) winCombo.push(i)} 
            return winCombo;
      }

*/







      function checkGameStatus() {
        
         comboO.length = 0;
         comboX.length = 0;  
         


        let gameStatus = [];
        gameBoard.tilesContent.forEach( tile => gameStatus.push(tile.textContent));
        for( let i = 0; i < gameStatus.length; i++) {
            if(gameStatus[i] === 'X') {
                comboX.push(i);
                comboX.sort()
            }
            else if(gameStatus[i] === 'O') {
                comboO.push(i);
                comboO.sort();
            }
        }

       

       //return { comboX, comboO }

       }
        

       // NO COMPARA ARRAYS DE MAS DE 3 ELEMENTOS 

       let testArray = [];

       function checkWinStatus() {
        let estado; 
        for(let i = 0; i < winnersIndex.length; i++) {
            if(winnersIndex[i] === comboX.join("")) {
                estado = 'funciona';
           }   
          }
        console.log(estado);
       }




        /*
        for(let i = 0; i < winnersIndex.length; i++) {
            if (JSON.stringify(containerWinCombo) === JSON.stringify(winnersIndex[i])) {
                finalDecision = 'Ganador X';
            }
            else {
                finalDecision = 'Todavia no';
            }
        }
        */
 

    





/* FUNCIONAAAA
    function checkGameStatus() {
        let gameStatus = [];
        gameBoard.tilesContent.forEach( tile => gameStatus.push(tile.textContent));
        if(gameStatus[0] === 'X' && gameStatus[1] === 'X' && gameStatus[2] === 'X') {
            console.log('GANASTE X');
        } 
        else if(gameStatus[0] === 'X' && gameStatus[3] === 'X' && gameStatus[6] === 'X') {
            console.log('GANASTE X')
        }
        else if(gameStatus[0] === 'X' && gameStatus[4] === 'X' && gameStatus[8] === 'X') {
            console.log('GANASTE X')
        }
        else if(gameStatus[1] === 'X' && gameStatus[4] === 'X' && gameStatus[7] === 'X') {
            console.log('GANASTE X')
        }
        else if(gameStatus[2] === 'X' && gameStatus[5] === 'X' && gameStatus[8] === 'X') {
            console.log('GANASTE X')
        }
        else if(gameStatus[2] === 'X' && gameStatus[4] === 'X' && gameStatus[6] === 'X') {
            console.log('GANASTE X')
        }
        else if(gameStatus[3] === 'X' && gameStatus[4] === 'X' && gameStatus[5] === 'X') {
            console.log('GANASTE X')
        }
        else if(gameStatus[0] === 'O' && gameStatus[1] === 'O' && gameStatus[2] === 'O') {
            console.log('GANASTE O')
        }
        else if(gameStatus[0] === 'O' && gameStatus[3] === 'O' && gameStatus[6] === 'O') {
            console.log('GANASTE O')
        }
        else if(gameStatus[0] === 'O' && gameStatus[4] === 'O' && gameStatus[8] === 'O') {
            console.log('GANASTE O')
        }
        else if(gameStatus[1] === 'O' && gameStatus[4] === 'O' && gameStatus[7] === 'O') {
            console.log('GANASTE O')
        }
        else if(gameStatus[2] === 'O' && gameStatus[5] === 'O' && gameStatus[8] === 'O') {
            console.log('GANASTE O')
        }
        else if(gameStatus[2] === 'O' && gameStatus[4] === 'O' && gameStatus[6] === 'O') {
            console.log('GANASTE O')
        }
        else if(gameStatus[3] === 'O' && gameStatus[4] === 'O' && gameStatus[5] === 'O') {
            console.log('GANASTE O')
        }
        else if(gameStatus[6] === 'O' && gameStatus[7] === 'O' && gameStatus[8] === 'O') {
            console.log('GANASTE O')
        }
        else  { 
            console.log('No');
        }
    }

*/


/*
    function testeandoXGana(array) {
        switch('X') {
            case array[0] && array[1] && array[2]:
            case array[0] && array[3] && array[6]:
            case array[0] && array[4] && array[8]:
            case array[1] && array[4] && array[7]:
            case array[2] && array[5] && array[8]:
            case array[2] && array[4] && array[6]:
            case array[3] && array[4] && array[5]:
            case array[6] && array[7] && array[8]:
                console.log('Ganaste X')
                break;  
            default:
                console.log('no') 
                break;  
        }
    }

    function testeandoOGana(array) {
        switch('O') {
            case array[0] && array[1] && array[2]:
            case array[0] && array[3] && array[6]:
            case array[0] && array[4] && array[8]:
            case array[1] && array[4] && array[7]:
            case array[2] && array[5] && array[8]:
            case array[2] && array[4] && array[6]:
            case array[3] && array[4] && array[5]:
            case array[6] && array[7] && array[8]:
                console.log('Ganaste O')
                break;  
            default:
                console.log('no') 
                break;  
        }
    }

    function checkGameStatus() {
        let gameStatus = [];
        gameBoard.tilesContent.forEach( tile => gameStatus.push(tile.textContent));
        testeandoXGana(gameStatus);
        testeandoOGana(gameStatus);
}

*/



    function playerOnePlays() {
        gameBoard.tilesContent.forEach( tile => tile.removeEventListener('click', playerTwoSymbol));
        gameBoard.tilesContent.forEach( tile => tile.addEventListener('click', playerOneSymbol));

    }

    function playerOneSymbol(e) {
        if(e.target.classList.contains('playerTwo')) return;
        e.target.textContent = startGame.newPlayerOne.symbol;
        e.target.classList.add('playerOne');
        e.target.classList.add('playerOneColor');
        checkGameStatus();
        checkWinStatus();
        playerTwoPlays();
    }


    function playerTwoPlays(){
        gameBoard.tilesContent.forEach( tile => tile.removeEventListener('click', playerOneSymbol));
        gameBoard.tilesContent.forEach( tile => tile.addEventListener('click', playerTwoSymbol));
    }

    function playerTwoSymbol(e){
    if(e.target.classList.contains('playerOne')) return;
     e.target.textContent = startGame.newPlayerTwo.symbol;
     e.target.classList.add('playerTwo');
     e.target.classList.add('playerTwoColor');
        checkGameStatus();
        checkWinStatus();
        playerOnePlays();
    }
    

    


    return { playerOnePlays, playerTwoPlays,checkGameStatus, checkWinStatus, comboO, comboX, temporalIndex }

}();


/*

tilesContent.push(board);
        board.addEventListener('click', test)

function test(e) {
    
            e.target.textContent = startGame.newPlayerOne.symbol;
            const activeEventListener = document.querySelector('.board');
            activeEventListener.removeEventListener('click', test);
            activeEventListener.addEventListener('click', testTwo);
          }
      
function testTwo(e) {
              e.target.textContent = startGame.newPlayerTwo.symbol;
          }
          */