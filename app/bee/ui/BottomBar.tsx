type TopBarProps = {
    correctWords: number
    skippedWords: number
    roundCount: number
    onQuit: ()=> void
    totalWords: number
}

export default function BottomBar(props:TopBarProps) {
    const { correctWords, skippedWords, totalWords, roundCount, onQuit } = props;

    return(<div className="flex justify-between items-center mt-auto  p-4 bg-white shadow-md">
        <span>Round: {roundCount} / <span className="text-blue-700">{totalWords}</span> </span>
        <span className="hidden sm:block">Correct words: {correctWords}</span>
        <span className="hidden sm:block">Skipped words: {skippedWords}</span>
        <button 
            className=" p-2 bg-red-500 text-white hover:bg-red-700 focus:outline-none text-xl font-bold rounded-xl"
            onClick={() => onQuit && onQuit()}
        >
            Quit
        </button>
      </div>
    )
}