import React from 'react'
import Spinner from '@/app/ui/Spinner'
import data from '../data.json'
import MathQuiz from './ui/MathQuiz'

export default async function Page() {
  const quiz = data

  return (
    <div className="flex flex-col h-screen bg-gray-200 w-full">
      {!quiz.length && <Spinner />}
      {quiz.length && <MathQuiz quizes={quiz} />}
    </div>
  )
}
