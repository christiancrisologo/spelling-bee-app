import { useEffect, useMemo, useState } from 'react'
import GameTimer from './GameTimer'

type TopBarProps = {
  correctAnswers: number
  playerName: string
  restartTimer: boolean
  stopTimer: boolean
  enableTimer: boolean
  totalSeconds: number
  onTimerOver: () => void
  level: string
}

export default function TopBar(props: TopBarProps) {
  const {
    correctAnswers,
    playerName,
    restartTimer,
    stopTimer,
    onTimerOver,
    enableTimer,
    totalSeconds,
    level,
  } = props

  const timer = useMemo(() => {
    const _timer = {
      startTime: totalSeconds,
      endTime: 0,
      isCountdown: true,
      start: true,
    }
    if (restartTimer) {
      _timer.startTime = totalSeconds
      _timer.start = true
    } else {
      // _timer.startTime = 0;
      _timer.start = false
    }
    if (stopTimer) {
      _timer.start = false
    }

    return _timer
  }, [restartTimer, stopTimer, totalSeconds])

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex">
        <span className="pr-4">
          🏅 Score : {correctAnswers}{' '}
          <span className="text-gray-400">({level})</span>
        </span>
      </div>
      <span className="text-fuchsia-600 text-xl font-bold">{playerName}</span>
      {enableTimer ? (
        <GameTimer
          startTime={timer.startTime}
          isCountdown={timer.isCountdown}
          endTime={timer.endTime}
          start={timer.start}
          onTimerOver={onTimerOver}
        />
      ) : (
        <span>No timer</span>
      )}
    </div>
  )
}
