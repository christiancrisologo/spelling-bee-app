type TopBarProps = {
    completedWords: number
    skippedWords: number
    onQuit: ()=> void
    totalWords: number
}

export default function BottomBar(props:TopBarProps) {
    const { completedWords, skippedWords, totalWords, onQuit } = props;

    return(<div className="flex justify-between items-center mt-auto  p-4 bg-white shadow-md">
        <span>Round: {completedWords + skippedWords} / <span className="text-blue-700">{totalWords}</span> </span>
        <span>Completed words: {completedWords}</span>
        <span>Skipped words: {skippedWords}</span>
        <button 
            className=" p-2 bg-red-500 text-white hover:bg-red-700 focus:outline-none text-xl font-bold rounded-xl"
            onClick={() => onQuit && onQuit()}
        >
            Quit
        </button>
      </div>
    )
}