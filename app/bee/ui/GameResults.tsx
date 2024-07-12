import Image from 'next/image'

export type GameResultProps = {
  playerName: string
  correctAnswers: number
  wrongAnswers: number
  skippedWords: number
  totalWords: number
  totalTime: number
}

const RowItem = ({
  label = '',
  value = '',
}: {
  label: string
  value: string
}) => {
  return (
    <div className="p-2 flex flex-row">
      <span className="text-gray-700 flex py-1 me-2 w-40">{label}</span>
      <div className="py-1 px-2 rounded text-white bg-slate-400 font-semibold">
        {value}
      </div>
    </div>
  )
}

const getStar = (index: number, rating: number) => {
  const startType = index < Math.ceil(rating * 5) ? 'fill' : 'empty'

  return (
    <Image
      src={`/star-${startType}.png`}
      alt="empty star"
      width="32"
      height="32"
    />
  )
}

const GameResult = (props: GameResultProps) => {
  const {
    playerName,
    correctAnswers,
    wrongAnswers,
    skippedWords,
    totalWords,
    totalTime,
  } = props
  const rating = (correctAnswers / totalWords) * 100

  return (
    <div className="md:w-1/2 self-center mt-2">
      <h1 className="text-center mb-8 text-4xl font-extrabold">
        Good Job <span className="text-orange-700">{playerName} </span>!
      </h1>
      <div className="mt-4 bg-slate-100 border-gray-400 rounded-xl p-4 border-4 shadow-sm ">
        <h2 className="text-blue-500 text-center text-2xl font-extrabold">
          Your Spelling Bee Result
        </h2>
        <div className="flex-col mt-4">
          <RowItem label="Total Seconds" value={totalTime.toString()} />
          <RowItem label="Correct Answers" value={playerName} />
          <RowItem label="Wrong Answers" value={wrongAnswers.toString()} />
          <RowItem label="Skipped Words" value={skippedWords.toString()} />
          <RowItem label="Total Rating" value={`${rating.toFixed(0)}%`} />

          <div className="p-2 flex flex-row">
            {[...Array(5)].map((_, index) => {
              return <div key={index}>{getStar(index, rating)}</div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameResult
