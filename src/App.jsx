import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log'
import { WINNING_COMBINATIONS } from './winning-combination'
import GameOver from './components/GameOver'

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player == 'X') {
    currentPlayer = 'O'
  }
}

function deriveWinner(boardGame, players) {
  let winner

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      boardGame[combination[0].row][combination[0].column]
    const secondSquareSymbol =
      boardGame[combination[1].row][combination[1].column]
    const thirdSquareSymbol =
      boardGame[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol]
    }
  }

  return winner
}

function deriveGameBoard(gameTurns) {
  let boardGame = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])]
  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, column } = square

    boardGame[row][column] = player
  }

  return boardGame
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState(PLAYERS)

  const activePlayer = deriveActivePlayer(gameTurns)
  const gameBoard = deriveGameBoard(gameTurns)

  function handeleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = 'X'
      if (prevTurns.length > 0 && prevTurns[0].player == 'X') {
        currentPlayer = 'O'
      }

      const updatedTurns = [
        { square: { row: rowIndex, column: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]

      return updatedTurns
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      }
    })
  }

  const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurns.length === 9 && !winner

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol={'X'}
            isActive={activePlayer == 'X'}
            onChangeName={handlePlayerName}
          />
          <Player
            name={PLAYERS.O}
            symbol={'O'}
            isActive={activePlayer == 'O'}
            onChangeName={handlePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handeleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
