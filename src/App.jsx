import Player from './Player'

function App() {
  

  return (
    <main>
      <div id='game-container'>
        <ol id="players">
          <Player name='Player 1' symbol='X'/>
          <Player name='Player 2' symbol='0'/>
        </ol>
        
        GAME board
      </div>
      LOG
    </main>
  )
}

export default App
