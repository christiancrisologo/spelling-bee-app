type TopBarProps = {
    completedWords: number
    skippedWords: number
    onQuit: ()=> void
}

export default function BottomBar(props:TopBarProps) {
    const { completedWords, skippedWords, onQuit } = props;

    return(<div className="flex justify-between items-center mt-auto  p-4 bg-white shadow-md">
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