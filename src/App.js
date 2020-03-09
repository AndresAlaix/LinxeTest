import React, { useState } from 'react';
import './App.css';
import TopHeader from './components/TopHeader';
import ScoreTable from './components/ScoreTable';
import ScoreForm from './components/ScoreForm';
import FinalScore from './components/FinalScore'

function calculateScore(gameData) {
  const changedData = gameData.map((turn, index) => {
    switch (turn.number) {
      case 10:
        turn.score = turn.firstThrow + turn.secondThrow + turn.thirdThrow
        break;

      default:
        turn.score = turn.firstThrow
        if (turn.firstThrow == 10) { // That's to calculate the score for a streak
          turn.score += gameData[index + 1].firstThrow
          if (gameData[index + 1].firstThrow == 10) {
            turn.score += turn.number == 9 ? gameData[index + 1].secondThrow : gameData[index + 2].firstThrow // that's to calculate the score in case of a second strike. The 9 turn is different for the game´s rules.
          } else {
            turn.score += gameData[index + 1].secondThrow // that's to calculate the score without a streak/spare 
          }
        } else {
          turn.score += turn.secondThrow
          if (turn.secondThrow + turn.firstThrow == 10) {
            turn.score += gameData[index + 1].firstThrow // that's to calculate the spare case
          }
        }
        break;
    }
    return turn;
  })
  return changedData;
}

function App() {
  const gameTemplate = [ //That's to generate the game's template for each player. 
    {
      number: 1,
      firstThrow: 0,
      secondThrow: 0,
      score: 0
    },
    {
      number: 2,
      firstThrow: 0,
      secondThrow: 0,
      score: 0
    }, {
      number: 3,
      firstThrow: 0,
      secondThrow: 0,
      score: 0
    }, {
      number: 4,
      firstThrow: 0,
      secondThrow: 0,
      score: 0
    }, {
      number: 5,
      firstThrow: 0,
      secondThrow: 0,
      score: 0
    }, {
      number: 6,
      firstThrow: 0,
      secondThrow: 0,
      score: 0
    }, {
      number: 7,
      firstThrow: 0,
      secondThrow: 0,
      score: 0
    }, {
      number: 8,
      firstThrow: 0,
      secondThrow: 0,
      score: 0
    }, {
      number: 9,
      firstThrow: 0,
      secondThrow: 0,
      score: 0
    }, {
      number: 10,
      firstThrow: 0,
      secondThrow: 0,
      thirdThrow: 0,
      score: 0
    },
  ]

  //hooks
  const [currentTurn, setCurrentTurn] = useState({ turn: 1, throw: 1 })
  const [game, setGame] = useState(gameTemplate);

  // handlers
  function setThrow(throwScore) {
    let newTurn = {}
    const newGame = game.map((turn) => {

      if (currentTurn.turn == turn.number) {
        switch (currentTurn.throw) {
          case 1:
            turn.firstThrow = throwScore
            break;
          case 2:
            turn.secondThrow = throwScore
            break;
          case 3:
            turn.thirdThrow = throwScore
            break;
        }

        if ((throwScore == 10) || ((turn.firstThrow + turn.secondThrow) == 10)) {
          if (turn.number < 10) {
            newTurn = {
              turn: currentTurn.turn + 1,
              throw: 1
            }
          } else {
            if (turn.number == 10 && currentTurn.throw < 3) {
              newTurn = {
                turn: currentTurn.turn,
                throw: currentTurn.throw + 1
              }
            }
          }
        } else {
          if (turn.number < 10) {
            if (currentTurn.throw == 2) {
              newTurn = {
                turn: currentTurn.turn + 1,
                throw: 1
              }
            } else {
              newTurn = {
                turn: currentTurn.turn,
                throw: 2
              }
            }
          } else if (currentTurn.throw == 1) {
            newTurn = {
              turn: currentTurn.turn,
              throw: 2
            }
          }
        }
      }
      return turn
    })
    return [newGame, newTurn]
  }

  const clickHandler = () => {
    setGame(gameTemplate)
    setCurrentTurn({ turn: 1, throw: 1 })
  }

  const turnHandler = (throwScore) => {
    const [newGame, newTurn] = setThrow(throwScore)
    setGame(calculateScore(newGame))
    setCurrentTurn(newTurn)
  }

  return (
    <>
      <TopHeader onClickHandler={() => { clickHandler() }} />
      <ScoreForm
        turn={currentTurn}
        onSubmit={throwScore => {
          turnHandler(throwScore)
        }} />
      <ScoreTable turnData={game} />
      <FinalScore onClickHandler={() => { clickHandler() }} />
    </>
  )
}

export default App;
