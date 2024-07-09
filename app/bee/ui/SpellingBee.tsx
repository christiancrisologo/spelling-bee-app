'use client'

import React, { ReactNode, Suspense, useEffect } from 'react'
import { Word as WordType } from '../../lib/definitions'
import TopBar from './TopBar'
import { getRandomItem, getRandomInt, shuffleArray } from '../../lib/utils'
import BottomBar from './BottomBar'
import Spinner from '../../ui/Spinner'
import { useSearchParams } from 'next/navigation'
import { GameSelection } from './GameSelection'
import { useSpeechSynthesis } from '@/app/lib/useSpeechSynthesis'
import { StateProvider, useStateContext } from '../context'
import GameResult from './GameResults'
import ShuffleWord from './ShuffledWord'

export type SpellingBeeProps = {
  words: WordType[]
}

type OptButtonType = {
  onClick: () => void
  children: ReactNode
}

const OptButton = (props: OptButtonType) => {
  const { onClick, children } = props

  return (
    <button
      className="flex grow bg-white p-4 m-1 border-gray-500 hover:border-blue-500 hover:text-blue-500 border-gray-40 border-4 rounded-xl text-lg font-bold text-center"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const timerOutResponses = [
  'Sorry time is over!',
  'Too slow, time is out',
  'Time out',
  'You have ran out of time',
]

const correctResponses = [
  'You are definitely Correct!',
  'Awesome! to the next one.',
  "That's correct",
  'Too easy, try the next one',
  'Piece of cake!',
  'Correct, No way you will get that wrong',
]

const wrongResponses = [
  'Oops not this time. Try again',
  "That's incorrect",
  'No luck, try again',
  'Sorry, try again',
  'Maybe stop guessing, try again',
  "Hmmm... I dont think that's right",
]

const getHints = (currentWord: WordType): string[] => {
  const hints: string[] = [
    'this word have ' + currentWord?.word.length! + ' letters',
    'It starts with the letter ' + currentWord?.word[0],
    'It ends with the letter ' +
      currentWord?.word[currentWord?.word.length - 1],
  ]
  if (currentWord?.synonyms?.length) {
    hints.push('This is with a synonym of ' + currentWord?.synonyms.toString())
  }
  if (currentWord?.antonyms?.length) {
    hints.push('This is with an antonym of ' + currentWord?.antonyms.toString())
  }
  if (currentWord?.category && currentWord?.category !== 'other') {
    hints.push('This is categorized as a ' + currentWord?.category)
  }
  return hints
}

const SpellingBeeComponent = (props: SpellingBeeProps) => {
  const { words } = props
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
  const { speak, speechSynth } = useSpeechSynthesis()

  // params
  const playerName = searchParams.get('playerName') || 'no-name'
  const level = searchParams.get('level') || 'expert/senior'

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const speakWord = (wordToSpeak: string) => {
    speak(wordToSpeak, { pitch: 1.5, rate: 0.8 })
  }

  const speakRandomResponse = (
    responses: string[],
    defaulWord: string = ''
  ) => {
    const pickedResponse = getRandomInt(0, responses.length - 1)
    speakWord(responses[pickedResponse] || defaulWord)
  }

  const createNewWord = () => {
    const newWord = getRandomItem(gameWords)
    dispatch({ type: 'setCurrentWord', payload: newWord })
    speakWord(newWord.word)
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
    const newGameWords = words
      .filter((item) => item.level === level)
      .filter((item) => {
        if (level === 'junior') {
          return item.word.length <= 6
        }
        if (difficulty !== 'Easy') {
          return item.word.length >= 7
        }

        return item
      })
    dispatch({ type: 'setGameWords', payload: newGameWords })
    dispatch({ type: 'setGameStatus', payload: 'start' })
    dispatch({ type: 'setGameAction', payload: 'start' })
  }

  const hint = () => {
    const hints = getHints(currentWord!)
    speakRandomResponse(hints)
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
      dispatch({ type: 'setGameStatus', payload: 'game-over' })
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
        dispatch({ type: 'setGameStatus', payload: 'game-over' })
        return
      }
      timeoutId = setTimeout(() => {
        dispatch({ type: 'setUserAnswerInput', payload: '' })
        dispatch({ type: 'setGameStatus', payload: 'playing' })
        dispatch({ type: 'setRestartTimer', payload: true })
        dispatch({ type: 'setRoundCount', payload: roundCount + 1 })
        dispatch({ type: 'setGameAction', payload: '' })
        createNewWord()
      }, 2500)
    }
    if (gameAction === 'skip-word') {
      timeoutId = setTimeout(() => {
        if (validateIsGameOver()) {
          dispatch({ type: 'setGameStatus', payload: 'game-over' })
        } else {
          nextWord()
        }
      }, 1000)
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

  const isReady = words.length && !!speechSynth
  const wordToSpeak = currentWord?.word
  const stopTimer = ['game-over', 'skip-word', 'answer-correct'].includes(
    gameStatus
  )

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
              {gameStatus === 'playing' && (
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
                <div className="px-5 py-2 rounded-xl text-4xl font-bold text-center">
                  TimeOut!
                </div>
              )}
              {(gameStatus === 'skip-word' || gameStatus === 'timeout') && (
                <div className=" px-5 py-3 rounded-xl text-2xl font-bold text-center">
                  The correct answer is{' '}
                  <span className="text-red-500">{currentWord?.word}</span>
                </div>
              )}
              {gameStatus === 'answer-correct' && (
                <div className=" px-5 py-3 rounded-xl text-2xl font-bold text-center">
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
                  <div className="flex flex-col md:flex-row justify-between mt-2">
                    <OptButton
                      onClick={() => {
                        speakWord(wordToSpeak!)
                      }}
                    >
                      Say it again?
                    </OptButton>
                    <OptButton
                      onClick={() => {
                        speakWord('this word means ' + currentWord?.definition!)
                      }}
                    >
                      Define the word?
                    </OptButton>
                    <OptButton onClick={hint}> Give me a hint?</OptButton>
                  </div>
                  {difficulty === 'Easy' && currentTime <= totalSeconds / 2 && (
                    <ShuffleWord word={shuffledWord} />
                  )}
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

export default function SpellingBee(props: SpellingBeeProps) {
  const { words } = props

  return (
    <StateProvider>
      <Suspense>
        <SpellingBeeComponent words={words} />
      </Suspense>
    </StateProvider>
  )
}
