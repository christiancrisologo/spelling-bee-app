'use client'

import React, { useCallback, useState, Suspense } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import OptionGroup, { OptionProps } from '../bee/ui/OptionGroup'
import cls from 'classnames'

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

const GameBox = ({
  label,
  imgSrc,
  imgAlt,
  selected,
  onClick,
}: {
  label: string
  imgSrc: string
  imgAlt: string
  selected: boolean
  onClick: () => void
}) => {
  const className = cls(
    'md:w-1/2 p-4 min-w-[350px]',
    selected ? 'bg-yellow-600' : 'bg-gray-800'
  )
  return (
    <div className={className} onClick={onClick}>
      <div className="hover:bg-yellow-600 cursor-pointer bg-gray-800 p-6 rounded-lg sm:flex-row ">
        <div className="text-center md:mb-8 md:text-4xl text-2xl  text-white font-extrabold ">
          {label}
        </div>
        <div className="hidden md:flex justify-center">
          <Image src={imgSrc} alt={imgAlt} width="200" height="200" />
        </div>
      </div>
    </div>
  )
}

const StartScreenComponent = () => {
  const searchParams = useSearchParams()!
  const router = useRouter()
  const [playerName, setPlayerName] = useState('')
  const [level, setLevel] = useState('junior')
  const [selectedGame, setSelectedGame] = useState('')

  const onSubmit = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.set('playerName', playerName)
    params.set('level', level)

    router.push('/' + selectedGame + '?' + params.toString())
  }, [level, playerName, router, searchParams])

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      onSubmit()
    }
  }

  const items = [
    {
      label: 'Math Quiz',
      imgSrc: '/math.png',
      imgAlt: 'Math Quiz',
      id: 'math',
    },
    {
      label: 'Spelling Bee',
      imgSrc: '/bee.png',
      imgAlt: 'Spelling Bee',
      id: 'bee',
    },
  ]

  return (
    <div className="mt-4 p-4 w-full">
      <div className="flex md:w-1/2 w-full flex-wrap flex-row justify-center mx-auto mb-4">
        {items.map((item) => (
          <GameBox
            key={item.id}
            label={item.label}
            imgSrc={item.imgSrc}
            imgAlt={item.imgAlt}
            selected={selectedGame === item.id}
            onClick={() => setSelectedGame(item.id)}
          />
        ))}
      </div>
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
            labelClassName="text-blue-900 font-medium justify-center"
            className="justify-center"
            label="Level"
            options={levelOptions}
            onChange={(value: string) => {
              setLevel(value)
            }}
            selected={level}
          />
        </div>
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
