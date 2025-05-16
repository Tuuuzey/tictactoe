import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];
  for(const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveAcitvePlayer(gameTurns) {
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  };
  return currentPlayer;
}


function deriveWinner(gameBoard, players) {
  let winner;
  
  for(const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].col];
    const secondSquare = gameBoard[combination[1].row][combination[1].col];
    const thirdSquare = gameBoard[combination[2].row][combination[2].col];
    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[firstSquare];
    }
  }
  return winner;
}
function App() {
  const [players, setPlayers ] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveAcitvePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  let isDraw = gameTurns.length === 9 && !winner;


  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveAcitvePlayer(prevTurns);

      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns];
    
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers=>{return {...prevPlayers, [symbol]: newName}});
  }

  return (
    <main>
      <div id='game-container'>
        <ol id="players" className='highlight-player'>
          <Player name={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
