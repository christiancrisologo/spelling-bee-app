type TopBarProps = {
  wrongAnswers: number
  skippedQuizes: number
  roundCount: number
  onQuit: () => void
  totalQuizes: number
}

export default function BottomBar(props: TopBarProps) {
  const { wrongAnswers, skippedQuizes, totalQuizes, roundCount, onQuit } = props

  return (
    <div className="flex justify-between items-center mt-auto  p-4 bg-white shadow-md">
      <span>
        Round: {roundCount} /{' '}
        <span className="text-blue-700">{totalQuizes}</span>{' '}
      </span>
      <span className="hidden sm:block">Wrong answers: {wrongAnswers}</span>
      <span className="hidden sm:block">Skipped quiz: {skippedQuizes}</span>
      <button
        className=" p-2 bg-red-500 text-white hover:bg-red-700 focus:outline-none text-xl font-bold rounded-xl"
        onClick={() => onQuit && onQuit()}
      >
        Quit
      </button>
    </div>
  )
}
