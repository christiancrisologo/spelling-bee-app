'use client'

import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'

type GameTimerProps = {
  startTime: number
  endTime: number
  isCountdown: boolean
  start: boolean
  onTimerOver: () => void
}

function GameTimer(props: GameTimerProps) {
  const {
    state: { currentTime },
    dispatch,
  } = useStateContext()
  const {
    startTime = 0,
    endTime = 0,
    isCountdown = false,
    start,
    onTimerOver,
  } = props
  const [seconds, setSeconds] = useState(startTime)

  useEffect(() => {
    if (start) {
      setSeconds(startTime)
    }
  }, [start, startTime])

  useEffect(() => {
    dispatch({
      type: 'setCurrentTime',
      payload: seconds,
    })
  }, [seconds, dispatch])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isCountdown) {
        if (seconds > endTime) {
          setSeconds(seconds - 1)
        } else {
          clearInterval(intervalId)
          onTimerOver && onTimerOver()
        }
      } else {
        if (seconds < endTime) {
          setSeconds(seconds + 1)
        } else {
          clearInterval(intervalId)
          onTimerOver && onTimerOver()
        }
      }
    }, 1000) // Update every second

    if (start === false) {
      clearInterval(intervalId)
      return
    }

    return () => clearInterval(intervalId) // Cleanup on unmount
  }, [seconds, endTime, isCountdown, start, onTimerOver])

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const formattedTime = `${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`

  return (
    <div className="flex justify-center items-center">
      <span className="">⏱️ {formattedTime}</span>
    </div>
  )
}

export default GameTimer
