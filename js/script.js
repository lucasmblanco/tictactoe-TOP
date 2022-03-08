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
        const startButtonText = document.querySelector('.startButton');
        startButtonText.textContent = 'ENTER PLAYERS NAME'; 
        startButtonText.style.fontSize = '20px';
        startButtonText.style.color = '#BB86FC';
      

        const adversaryDiv = document.querySelector('#adversaryDiv');
        adversaryDiv.textContent = "";
        const containerForm = document.createElement('div');
        containerForm.setAttribute('id', 'containerForm');
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
        namePlayerOne.setAttribute('maxLength', '8');
        namePlayerOne.required = true;
        containerNamePlayerOne.appendChild(namePlayerOne);


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
        namePlayerTwo.setAttribute('maxLength', '8');
        namePlayerTwo.required = true;
        containerNamePlayerTwo.appendChild(namePlayerTwo);


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
           
            playButton.textContent = 'START';
            playButton.removeAttribute('style');
            iniatiateGame();
        }



        form.addEventListener('submit', submitPlayerInfo)

        function submitPlayerInfo(e) {
            e.preventDefault();
               startGame.newPlayerOne = players(namePlayerOne.value.toUpperCase(), 'X');
               startGame.newPlayerTwo = players(namePlayerTwo.value.toUpperCase(), 'O');
               

               const startButtonText = document.querySelector('.startButton');
               startButtonText.textContent = `${startGame.newPlayerOne.name} IS PLAYING`; 
               startButtonText.style.fontSize = '20px';
               startButtonText.style.color = '#BB86FC';

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



    function chooseAdversary() { 

        const playButton = document.querySelector('.startButton');
        playButton.removeEventListener('click', chooseAdversary);

        const startButtonText = document.querySelector('.startButton');
        startButtonText.textContent = 'CHOOSE MODE'; 
        startButtonText.style.fontSize = '30px';
        startButtonText.style.color = '#BB86FC';
    

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


const gameBoard = (function () {
    
    const tilesContent = []; 

    function boardConstruction() {
        tilesContent.length = 0;
        const board = document.querySelectorAll('.board')
        board.forEach(tile => {
            tile.textContent = '';
            tile.style.backgroundColor = '#BB86FC';
            tilesContent.push(tile);
        })
    }


    function playersPlate() {
        const startButtonArea = document.querySelector('#startButtonArea');
        const startButtonDiv = document.querySelector('#startButtonDiv');

        const playerOnePlate = document.createElement('div');
        playerOnePlate.setAttribute('id', 'playerOnePlate');
        playerOnePlate.setAttribute('class', 'playerPlates');
        playerOnePlate.textContent = `${startGame.newPlayerOne.name}`;
        startButtonArea.insertBefore(playerOnePlate, startButtonDiv);
    
        const playerTwoPlate = document.createElement('div');
        playerTwoPlate.setAttribute('id', 'playerTwoPlate');
        playerTwoPlate.setAttribute('class', 'playerPlates');
        playerTwoPlate.textContent = `${startGame.newPlayerTwo.name}`;
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

    const tieArray = []; 
    const checkingBoardArea = document.querySelector('#boardArea');
    const startButtonText = document.querySelector('.startButton');
      
    const winnersIndex = [
      [0,1,2], 
      [0,3,6], 
      [0,4,8], 
      [1,4,7], 
      [2,5,8],
      [2,4,6], 
      [3,4,5], 
      [6,7,8]
    ]

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

    }


    function checkWinStatus() {

        let combinationX = winnersIndex.map(index => index.filter(position => comboX.includes(position)));
        let combinationO = winnersIndex.map(index => index.filter(position => comboO.includes(position)));

        for( let i of combinationX ) {
         if( i.length === 3) {
            const boardArea = document.querySelector('#boardArea');
            boardArea.textContent = ''; 
            const winnerArea = document.createElement('div');
            const lineOne = document.createElement('div');
            const lineTwo = document.createElement('div'); 
            winnerArea.setAttribute('id', 'winnerArea');;
            lineOne.setAttribute('id', 'lineOne');
            lineTwo.setAttribute('id', 'lineTwo');
            lineOne.textContent = 'THE WINNER IS';
            lineTwo.textContent = `${startGame.newPlayerOne.name}`;  
            boardArea.appendChild(winnerArea);
            winnerArea.appendChild(lineOne);
            winnerArea.appendChild(lineTwo);



            
            startButtonText.textContent = '(─‿‿─)'; 
            startButtonText.style.fontSize = '20px';
            startButtonText.style.color = 'white';

            restartButton();
            newGame();
         }
     }

        for(let i of combinationO) {
         if( i.length === 3) {
            const boardArea = document.querySelector('#boardArea');
            boardArea.textContent = ''; 
            const winnerArea = document.createElement('div');
            const lineOne = document.createElement('div');
            const lineTwo = document.createElement('div'); 
            winnerArea.setAttribute('id', 'winnerArea');
        
            lineOne.setAttribute('id', 'lineOne');
            lineTwo.setAttribute('id', 'lineTwo');
            lineOne.textContent = 'THE WINNER IS';
            lineTwo.textContent = `${startGame.newPlayerTwo.name}`;  
            boardArea.appendChild(winnerArea);
          
            winnerArea.appendChild(lineOne);
            winnerArea.appendChild(lineTwo);

            
            startButtonText.textContent = '(─‿‿─)'; 
            startButtonText.style.fontSize = '20px';
            startButtonText.style.color = 'white';

            restartButton();
            newGame();
        }
      }
    }

    

       
        
 
 
/* -------------- ALTERNATIVA QUE FUNCIONA -------------

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
-------------------------------------------------------------*/


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

        if(e.target.classList.contains('playerTwo') || e.target.classList.contains('playerOne') ) return;
        startButtonText.textContent = `${startGame.newPlayerTwo.name} IS PLAYING`; 
        startButtonText.style.fontSize = '20px';
        startButtonText.style.color = '#BB86FC';

      
        e.target.textContent = startGame.newPlayerOne.symbol;
        e.target.classList.add('playerOne');
        e.target.classList.add('playerOneColor');

        tieArray.push('X'); 
        checkGameStatus();
        checkWinStatus()
        playerTwoPlays();

        if( tieArray.length === 9 && checkingBoardArea.childElementCount === 9) {
            tieTest();        
    }
        
    }


    function playerTwoPlays(){
        gameBoard.tilesContent.forEach( tile => tile.removeEventListener('click', playerOneSymbol));
        gameBoard.tilesContent.forEach( tile => tile.addEventListener('click', playerTwoSymbol));
    }

    function playerTwoSymbol(e){
        if(e.target.classList.contains('playerOne') || e.target.classList.contains('playerTwo')) return;
        startButtonText.textContent = `${startGame.newPlayerOne.name} IS PLAYING`; 
        startButtonText.style.fontSize = '20px';
        startButtonText.style.color = '#BB86FC ';

        
        e.target.textContent = startGame.newPlayerTwo.symbol;
        e.target.classList.add('playerTwo');
        e.target.classList.add('playerTwoColor');
        
        tieArray.push('O'); 
        checkGameStatus();
        checkWinStatus();
        playerOnePlays();
    }
    

    function tieTest() {

        tieArray.length = 0;

        checkingBoardArea.textContent = ''; 
        const winnerArea = document.createElement('div');
        const lineOne = document.createElement('div');
      
        winnerArea.setAttribute('id', 'winnerArea');
        lineOne.setAttribute('id', 'lineOneTie');

        lineOne.textContent = 'IS A TIE';
      


        checkingBoardArea.appendChild(winnerArea);
        winnerArea.appendChild(lineOne);
    

        
        startButtonText.textContent = '(︶︹︺)'; 
        startButtonText.style.fontSize = '20px';
        startButtonText.style.color = 'white'; 

        restartButton();
        newGame();
    }


    function restartButton() {

        const winnerArea = document.querySelector('#winnerArea');

        tieArray.length = 0;

        const restartButtonDiv = document.createElement('div');
        const restartButton = document.createElement('button');

        restartButtonDiv.setAttribute('id', 'restartButtonDiv');
        restartButton.setAttribute('id', 'restartButton');

        restartButton.textContent = 'PLAY AGAIN?';

        winnerArea.appendChild(restartButtonDiv);
        restartButtonDiv.appendChild(restartButton);

        restartButton.addEventListener('click', restartGame)

        function restartGame() {

            const boardArea = document.querySelector('#boardArea');
            boardArea.textContent = '';
            for(let i = 0; i < 9; i++) {
                const board = document.createElement('div');
                board.setAttribute('class', 'board');
                boardArea.appendChild(board);
            }
            gameBoard.boardConstruction();
            gameFlow.playerOnePlays();

          
            startButtonText.textContent = `${startGame.newPlayerOne.name} IS PLAYING`; 
            startButtonText.style.fontSize = '20px';
            startButtonText.style.color = '#BB86FC';
        }

       

    }

    function newGame() {
        const winnerArea = document.querySelector('#winnerArea');

        tieArray.length = 0;

        const newGameButtonDiv = document.createElement('div');
        const newGameButton = document.createElement('button');

        newGameButtonDiv.setAttribute('id', 'newGameButtonDiv');
        newGameButton.setAttribute('id', 'newGameButton');

        newGameButton.textContent = 'NEW GAME';

        winnerArea.appendChild(newGameButtonDiv);
        newGameButtonDiv.appendChild(newGameButton);

        newGameButton.addEventListener('click', restarAll)

        function restarAll() {
            window.location.reload();
        }
    }
    return { playerOnePlays, playerTwoPlays,checkGameStatus, comboO, comboX}

}();


window.onload = startGame.iniatiateGame();