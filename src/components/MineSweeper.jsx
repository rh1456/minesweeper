import React, { useEffect, useState } from 'react'
import MineCell from './MineCell'
import ChooseLevel from './Level'
import Axios from 'axios'

const MineSweeper = () => {
  const [gameId, setGameId] = useState('')
  const [board, setBoard] = useState([])
  const [mines, setMines] = useState(0)
  const [state, setState] = useState('')
  const [level, setLevel] = useState('')

  const initialize = async number => {
    const resp = await Axios.post(
      'https://minesweeper-api.herokuapp.com/games',
      { difficulty: number }
    )
    setGameId(resp.data.id)
    setBoard(resp.data.board)
    setMines(resp.data.mines)
    setState(resp.data.state)
    setLevel(resp.data.difficulty)
  }
  useEffect(() => {
    initialize()
  }, [])
  // const showBoard = () => {
  //   if (board) {
  //   }
  // }

  const leftClick = async (x, y) => {
    const resp = await Axios.post(
      `https://minesweeper-api.herokuapp.com/games/${gameId}/check`,
      {
        row: x,
        col: y,
      }
    )
    setBoard(resp.data.board)
    setMines(resp.data.mines)
    setState(resp.data.state)
  }
  const rightClick = async (x, y) => {
    const resp = await Axios.post(
      `https://minesweeper-api.herokuapp.com/games/${gameId}/flag`,
      {
        row: x,
        col: y,
      }
    )
    setBoard(resp.data.board)
    setMines(resp.data.mines)
    setState(resp.data.state)
  }
  const newGame = () => {
    initialize()
  }
  //winning losing message
  // const message = state => {
  //   if (state === 'lost') {
  //     return 'Loser!'
  //   } else if (state === 'Won') {
  //     return 'Winner!'
  //   }
  // }

  return (
    <>
      <header>
        <h1>You're Playing Minesweeper!</h1>
      </header>
      <section className="buttons">
        <ChooseLevel
          easyDiff={() => initialize(0)}
          mediumDiff={() => initialize(1)}
          hardDiff={() => initialize(2)}
        />
        <button onClick={newGame}> New Game</button>
      </section>
      <main>
        <table>
          <tbody>
            {board.map((col, i) => {
              return (
                <tr key={i}>
                  {col.map((row, j) => {
                    return (
                      <MineCell
                        key={j}
                        display={board[i][j]}
                        leftClick={() => leftClick(i, j)}
                        rightClick={() => rightClick(i, j)}
                      />
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* <p {message}>" "</p> */}
      </main>
    </>
  )
}

export default MineSweeper
