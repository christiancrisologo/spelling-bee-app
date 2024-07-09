'use client'

import React, { useCallback, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import OptionGroup, { OptionProps } from '../bee/ui/OptionGroup'

export type UserSettings = {
  totalWords: number
  playerName: string
  enableTimer: boolean
  totalSeconds: number
}

const levelOptions: OptionProps[] = [
  {
    label: 'elementary',
  },
  {
    label: 'junior',
  },
  {
    label: 'senior',
  },
]

const StartScreenComponent = () => {
  const searchParams = useSearchParams()!
  const router = useRouter()
  const [playerName, setPlayerName] = useState('')
  const [level, setLevel] = useState('junior')

  const onSubmit = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.set('playerName', playerName)
    params.set('level', level)

    router.push('/bee' + '?' + params.toString())
  }, [level, playerName, router, searchParams])

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      onSubmit()
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex mt-2 justify-center flex-col md:flex-row mx-6">
        <input
          type="text"
          name="word-input"
          id="word-input"
          className="bg-white p-4 rounded-xl text-xl font-bold md:me-2"
          placeholder="What's your name?"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button
          className="mt-1 p-4 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none text-xl font-bold rounded-xl disabled:bg-gray-400"
          onClick={onSubmit}
          onKeyDown={handleKeyDown}
          disabled={!playerName.length}
        >
          Submit
        </button>
      </div>
      <div className="flex mt-2 justify-center flex-col md:flex-row mx-6">
        <OptionGroup
          className="self-center"
          label="Level"
          options={levelOptions}
          onChange={(value: string) => {
            setLevel(value)
          }}
          selected={level}
        />
      </div>
    </div>
  )
}

export default function StartScreen() {
  return (
    <Suspense>
      <StartScreenComponent />
    </Suspense>
  )
}
