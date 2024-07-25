'use client'

import React, { Suspense, useEffect, useRef } from 'react'
import TopBar from '@/app/game/ui/TopBar'
import { getRandomItem, getRandomInt, shuffleArray } from '../../lib/utils'
import BottomBar from './BottomBar'
import Spinner from '@/app/ui/Spinner'
import { useSearchParams } from 'next/navigation'
import { GameSelection } from './GameSelection'
import { StateProvider, useStateContext } from '../context'
import GameResult from './GameResults'
import { insertGameplay } from '@/app/api/gameplay/data'

export type MathQuizProps = {
  quizes: any[]
}

const timerOutResponses = [
  'Sorry time is over!',
  'Too slow, time is out',
  'Time out',
  'You have ran out of time',
]

const correctResponses = [
  'You are Correct!',
  'Awesome!',
  "That's correct",
  'Too easy',
  'You are right!',
  'Piece of cake!',
  'Correct, you are amazing',
]

const wrongResponses = [
  'Oops! not this time. Try again',
  "That's incorrect",
  'No luck, try again',
  'Sorry, try again',
  'Wrong, try again',
  'Maybe stop guessing, try again',
  "I dont think that's right",
]

const MathQuizComponent = (props: MathQuizProps) => {
  const { quizes } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()!
  const {
    state: {
      gameWords,
      gameSelection: { totalWords, difficulty, totalSeconds },
      userAnswerInput,
      currentWord,
      shuffledWord,
      correctAnswers,
      wrongAnswers,
      roundCount,
      skippedWords,
      gameStatus,
      gameAction,
      restartTimer,
      gameSelection,
      currentTime,
      totalTime,
    },
    dispatch,
  } = useStateContext()

  // params
  const playerName = searchParams.get('playerName') || 'no-name'
  const level = searchParams.get('level') || 'expert/senior'

  const speakRandomResponse = (
    responses: string[],
    defaulWord: string = ''
  ) => {
    const pickedResponse = getRandomInt(0, responses.length - 1)
  }

  const createNewWord = () => {
    const newWord = getRandomItem(gameWords)
    dispatch({ type: 'setCurrentWord', payload: newWord })
    // filter with levels , remove the word from the words collection
    const removeNewWord = gameWords.filter((item) => {
      return item.word != currentWord?.word
    })
    dispatch({
      type: 'setShuffledWord',
      payload: shuffleArray(newWord.word.split('')).join(''),
    })
    dispatch({ type: 'setGameWords', payload: removeNewWord })
  }

  const answerIsCorrect = () => {
    dispatch({ type: 'setGameStatus', payload: 'answer-correct' })
    speakRandomResponse(correctResponses, 'correct!')
    dispatch({ type: 'setCorrectAnswers', payload: correctAnswers + 1 })
    const newTotalTime = totalTime + currentTime
    dispatch({ type: 'setTotalTime', payload: newTotalTime })
    nextWord()
  }

  const validateAnswer = () => {
    if (
      userAnswerInput.trim().toLowerCase() === currentWord?.word!.toLowerCase()
    ) {
      answerIsCorrect()
    } else {
      speakRandomResponse(wrongResponses, 'incorrect')
    }
  }

  const validateIsGameOver = () => {
    if (roundCount >= totalWords) {
      return true
    }
    return false
  }

  const nextWord = async () => {
    dispatch({ type: 'setGameAction', payload: 'next-word' })
  }

  const skipWord = () => {
    dispatch({ type: 'setGameStatus', payload: 'skip-word' })
    dispatch({ type: 'setSkippedWords', payload: skippedWords + 1 })
    dispatch({ type: 'setRestartTimer', payload: false })
    dispatch({ type: 'setGameAction', payload: 'skip-word' })
  }

  const gameStart = () => {
    const newGameWords = quizes.filter((item) => item.level === level)
    dispatch({ type: 'setGameWords', payload: newGameWords })
    dispatch({ type: 'setGameStatus', payload: 'start' })
    dispatch({ type: 'setGameAction', payload: 'start' })
  }

  const onQuit = () => {
    window.location.href = '/'
  }

  const onTimerOver = () => {
    dispatch({ type: 'setGameStatus', payload: 'timeout' })
    dispatch({ type: 'setWrongAnswers', payload: wrongAnswers + 1 })
    speakRandomResponse(timerOutResponses)
    dispatch({ type: 'setRestartTimer', payload: false })
    if (validateIsGameOver()) {
      dispatch({ type: 'setGameAction', payload: 'game-over' })
    } else {
      nextWord()
    }
  }

  // TimeOut handlers
  useEffect(() => {
    let timeoutId: any
    if (gameAction === 'start') {
      timeoutId = setTimeout(() => {
        nextWord()
      }, 1000)
    }
    if (gameAction === 'next-word') {
      if (validateIsGameOver()) {
        dispatch({ type: 'setGameAction', payload: 'game-over' })
        return
      }
      timeoutId = setTimeout(() => {
        dispatch({ type: 'setUserAnswerInput', payload: '' })
        dispatch({ type: 'setGameStatus', payload: 'playing' })
        dispatch({ type: 'setRestartTimer', payload: true })
        dispatch({ type: 'setRoundCount', payload: roundCount + 1 })
        dispatch({ type: 'setGameAction', payload: '' })
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus()
          }
        }, 500)
        createNewWord()
      }, 2500)
    }
    if (gameAction === 'skip-word') {
      timeoutId = setTimeout(() => {
        if (validateIsGameOver()) {
          dispatch({ type: 'setGameAction', payload: 'game-over' })
        } else {
          nextWord()
        }
      }, 1000)
    }
    if (gameAction === 'game-over') {
      timeoutId = setTimeout(() => {
        dispatch({ type: 'setGameStatus', payload: 'game-over' })
      }, 1500)
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [
    gameAction,
    gameSelection,
    gameWords,
    roundCount,
    gameSelection.totalWords,
  ])

  const onWordSubmit = () => {
    validateAnswer()
  }

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      onWordSubmit()
    }
  }

  const isReady = quizes.length
  const stopTimer = ['game-over', 'skip-word', 'answer-correct'].includes(
    gameStatus
  )
  const isTimeOutWarning = currentTime <= (totalSeconds / 2 || 4)

  useEffect(() => {
    ;(async () => {
      if (gameStatus === 'game-over') {
        const rating = (correctAnswers / totalWords) * 100

        const response = await insertGameplay({
          playerName,
          totalSeconds,
          wrongAnswers,
          correctAnswers,
          rating,
          level,
          difficulty,
        })

        console.log(response)
      }
    })()
  }, [gameStatus])

  return (
    <Suspense>
      <div className="flex flex-col h-screen bg-gray-200 w-full">
        <TopBar
          correctAnswers={correctAnswers}
          playerName={playerName}
          onTimerOver={onTimerOver}
          restartTimer={restartTimer}
          enableTimer={gameSelection.enableTimer === 'On'}
          totalSeconds={gameSelection.totalSeconds}
          stopTimer={stopTimer}
          level={level}
        />

        {!isReady && <Spinner />}

        {isReady && (
          <div className="p-4 w-11/12 mt-4 self-center">
            <div className="flex flex-col justify-center">
              {gameStatus === 'selection' && (
                <GameSelection onStart={gameStart} />
              )}
              {gameStatus === 'start' && (
                <div className="md:w-1/2 self-center mt-2">
                  <h1 className="text-center mb-8 text-4xl font-extrabold">
                    Game is starting...
                  </h1>
                </div>
              )}
              {gameStatus === 'playing' && isTimeOutWarning && (
                <button
                  className="bg-orange-100 p-4 mb-4 rounded-xl text-xl font-bold hover:bg-orange-200 border"
                  onClick={() => {
                    skipWord()
                  }}
                >
                  Skip the word
                </button>
              )}

              {gameStatus === 'timeout' && (
                <div className="px-5 py-4 rounded-xl text-4xl font-bold text-center">
                  TimeOut!
                </div>
              )}
              {(gameStatus === 'skip-word' || gameStatus === 'timeout') && (
                <div className=" px-5 py-4 rounded-xl text-2xl font-bold text-center">
                  The correct answer is{' '}
                  <span className="text-red-500">{currentWord?.word}</span>
                </div>
              )}
              {gameStatus === 'answer-correct' && (
                <div className=" px-5 py-4 rounded-xl text-2xl font-bold text-center">
                  You are correct!
                </div>
              )}

              {gameStatus === 'playing' && (
                <div className="game-container mt-2">
                  <div className="flex justify-center flex-col">
                    <div className="flex justify-center flex-col">
                      <input
                        type="text"
                        name="word-input"
                        id="word-input"
                        className="bg-white p-4 rounded-xl text-2xl font-bold"
                        placeholder="Spell the word here!"
                        value={userAnswerInput}
                        onChange={(e) =>
                          dispatch({
                            type: 'setUserAnswerInput',
                            payload: e.target.value,
                          })
                        }
                        onKeyDown={handleKeyDown}
                        disabled={!currentWord?.word}
                        autoComplete="off"
                        spellCheck="false"
                        ref={inputRef}
                      />
                      <button
                        className="mt-1 p-4 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none text-2xl font-bold rounded-xl disabled:bg-gray-400"
                        onClick={onWordSubmit}
                        disabled={!userAnswerInput.length}
                        onKeyDown={handleKeyDown}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {gameStatus === 'game-over' && (
                <GameResult
                  correctAnswers={correctAnswers}
                  totalWords={totalWords}
                  playerName={playerName}
                  wrongAnswers={wrongAnswers}
                  skippedWords={skippedWords}
                  totalTime={totalTime}
                />
              )}
            </div>
          </div>
        )}

        <BottomBar
          roundCount={roundCount}
          skippedWords={skippedWords}
          wrongAnswers={wrongAnswers}
          totalWords={totalWords}
          onQuit={onQuit}
        />
      </div>
    </Suspense>
  )
}

export default function MathQuiz(props: MathQuizProps) {
  const { quizes } = props

  return (
    <StateProvider>
      <Suspense>
        <MathQuizComponent quizes={quizes} />
      </Suspense>
    </StateProvider>
  )
}
