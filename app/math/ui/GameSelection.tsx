'use client'

import { useState } from 'react'
import OptionGroup, { OptionProps } from '@/app/game/ui/OptionGroup'
import { useStateContext } from '../context'

type GameSelectionProps = {
  onStart: () => void
}

export type Difficulty = 'Easy' | 'Hard'

export type SelectedGameOptionType = {
  difficulty: Difficulty
  enableTimer: string
  totalWords: number
  totalSeconds: number
}

const difficultyOptions: OptionProps[] = [
  {
    label: 'Easy',
  },
  {
    label: 'Hard',
  },
]

const enableTimerOptions: OptionProps[] = [
  {
    label: 'On',
  },
  {
    label: 'Off',
  },
]

const minTotalSeconds = 10
const minTotalWords = 5

export function GameSelection(props: GameSelectionProps) {
  const { onStart } = props
  const { state, dispatch } = useStateContext()
  const [gameSelection, setGameSelection] = useState<SelectedGameOptionType>({
    difficulty: 'Easy',
    enableTimer: 'On',
    totalSeconds: 45,
    totalWords: 10,
  })

  const onStartHandler = () => {
    dispatch({
      type: 'setGameSelections',
      payload: gameSelection,
    })
    onStart()
  }
  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      onStartHandler()
    }
  }

  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center  self-center flex-col mb-4">
        <OptionGroup
          label="Difficulty"
          options={difficultyOptions}
          onChange={(value: string) => {
            setGameSelection({
              ...gameSelection,
              difficulty: value as Difficulty,
            })
          }}
          selected={gameSelection.difficulty}
        />
        <OptionGroup
          label="Enable Timer"
          options={enableTimerOptions}
          onChange={(value: string) => {
            setGameSelection({
              ...gameSelection,
              enableTimer: value,
            })
          }}
          selected={gameSelection.enableTimer}
        />
        <div className="flex-row mt-2">
          <label
            htmlFor="total-seconds-number"
            className="self-center me-4 text-blue-900 font-medium disabled:text-gray-200"
          >
            Total Seconds
          </label>
          <input
            id="total-seconds-number"
            type="number"
            className="p-2 w-20 text-black text-lg font-semibold bg-gray-100 border-gray-300  focus:ring-blue-500 rounded-lg disabled:bg-gray-400 disabled:text-gray-200 disabled:border-white"
            value={
              gameSelection.enableTimer === 'On'
                ? gameSelection.totalSeconds
                : 0
            }
            placeholder="Total seconds"
            onChange={(e) => {
              setGameSelection({
                ...gameSelection,
                totalSeconds: parseInt(e.target.value) || minTotalSeconds,
              })
            }}
            disabled={gameSelection.enableTimer !== 'On'}
          />
        </div>
        <div className="flex mt-4 flex-row">
          <label
            htmlFor="total-quiz-number"
            className="self-center me-8 text-blue-900 font-medium"
          >
            Total Quiz
          </label>
          <input
            id="total-quiz-number"
            type="number"
            className="p-2 w-20 text-black text-lg font-semibold bg-gray-100 border-gray-300  focus:ring-blue-500 rounded-lg"
            value={gameSelection.totalWords}
            placeholder="Total quiz"
            onChange={(e) => {
              setGameSelection({
                ...gameSelection,
                totalWords: parseInt(e.target.value) || minTotalWords,
              })
            }}
          />
        </div>
      </div>

      <button
        className="mt-2 p-4 w-auto md:w-1/2 self-center bg-blue-500 text-white hover:bg-blue-700 focus:outline-none text-xl font-bold rounded-xl disabled:bg-gray-400"
        onClick={onStartHandler}
        onKeyDown={handleKeyDown}
      >
        Start a New Game
      </button>
    </div>
  )
}
